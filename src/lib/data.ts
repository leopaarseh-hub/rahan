import { Category, Product, Service } from '@/types';

// Prefix asset paths with the deployment base path (e.g. /rahan on GitHub Pages)
export const withBase = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`;

// Store WhatsApp number in international format (0221 93290358 → +49)
export const WHATSAPP_PHONE = '4922193290358';

// Köln postcode range — deliveries are only made within the city
export const KOELN_PLZ = { min: 50667, max: 51149 };

export const MAPS_URL =
  'https://maps.google.com/maps/place//data=!4m2!3m1!1s0x47bf2300ca89d765:0x861c99e70b9ee4d9?entry=s&sa=X&ved=2ahUKEwjn09_ttLyVAxWaSKQEHep8K0IQ4kB6BAgbEAA&hl=en';

export const MAP_EMBED =
  'https://maps.google.com/maps?q=Luxemburger+Str.+12%2C+50674+K%C3%B6ln%2C+Germany&hl=de&z=17&output=embed';

export const CATS: Category[] = [
  { id: 1,  fa: 'خشکبار و میوه خشک',  de: 'Nüsse & Trockenfrüchte',        emoji: '🥜', color: '#9A742A', bg: '#F7EDD0', img: '/images/products/grapes.jpg' },
  { id: 2,  fa: 'لبنیات',              de: 'Milchprodukte',                   emoji: '🧀', color: '#166044', bg: '#DCE9E2', img: '/images/categories/milk.jpg' },
  { id: 3,  fa: 'گوشت و مرغ',          de: 'Fleisch & Geflügel',              emoji: '🥩', color: '#A32222', bg: '#F5E4DC', img: '/images/categories/meat.jpg' },
  { id: 4,  fa: 'برنج و غلات',          de: 'Reis & Getreide',                 emoji: '🌾', color: '#9A742A', bg: '#F7EDD0', img: '/images/products/rice.jpg' },
  { id: 5,  fa: 'ادویه‌جات',            de: 'Gewürze',                         emoji: '🌶️', color: '#A32222', bg: '#F5E4DC', img: '/images/categories/spices.jpg' },
  { id: 6,  fa: 'چای و نوشیدنی',        de: 'Tee & Getränke',                  emoji: '🫖', color: '#0E3B2A', bg: '#E8EEEA', img: '/images/products/tea.jpg' },
  { id: 7,  fa: 'ترشی و مربا',          de: 'Eingelegte Speisen & Konfitüren', emoji: '🫙', color: '#166044', bg: '#DCE9E2', img: '/images/categories/jam.jpg' },
  { id: 8,  fa: 'شیرینی و تنقلات',      de: 'Süßigkeiten & Snacks',            emoji: '🍯', color: '#9A742A', bg: '#F7EDD0', img: '/images/categories/sweets.jpg' },
  { id: 9,  fa: 'کنسرو و غذای آماده',   de: 'Konserven & Fertiggerichte',      emoji: '🥫', color: '#5A5A55', bg: '#EDEDEC', img: '/images/categories/cans.jpg' },
  { id: 10, fa: 'سبزیجات تازه',         de: 'Frisches Gemüse',                 emoji: '🥬', color: '#0E3B2A', bg: '#E8EEEA', img: '/images/categories/broccoli.jpg' },
  { id: 11, fa: 'نان و نانوایی',         de: 'Brot & Backwaren',                emoji: '🫓', color: '#9A742A', bg: '#F7EDD0', img: '/images/products/bread.jpg' },
  { id: 12, fa: 'محصولات ایرانی',        de: 'Iranische Produkte',              emoji: '🍃', color: '#0E3B2A', bg: '#E8EEEA', img: '/images/categories/persianrice.jpg' },
  { id: 13, fa: 'محصولات افغانی',        de: 'Afghanische Produkte',            emoji: '🌙', color: '#A32222', bg: '#F5E4DC', img: '/images/categories/buns.jpg' },
  { id: 14, fa: 'لوازم خانگی',           de: 'Haushaltsbedarf',                 emoji: '🧴', color: '#166044', bg: '#DCE9E2', img: '/images/categories/household.jpg' },
];

export const PRODUCTS: Product[] = [
  { id: 1,  fa: 'برنج ممتاز وارداتی',  de: 'Premium Import-Reis',   catId: 4,  catFa: 'برنج و غلات',   catDe: 'Reis & Getreide',  price: 8.49, bFa: 'وارداتی', bDe: 'Importiert',     emoji: '🌾', imgBg: '#fff', img: '/images/products/rice.jpg' },
  { id: 2,  fa: 'چای سیلان ممتاز',     de: 'Premium Ceylon-Tee',    catId: 6,  catFa: 'چای',           catDe: 'Tee',              price: 6.99, bFa: 'محبوب',  bDe: 'Beliebt',        emoji: '🫖', imgBg: '#fff', img: '/images/products/tea.jpg' },
  { id: 3,  fa: 'گوجه‌فرنگی تازه',     de: 'Frische Tomaten',       catId: 10, catFa: 'سبزیجات تازه',  catDe: 'Frisches Gemüse',  price: 2.49, bFa: 'تازه',   bDe: 'Frisch',         emoji: '🍅', imgBg: '#fff', img: '/images/products/tomatoes.jpg' },
  { id: 4,  fa: 'خیار تازه',           de: 'Frische Gurken',        catId: 10, catFa: 'سبزیجات تازه',  catDe: 'Frisches Gemüse',  price: 1.99, bFa: 'تازه',   bDe: 'Frisch',         emoji: '🥒', imgBg: '#fff', img: '/images/products/cucumbers.jpg' },
  { id: 5,  fa: 'انگور قرمز تازه',     de: 'Frische rote Trauben',  catId: 10, catFa: 'میوه تازه',     catDe: 'Frisches Obst',    price: 3.99, bFa: 'تازه',   bDe: 'Frisch',         emoji: '🍇', imgBg: '#fff', img: '/images/products/grapes.jpg' },
  { id: 6,  fa: 'ماست و لبنیات تازه',  de: 'Frischer Joghurt',      catId: 2,  catFa: 'لبنیات',        catDe: 'Milchprodukte',    price: 3.49, bFa: 'تازه',   bDe: 'Täglich frisch', emoji: '🥛', imgBg: '#fff', img: '/images/products/yogurt.jpg' },
  { id: 7,  fa: 'نان تازه روزانه',      de: 'Täglich frisches Brot', catId: 11, catFa: 'نان و نانوایی', catDe: 'Brot & Backwaren', price: 2.99, bFa: 'تازه',   bDe: 'Frisch',         emoji: '🫓', imgBg: '#fff', img: '/images/products/bread.jpg' },
  { id: 8,  fa: 'تخم‌مرغ تازه',        de: 'Frische Eier',          catId: 2,  catFa: 'لبنیات',        catDe: 'Milchprodukte',    price: 3.29, bFa: 'تازه',   bDe: 'Frisch',         emoji: '🥚', imgBg: '#fff', img: '/images/products/eggs.jpg' },
  { id: 9,  fa: 'عسل طبیعی',           de: 'Natürlicher Honig',     catId: 8,  catFa: 'شیرینی',        catDe: 'Süßes',            price: 7.99, bFa: 'اصل',    bDe: 'Premium',        emoji: '🍯', imgBg: '#fff', img: '/images/products/honey.jpg' },
  { id: 10, fa: 'سیب قرمز و سبز',      de: 'Rote & grüne Äpfel',    catId: 10, catFa: 'میوه تازه',     catDe: 'Frisches Obst',    price: 2.79, bFa: 'تازه',   bDe: 'Frisch',         emoji: '🍎', imgBg: '#fff', img: '/images/products/apples.jpg' },
  { id: 11, fa: 'پرتقال آبدار',        de: 'Saftige Orangen',       catId: 10, catFa: 'میوه تازه',     catDe: 'Frisches Obst',    price: 2.49, bFa: 'تازه',   bDe: 'Frisch',         emoji: '🍊', imgBg: '#fff', img: '/images/products/oranges.jpg' },
  { id: 12, fa: 'پنیر و کره ممتاز',    de: 'Premium Käse & Butter', catId: 2,  catFa: 'لبنیات',        catDe: 'Milchprodukte',    price: 4.99, bFa: 'ویژه',   bDe: 'Premium',        emoji: '🧀', imgBg: '#fff', img: '/images/products/cheese.jpg' },
];

export const SERVICES: Service[] = [
  { iconName: 'Package',   fa: 'خرید حضوری',             de: 'Einkauf vor Ort',               dFa: 'فضای گرم و دلنشین برای خریدهای روزانه شما',               dDe: 'Angenehme Atmosphäre für Ihren täglichen Einkauf'        },
  { iconName: 'Leaf',      fa: 'محصولات تازه روزانه',    de: 'Täglich frische Waren',         dFa: 'هر روز محصولات تازه مستقیم از تامین‌کنندگان',             dDe: 'Täglich frische Produkte direkt von den Lieferanten'     },
  { iconName: 'Globe',     fa: 'محصولات اصیل',           de: 'Authentische Produkte',         dFa: 'محصولات اصیل ایرانی و افغانی از بهترین منابع',            dDe: 'Authentische iranische & afghanische Produkte'           },
  { iconName: 'Mail',      fa: 'سفارش ویژه',             de: 'Sonderbestellungen',            dFa: 'درخواست محصولات خاص که در فروشگاه موجود نیست',            dDe: 'Anfragen für spezielle Produkte'                         },
  { iconName: 'MapPin',    fa: 'ارسال در شهر کلن',       de: 'Lieferung in Köln',             dFa: 'ارسال سفارش فقط در محدوده شهر کلن انجام می‌شود',          dDe: 'Lieferung nur innerhalb von Köln'                        },
  { iconName: 'Cart',      fa: 'سفارش واتساپی',          de: 'WhatsApp-Bestellung',           dFa: 'سفارش آسان از طریق واتساپ و هماهنگی قیمت و جزئیات',       dDe: 'Einfach per WhatsApp bestellen — Preis & Details stimmen wir gemeinsam ab' },
];

export const BADGE_STYLE: Record<string, { bg: string; color: string }> = {
  Premium:          { bg: '#F7EDD0', color: '#9A742A' },
  Importiert:       { bg: '#E8EEEA', color: '#0E3B2A' },
  Imported:         { bg: '#E8EEEA', color: '#0E3B2A' },
  Frisch:           { bg: '#DCE9E2', color: '#166044' },
  Fresh:            { bg: '#DCE9E2', color: '#166044' },
  Beliebt:          { bg: '#F5E4DC', color: '#A32222' },
  Popular:          { bg: '#F5E4DC', color: '#A32222' },
  'Täglich frisch': { bg: '#DCE9E2', color: '#166044' },
  اصل:              { bg: '#F7EDD0', color: '#9A742A' },
  تازه:             { bg: '#DCE9E2', color: '#166044' },
  محبوب:            { bg: '#F5E4DC', color: '#A32222' },
  وارداتی:          { bg: '#E8EEEA', color: '#0E3B2A' },
  ویژه:             { bg: '#F5E4DC', color: '#A32222' },
};

export const CART_INIT: (Product & { qty: number })[] = [
  { ...PRODUCTS[0], qty: 1 },
  { ...PRODUCTS[2], qty: 2 },
  { ...PRODUCTS[6], qty: 1 },
];
