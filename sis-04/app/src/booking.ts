import type { Room } from './rooms';

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
// F3, F5: the check uses the chosen room's own blocked flag and bookings; unknown id -> not available.
export function checkRoom(rooms: Room[], roomId: string, { start, end, now }: { start: number; end: number; now: number }): boolean {
  const room = rooms.find((r) => r.id === roomId);
  return room ? canBook({ start, end, now, blocked: room.blocked, bookings: room.bookings }) : false;
}
