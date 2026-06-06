'use client';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { T } from '@/lib/translations';
import { CATS, PRODUCTS } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { SearchIcon } from '@/components/Icons';

export default function ShopPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState(0);
  const filtered = PRODUCTS.filter(p => {
    const name = (lang === 'fa' ? p.fa : p.de).toLowerCase();
    return name.includes(search.toLowerCase()) && (activeCat === 0 || p.catId === activeCat);
  });
  return (
    <>
      <div style={{ background:'var(--olive)', padding:'52px 0 40px' }}>
        <div className="container">
          <p style={{ color:'rgba(255,255,255,.45)', fontSize:13, marginBottom:6 }}>Rahan Markt</p>
          <h1 className="d-font" style={{ fontSize:'clamp(30px,5vw,52px)', fontWeight:700, color:'#fff', letterSpacing:'-0.02em' }}>{t.shopTitle}</h1>
        </div>
      </div>
      <div className="container" style={{ padding:'40px 24px' }}>
        <div style={{ display:'flex', gap:12, marginBottom:24, flexWrap:'wrap', alignItems:'center' }}>
          <div style={{ position:'relative', flex:'1 1 260px' }}>
            <span style={{ position:'absolute', top:'50%', transform:'translateY(-50%)', left: lang === 'fa' ? 'auto' : 12, right: lang === 'fa' ? 12 : 'auto', color:'var(--light)' }}>
              <SearchIcon size={15} stroke="var(--light)" />
            </span>
            <input className="input" placeholder={t.search}
              style={{ paddingLeft: lang === 'fa' ? 16 : 38, paddingRight: lang === 'fa' ? 38 : 16 }}
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="input" style={{ maxWidth:170 }}>
            {t.sortOpts.map((o, i) => <option key={i}>{o}</option>)}
          </select>
        </div>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:36 }}>
          <button className={`pill ${activeCat === 0 ? 'active' : ''}`} onClick={() => setActiveCat(0)}>{t.all}</button>
          {CATS.slice(0,8).map(c => (
            <button key={c.id} className={`pill ${activeCat === c.id ? 'active' : ''}`} onClick={() => setActiveCat(c.id)}>
              {lang === 'fa' ? c.fa : c.de}
            </button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:'80px 0', color:'var(--mid)' }}>
            <SearchIcon size={40} stroke="var(--border)" />
            <p style={{ fontSize:16, marginTop:16 }}>{t.noResults}</p>
          </div>
        ) : (
          <div className="g-prods">{filtered.map(p => <ProductCard key={p.id} product={p} />)}</div>
        )}
      </div>
    </>
  );
}
