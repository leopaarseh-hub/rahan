'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { T } from '@/lib/translations';
import { CATS, PRODUCTS, withBase, WHATSAPP_PHONE } from '@/lib/data';
import { WhatsAppIcon, PhoneIcon, MapPinIcon, ClockIcon, ArrowRightIcon } from '@/components/Icons';
import Link from 'next/link';

export default function CatalogPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const fa = lang === 'fa';
  const loc = t.location;
  const cats = CATS.filter(c => PRODUCTS.some(p => p.catId === c.id));

  return (
    <>
      <div className="dark-lux" style={{ padding:'52px 0 42px' }}>
        <div className="hero-pattern" />
        <span className="arabesque tl" /><span className="arabesque tr" />
        <div className="container" style={{ position:'relative' }}>
          <p style={{ color:'rgba(255,255,255,.45)', fontSize:13, marginBottom:6 }}>Kian Markt · کیان مارکت</p>
          <h1 className="d-font" style={{ fontSize:'clamp(30px,5vw,50px)', fontWeight:700, color:'#fff', letterSpacing:'-0.02em', marginBottom:16 }}>
            {fa ? 'کاتالوگ محصولات' : 'Produktkatalog'}
          </h1>
          <div style={{ display:'flex', gap:18, flexWrap:'wrap', fontSize:13, color:'rgba(255,255,255,.6)' }}>
            <span style={{ display:'flex', alignItems:'center', gap:7 }}><MapPinIcon size={14} stroke="var(--gold-l)" /> {loc.address}</span>
            <span style={{ display:'flex', alignItems:'center', gap:7 }} dir="ltr"><PhoneIcon size={14} stroke="var(--gold-l)" /> {loc.phone}</span>
            <span style={{ display:'flex', alignItems:'center', gap:7 }}><ClockIcon size={14} stroke="var(--gold-l)" /> {loc.hoursVal}</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding:'34px 24px 70px' }}>
        <div className="no-print" style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:30 }}>
          <a href={`https://wa.me/${WHATSAPP_PHONE}`} target="_blank" rel="noreferrer" className="btn"
            style={{ background:'linear-gradient(135deg, #1DA851 0%, #25D366 100%)', color:'#fff', borderRadius:12, padding:'12px 22px', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:9, boxShadow:'0 6px 18px rgba(37,211,102,.28)' }}>
            <WhatsAppIcon size={17} stroke="#fff" /> {fa ? 'سفارش در واتساپ' : 'Per WhatsApp bestellen'}
          </a>
          <Link href="/shop" className="btn btn-outline" style={{ textDecoration:'none', display:'inline-flex', alignItems:'center', gap:7 }}>
            {fa ? 'خرید آنلاین' : 'Online einkaufen'} <ArrowRightIcon size={14} stroke="var(--olive)" />
          </Link>
        </div>

        {/* category index */}
        <div className="no-print" style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:38 }}>
          {cats.map(c => (
            <a key={c.id} href={`#cat-${c.id}`} className="pill" style={{ textDecoration:'none' }}>
              {fa ? c.fa : c.de}
            </a>
          ))}
        </div>

        {cats.map(c => {
          const items = PRODUCTS.filter(p => p.catId === c.id).sort((a, b) => a.id - b.id);
          return (
            <section key={c.id} id={`cat-${c.id}`} style={{ marginBottom:44, scrollMarginTop:90 }}>
              <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:16, paddingBottom:12, borderBottom:'2px solid var(--gold-fade)' }}>
                <div style={{ width:48, height:48, borderRadius:12, background:'#fff', border:'1px solid var(--border-l)', overflow:'hidden', flexShrink:0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={withBase(c.img || '')} alt="" loading="lazy" style={{ width:'100%', height:'100%', objectFit:'contain', padding:4 }} />
                </div>
                <div>
                  <h2 className="d-font" style={{ fontSize:23, fontWeight:700, color:'var(--olive)', lineHeight:1.25 }}>{fa ? c.fa : c.de}</h2>
                  <p className={fa ? 'en-font' : 'fa-font'} style={{ fontSize:12.5, color:'var(--light)' }}>{fa ? c.de : c.fa}</p>
                </div>
                <span style={{ marginInlineStart:'auto', fontSize:12, color:'var(--light)' }}>{items.length}</span>
              </div>
              <div className="catalog-grid">
                {items.map(p => (
                  <div key={p.id} className="catalog-row">
                    <span style={{ fontSize:14, color:'var(--charcoal)', fontWeight:500 }}>{fa ? p.fa : p.de}</span>
                    <span className="catalog-dots" />
                    {p.price != null
                      ? <span className="d-font" style={{ fontSize:16, fontWeight:700, color:'var(--pom)', whiteSpace:'nowrap' }}>€{p.price.toFixed(2)}</span>
                      : <span style={{ fontSize:11.5, fontWeight:600, color:'var(--gold)', whiteSpace:'nowrap' }}>{t.priceOnRequest}</span>}
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        <p style={{ textAlign:'center', fontSize:12.5, color:'var(--mid)', marginTop:10 }}>
          {PRODUCTS.length} {fa ? 'محصول' : 'Produkte'} · {cats.length} {fa ? 'دسته‌بندی' : 'Kategorien'}
        </p>
      </div>
    </>
  );
}
