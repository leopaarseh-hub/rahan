'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { T } from '@/lib/translations';
import { SERVICES } from '@/lib/data';
import { IconByName } from '@/components/Icons';

export default function ServicesPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  return (
    <>
      <div style={{ background:'var(--cream-dark)', borderBottom:'1px solid var(--border)', padding:'52px 0 40px' }}>
        <div className="container">
          <p style={{ color:'var(--mid)', fontSize:13, marginBottom:6 }}>Kian Markt</p>
          <h1 className="d-font" style={{ fontSize:'clamp(30px,5vw,52px)', fontWeight:700, color:'var(--charcoal)', letterSpacing:'-0.02em' }}>{t.servicesTitle}</h1>
        </div>
      </div>
      <div className="container" style={{ padding:'60px 24px' }}>
        <div className="g3" style={{ gap:24 }}>
          {SERVICES.map((s, i) => {
            const Ic = IconByName[s.iconName];
            return (
              <div key={i} className="svc-card">
                <div style={{ width:56, height:56, borderRadius:16, background:'var(--olive-fade)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:22 }}>
                  {Ic && <Ic size={28} stroke="var(--olive)" />}
                </div>
                <h3 style={{ fontWeight:700, fontSize:17, color:'var(--charcoal)', marginBottom:10 }}>{lang === 'fa' ? s.fa : s.de}</h3>
                <p style={{ fontSize:14, color:'var(--mid)', lineHeight:1.75 }}>{lang === 'fa' ? s.dFa : s.dDe}</p>
                {i === 5 && <span className="badge" style={{ marginTop:16, background:'var(--gold-fade)', color:'var(--gold)', display:'inline-block' }}>{lang === 'fa' ? 'به زودی' : 'Demnächst'}</span>}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
