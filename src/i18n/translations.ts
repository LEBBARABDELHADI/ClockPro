export type Lang = 'fr' | 'en' | 'es';

export const LOCALES: Record<Lang, string> = {
  fr: 'fr-FR',
  en: 'en-US',
  es: 'es-ES',
};

export const translations = {
  fr: {
    nav: {
      clock: 'Horloge',
      stopwatch: 'Chronomètre',
    },
    clock: {
      hours: 'HEURES',
      minutes: 'MINUTES',
      seconds: 'SECONDES',
    },
    stopwatch: {
      start: '▶ Démarrer',
      resume: '▶ Reprendre',
      pause: '⏸ Pause',
      lap: 'Tour',
      reset: '↺ Reset',
      lapNum: '#',
      lapTime: 'Temps du tour',
      total: 'Total',
    },
    footer: 'Horloge & Chronomètre',
  },
  en: {
    nav: {
      clock: 'Clock',
      stopwatch: 'Stopwatch',
    },
    clock: {
      hours: 'HOURS',
      minutes: 'MINUTES',
      seconds: 'SECONDS',
    },
    stopwatch: {
      start: '▶ Start',
      resume: '▶ Resume',
      pause: '⏸ Pause',
      lap: 'Lap',
      reset: '↺ Reset',
      lapNum: '#',
      lapTime: 'Lap time',
      total: 'Total',
    },
    footer: 'Clock & Stopwatch',
  },
  es: {
    nav: {
      clock: 'Reloj',
      stopwatch: 'Cronómetro',
    },
    clock: {
      hours: 'HORAS',
      minutes: 'MINUTOS',
      seconds: 'SEGUNDOS',
    },
    stopwatch: {
      start: '▶ Iniciar',
      resume: '▶ Reanudar',
      pause: '⏸ Pausa',
      lap: 'Vuelta',
      reset: '↺ Reset',
      lapNum: '#',
      lapTime: 'T. de vuelta',
      total: 'Total',
    },
    footer: 'Reloj & Cronómetro',
  },
} as const;

export type Translations = typeof translations['fr'];
