export function pad(n: number, size = 2): string {
  return String(Math.floor(n)).padStart(size, '0');
}

export function formatElapsed(ms: number) {
  const totalSeconds = ms / 1000;
  const hh = Math.floor(totalSeconds / 3600);
  const mm = Math.floor((totalSeconds % 3600) / 60);
  const ss = Math.floor(totalSeconds % 60);
  const cs = Math.floor((ms % 1000) / 10);
  return { hh: pad(hh), mm: pad(mm), ss: pad(ss), cs: pad(cs) };
}

export function formatLapTime(ms: number): string {
  const mm = Math.floor(ms / 60000);
  const ss = Math.floor((ms % 60000) / 1000);
  const cs = Math.floor((ms % 1000) / 10);
  return `${pad(mm)}:${pad(ss)}.${pad(cs)}`;
}
