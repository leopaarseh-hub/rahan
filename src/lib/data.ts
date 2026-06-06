import { Category, Product, Service } from '@/types';

export const MAPS_URL =
  'https://maps.google.com/maps/place//data=!4m2!3m1!1s0x47b8ca2e44623a4f:0xe79502f1219841ea?entry=s&sa=X&ved=2ahUKEwjG356Kg_OUAxVFQvEDHZNlNtIQ4kB6BAgcEAA&hl=en';

export const MAP_EMBED =
  'https://maps.google.com/maps?q=K%C3%B6lner+Str.+49%2C+40211+D%C3%BCsseldorf%2C+Germany&hl=de&z=17&output=embed';

export const CATS: Category[] = [
  { id: 1,  fa: 'خشکبار و میوه خشک',  de: 'Nüsse & Trockenfrüchte',        emoji: '🥜', color: '#A07020', bg: '#F7EDD0' },
  { id: 2,  fa: 'لبنیات',              de: 'Milchprodukte',                   emoji: '🧀', color: '#3A7055', bg: '#DCE9E2' },
  { id: 3,  fa: 'گوشت و مرغ',          de: 'Fleisch & Geflügel',              emoji: '🥩', color: '#9B3A1E', bg: '#F5E4DC' },
  { id: 4,  fa: 'برنج و غلات',          de: 'Reis & Getreide',                 emoji: '🌾', color: '#A07020', bg: '#F7EDD0' },
  { id: 5,  fa: 'ادویه‌جات',            de: 'Gewürze',                         emoji: '🌶️', color: '#9B3A1E', bg: '#F5E4DC' },
  { id: 6,  fa: 'چای و نوشیدنی',        de: 'Tee & Getränke',                  emoji: '🫖', color: '#3B5249', bg: '#E8EEEA' },
  { id: 7,  fa: 'ترشی و مربا',          de: 'Eingelegte Speisen & Konfitüren', emoji: '🫙', color: '#3A7055', bg: '#DCE9E2' },
  { id: 8,  fa: 'شیرینی و تنقلات',      de: 'Süßigkeiten & Snacks',            emoji: '🍯', color: '#A07020', bg: '#F7EDD0' },
  { id: 9,  fa: 'کنسرو و غذای آماده',   de: 'Konserven & Fertiggerichte',      emoji: '🥫', color: '#5A5A55', bg: '#EDEDEC' },
  { id: 10, fa: 'سبزیجات تازه',         de: 'Frisches Gemüse',                 emoji: '🥬', color: '#3B5249', bg: '#E8EEEA' },
  { id: 11, fa: 'نان و نانوایی',         de: 'Brot & Backwaren',                emoji: '🫓', color: '#A07020', bg: '#F7EDD0' },
  { id: 12, fa: 'محصولات ایرانی',        de: 'Iranische Produkte',              emoji: '🍃', color: '#3B5249', bg: '#E8EEEA' },
  { id: 13, fa: 'محصولات افغانی',        de: 'Afghanische Produkte',            emoji: '🌙', color: '#9B3A1E', bg: '#F5E4DC' },
  { id: 14, fa: 'لوازم خانگی',           de: 'Haushaltsbedarf',                 emoji: '🧴', color: '#3A7055', bg: '#DCE9E2' },
];

export const PRODUCTS: Product[] = [
  { id: 1, fa: 'زعفران اصل قائنات',  de: 'Echter Safran aus Ghaenat',   catId: 5,  catFa: 'ادویه‌جات',  catDe: 'Gewürze',         price: 12.99, bFa: 'اصل',    bDe: 'Premium',        emoji: '🌸', imgBg: '#F7EDD0' },
  { id: 2, fa: 'برنج طارم ایرانی',   de: 'Tarom-Reis aus Iran',         catId: 4,  catFa: 'برنج',       catDe: 'Reis',            price: 8.49,  bFa: 'وارداتی', bDe: 'Importiert',     emoji: '🌾', imgBg: '#EDF2EE' },
  { id: 3, fa: 'پسته تازه کرمان',    de: 'Frische Pistazien Kerman',    catId: 1,  catFa: 'خشکبار',     catDe: 'Nüsse',           price: 14.99, bFa: 'تازه',   bDe: 'Frisch',         emoji: '🥜', imgBg: '#F7EDD0' },
  { id: 4, fa: 'چای لاهیجان',        de: 'Lahijan-Tee',                 catId: 6,  catFa: 'چای',        catDe: 'Tee',             price: 6.99,  bFa: 'محبوب',  bDe: 'Beliebt',        emoji: '🫖', imgBg: '#E8EEEA' },
  { id: 5, fa: 'کشمش سبز',           de: 'Grüne Rosinen',               catId: 1,  catFa: 'میوه خشک',  catDe: 'Trockenfrüchte',  price: 4.99,  bFa: 'تازه',   bDe: 'Frisch',         emoji: '🍇', imgBg: '#EDF2EE' },
  { id: 6, fa: 'ماست ایرانی',        de: 'Iranischer Joghurt',          catId: 2,  catFa: 'لبنیات',     catDe: 'Milchprodukte',   price: 3.49,  bFa: 'تازه',   bDe: 'Täglich frisch', emoji: '🥛', imgBg: '#DCE9E2' },
  { id: 7, fa: 'آجیل مخلوط ویژه',   de: 'Gemischte Nüsse Premium',     catId: 1,  catFa: 'خشکبار',     catDe: 'Nüsse',           price: 9.99,  bFa: 'ویژه',   bDe: 'Premium',        emoji: '🥜', imgBg: '#F7EDD0' },
  { id: 8, fa: 'نان سنگک تازه',      de: 'Frisches Sangak-Brot',       catId: 11, catFa: 'نانوایی',    catDe: 'Backwaren',       price: 2.99,  bFa: 'تازه',   bDe: 'Frisch',         emoji: '🫓', imgBg: '#FBF5E6' },
];

export const SERVICES: Service[] = [
  { iconName: 'Package',   fa: 'خرید حضوری',             de: 'Einkauf vor Ort',               dFa: 'فضای گرم و دلنشین برای خریدهای روزانه شما',               dDe: 'Angenehme Atmosphäre für Ihren täglichen Einkauf'        },
  { iconName: 'Leaf',      fa: 'محصولات تازه روزانه',    de: 'Täglich frische Waren',         dFa: 'هر روز محصولات تازه مستقیم از تامین‌کنندگان',             dDe: 'Täglich frische Produkte direkt von den Lieferanten'     },
  { iconName: 'Globe',     fa: 'محصولات اصیل',           de: 'Authentische Produkte',         dFa: 'محصولات اصیل ایرانی و افغانی از بهترین منابع',            dDe: 'Authentische iranische & afghanische Produkte'           },
  { iconName: 'Mail',      fa: 'سفارش ویژه',             de: 'Sonderbestellungen',            dFa: 'درخواست محصولات خاص که در فروشگاه موجود نیست',            dDe: 'Anfragen für spezielle Produkte'                         },
  { iconName: 'MapPin',    fa: 'تحویل حضوری',            de: 'Abholung vor Ort',             dFa: 'خرید راحت و سریع از فروشگاه به صورت حضوری',              dDe: 'Bequemes Einkaufen direkt im Laden'                      },
  { iconName: 'Cart',      fa: 'سفارش آنلاین (به زودی)', de: 'Online-Bestellung (demnächst)', dFa: 'به زودی امکان سفارش آنلاین فراهم می‌شود',                 dDe: 'Online-Bestellung kommt bald'                            },
];

export const BADGE_STYLE: Record<string, { bg: string; color: string }> = {
  Premium:          { bg: '#F7EDD0', color: '#A07020' },
  Importiert:       { bg: '#E8EEEA', color: '#3B5249' },
  Imported:         { bg: '#E8EEEA', color: '#3B5249' },
  Frisch:           { bg: '#DCE9E2', color: '#3A7055' },
  Fresh:            { bg: '#DCE9E2', color: '#3A7055' },
  Beliebt:          { bg: '#F5E4DC', color: '#9B3A1E' },
  Popular:          { bg: '#F5E4DC', color: '#9B3A1E' },
  'Täglich frisch': { bg: '#DCE9E2', color: '#3A7055' },
  اصل:              { bg: '#F7EDD0', color: '#A07020' },
  تازه:             { bg: '#DCE9E2', color: '#3A7055' },
  محبوب:            { bg: '#F5E4DC', color: '#9B3A1E' },
  وارداتی:          { bg: '#E8EEEA', color: '#3B5249' },
  ویژه:             { bg: '#F5E4DC', color: '#9B3A1E' },
};

export const CART_INIT: (Product & { qty: number })[] = [
  { ...PRODUCTS[0], qty: 1 },
  { ...PRODUCTS[2], qty: 2 },
  { ...PRODUCTS[6], qty: 1 },
];
