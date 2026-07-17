'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { T } from '@/lib/translations';
import { CATS, MAPS_URL } from '@/lib/data';
import { PRODUCTS } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { SectionHead, InfoRow, LiveMap } from '@/components/UI';
import { ArrowRightIcon, MapPinIcon, PhoneIcon, ClockIcon, ExternalLinkIcon, CheckCircleIcon } from '@/components/Icons';
import { withBase } from '@/lib/data';

export default function HomePage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const loc = t.location;

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-pattern" />
        <span className="arabesque tl" /><span className="arabesque tr" />
        <span className="arabesque bl" /><span className="arabesque br" />
        <div style={{ position:'absolute', top:'8%', right:'4%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(212,175,55,.14) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'12%', left:'2%', width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle, rgba(232,206,126,.09) 0%, transparent 70%)', pointerEvents:'none' }} />

        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:'clamp(24px,5vw,64px)', flexWrap:'wrap' }}>

            {/* Text */}
            <div style={{ flex:'1 1 360px', minWidth:0 }}>
              <div className="a1" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(184,137,46,.14)', border:'1px solid rgba(184,137,46,.3)', borderRadius:24, padding:'6px 16px', marginBottom:26 }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--pom-l)', display:'inline-block', animation:'pulseDot 2s ease infinite' }} />
                <span style={{ color:'var(--gold-l)', fontSize:13, fontWeight:500 }}>{t.hero.badge}</span>
              </div>
              <h1 className="d-font a2 gold-grad" style={{ fontSize:'clamp(44px,6vw,84px)', fontWeight:700, lineHeight:1.02, letterSpacing:'-0.02em', marginBottom:22, paddingBottom:6 }}>
                {t.hero.title}
              </h1>
              <p className="a3" style={{ fontSize:'clamp(16px,2vw,21px)', color:'rgba(255,255,255,.72)', fontStyle:'italic', fontFamily:"'Cormorant Garamond', serif", marginBottom:16 }}>
                {t.hero.sub}
              </p>
              <p className="a3" style={{ fontSize:15, color:'rgba(255,255,255,.5)', maxWidth:480, lineHeight:1.75, marginBottom:40 }}>
                {t.hero.desc}
              </p>
              <div className="a4" style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
                <Link href="/shop" className="btn btn-gold btn-lg" style={{ textDecoration:'none', display:'inline-flex', alignItems:'center', gap:8 }}>
                  {t.hero.cta1} <ArrowRightIcon size={16} stroke="#fff" />
                </Link>
                <a href={MAPS_URL} target="_blank" rel="noreferrer" className="btn btn-ghost btn-lg" style={{ textDecoration:'none' }}>
                  <MapPinIcon size={16} stroke="#fff" /> {t.hero.cta2}
                </a>
              </div>
            </div>

            {/* Hero storefront photo */}
            <div className="hero-img-wrap">
              <div style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'center', width:'100%' }}>
                <div style={{ position:'absolute', width:'104%', height:'104%', borderRadius:'50%', background:'radial-gradient(circle, rgba(212,175,55,.22) 0%, transparent 72%)', pointerEvents:'none' }} />
                <div className="hero-photo-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={withBase('/images/storefront.jpg')} alt="Kian Supermarkt — Luxemburger Str. 12, Köln" className="hero-photo" />
                  <div className="hero-photo-caption">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={withBase('/images/logo.png')} alt="Kian Markt Logo"
                      style={{ width: 40, height: 40, borderRadius: '50%', flexShrink: 0, boxShadow: '0 0 0 1.5px rgba(212,175,55,.5)' }} />
                    <div>
                      <div className="fa-font" style={{ fontSize:16, fontWeight:600, color:'#fff', lineHeight:1.3 }}>سوپر مارکت کیان</div>
                      <div style={{ fontSize:10.5, letterSpacing:'.16em', color:'rgba(212,175,55,.95)', fontWeight:600, marginTop:2 }}>LUXEMBURGER STR. 12 · 50674 KÖLN</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Categories ── */}
      <section className="section" style={{ background:'transparent' }}>
        <div className="container">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:40, flexWrap:'wrap', gap:12 }}>
            <SectionHead eyebrow={lang === 'fa' ? 'دسته‌بندی‌ها' : 'Kategorien'} title={t.secCats} center={false} />
            <Link href="/categories" className="btn btn-outline btn-sm" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:6 }}>
              {t.seeAll} <ArrowRightIcon size={14} stroke="var(--olive)" />
            </Link>
          </div>
          <div className="g-cats">
            {CATS.slice(0,6).map(c => (
              <Link href="/shop" key={c.id} className="cat-card" style={{ textDecoration:'none' }}>
                <div style={{ width:56, height:56, borderRadius:14, background:'#fff', border:'1px solid var(--border-l)', overflow:'hidden', marginBottom:14, boxShadow:'0 3px 10px rgba(34,69,58,.07)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={withBase(c.img || '')} alt={lang === 'fa' ? c.fa : c.de} style={{ width:'100%', height:'100%', objectFit:'cover', transform:'scale(1.12)' }} />
                </div>
                <div style={{ fontWeight:600, fontSize:14, color:'var(--charcoal)', marginBottom:4 }}>{lang === 'fa' ? c.fa : c.de}</div>
                <div className={lang === 'fa' ? 'en-font' : 'fa-font'} style={{ fontSize:12, color:'var(--light)' }}>{lang === 'fa' ? c.de : c.fa}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="section" style={{ background:'rgba(240,234,221,.45)', borderTop:'1px solid var(--border-l)', borderBottom:'1px solid var(--border-l)' }}>
        <div className="container">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:40, flexWrap:'wrap', gap:12 }}>
            <SectionHead eyebrow={lang === 'fa' ? 'محصولات' : 'Produkte'} title={t.secProds} center={false} />
            <Link href="/shop" className="btn btn-outline btn-sm" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:6 }}>
              {t.seeAll} <ArrowRightIcon size={14} stroke="var(--olive)" />
            </Link>
          </div>
          <div className="g-prods">
            {PRODUCTS.slice(0,8).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="section dark-lux">
        <div className="hero-pattern" />
        <div className="container" style={{ position:'relative' }}>
          <SectionHead eyebrow={t.benefits.label} title={t.benefits.title} sub={t.benefits.sub} light />
          <div className="g4">
            {t.benefits.items.map((b, i) => (
              <div key={i} style={{ background:'rgba(255,255,255,.07)', border:'1px solid rgba(255,255,255,.11)', borderRadius:18, padding:'32px 24px' }}>
                <div style={{ width:44, height:44, borderRadius:12, background:'rgba(184,137,46,.18)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:18 }}>
                  <CheckCircleIcon size={22} stroke="var(--gold-l)" />
                </div>
                <h3 style={{ color:'#fff', fontWeight:600, fontSize:15, marginBottom:10 }}>{b.title}</h3>
                <p style={{ color:'rgba(255,255,255,.5)', fontSize:13, lineHeight:1.75 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location + Live Map ── */}
      <section className="section" style={{ background:'transparent' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1.1fr', gap:48, alignItems:'start' }} className="two-col-map">
            <div>
              <p style={{ color:'var(--gold)', fontSize:12, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:10 }}>{loc.label}</p>
              <h2 className="d-font" style={{ fontSize:'clamp(26px,4vw,42px)', fontWeight:600, letterSpacing:'-0.02em', marginBottom:28, color:'var(--charcoal)' }}>{loc.title}</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:18, marginBottom:32 }}>
                <InfoRow icon={<MapPinIcon size={20} stroke="var(--olive)" />} label={lang === 'fa' ? 'آدرس' : 'Adresse'} value={loc.address} />
                <InfoRow icon={<PhoneIcon  size={20} stroke="var(--sage)"  />} label={lang === 'fa' ? 'تلفن'  : 'Telefon'} value={loc.phone} />
                <InfoRow icon={<ClockIcon  size={20} stroke="var(--gold)"  />} label={loc.hoursLabel} value={loc.hoursVal} />
              </div>
              <a href={MAPS_URL} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ textDecoration:'none', display:'inline-flex', gap:8, alignItems:'center' }}>
                <ExternalLinkIcon size={14} stroke="#fff" /> {loc.openMap}
              </a>
            </div>
            <LiveMap height={420} />
          </div>
        </div>
      </section>
    </>
  );
}
