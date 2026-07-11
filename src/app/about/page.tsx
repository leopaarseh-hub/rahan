'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { T } from '@/lib/translations';
import { MAPS_URL } from '@/lib/data';
import { InfoRow } from '@/components/UI';
import { MapPinIcon, PhoneIcon, ClockIcon, ExternalLinkIcon } from '@/components/Icons';

export default function AboutPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const loc = t.location;
  return (
    <>
      <div className="dark-lux" style={{ padding:'60px 0 50px' }}>
        <div className="hero-pattern" />
        <div className="container" style={{ position:'relative' }}>
          <p style={{ color:'var(--gold)', fontSize:12, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:10 }}>Our Story</p>
          <h1 className="d-font" style={{ fontSize:'clamp(30px,5vw,56px)', fontWeight:700, color:'#fff', letterSpacing:'-0.02em' }}>{t.aboutTitle}</h1>
        </div>
      </div>
      <div className="container" style={{ padding:'60px 24px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'start' }} className="about-grid">
          <div>
            {t.aboutStory.map((para, i) => (
              <p key={i} style={{ fontSize:15, color:'var(--charcoal-m)', lineHeight:1.9, marginBottom:22 }}>{para}</p>
            ))}
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <InfoRow icon={<MapPinIcon size={20} stroke="var(--olive)" />} label={lang === 'fa' ? 'آدرس' : 'Adresse'} value={loc.address} />
            <InfoRow icon={<PhoneIcon  size={20} stroke="var(--sage)"  />} label={lang === 'fa' ? 'تلفن'  : 'Telefon'} value={loc.phone} />
            <InfoRow icon={<ClockIcon  size={20} stroke="var(--gold)"  />} label={loc.hoursLabel} value={loc.hoursVal} />
            <div style={{ marginTop:8 }}>
              <a href={MAPS_URL} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ textDecoration:'none', display:'inline-flex', gap:8, alignItems:'center' }}>
                <ExternalLinkIcon size={14} stroke="#fff" /> {loc.openMap}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
