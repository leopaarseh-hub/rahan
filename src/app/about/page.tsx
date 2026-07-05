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
      <div style={{ background:'var(--charcoal)', padding:'60px 0 50px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, opacity:.04, backgroundImage:`url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37'%3E%3Cpath d='M40 4L52 28H76L55 43L63 67L40 52L17 67L25 43L4 28H28Z'/%3E%3C/g%3E%3C/svg%3E")`, backgroundSize:'80px 80px' }} />
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
