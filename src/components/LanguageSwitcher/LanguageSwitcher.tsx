import { memo } from 'react';
import { useLang } from '../../context/LanguageContext';
import type { Lang } from '../../i18n/translations';
import styles from './LanguageSwitcher.module.css';

const LANGS: { code: Lang; flag: string; label: string }[] = [
  { code: 'fr', flag: '🇫🇷', label: 'FR' },
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'es', flag: '🇪🇸', label: 'ES' },
];

export const LanguageSwitcher = memo(function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div className={styles.switcher} role="group" aria-label="Language">
      {LANGS.map(({ code, flag, label }) => (
        <button
          key={code}
          className={`${styles.btn} ${lang === code ? styles.active : ''}`}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          title={code === 'fr' ? 'Français' : code === 'en' ? 'English' : 'Español'}
        >
          <span className={styles.flag}>{flag}</span>
          <span className={styles.label}>{label}</span>
        </button>
      ))}
    </div>
  );
});
