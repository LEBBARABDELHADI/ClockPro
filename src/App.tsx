import { useState } from 'react';
import type { AppTab } from './types/app.types';
import { LanguageProvider } from './context/LanguageContext';
import { useLang } from './context/LanguageContext';
import { Navigation } from './components/Navigation/Navigation';
import { LanguageSwitcher } from './components/LanguageSwitcher/LanguageSwitcher';
import { Clock } from './components/Clock/Clock';
import { Stopwatch } from './components/Stopwatch/Stopwatch';
import { AdBanner } from './components/AdBanner/AdBanner';
import styles from './App.module.css';

function AppInner() {
  const [tab, setTab] = useState<AppTab>('clock');
  const { t } = useLang();

  return (
    <div className={styles.app}>
      <AdBanner slot="top" />

      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>⏱</span>
          <span className={styles.logoText}>ClockPro</span>
        </div>
        <Navigation active={tab} onChange={setTab} />
        <LanguageSwitcher />
      </header>

      <div className={styles.layout}>
        <main className={styles.main}>
          {tab === 'clock' ? <Clock /> : <Stopwatch />}
        </main>
        <aside className={styles.sidebar}>
          <AdBanner slot="sidebar" />
        </aside>
      </div>

      <AdBanner slot="bottom" />

      <footer className={styles.footer}>
        <span>© 2026 ClockPro</span>
        <span className={styles.footerSep}>·</span>
        <span>{t.footer}</span>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}
