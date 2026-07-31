# Kian Markt — project conventions

Premium Iranian & Afghan supermarket in Köln. Next.js 14 (App Router), static export,
bilingual Farsi (default, RTL) + German, deployed on Vercel.

## Images — WebP only

**Every image on this site is WebP.** No `.jpg`, `.jpeg` or `.png` under `public/images`.

- After adding any new picture, run `npm run webp` — it converts everything under
  `public/images` to WebP and deletes the source file. It also runs automatically as
  part of `npm run build` (`prebuild`).
- Reference images as `/images/<folder>/<name>.webp` and always through `withBase()`
  so the deployment base path is applied.
- Product photos are normalised to a 600×600 canvas with the subject fitted inside.
- Exception: `public/favicon.png` and `public/apple-icon.png` stay PNG for browser and
  iOS home-screen compatibility.

## Catalog data

- `src/lib/data.ts` holds `CATS` and `PRODUCTS`; every entry needs a Farsi (`fa`) and a
  German (`de`) name.
- `price` is optional — items without one render as "قیمت در واتساپ" / "Preis auf
  Anfrage" and are handled that way in the cart, checkout and WhatsApp message.
- Products are interleaved across categories so listings open with a varied mix.
- `public/catalog.csv` (Meta / WhatsApp Business feed) is generated from this data by
  `scripts/gen-feed.mjs` on every build — never edit it by hand.

## Ordering flow

No accounts, no online payment: basket → `/checkout` form (name, address, Köln-only
post code 50667–51149, phone) → WhatsApp message to the store number, where price and
details are agreed. Farsi messages use Persian digits and an RTL mark on every line.
