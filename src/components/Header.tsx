'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { T } from '@/lib/translations';
import { CartIcon, MenuIcon, XIcon, ArrowRightIcon, ArrowLeftIcon } from './Icons';
import { Logo } from './UI';

export default function Header() {
  const { lang, setLang } = useLanguage();
  const { cartCount } = useCart();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const t = T[lang];

  const navItems = [
    { href: '/',           label: t.nav.home },
    { href: '/shop',       label: t.nav.shop },
    { href: '/categories', label: t.nav.cats },
    { href: '/services',   label: t.nav.services },
    { href: '/about',      label: t.nav.about },
    { href: '/contact',    label: t.nav.contact },
  ];

  const go = (href: string) => { router.push(href); setOpen(false); };

  return (
    <>
      <header style={{ position: 'sticky', top: 0, zIndex: 200, background: 'rgba(250,248,242,0.95)', backdropFilter: 'blur(14px)', borderBottom: '1px solid var(--border-l)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 66 }}>

          <Logo />

          {/* Desktop nav */}
          <nav className="desk" style={{ gap: 26, alignItems: 'center' }}>
            {navItems.map(n => (
              <Link key={n.href} href={n.href}
                className={`nav-link ${pathname === n.href ? 'active' : ''}`}
                style={{ textDecoration: 'none' }}>
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="desk" style={{ gap: 10, alignItems: 'center' }}>
            <button
              onClick={() => setLang(lang === 'fa' ? 'de' : 'fa')}
              style={{ background: 'none', border: 'none', color: 'var(--olive)', fontSize: 13, fontWeight: 700, cursor: 'pointer', letterSpacing: '.1em', padding: '6px 8px', borderRadius: 6, transition: 'background .18s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--olive-fade)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}
            >{t.langLabel}</button>

            <Link href="/cart" style={{ position: 'relative', background: 'var(--olive)', border: 'none', borderRadius: 10, width: 42, height: 42, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
              <CartIcon size={20} stroke="#fff" />
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: -6, right: -6, background: 'var(--terra)', color: '#fff', borderRadius: '50%', width: 18, height: 18, fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile: cart + lang + hamburger */}
          <div className="mob" style={{ gap: 8, alignItems: 'center' }}>
            <Link href="/cart" style={{ position: 'relative', background: 'var(--olive)', border: 'none', borderRadius: 9, width: 40, height: 40, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
              <CartIcon size={18} stroke="#fff" />
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: -5, right: -5, background: 'var(--terra)', color: '#fff', borderRadius: '50%', width: 17, height: 17, fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {cartCount}
                </span>
              )}
            </Link>
            <div style={{ width: 1, height: 20, background: 'var(--border)', flexShrink: 0 }} />
            <button
              onClick={() => setLang(lang === 'fa' ? 'de' : 'fa')}
              style={{ background: 'none', border: 'none', color: 'var(--charcoal-m)', fontSize: 13, fontWeight: 700, letterSpacing: '.1em', cursor: 'pointer', padding: '4px 2px', fontFamily: 'inherit' }}
            >{t.langLabel}</button>
            <div style={{ width: 1, height: 20, background: 'var(--border)', flexShrink: 0 }} />
            <button
              onClick={() => setOpen(true)}
              style={{ background: 'transparent', border: 'none', borderRadius: 9, width: 40, height: 40, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <MenuIcon size={22} stroke="var(--charcoal-m)" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div className={`mobile-menu-overlay ${t.fontClass}`} dir={t.dir}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', borderBottom: '1px solid var(--border-l)', flexShrink: 0 }}>
            <Logo onClick={() => setOpen(false)} />
            <button onClick={() => setOpen(false)} style={{ background: 'var(--cream-dark)', border: 'none', borderRadius: 9, width: 40, height: 40, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <XIcon size={20} stroke="var(--charcoal-m)" />
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
            {navItems.map(n => (
              <button key={n.href} onClick={() => go(n.href)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: pathname === n.href ? 'var(--olive-fade)' : 'transparent', border: 'none', borderRadius: 12, padding: '15px 18px', textAlign: lang === 'fa' ? 'right' : 'left', fontSize: 16, color: pathname === n.href ? 'var(--olive)' : 'var(--charcoal-m)', cursor: 'pointer', fontFamily: 'inherit', fontWeight: pathname === n.href ? 600 : 400, marginBottom: 4, transition: 'background .15s' }}>
                <span>{n.label}</span>
                {lang === 'fa' ? <ArrowLeftIcon size={15} stroke={pathname === n.href ? 'var(--olive)' : 'var(--light)'} /> : <ArrowRightIcon size={15} stroke={pathname === n.href ? 'var(--olive)' : 'var(--light)'} />}
              </button>
            ))}
          </div>

          <div style={{ padding: '20px 16px', borderTop: '1px solid var(--border-l)', flexShrink: 0 }}>
            <button className="btn btn-primary btn-full"
              onClick={() => go('/cart')}
              style={{ padding: '13px 0', fontSize: 15, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <CartIcon size={16} stroke="#fff" /> {t.cartTitle}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
