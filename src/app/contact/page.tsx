'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { T } from '@/lib/translations';
import { MAPS_URL } from '@/lib/data';
import { InfoRow, LiveMap } from '@/components/UI';
import { MapPinIcon, PhoneIcon, ClockIcon, ExternalLinkIcon, ArrowRightIcon } from '@/components/Icons';

export default function ContactPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const loc = t.location;
  return (
    <>
      <div style={{ background:'var(--cream-dark)', borderBottom:'1px solid var(--border)', padding:'52px 0 40px' }}>
        <div className="container">
          <p style={{ color:'var(--mid)', fontSize:13, marginBottom:6 }}>Kian Markt</p>
          <h1 className="d-font" style={{ fontSize:'clamp(30px,5vw,52px)', fontWeight:700, color:'var(--charcoal)', letterSpacing:'-0.02em' }}>{t.contactTitle}</h1>
        </div>
      </div>
      <div className="container" style={{ padding:'60px 24px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48 }} className="contact-grid">
          <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
            <InfoRow icon={<MapPinIcon size={20} stroke="var(--olive)" />} label={lang === 'fa' ? 'آدرس' : 'Adresse'} value={loc.address} />
            <InfoRow icon={<PhoneIcon  size={20} stroke="var(--sage)"  />} label={lang === 'fa' ? 'شماره تماس' : 'Telefon'} value={loc.phone} />
            <InfoRow icon={<ClockIcon  size={20} stroke="var(--gold)"  />} label={loc.hoursLabel} value={loc.hoursVal} />
            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              <a href="tel:022193290358" className="btn btn-primary" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:7 }}>
                <PhoneIcon size={15} stroke="#fff" /> {t.callUs}
              </a>
              <a href={MAPS_URL} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:7 }}>
                <ExternalLinkIcon size={14} stroke="var(--olive)" /> {loc.openMap}
              </a>
            </div>
            <LiveMap height={300} />
          </div>
          <div className="card" style={{ padding:'36px 32px' }}>
            <h3 style={{ fontWeight:700, fontSize:20, color:'var(--charcoal)', marginBottom:28 }}>{t.sendMsg}</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
              {[{ label:t.yourName, type:'text', ph:t.yourName }, { label:t.yourEmail, type:'email', ph:'you@example.com' }].map(f => (
                <div key={f.label}>
                  <label style={{ display:'block', fontSize:13, fontWeight:600, color:'var(--charcoal-m)', marginBottom:7 }}>{f.label}</label>
                  <input className="input" type={f.type} placeholder={f.ph} />
                </div>
              ))}
              <div>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'var(--charcoal-m)', marginBottom:7 }}>{t.yourMsg}</label>
                <textarea className="input" rows={5} placeholder={t.yourMsg} style={{ resize:'vertical' }} />
              </div>
              <button className="btn btn-primary btn-full" style={{ padding:'13px 0', fontSize:15, marginTop:4, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                <ArrowRightIcon size={16} stroke="#fff" /> {t.sendMsg}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
