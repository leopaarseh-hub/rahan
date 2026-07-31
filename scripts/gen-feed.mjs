/**
 * Generates the WhatsApp Business / Meta Commerce Manager catalog feed:
 *
 *   public/catalog.csv           — the feed itself
 *   public/catalog-images/*.jpg  — JPEG copies of every product image
 *
 * Meta does NOT accept WebP for catalog images (JPEG/PNG only), so the site
 * keeps its WebP imagery while the feed links to these generated JPEGs.
 * Runs automatically before every build (see package.json "prebuild").
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://kian-market.vercel.app').replace(/\/$/, '');
const BRAND = 'Kian Markt';
const IMG_DIR = 'public/catalog-images';
const src = fs.readFileSync('src/lib/data.ts', 'utf8');

const grab = name => {
  const m = src.match(new RegExp(`export const ${name}[^=]*=\\s*(\\[[\\s\\S]*?\\n\\]);`));
  if (!m) throw new Error(`could not read ${name} from data.ts`);
  return eval(m[1]); // our own literal array, no external input
};

const CATS = grab('CATS');
const PRODUCTS = grab('PRODUCTS');
const catOf = id => CATS.find(c => c.id === id);

const esc = v => {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

// ── JPEG copies for Meta (WebP is rejected by catalog imports) ─────────
fs.rmSync(IMG_DIR, { recursive: true, force: true });
fs.mkdirSync(IMG_DIR, { recursive: true });

const jpegFor = async p => {
  const source = path.join('public', (p.img || '/images/logo.webp').replace(/^\//, ''));
  const out = `kian-${p.id}.jpg`;
  await sharp(source)
    .resize(800, 800, { fit: 'contain', background: '#ffffff' })
    .flatten({ background: '#ffffff' })
    .jpeg({ quality: 86, chromaSubsampling: '4:4:4' })
    .toFile(path.join(IMG_DIR, out));
  return out;
};

const COLUMNS = [
  'id', 'title', 'description', 'availability', 'condition',
  'price', 'link', 'image_link', 'brand', 'product_type',
];

// grouped by category so an empty price column is quick to fill in a spreadsheet
const sorted = [...PRODUCTS].sort((a, b) => a.catId - b.catId || a.id - b.id);
const rows = [];
for (const p of sorted) {
  const c = catOf(p.catId);
  const file = await jpegFor(p);
  rows.push({
    id: `kian-${p.id}`,
    title: `${p.de} | ${p.fa}`,
    description: `${p.de} — ${c.de} / ${c.fa}. ${BRAND}, Luxemburger Str. 12, 50674 Köln.`,
    availability: 'in stock',
    condition: 'new',
    price: p.price != null ? `${p.price.toFixed(2)} EUR` : '',
    link: `${SITE}/shop`,
    image_link: `${SITE}/catalog-images/${file}`,
    brand: BRAND,
    product_type: `${c.de} > ${c.fa}`,
  });
}

const csv = [COLUMNS.join(','), ...rows.map(r => COLUMNS.map(k => esc(r[k])).join(','))].join('\n');
// BOM so Excel opens Persian and German characters correctly
fs.writeFileSync('public/catalog.csv', '﻿' + csv + '\n', 'utf8');

const missing = rows.filter(r => !r.price).length;
console.log(`catalog.csv: ${rows.length} products (${rows.length - missing} priced, ${missing} awaiting price)`);
console.log(`catalog-images: ${rows.length} JPEGs → ${SITE}/catalog.csv`);
