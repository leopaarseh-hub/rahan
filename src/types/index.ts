export type Lang = 'fa' | 'de';

export interface Product {
  id: number;
  fa: string;
  de: string;
  catId: number;
  catFa: string;
  catDe: string;
  price: number;
  bFa: string;
  bDe: string;
  emoji: string;
  imgBg: string;
  img?: string;
}

export interface Category {
  id: number;
  fa: string;
  de: string;
  emoji: string;
  color: string;
  bg: string;
  img?: string;
}

export interface CartItem extends Product {
  qty: number;
}

export interface Service {
  iconName: string;
  fa: string;
  de: string;
  dFa: string;
  dDe: string;
}

export interface BenefitItem {
  title: string;
  desc: string;
}

export interface LocationT {
  label: string;
  title: string;
  address: string;
  phone: string;
  hoursLabel: string;
  hoursVal: string;
  openMap: string;
  getDir: string;
}

export interface Translation {
  dir: 'rtl' | 'ltr';
  fontClass: string;
  nav: { home: string; shop: string; cats: string; services: string; about: string; contact: string };
  login: string;
  loginFull: string;
  langLabel: string;
  cartTitle: string;
  brandName: string;
  tagline: string;
  hero: { badge: string; title: string; sub: string; desc: string; cta1: string; cta2: string };
  secCats: string;
  secProds: string;
  seeAll: string;
  benefits: { label: string; title: string; sub: string; items: BenefitItem[] };
  location: LocationT;
  footerDesc: string;
  copyright: string;
  shopTitle: string;
  search: string;
  sortBy: string;
  sortOpts: string[];
  addToCart: string;
  all: string;
  noResults: string;
  cartEmpty: string;
  continueShopping: string;
  checkout: string;
  subtotal: string;
  delivery: string;
  total: string;
  cartNote: string;
  remove: string;
  email: string;
  password: string;
  loginBtn: string;
  noAccount: string;
  register: string;
  loginNote: string;
  aboutTitle: string;
  aboutStory: string[];
  contactTitle: string;
  sendMsg: string;
  yourName: string;
  yourEmail: string;
  yourMsg: string;
  callUs: string;
  servicesTitle: string;
  catsTitle: string;
  viewProducts: string;
  orderSummary: string;
  freeShipping: string;
}
