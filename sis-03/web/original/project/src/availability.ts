import type { Booking, Room } from './types';

export interface CheckResult {
  ok: boolean;
  reason?: string;
}

const MINUTES_PER_DAY = 1440;
const MAX_DURATION = 120;

/** AC1: 0 <= start < end <= 1440, and start must be after currentTime. */
export function validateInterval(
  start: number,
  end: number,
  currentTime: number
): CheckResult {
  if (Number.isNaN(start) || Number.isNaN(end)) {
    return { ok: false, reason: 'Please enter valid start and end times.' };
  }
  if (start < 0 || end > MINUTES_PER_DAY) {
    return { ok: false, reason: 'Times must be between 00:00 and 24:00.' };
  }
  if (start >= end) {
    return { ok: false, reason: 'Start time must be earlier than end time.' };
  }
  if (start < currentTime) {
    return { ok: false, reason: 'Start time must be after the current time.' };
  }
  return { ok: true };
}

/** AC2: booking longer than 120 minutes is rejected. */
export function validateDuration(start: number, end: number): CheckResult {
  if (end - start > MAX_DURATION) {
    return { ok: false, reason: 'Bookings cannot be longer than 120 minutes.' };
  }
  return { ok: true };
}

/** AC3: reject when the room is blocked. */
export function checkRoomBlocked(room: Room | null): CheckResult {
  if (!room) {
    return { ok: false, reason: 'Please choose a room.' };
  }
  if (room.blocked) {
    return { ok: false, reason: `${room.name} is currently blocked and cannot be booked.` };
  }
  return { ok: true };
}

/** AC4: reject overlaps with existing bookings; touching endpoints are allowed. */
export function checkOverlap(
  room: Room | null,
  start: number,
  end: number,
  bookings: Booking[]
): CheckResult {
  if (!room) return { ok: false, reason: 'Please choose a room.' };
  const conflict = bookings.find(
    (b) => b.room === room.name && start < b.end && end > b.start
  );
  if (conflict) {
    return {
      ok: false,
      reason: `Overlaps an existing booking (${fmt(conflict.start)}–${fmt(conflict.end)} by ${conflict.bookedBy}).`,
    };
  }
  return { ok: true };
}

/** Full evaluation pipeline. AC5: never mutates bookings. */
export function evaluateAvailability(
  room: Room | null,
  start: number,
  end: number,
  currentTime: number,
  bookings: Booking[]
): CheckResult {
  const blocked = checkRoomBlocked(room);
  if (!blocked.ok) return blocked;

  const interval = validateInterval(start, end, currentTime);
  if (!interval.ok) return interval;

  const duration = validateDuration(start, end);
  if (!duration.ok) return duration;

  const overlap = checkOverlap(room, start, end, bookings);
  if (!overlap.ok) return overlap;

  return { ok: true };
}

export function fmt(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export const MINUTES_PER_DAY_EXPORT = MINUTES_PER_DAY;
export const MAX_DURATION_EXPORT = MAX_DURATION;
