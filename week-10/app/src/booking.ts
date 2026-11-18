export interface BookingRequest {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: { start: number; end: number }[];
}

export function canBook({ start, end, now, blocked, bookings }: {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: { start: number; end: number }[];
}): boolean {
  if (!(0 <= start && start < end && end <= 1440)) return false;
  if (!(start > now)) return false;
  if (end - start > 120) return false;
  if (blocked) return false;
  for (const b of bookings) {
    if (start < b.end && end > b.start) return false;
  }
  return true;
}

/** "HH:MM" → minutes from 00:00; NaN when the text is not a valid time. */
export function toMinutes(hhmm: string): number {
  if (!/^\d{1,2}:\d{2}$/.test(hhmm)) return NaN;
  const [h, m] = hhmm.split(':').map(Number);
  if (h < 0 || h > 23 || m < 0 || m > 59) return NaN;
  return h * 60 + m;
}

/** The simulated "now": keeps `previous` only when the input is not a valid time (00:00 is valid). */
export function parseNow(value: string, previous: number): number {
  const t = toMinutes(value);
  return Number.isNaN(t) ? previous : t;
}