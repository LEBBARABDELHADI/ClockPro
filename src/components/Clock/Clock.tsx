import { memo, useState } from 'react';
import type { ClockMode } from '../../types/app.types';
import { useClock } from '../../hooks/useClock';
import { useLang } from '../../context/LanguageContext';
import { FlipDigit } from './FlipDigit';
import styles from './Clock.module.css';

const RING_R = 320;
const RING_C = 2 * Math.PI * RING_R;

function DigitPair({ value, label }: { value: string; label: string }) {
  return (
    <div className={styles.segment}>
      <div className={styles.digitPair}>
        <FlipDigit value={value[0]} className={styles.digits} />
        <FlipDigit value={value[1]} className={styles.digits} />
      </div>
      <span className={styles.segLabel}>{label}</span>
    </div>
  );
}

export const Clock = memo(function Clock() {
  const [mode, setMode] = useState<ClockMode>('24h');
  const { t, locale } = useLang();
  const { hours, minutes, seconds, ampm, date, timezone } = useClock(mode, locale);

  const secondsNum = parseInt(seconds, 10);
  const dashOffset = RING_C * (1 - secondsNum / 60);
  const angle = 2 * Math.PI * (secondsNum / 60);
  const dotX = 340 + RING_R * Math.cos(angle);
  const dotY = 340 + RING_R * Math.sin(angle);

  return (
    <div className={styles.wrapper}>
      {/* 12H / 24H pill toggle */}
      <div className={styles.modeToggle}>
        <button
          className={`${styles.modeBtn} ${mode === '12h' ? styles.modeBtnActive : ''}`}
          onClick={() => setMode('12h')}
        >12H</button>
        <button
          className={`${styles.modeBtn} ${mode === '24h' ? styles.modeBtnActive : ''}`}
          onClick={() => setMode('24h')}
        >24H</button>
      </div>

      <div className={styles.display}>
        {ampm && <span className={styles.ampm}>{ampm}</span>}

        <div className={styles.timeRow}>
          <DigitPair value={hours}   label={t.clock.hours}   />
          <span className={styles.colon} aria-hidden="true">:</span>
          <DigitPair value={minutes} label={t.clock.minutes} />
          <span className={styles.colon} aria-hidden="true">:</span>
          <DigitPair value={seconds} label={t.clock.seconds} />
        </div>

        <p className={styles.date}>{date}</p>
        <p className={styles.timezone}>🌍 {timezone}</p>
      </div>

      {/* Animated seconds ring */}
      <svg className={styles.ringsvg} viewBox="0 0 680 680" aria-hidden="true">
        <defs>
          <linearGradient id="clockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#4f9eff" />
            <stop offset="100%" stopColor="#7c6aff" />
          </linearGradient>
        </defs>
        <circle cx="340" cy="340" r={RING_R} className={styles.ringTrack} />
        <circle
          cx="340" cy="340" r={RING_R}
          className={styles.ringProgress}
          style={{ strokeDasharray: RING_C, strokeDashoffset: dashOffset }}
        />
        <circle cx={dotX} cy={dotY} r="7" className={styles.ringDot} />
      </svg>
    </div>
  );
});
