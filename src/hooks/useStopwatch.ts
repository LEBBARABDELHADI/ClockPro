import { useCallback, useEffect, useRef, useState } from 'react';
import type { LapEntry } from '../types/app.types';

export function useStopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<LapEntry[]>([]);

  const rafRef  = useRef<number>(0);
  const startRef = useRef<number>(0);  // performance.now() at last resume
  const baseRef  = useRef<number>(0);  // accumulated ms before last resume

  const loop = useCallback(() => {
    setElapsed(baseRef.current + (performance.now() - startRef.current));
    rafRef.current = requestAnimationFrame(loop);
  }, []);

  const start = useCallback(() => {
    startRef.current = performance.now();
    setIsRunning(true);
    rafRef.current = requestAnimationFrame(loop);
  }, [loop]);

  const pause = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    baseRef.current += performance.now() - startRef.current;
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setIsRunning(false);
    setElapsed(0);
    setLaps([]);
    baseRef.current = 0;
  }, []);

  const addLap = useCallback(() => {
    const current = baseRef.current + (performance.now() - startRef.current);
    setLaps((prev) => {
      const lastTotal = prev.length > 0 ? prev[0].totalTime : 0;
      // newest lap first
      return [{ id: prev.length + 1, lapTime: current - lastTotal, totalTime: current }, ...prev];
    });
  }, []);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return { elapsed, isRunning, laps, start, pause, reset, addLap };
}
