/**
 * Generates public/catalog.csv — a Meta Commerce Manager / WhatsApp Business
 * catalog feed built from the same product data the site renders.
 * Runs automatically before every build (see package.json "prebuild").
 */
import fs from 'node:fs';

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://rahan-liard.vercel.app').replace(/\/$/, '');
const BRAND = 'Kian Markt';
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

const COLUMNS = [
  'id', 'title', 'description', 'availability', 'condition',
  'price', 'link', 'image_link', 'brand', 'product_type',
];

// grouped by category so an empty price column is quick to fill in a spreadsheet
const rows = [...PRODUCTS]
  .sort((a, b) => a.catId - b.catId || a.id - b.id)
  .map(p => {
    const c = catOf(p.catId);
    return {
      id: `kian-${p.id}`,
      title: `${p.de} | ${p.fa}`,
      description: `${p.de} — ${c.de} / ${c.fa}. ${BRAND}, Luxemburger Str. 12, 50674 Köln.`,
      availability: 'in stock',
      condition: 'new',
      price: p.price != null ? `${p.price.toFixed(2)} EUR` : '',
      link: `${SITE}/shop`,
      image_link: `${SITE}${p.img || '/images/logo.png'}`,
      brand: BRAND,
      product_type: `${c.de} > ${c.fa}`,
    };
  });

const csv = [COLUMNS.join(','), ...rows.map(r => COLUMNS.map(k => esc(r[k])).join(','))].join('\n');
fs.mkdirSync('public', { recursive: true });
// BOM so Excel opens Persian and German characters correctly
fs.writeFileSync('public/catalog.csv', '﻿' + csv + '\n', 'utf8');

const missing = rows.filter(r => !r.price).length;
console.log(`catalog.csv: ${rows.length} products (${rows.length - missing} priced, ${missing} awaiting price) → ${SITE}/catalog.csv`);
