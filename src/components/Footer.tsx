'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { T } from '@/lib/translations';
import { MAPS_URL } from '@/lib/data';
import { CrownIcon, PhoneIcon, MapPinIcon, ExternalLinkIcon } from './Icons';

export default function Footer() {
  const { lang } = useLanguage();
  const t = T[lang];
  const loc = t.location;

  const pages = [
    { href: '/',           label: t.nav.home },
    { href: '/shop',       label: t.nav.shop },
    { href: '/categories', label: t.nav.cats },
    { href: '/services',   label: t.nav.services },
    { href: '/about',      label: t.nav.about },
    { href: '/contact',    label: t.nav.contact },
  ];

  const linkStyle = { color: 'rgba(200,210,206,.6)', fontSize: 13, textDecoration: 'none', cursor: 'pointer', transition: 'color .2s', display: 'block', marginBottom: 12 };

  return (
    <footer className="footer">
      <div className="container" style={{ padding: '56px 24px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}
          className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{ width: 38, height: 38, background: 'linear-gradient(135deg, rgba(184,137,46,.3), rgba(212,175,55,.16))', border: '1px solid rgba(212,175,55,.35)', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CrownIcon size={20} stroke="var(--gold-l)" />
              </div>
              <div>
                <div className="d-font" style={{ fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: '.02em' }}>Kian Markt</div>
                <div className="fa-font" style={{ fontSize: 11, color: 'rgba(212,175,55,.55)' }}>کیان مارکت</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(200,210,206,.55)', lineHeight: 1.8, marginBottom: 22, maxWidth: 280 }}>{t.footerDesc}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'rgba(200,210,206,.65)' }}>
                <PhoneIcon size={14} stroke="var(--sage)" /> {loc.phone}
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'rgba(200,210,206,.65)' }}>
                <MapPinIcon size={14} stroke="var(--sage)" style={{ flexShrink: 0, marginTop: 2 }} /> {loc.address}
              </div>
            </div>
          </div>

          {/* Pages */}
          <div>
            <div style={{ fontWeight: 700, fontSize: 12, color: 'rgba(255,255,255,.5)', marginBottom: 18, letterSpacing: '.08em', textTransform: 'uppercase' }}>
              {lang === 'fa' ? 'صفحات' : 'Seiten'}
            </div>
            {pages.slice(0, 4).map(p => (
              <Link key={p.href} href={p.href} style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,210,206,.6)')}>
                {p.label}
              </Link>
            ))}
          </div>

          {/* Info */}
          <div>
            <div style={{ fontWeight: 700, fontSize: 12, color: 'rgba(255,255,255,.5)', marginBottom: 18, letterSpacing: '.08em', textTransform: 'uppercase' }}>Info</div>
            {pages.slice(4).map(p => (
              <Link key={p.href} href={p.href} style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,210,206,.6)')}>
                {p.label}
              </Link>
            ))}
          </div>

          {/* Hours */}
          <div>
            <div style={{ fontWeight: 700, fontSize: 12, color: 'rgba(255,255,255,.5)', marginBottom: 18, letterSpacing: '.08em', textTransform: 'uppercase' }}>
              {loc.hoursLabel}
            </div>
            <div style={{ fontSize: 13, color: 'rgba(200,210,206,.55)', lineHeight: 1.9, marginBottom: 4 }}>{loc.hoursVal}</div>
            <div style={{ fontSize: 13, color: 'rgba(200,210,206,.55)', lineHeight: 1.9 }}>
              {lang === 'fa' ? 'یکشنبه: تعطیل' : 'So: Geschlossen'}
            </div>
            <a href={MAPS_URL} target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginTop: 20, padding: '9px 16px', background: 'var(--gold)', color: '#fff', borderRadius: 9, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
              <ExternalLinkIcon size={12} stroke="#fff" />
              {lang === 'fa' ? 'گوگل مپ' : 'Google Maps'}
            </a>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 12, color: 'rgba(200,210,206,.35)' }}>{t.copyright}</span>
          <span style={{ fontSize: 12, color: 'rgba(200,210,206,.25)' }}>Luxemburger Str. 12 · 50674 Köln</span>
        </div>
        <div className="en-font" dir="ltr" style={{ borderTop: '1px solid rgba(255,255,255,.06)', padding: '14px 0 18px', textAlign: 'center', fontSize: 12, letterSpacing: '.04em', color: 'rgba(200,210,206,.35)' }}>
          Design &amp; Development by{' '}
          <a href="https://parnil.co" target="_blank" rel="noreferrer"
            style={{ color: 'var(--gold-l)', textDecoration: 'none', fontWeight: 600 }}
            onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}>
            Parnil.co
          </a>
        </div>
      </div>
    </footer>
  );
}
