import { memo } from 'react';
import type { AppTab } from '../../types/app.types';
import { useLang } from '../../context/LanguageContext';
import styles from './Navigation.module.css';

interface NavigationProps {
  active: AppTab;
  onChange: (tab: AppTab) => void;
}

export const Navigation = memo(function Navigation({ active, onChange }: NavigationProps) {
  const { t } = useLang();

  return (
    <nav className={styles.nav} aria-label="Navigation principale">
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${active === 'clock' ? styles.active : ''}`}
          onClick={() => onChange('clock')}
          aria-current={active === 'clock' ? 'page' : undefined}
        >
          <span className={styles.icon}>⏰</span>
          <span>{t.nav.clock}</span>
        </button>
        <button
          className={`${styles.tab} ${active === 'stopwatch' ? styles.active : ''}`}
          onClick={() => onChange('stopwatch')}
          aria-current={active === 'stopwatch' ? 'page' : undefined}
        >
          <span className={styles.icon}>⏱</span>
          <span>{t.nav.stopwatch}</span>
        </button>
      </div>
    </nav>
  );
});
