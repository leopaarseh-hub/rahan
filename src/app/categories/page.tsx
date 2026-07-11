'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { T } from '@/lib/translations';
import { CATS, withBase } from '@/lib/data';
import { ArrowRightIcon } from '@/components/Icons';

export default function CategoriesPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  return (
    <>
      <div className="dark-lux" style={{ padding:'52px 0 40px' }}>
        <div className="hero-pattern" />
        <div className="container" style={{ position:'relative' }}>
          <p style={{ color:'rgba(255,255,255,.45)', fontSize:13, marginBottom:6 }}>Kian Markt</p>
          <h1 className="d-font" style={{ fontSize:'clamp(30px,5vw,52px)', fontWeight:700, color:'#fff', letterSpacing:'-0.02em' }}>{t.catsTitle}</h1>
        </div>
      </div>
      <div className="container" style={{ padding:'48px 24px' }}>
        <div className="g-full-cats">
          {CATS.map(c => (
            <Link href="/shop" key={c.id} className="cat-card" style={{ textDecoration:'none', display:'block' }}>
              <div style={{ width:'100%', height:120, borderRadius:14, background:'#fff', border:'1px solid var(--border-l)', overflow:'hidden', marginBottom:16 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={withBase(c.img || '')} alt={lang === 'fa' ? c.fa : c.de} style={{ width:'100%', height:'100%', objectFit:'contain', padding:8 }} />
              </div>
              <h3 style={{ fontWeight:700, fontSize:15, color:'var(--charcoal)', marginBottom:4 }}>{lang === 'fa' ? c.fa : c.de}</h3>
              <p style={{ fontSize:12, color:'var(--light)', marginBottom:18 }}>{lang === 'fa' ? c.de : c.fa}</p>
              <div className="btn btn-outline btn-sm" style={{ width:'100%', justifyContent:'center', gap:6 }}>
                {t.viewProducts} <ArrowRightIcon size={13} stroke="var(--olive)" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
