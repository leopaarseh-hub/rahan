'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { T } from '@/lib/translations';
import { CATS, MAPS_URL } from '@/lib/data';
import { PRODUCTS } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { SectionHead, InfoRow, LiveMap } from '@/components/UI';
import { ArrowRightIcon, MapPinIcon, PhoneIcon, ClockIcon, ExternalLinkIcon, CheckCircleIcon, CrownIcon } from '@/components/Icons';

export default function HomePage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const loc = t.location;

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-pattern" />
        <div style={{ position:'absolute', top:'8%', right:'4%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(184,137,46,.16) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'12%', left:'2%', width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle, rgba(116,151,127,.14) 0%, transparent 70%)', pointerEvents:'none' }} />

        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:'clamp(24px,5vw,64px)', flexWrap:'wrap' }}>

            {/* Text */}
            <div style={{ flex:'1 1 360px', minWidth:0 }}>
              <div className="a1" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(184,137,46,.14)', border:'1px solid rgba(184,137,46,.3)', borderRadius:24, padding:'6px 16px', marginBottom:26 }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--gold)', display:'inline-block', animation:'pulseDot 2s ease infinite' }} />
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

            {/* Hero crest */}
            <div className="hero-img-wrap">
              <div style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'center', width:'100%' }}>
                <div style={{ position:'absolute', width:'96%', height:'96%', borderRadius:'50%', background:'radial-gradient(circle, rgba(212,175,55,.22) 0%, transparent 72%)', pointerEvents:'none' }} />
                <div className="hero-crest">
                  <div className="hero-crest-ring">
                    <CrownIcon size={44} stroke="var(--gold-l)" />
                  </div>
                  <div className="d-font gold-grad" style={{ fontSize:'clamp(40px,4.5vw,58px)', fontWeight:700, letterSpacing:'.32em', textIndent:'.32em', lineHeight:1.1, paddingBottom:4 }}>KIAN</div>
                  <div className="fa-font" style={{ fontSize:20, color:'rgba(255,255,255,.85)', fontWeight:500 }}>کیان مارکت</div>
                  <div className="ornament" style={{ margin:'18px 0' }}>
                    <span className="ornament-gem" />
                  </div>
                  <div style={{ fontSize:12, letterSpacing:'.28em', textIndent:'.28em', color:'rgba(212,175,55,.85)', textTransform:'uppercase', fontWeight:600 }}>Premium Markt · Köln</div>
                  <div style={{ display:'flex', gap:14, justifyContent:'center', fontSize:26, marginTop:26 }}>
                    <span>🌸</span><span>🌾</span><span>🥜</span><span>🫖</span><span>🍯</span>
                  </div>
                  <div style={{ fontSize:11, letterSpacing:'.14em', color:'rgba(255,255,255,.38)', marginTop:22 }}>LUXEMBURGER STR. 12 · 50674 KÖLN</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Categories ── */}
      <section className="section" style={{ background:'var(--cream)' }}>
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
                <div style={{ width:52, height:52, borderRadius:14, background:c.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, marginBottom:14 }}>{c.emoji}</div>
                <div style={{ fontWeight:600, fontSize:14, color:'var(--charcoal)', marginBottom:4 }}>{lang === 'fa' ? c.fa : c.de}</div>
                <div className={lang === 'fa' ? 'en-font' : 'fa-font'} style={{ fontSize:12, color:'var(--light)' }}>{lang === 'fa' ? c.de : c.fa}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="section" style={{ background:'var(--cream-mid)' }}>
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
      <section className="section" style={{ background:'var(--olive)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, opacity:.06, backgroundImage:`url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37'%3E%3Cpath d='M40 4L52 28H76L55 43L63 67L40 52L17 67L25 43L4 28H28Z'/%3E%3C/g%3E%3C/svg%3E")`, backgroundSize:'80px 80px' }} />
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
      <section className="section" style={{ background:'var(--cream)' }}>
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
