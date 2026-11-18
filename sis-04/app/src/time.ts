// "HH:MM" -> minutes after midnight; NaN for anything else (an empty field included).
export function toMinutes(hhmm: string): number {
  if (!/^\d{1,2}:\d{2}$/.test(hhmm)) return NaN;
  const [h, m] = hhmm.split(':').map(Number);
  return h < 24 && m < 60 ? h * 60 + m : NaN;
}

// minutes after midnight -> "HH:MM"
export const fmt = (min: number) =>
  `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;