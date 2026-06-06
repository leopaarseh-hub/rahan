'use client';
import { ReactNode } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { CartProvider } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from './Header';
import Footer from './Footer';
import { usePathname } from 'next/navigation';

function Shell({ children }: { children: ReactNode }) {
  const { lang } = useLanguage();
  const pathname = usePathname();
  const isLogin = pathname === '/login';

  return (
    <div dir={lang === 'fa' ? 'rtl' : 'ltr'} className={lang === 'fa' ? 'fa-font' : 'en-font'}
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      {!isLogin && <Footer />}
    </div>
  );
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <CartProvider>
        <Shell>{children}</Shell>
      </CartProvider>
    </LanguageProvider>
  );
}
