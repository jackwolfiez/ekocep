import fs from "node:fs/promises";

const sourcePath = "C:/Users/Mustafa/.codex/attachments/60305a73-1c84-4c10-92b8-08142838e6d7/pasted-text.txt";
const outputPath = new URL("../products-data.js", import.meta.url);

const htmlDecode = (value = "") =>
  value
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

const slugify = (value) =>
  value
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const meta = (html, property) => {
  const pattern = new RegExp(`<meta\\s+(?:property|name|itemprop)=["']${property}["'][^>]*content=["']([^"']+)["']`, "i");
  return htmlDecode(html.match(pattern)?.[1] || "");
};

const stripTags = (value = "") => htmlDecode(value.replace(/<[^>]*>/g, " "));

const extractJsonLdProducts = (html) =>
  Array.from(html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi))
    .flatMap(([, json]) => {
      try {
        const parsed = JSON.parse(htmlDecode(json));
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return [];
      }
    })
    .filter((item) => item?.["@type"] === "Product");

const mediaIdFrom = (url) => url.match(/\/media\/(\d+)\//)?.[1] || url;

const normalizeGalleryImages = (images) => {
  const urls = Array.from(new Set(images.filter(Boolean).map(String)));
  const highResIds = new Set(
    urls
      .filter((url) => !url.includes("/conversions/"))
      .map(mediaIdFrom)
  );

  const preferred = urls.filter((url) => !url.includes("/conversions/") || !highResIds.has(mediaIdFrom(url)));
  return preferred.length ? preferred : urls;
};

const extractGalleryImages = (html) => {
  const product = extractJsonLdProducts(html)[0];
  const jsonImages = Array.isArray(product?.image) ? product.image : [product?.image].filter(Boolean);
  const normalized = normalizeGalleryImages(jsonImages);
  if (normalized.length) return normalized;

  const metaImage = meta(html, "og:image") || meta(html, "image");
  return metaImage ? [metaImage] : [];
};

const extractPrice = (html) => {
  const candidates = [
    /itemprop=["']price["'][^>]*content=["']([^"']+)["']/i,
    /"price"\s*:\s*"([^"]+)"/i,
    /(?:₺|TL)\s*([0-9][0-9.,]*)/i,
    /([0-9][0-9.,]*)\s*TL/i
  ];

  for (const pattern of candidates) {
    const match = html.match(pattern);
    if (!match) continue;
    const raw = match[1].replace(/\s/g, "");
    const numeric = Number(raw.replace(/\./g, "").replace(",", "."));
    if (Number.isFinite(numeric) && numeric > 0) {
      return `${new Intl.NumberFormat("tr-TR").format(Math.round(numeric))} TL`;
    }
  }

  return "Fiyat için iletişime geçin";
};

const extractSpecs = (html) => {
  const featureStart = html.search(/id=["']product-feature["']/i);
  const featureHtml = featureStart >= 0 ? html.slice(featureStart) : html;
  const tables = Array.from(featureHtml.matchAll(/<table[^>]*>\s*<tbody[^>]*>([\s\S]*?)<\/tbody>\s*<\/table>/gi));
  const preferredTable = tables.at(-1)?.[1] || "";

  return Array.from(preferredTable.matchAll(/<tr[^>]*>\s*<(?:th|td)[^>]*>([\s\S]*?)<\/(?:th|td)>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<\/tr>/gi))
    .map(([, label, value]) => ({
      label: stripTags(label),
      value: stripTags(value)
    }))
    .filter((spec) => spec.label && spec.value);
};

const inferColor = (title, description) => {
  const text = `${title} ${description}`.toLocaleLowerCase("tr");
  const colors = [
    ["Siyah", "siyah"],
    ["Beyaz", "beyaz"],
    ["Gri", "gri"],
    ["Krem", "krem"],
    ["Mavi", "mavi"],
    ["Lacivert", "lacivert"],
    ["Turuncu", "turuncu"],
    ["Mor", "mor"],
    ["Pembe", "pembe"],
    ["Turkuaz", "turkuaz"],
    ["Kahverengi", "kahverengi"],
    ["Rose Gold", "rose gold"]
  ];
  return colors.find(([, key]) => text.includes(key))?.[0] || "Standart";
};

const parseSource = (source) => {
  const groups = [];
  let current = null;

  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.startsWith("http")) {
      current?.urls.push(line);
      continue;
    }

    const [parent, child] = line.split("/").map((part) => part.trim());
    current = { parent, child: child || null, urls: [] };
    groups.push(current);
  }

  return groups;
};

const getProduct = async (url, group, index) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  const html = await response.text();
  const fullTitle = meta(html, "og:title") || htmlDecode(html.match(/<title>(.*?)<\/title>/i)?.[1] || "");
  const name = fullTitle.replace(/\s*-\s*Nettech Store\s*$/i, "");
  const description = meta(html, "description") || "Ekocep güvencesiyle seçilmiş teknoloji ürünü.";
  const specs = extractSpecs(html);
  const images = extractGalleryImages(html);
  const image = images[0] || meta(html, "og:image") || meta(html, "image");
  const id = `${slugify(name)}-${index + 1}`;

  return {
    id,
    name,
    category: group.parent,
    subcategory: group.child,
    price: extractPrice(html),
    image,
    hoverImg: images[1] || image,
    images,
    sourceUrl: url,
    specs,
    description,
    color: specs.find((spec) => spec.label === "Renk")?.value || inferColor(name, description)
  };
};

const source = await fs.readFile(sourcePath, "utf8");
const groups = parseSource(source);
const products = [];

let productIndex = 0;
for (const group of groups) {
  for (const url of group.urls) {
    try {
      products.push(await getProduct(url, group, productIndex));
      productIndex += 1;
      console.log(`OK ${products.at(-1).name} (${products.at(-1).images.length} images)`);
    } catch (error) {
      console.error(`FAIL ${url}`);
      console.error(error);
    }
  }
}

const categories = groups.map((group) => ({
  label: group.child ? `${group.parent}/${group.child}` : group.parent,
  parent: group.parent,
  child: group.child,
  productIds: products
    .filter((product) => product.category === group.parent && product.subcategory === group.child)
    .map((product) => product.id)
}));

const data = `export const categories = ${JSON.stringify(categories, null, 2)};\n\nexport const products = ${JSON.stringify(products, null, 2)};\n`;

await fs.writeFile(outputPath, data, "utf8");
console.log(`Wrote ${products.length} products to ${outputPath.pathname}`);
