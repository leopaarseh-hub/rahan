'use client';
import { Product } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { T } from '@/lib/translations';
import { Badge } from './UI';
import { PlusIcon, CrownIcon } from './Icons';
import { withBase } from '@/lib/data';

export default function ProductCard({ product: p }: { product: Product }) {
  const { lang } = useLanguage();
  const { addToCart } = useCart();
  const t = T[lang];
  const badge = lang === 'fa' ? p.bFa : p.bDe;

  return (
    <div className="prod-card">
      <div style={{ height: 175, background: p.imgBg, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        {p.img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={withBase(p.img)} alt={lang === 'fa' ? p.fa : p.de} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 10 }} />
        ) : (
          <CrownIcon size={44} stroke="var(--gold)" />
        )}
        <div style={{ position: 'absolute', top: 12, left: lang === 'fa' ? 'auto' : 12, right: lang === 'fa' ? 12 : 'auto' }}>
          <Badge label={badge} />
        </div>
      </div>
      <div style={{ padding: '16px 18px 20px' }}>
        <div style={{ fontSize: 11, color: 'var(--light)', marginBottom: 5, fontWeight: 500 }}>
          {lang === 'fa' ? p.catFa : p.catDe}
        </div>
        <h3 style={{ fontWeight: 600, fontSize: 15, color: 'var(--charcoal)', marginBottom: 14, lineHeight: 1.35 }}>
          {lang === 'fa' ? p.fa : p.de}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
          <span className="d-font" style={{ fontSize: 22, fontWeight: 700, color: 'var(--olive)', letterSpacing: '-0.02em' }}>
            €{p.price.toFixed(2)}
          </span>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => addToCart(p)}
            style={{ display: 'flex', alignItems: 'center', gap: 5 }}
          >
            <PlusIcon size={13} stroke="#fff" /> {t.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
}
