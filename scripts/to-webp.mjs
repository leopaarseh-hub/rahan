/**
 * Converts every image under public/images to WebP and removes the original.
 * All product, category and site imagery on this site is WebP — run this
 * after adding any new picture:  npm run webp
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = 'public/images';
const SRC_EXT = new Set(['.jpg', '.jpeg', '.png']);

const walk = dir =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });

const files = walk(ROOT).filter(f => SRC_EXT.has(path.extname(f).toLowerCase()));
if (!files.length) {
  console.log('to-webp: nothing to convert — all images are already WebP');
  process.exit(0);
}

let saved = 0;
for (const file of files) {
  const out = file.replace(/\.(jpe?g|png)$/i, '.webp');
  const before = fs.statSync(file).size;
  await sharp(file).webp({ quality: 82, effort: 6 }).toFile(out);
  const after = fs.statSync(out).size;
  saved += before - after;
  fs.unlinkSync(file);
  console.log(`${file} → ${out}  (${(before / 1024).toFixed(0)}kB → ${(after / 1024).toFixed(0)}kB)`);
}
console.log(`to-webp: converted ${files.length} images, saved ${(saved / 1024).toFixed(0)}kB`);
