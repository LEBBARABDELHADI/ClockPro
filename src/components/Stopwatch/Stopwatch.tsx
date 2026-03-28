import { memo, useMemo } from 'react';
import { useStopwatch } from '../../hooks/useStopwatch';
import { useLang } from '../../context/LanguageContext';
import { formatElapsed, formatLapTime } from '../../utils/timeUtils';
import { FlipDigit } from '../Clock/FlipDigit';
import styles from './Stopwatch.module.css';

const RADIUS = 138;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export const Stopwatch = memo(function Stopwatch() {
  const { elapsed, isRunning, laps, start, pause, reset, addLap } = useStopwatch();
  const { t } = useLang();
  const { hh, mm, ss, cs } = formatElapsed(elapsed);

  const secondProgress   = (elapsed / 1000) % 60 / 60;
  const dashOffset       = CIRCUMFERENCE * (1 - secondProgress);

  const minLapTime = useMemo(
    () => (laps.length > 1 ? Math.min(...laps.map((l) => l.lapTime)) : null),
    [laps],
  );
  const maxLapTime = useMemo(
    () => (laps.length > 1 ? Math.max(...laps.map((l) => l.lapTime)) : null),
    [laps],
  );

  const handleStartPause = () => (isRunning ? pause() : start());

  return (
    <div className={styles.wrapper}>
      {/* Ring + display */}
      <div className={`${styles.ringContainer} ${isRunning ? styles.running : ''}`}>
        <svg className={styles.svg} viewBox="0 0 310 310" aria-hidden="true">
          <defs>
            <linearGradient id="swGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#4f9eff" />
              <stop offset="100%" stopColor="#7c6aff" />
            </linearGradient>
          </defs>
          <circle cx="155" cy="155" r={RADIUS} className={styles.ringTrack} />
          <circle
            cx="155" cy="155" r={RADIUS}
            className={styles.ringProgress}
            style={{ strokeDasharray: CIRCUMFERENCE, strokeDashoffset: dashOffset }}
          />
        </svg>

        <div className={styles.timeDisplay}>
          {hh !== '00' && (
            <span className={styles.hours}>
              <FlipDigit value={hh[0]} /><FlipDigit value={hh[1]} />:
            </span>
          )}
          <span className={styles.mmss}>
            <FlipDigit value={mm[0]} className={styles.flipMM} />
            <FlipDigit value={mm[1]} className={styles.flipMM} />
            <span className={styles.msSep}>:</span>
            <FlipDigit value={ss[0]} className={styles.flipSS} />
            <FlipDigit value={ss[1]} className={styles.flipSS} />
          </span>
          <span className={styles.centiseconds}>.{cs}</span>
        </div>
      </div>

      {/* Status dot */}
      <div className={`${styles.statusDot} ${isRunning ? styles.dotRunning : ''}`} aria-hidden="true" />

      {/* Buttons */}
      <div className={styles.controls}>
        <button
          className={`${styles.btn} ${styles.btnLap}`}
          onClick={addLap}
          disabled={!isRunning}
        >{t.stopwatch.lap}</button>
        <button
          className={`${styles.btn} ${isRunning ? styles.btnPause : styles.btnStart}`}
          onClick={handleStartPause}
        >
          {isRunning ? t.stopwatch.pause : elapsed === 0 ? t.stopwatch.start : t.stopwatch.resume}
        </button>
        <button
          className={`${styles.btn} ${styles.btnReset}`}
          onClick={reset}
          disabled={elapsed === 0}
        >{t.stopwatch.reset}</button>
      </div>

      {/* Lap table */}
      {laps.length > 0 && (
        <div className={styles.lapTable}>
          <table>
            <thead>
              <tr>
                <th>{t.stopwatch.lapNum}</th>
                <th>{t.stopwatch.lapTime}</th>
                <th>{t.stopwatch.total}</th>
              </tr>
            </thead>
            <tbody>
              {laps.map((lap) => {
                const isBest  = lap.lapTime === minLapTime;
                const isWorst = lap.lapTime === maxLapTime;
                return (
                  <tr key={lap.id} className={isBest ? styles.best : isWorst ? styles.worst : styles.lapRow}>
                    <td>{isBest ? '🏆' : isWorst ? '🐢' : lap.id}</td>
                    <td>{formatLapTime(lap.lapTime)}</td>
                    <td>{formatLapTime(lap.totalTime)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
});
