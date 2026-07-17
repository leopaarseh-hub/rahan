'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { T } from '@/lib/translations';
import { withBase } from '@/lib/data';
import { MailIcon, LockIcon, UserIcon, ArrowLeftIcon } from '@/components/Icons';

export default function LoginPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  return (
    <div style={{ minHeight:'82vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 24px', background:'var(--cream-mid)' }}>
      <div style={{ width:'100%', maxWidth:430 }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={withBase('/images/logo.png')} alt="Kian Markt Logo"
            style={{ width:72, height:72, borderRadius:'50%', margin:'0 auto 16px', display:'block', boxShadow:'0 0 0 2px rgba(212,175,55,.45), 0 8px 22px rgba(0,0,0,.18)' }} />
          <div className="d-font" style={{ fontSize:26, fontWeight:700, color:'var(--olive)', marginBottom:4 }}>Kian Markt</div>
          <div className="fa-font" style={{ fontSize:13, color:'var(--mid)' }}>کیان مارکت</div>
        </div>
        <div className="card" style={{ padding:'38px 32px' }}>
          <h2 style={{ fontWeight:700, fontSize:22, color:'var(--charcoal)', marginBottom:30, textAlign:'center' }}>{t.loginFull}</h2>
          <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
            <div>
              <label style={{ display:'flex', alignItems:'center', gap:7, fontSize:13, fontWeight:600, color:'var(--charcoal-m)', marginBottom:7 }}>
                <MailIcon size={14} stroke="var(--sage)" /> {t.email}
              </label>
              <input className="input" type="email" placeholder="you@example.com" />
            </div>
            <div>
              <label style={{ display:'flex', alignItems:'center', gap:7, fontSize:13, fontWeight:600, color:'var(--charcoal-m)', marginBottom:7 }}>
                <LockIcon size={14} stroke="var(--sage)" /> {t.password}
              </label>
              <input className="input" type="password" placeholder="••••••••" />
            </div>
            <button className="btn btn-primary btn-full" style={{ padding:'14px 0', fontSize:15, marginTop:4, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              <UserIcon size={16} stroke="#fff" /> {t.loginBtn}
            </button>
          </div>
          <div style={{ textAlign:'center', marginTop:20, fontSize:13, color:'var(--mid)' }}>
            {t.noAccount} <span style={{ color:'var(--olive)', fontWeight:600, cursor:'pointer' }}>{t.register}</span>
          </div>
          <div className="alert" style={{ marginTop:20, display:'flex', alignItems:'flex-start', gap:8 }}>
            <LockIcon size={14} stroke="var(--gold)" style={{ flexShrink:0, marginTop:1 }} />
            <span>{t.loginNote}</span>
          </div>
        </div>
        <div style={{ textAlign:'center', marginTop:20 }}>
          <Link href="/" style={{ background:'none', border:'none', color:'var(--mid)', fontSize:13, cursor:'pointer', fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:6, textDecoration:'none' }}>
            <ArrowLeftIcon size={13} stroke="var(--mid)" />
            {lang === 'fa' ? 'بازگشت به خانه' : 'Zurück zur Startseite'}
          </Link>
        </div>
      </div>
    </div>
  );
}
