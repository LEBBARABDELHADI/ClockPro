import { useEffect, useRef } from 'react';
import styles from './AdBanner.module.css';

type AdSlot = 'top' | 'bottom' | 'sidebar';

interface AdBannerProps {
  slot: AdSlot;
  adClient?: string; // ex: "ca-pub-XXXXXXXXXXXXXXXX"
  adSlotId?: string; // ex: "1234567890"
}

export function AdBanner({ slot, adClient, adSlotId }: AdBannerProps) {
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (adClient && adSlotId && insRef.current) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch {
        // AdBlocker présent — ignorer silencieusement
      }
    }
  }, [adClient, adSlotId]);

  const isHorizontal = slot === 'top' || slot === 'bottom';

  if (adClient && adSlotId) {
    return (
      <div className={`${styles.wrapper} ${styles[slot]}`}>
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adClient}
          data-ad-slot={adSlotId}
          data-ad-format={isHorizontal ? 'horizontal' : 'rectangle'}
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return (
    <div className={`${styles.wrapper} ${styles[slot]}`} aria-label="Espace publicitaire">
      <div className={styles.placeholder}>
        <span className={styles.label}>
          {isHorizontal ? 'Publicité — 728 × 90' : 'Publicité — 300 × 600'}
        </span>
        <span className={styles.sublabel}>Google AdSense</span>
      </div>
    </div>
  );
}
