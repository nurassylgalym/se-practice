export interface BookingRequest {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: { start: number; end: number }[];
}

export function canBook({ start, end, now, blocked, bookings }: BookingRequest): boolean {
  if (blocked) return false;
  if (Number.isNaN(start) || Number.isNaN(end)) return false;
  if (start < 0 || end > 1440) return false;
  if (start >= end) return false;
  if (start <= now) return false;
  if (end - start > 120) return false;
  return !bookings.some((b) => start < b.end && end > b.start);
}