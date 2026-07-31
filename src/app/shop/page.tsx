'use client';
import { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { T } from '@/lib/translations';
import { CATS, PRODUCTS } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { SearchIcon } from '@/components/Icons';

const PAGE = 24;

export default function ShopPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState(0);
  const [sort, setSort] = useState(0);
  const [visible, setVisible] = useState(PAGE);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = PRODUCTS.filter(p => {
      const inCat = activeCat === 0 || p.catId === activeCat;
      if (!inCat) return false;
      if (!q) return true;
      return `${p.fa} ${p.de} ${p.catFa} ${p.catDe}`.toLowerCase().includes(q);
    });
    // 0: newest (catalog order) · 1: cheapest · 2: most expensive · 3: popular (priced first)
    const priced = (p: { price?: number }) => (p.price == null ? Infinity : p.price);
    if (sort === 1) return [...list].sort((a, b) => priced(a) - priced(b));
    if (sort === 2) return [...list].sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    if (sort === 3) return [...list].sort((a, b) => (a.price == null ? 1 : 0) - (b.price == null ? 1 : 0));
    return list;
  }, [search, activeCat, sort]);

  useEffect(() => { setVisible(PAGE); }, [search, activeCat, sort]);

  const shown = filtered.slice(0, visible);
  const cats = CATS.filter(c => PRODUCTS.some(p => p.catId === c.id));

  return (
    <>
      <div className="dark-lux" style={{ padding:'52px 0 40px' }}>
        <div className="hero-pattern" />
        <div className="container" style={{ position:'relative' }}>
          <p style={{ color:'rgba(255,255,255,.45)', fontSize:13, marginBottom:6 }}>Kian Markt</p>
          <h1 className="d-font" style={{ fontSize:'clamp(30px,5vw,52px)', fontWeight:700, color:'#fff', letterSpacing:'-0.02em' }}>{t.shopTitle}</h1>
        </div>
      </div>
      <div className="container" style={{ padding:'40px 24px 70px' }}>
        <div style={{ display:'flex', gap:12, marginBottom:24, flexWrap:'wrap', alignItems:'center' }}>
          <div style={{ position:'relative', flex:'1 1 260px' }}>
            <span style={{ position:'absolute', top:'50%', transform:'translateY(-50%)', left: lang === 'fa' ? 'auto' : 12, right: lang === 'fa' ? 12 : 'auto', color:'var(--light)' }}>
              <SearchIcon size={15} stroke="var(--light)" />
            </span>
            <input className="input" placeholder={t.search}
              style={{ paddingLeft: lang === 'fa' ? 16 : 38, paddingRight: lang === 'fa' ? 38 : 16 }}
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="input" style={{ maxWidth:180 }} value={sort} onChange={e => setSort(Number(e.target.value))}>
            {t.sortOpts.map((o, i) => <option key={i} value={i}>{o}</option>)}
          </select>
        </div>

        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:18 }}>
          <button className={`pill ${activeCat === 0 ? 'active' : ''}`} onClick={() => setActiveCat(0)}>{t.all}</button>
          {cats.map(c => (
            <button key={c.id} className={`pill ${activeCat === c.id ? 'active' : ''}`} onClick={() => setActiveCat(c.id)}>
              {lang === 'fa' ? c.fa : c.de}
            </button>
          ))}
        </div>

        <p style={{ fontSize:12.5, color:'var(--light)', marginBottom:26 }}>
          {t.showingCount.replace('{n}', String(shown.length)).replace('{total}', String(filtered.length))}
        </p>

        {filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:'80px 0', color:'var(--mid)' }}>
            <SearchIcon size={40} stroke="var(--border)" />
            <p style={{ fontSize:16, marginTop:16 }}>{t.noResults}</p>
          </div>
        ) : (
          <>
            <div className="g-prods">{shown.map(p => <ProductCard key={p.id} product={p} />)}</div>
            {visible < filtered.length && (
              <div style={{ textAlign:'center', marginTop:36 }}>
                <button className="btn btn-outline btn-lg" onClick={() => setVisible(v => v + PAGE)}>
                  {t.loadMore}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
