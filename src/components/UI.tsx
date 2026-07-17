'use client';
import { BADGE_STYLE, withBase } from '@/lib/data';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';

/* ── Badge ───────────────────────────────────────────────────── */
export function Badge({ label }: { label: string }) {
  const s = BADGE_STYLE[label] || { bg: '#E8EEEA', color: '#3B5249' };
  return (
    <span className="badge" style={{ background: s.bg, color: s.color }}>
      {label}
    </span>
  );
}

/* ── SectionHead ─────────────────────────────────────────────── */
interface SectionHeadProps {
  eyebrow?: string;
  title: string;
  sub?: string;
  light?: boolean;
  center?: boolean;
}
export function SectionHead({ eyebrow, title, sub, light, center = true }: SectionHeadProps) {
  return (
    <div style={{ textAlign: center ? 'center' : 'start', marginBottom: 48 }}>
      {eyebrow && (
        <p style={{ color: light ? 'rgba(255,255,255,.5)' : 'var(--gold)', fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 10 }}>
          {eyebrow}
        </p>
      )}
      <h2 className="d-font" style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.2, color: light ? '#fff' : 'var(--charcoal)', marginBottom: sub ? 10 : 0 }}>
        {title}
      </h2>
      {sub && <p style={{ fontSize: 15, color: light ? 'rgba(255,255,255,.55)' : 'var(--mid)', lineHeight: 1.6 }}>{sub}</p>}
      {center && (
        <div className="ornament" style={{ marginTop: 16 }}>
          <span className="ornament-gem" />
        </div>
      )}
    </div>
  );
}

/* ── InfoRow ─────────────────────────────────────────────────── */
interface InfoRowProps {
  icon: React.ReactNode;
  label?: string;
  value: string;
  light?: boolean;
}
export function InfoRow({ icon, label, value, light }: InfoRowProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
      <div className="icon-box" style={{ background: light ? 'rgba(255,255,255,.1)' : 'var(--olive-fade)', flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ paddingTop: 2 }}>
        {label && (
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: light ? 'rgba(255,255,255,.45)' : 'var(--light)', marginBottom: 3 }}>
            {label}
          </div>
        )}
        <div style={{ fontSize: 14, fontWeight: 500, color: light ? 'rgba(255,255,255,.85)' : 'var(--charcoal-m)', lineHeight: 1.5 }}>
          {value}
        </div>
      </div>
    </div>
  );
}

/* ── Logo ────────────────────────────────────────────────────── */
export function Logo({ onClick }: { onClick?: () => void }) {
  const router = useRouter();
  const handleClick = () => {
    if (onClick) onClick();
    else router.push('/');
  };
  return (
    <div onClick={handleClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, userSelect: 'none' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={withBase('/images/logo.png')} alt="Kian Markt Logo"
        style={{ width: 42, height: 42, borderRadius: '50%', boxShadow: '0 0 0 1.5px rgba(212,175,55,.55), 0 3px 10px rgba(0,0,0,.25)' }} />
      <div>
        <div className="d-font" style={{ fontSize: 17, fontWeight: 700, color: 'var(--olive)', lineHeight: 1.1, letterSpacing: '.02em' }}>Kian Markt</div>
        <div className="fa-font" style={{ fontSize: 11, color: 'var(--gold)', lineHeight: 1 }}>کیان مارکت</div>
      </div>
    </div>
  );
}

/* ── LiveMap ─────────────────────────────────────────────────── */
import { MAP_EMBED, MAPS_URL } from '@/lib/data';
import { ExternalLinkIcon, MapPinIcon } from './Icons';
import { T } from '@/lib/translations';

export function LiveMap({ height = 420 }: { height?: number }) {
  const { lang } = useLanguage();
  const loc = T[lang].location;
  return (
    <div className="map-wrap" style={{ height }}>
      <iframe
        src={MAP_EMBED}
        width="100%"
        height={height}
        style={{ border: 0, display: 'block' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Kian Markt — Luxemburger Str. 12, Köln"
      />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(220,214,206,.8)', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--olive-fade)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <MapPinIcon size={18} stroke="var(--olive)" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.2 }}>Kian Markt</div>
            <div style={{ fontSize: 12, color: 'var(--mid)', marginTop: 2 }}>Luxemburger Str. 12, 50674 Köln</div>
          </div>
        </div>
        <a href={MAPS_URL} target="_blank" rel="noreferrer"
          style={{ background: 'var(--olive)', color: '#fff', borderRadius: 9, padding: '9px 16px', fontSize: 12, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', flexShrink: 0 }}>
          <ExternalLinkIcon size={12} stroke="#fff" />
          {loc.openMap}
        </a>
      </div>
    </div>
  );
}
