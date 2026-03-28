import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { translations, LOCALES, type Lang, type Translations } from '../i18n/translations';

function detectLang(): Lang {
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith('fr')) return 'fr';
  if (lang.startsWith('es')) return 'es';
  return 'en';
}

interface LanguageContextValue {
  lang: Lang;
  locale: string;
  t: Translations;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(detectLang);

  // Keep html[lang] in sync for accessibility & SEO
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value: LanguageContextValue = {
    lang,
    locale: LOCALES[lang],
    t: translations[lang],
    setLang,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within <LanguageProvider>');
  return ctx;
}
