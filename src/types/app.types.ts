export type ClockMode = '12h' | '24h';
export type AppTab = 'clock' | 'stopwatch';

export interface ClockData {
  hours: string;
  minutes: string;
  seconds: string;
  ampm: 'AM' | 'PM' | null;
  date: string;
  timezone: string;
}

export interface LapEntry {
  id: number;
  lapTime: number;   // duration of this lap in ms
  totalTime: number; // total elapsed at this lap
}
