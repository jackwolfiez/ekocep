import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const rootEntries = await fs.readdir(root);
const files = [
  ...rootEntries.filter((file) => file.endsWith(".html")),
  "styles.css",
  "script.js",
  "product.js",
  "content-page.js",
  "products-data.js"
];

await fs.rm(dist, { recursive: true, force: true });
await fs.mkdir(dist, { recursive: true });

await Promise.all(files.map((file) => fs.copyFile(path.join(root, file), path.join(dist, file))));
await fs.cp(path.join(root, "public"), path.join(dist, "public"), { recursive: true });
