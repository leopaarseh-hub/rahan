/**
 * Writes prices from a filled-in CSV back into src/lib/data.ts.
 *
 *   npm run prices -- path/to/prices.csv
 *
 * The CSV needs an `id` column (kian-123) and a `price` column; any other
 * columns are ignored, so both prices.csv and the Meta catalog.csv work.
 * Prices may be written as "8.49", "8,49" or "8.49 EUR". An empty cell
 * leaves that product unpriced.
 */
import fs from 'node:fs';

const file = process.argv[2];
if (!file) {
  console.error('usage: npm run prices -- <file.csv>');
  process.exit(1);
}

// minimal CSV parser (quoted fields, embedded commas and quotes)
const parseCsv = text => {
  const rows = [];
  let row = [], field = '', quoted = false;
  const src = text.replace(/^﻿/, '').replace(/\r\n?/g, '\n');
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"') {
        if (src[i + 1] === '"') { field += '"'; i++; } else quoted = false;
      } else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(field); field = ''; }
    else if (ch === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else field += ch;
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  return rows;
};

const rows = parseCsv(fs.readFileSync(file, 'utf8')).filter(r => r.some(c => c.trim() !== ''));
const header = rows.shift().map(h => h.trim().toLowerCase());
const idCol = header.indexOf('id');
const priceCol = header.indexOf('price');
if (idCol === -1 || priceCol === -1) {
  console.error(`CSV must contain "id" and "price" columns — found: ${header.join(', ')}`);
  process.exit(1);
}

const wanted = new Map();
for (const r of rows) {
  const id = (r[idCol] || '').trim().replace(/^kian-/i, '');
  const raw = (r[priceCol] || '').trim().replace(/eur|€/gi, '').replace(',', '.').trim();
  if (!/^\d+$/.test(id)) continue;
  if (raw === '') { wanted.set(Number(id), null); continue; }
  const value = Number(raw);
  if (!Number.isFinite(value) || value < 0) {
    console.warn(`  skipped id ${id}: cannot read price "${r[priceCol]}"`);
    continue;
  }
  wanted.set(Number(id), value);
}

const path = 'src/lib/data.ts';
let src = fs.readFileSync(path, 'utf8');
let changed = 0, unchanged = 0, notFound = 0;

for (const [id, value] of wanted) {
  const re = new RegExp(`(\\{ id: ${id},[^\\n]*?price: )(undefined|[\\d.]+)`);
  const m = src.match(re);
  if (!m) { notFound++; continue; }
  const next = value == null ? 'undefined' : value.toFixed(2);
  if (m[2] === next) { unchanged++; continue; }
  src = src.replace(re, (_, head) => head + next);
  changed++;
}

fs.writeFileSync(path, src);
const priced = (src.split('export const PRODUCTS')[1].match(/price: \d/g) || []).length;
console.log(`prices: ${changed} updated, ${unchanged} already correct${notFound ? `, ${notFound} unknown id` : ''}`);
console.log(`data.ts now has ${priced} priced products — run npm run build to refresh the feed`);
