import fs from "node:fs/promises";
import path from "node:path";
import { products } from "../products-data.js";

const imageDir = path.join(process.cwd(), "public", "images", "products");
const productDataPath = path.join(process.cwd(), "products-data.js");
const htmlFiles = ["index.html", "product.html"];

const extensionFrom = (url, contentType) => {
  const pathname = new URL(url).pathname;
  const urlExt = path.extname(pathname).toLowerCase();
  if ([".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(urlExt)) return urlExt === ".jpeg" ? ".jpg" : urlExt;
  if (contentType?.includes("png")) return ".png";
  if (contentType?.includes("webp")) return ".webp";
  if (contentType?.includes("gif")) return ".gif";
  return ".jpg";
};

const remoteImages = products.flatMap((product) =>
  Array.from(new Set([product.image, product.hoverImg, ...(product.images || [])]))
    .filter((url) => typeof url === "string" && /^https?:\/\//.test(url))
    .map((url, imageIndex) => ({ product, url, imageIndex }))
);

await fs.rm(imageDir, { recursive: true, force: true });
await fs.mkdir(imageDir, { recursive: true });

const replacements = new Map();
for (const { product, url, imageIndex } of remoteImages) {
  if (replacements.has(url)) continue;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Image download failed: ${response.status} ${url}`);

  const contentType = response.headers.get("content-type") || "";
  const ext = extensionFrom(url, contentType);
  const filename = `${product.id}-${String(imageIndex + 1).padStart(2, "0")}${ext}`;
  const diskPath = path.join(imageDir, filename);
  const publicPath = `/public/images/products/${filename}`;
  const buffer = Buffer.from(await response.arrayBuffer());

  await fs.writeFile(diskPath, buffer);
  replacements.set(url, publicPath);
  console.log(`${publicPath} <- ${url}`);
}

let productData = await fs.readFile(productDataPath, "utf8");
for (const [remoteUrl, localPath] of replacements.entries()) {
  productData = productData.replaceAll(remoteUrl, localPath);
}
await fs.writeFile(productDataPath, productData, "utf8");

for (const file of htmlFiles) {
  const filePath = path.join(process.cwd(), file);
  let html = await fs.readFile(filePath, "utf8");
  for (const [remoteUrl, localPath] of replacements.entries()) {
    html = html.replaceAll(remoteUrl, localPath);
  }
  await fs.writeFile(filePath, html, "utf8");
}

console.log(`Localized ${replacements.size} product images.`);
