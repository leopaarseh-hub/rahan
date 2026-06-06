'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Lang } from '@/types';

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType>({ lang: 'fa', setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fa');

  useEffect(() => {
    const saved = localStorage.getItem('rahan-lang') as Lang;
    if (saved === 'fa' || saved === 'de') setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.dir  = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.body.className        = lang === 'fa' ? 'fa-font' : 'en-font';
    localStorage.setItem('rahan-lang', lang);
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
