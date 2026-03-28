import { useEffect, useState } from 'react';
import type { ClockData, ClockMode } from '../types/app.types';
import { pad } from '../utils/timeUtils';

function buildClockData(date: Date, mode: ClockMode, locale: string): ClockData {
  const h24 = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  const ampm = mode === '12h' ? (h24 >= 12 ? 'PM' : 'AM') : null;
  const h = mode === '12h' ? (h24 % 12 || 12) : h24;

  const raw = date.toLocaleDateString(locale, {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
  const dateStr = raw.charAt(0).toUpperCase() + raw.slice(1);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return { hours: pad(h), minutes: pad(min), seconds: pad(sec), ampm, date: dateStr, timezone };
}

export function useClock(mode: ClockMode, locale: string): ClockData {
  const [data, setData] = useState<ClockData>(() => buildClockData(new Date(), mode, locale));

  useEffect(() => {
    const tick = () => setData(buildClockData(new Date(), mode, locale));
    tick();
    const id = setInterval(tick, 500);
    return () => clearInterval(id);
  }, [mode, locale]);

  return data;
}
