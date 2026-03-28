import { useEffect, useRef, useState } from 'react';
import styles from './FlipDigit.module.css';

interface FlipDigitProps {
  value: string;
  className?: string;
}

export function FlipDigit({ value, className = '' }: FlipDigitProps) {
  const [curr, setCurr]       = useState(value);
  const [prev, setPrev]       = useState(value);
  const [flipping, setFlipping] = useState(false);
  const currRef  = useRef(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (value === currRef.current) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    setPrev(currRef.current);
    setCurr(value);
    currRef.current = value;
    setFlipping(true);

    timerRef.current = setTimeout(() => setFlipping(false), 260);
  }, [value]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <span className={`${styles.digit} ${className}`}>
      {flipping && <span className={styles.out} aria-hidden="true">{prev}</span>}
      <span className={flipping ? styles.in : ''}>{curr}</span>
    </span>
  );
}
