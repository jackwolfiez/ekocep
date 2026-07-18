import fs from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const dataPath = new URL("../products-data.js", import.meta.url);
const dataUrl = `${pathToFileURL(fileURLToPath(dataPath)).href}?t=${Date.now()}`;
const { categories, products } = await import(dataUrl);

const parseNumericPrice = (rawPrice) => {
  const raw = String(rawPrice).replace(/\s/g, "").replace(/[^\d.,]/g, "");
  if (!raw) return Number.NaN;

  if (/^\d+\.\d{2}$/.test(raw)) return Number(raw);
  if (/^\d+,\d{2}$/.test(raw)) return Number(raw.replace(",", "."));

  if (raw.includes(",") && raw.includes(".")) {
    return Number(raw.replace(/\./g, "").replace(",", "."));
  }

  if (/^\d{1,3}(?:\.\d{3})+$/.test(raw)) {
    return Number(raw.replace(/\./g, ""));
  }

  return Number(raw.replace(",", "."));
};

const formatPrice = (value) => `${new Intl.NumberFormat("tr-TR").format(Math.round(value))} TL`;

const extractPrice = (html) => {
  const candidates = [
    /itemprop=["']price["'][^>]*content=["']([^"']+)["']/i,
    /"price"\s*:\s*"([^"]+)"/i,
    /<input[^>]*class=["'][^"']*\brealPrice\b[^"']*["'][^>]*value=["']([^"']+)["']/i,
    /<strong>\s*([0-9][0-9.,]*)\s*TL\s*<\/strong>/i,
    /(?:₺|TL)\s*([0-9][0-9.,]*)/i,
    /([0-9][0-9.,]*)\s*TL/i
  ];

  for (const pattern of candidates) {
    const match = html.match(pattern);
    if (!match) continue;

    const numeric = parseNumericPrice(match[1]);
    if (Number.isFinite(numeric) && numeric > 0) return formatPrice(numeric);
  }

  return null;
};

let updated = 0;
let unchanged = 0;
let failed = 0;

for (const product of products) {
  if (!product.sourceUrl) {
    failed += 1;
    console.warn(`SKIP ${product.name}: sourceUrl missing`);
    continue;
  }

  try {
    const response = await fetch(product.sourceUrl, { headers: { "user-agent": "Mozilla/5.0" } });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

    const html = await response.text();
    const nextPrice = extractPrice(html);
    if (!nextPrice) throw new Error("price not found");

    if (product.price !== nextPrice) {
      console.log(`${product.name}: ${product.price} -> ${nextPrice}`);
      product.price = nextPrice;
      updated += 1;
    } else {
      unchanged += 1;
    }
  } catch (error) {
    failed += 1;
    console.warn(`FAIL ${product.name}: ${error.message}`);
  }
}

const data = `export const categories = ${JSON.stringify(categories, null, 2)};\n\nexport const products = ${JSON.stringify(products, null, 2)};\n`;
await fs.writeFile(dataPath, data, "utf8");

console.log(`Updated ${updated}, unchanged ${unchanged}, failed ${failed}`);
