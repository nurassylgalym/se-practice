import { describe, test, expect } from 'vitest';
import { canBook } from './booking';

type Booking = { start: number; end: number };
type Opts = { now?: number; blocked?: boolean; bookings?: Booking[] };

const NOW = 540; // fixed time: 09:00
const ONE: Booking[] = [{ start: 600, end: 660 }];
const TWO: Booking[] = [{ start: 600, end: 660 }, { start: 720, end: 780 }];

// fresh deep-frozen copy per call: no shared data, and any write inside canBook throws
const fresh = (bs: Booking[]) => Object.freeze(bs.map((b) => Object.freeze({ ...b }))) as Booking[];

// calls the real canBook and checks the bookings did not change
function check(start: number, end: number, o: Opts = {}) {
  const bookings = fresh(o.bookings ?? ONE);
  const before = structuredClone(bookings);
  const result = canBook({ start, end, now: o.now ?? NOW, blocked: o.blocked ?? false, bookings });
  expect(bookings).toEqual(before);
  return result;
}

describe('canBook — plan T01–T14', () => {
  test('T01 AC4: 660–720 touches the booking end, allowed', () => {
    expect(check(660, 720)).toBe(true);
  });
  test('T02 AC1: 540–570 starts exactly at now, rejected', () => {
    expect(check(540, 570)).toBe(false);
  });
  test('T03 AC1: 720–720 zero duration, rejected', () => {
    expect(check(720, 720)).toBe(false);
  });
  test('T04 AC1: 750–720 reversed, rejected', () => {
    expect(check(750, 720)).toBe(false);
  });
  test('T05 AC1: 1380–1441 past the end of the day, rejected', () => {
    expect(check(1380, 1441)).toBe(false);
  });
  test('T06 AC2: 720–840 exactly 120 minutes, allowed', () => {
    expect(check(720, 840)).toBe(true);
  });
  test('T07 AC2: 720–841 is 121 minutes, rejected', () => {
    expect(check(720, 841)).toBe(false);
  });
  test('T08 AC4: 570–600 touches the booking start, allowed', () => {
    expect(check(570, 600)).toBe(true);
  });
  test('T09 AC4: 630–690 partial overlap, rejected', () => {
    expect(check(630, 690)).toBe(false);
  });
  test('T10 AC4: 570–690 contains the booking, rejected', () => {
    expect(check(570, 690)).toBe(false);
  });
  test('T11 AC4: 615–645 inside the booking, rejected', () => {
    expect(check(615, 645)).toBe(false);
  });
  test('T12 AC4: 600–660 identical to the booking, rejected', () => {
    expect(check(600, 660)).toBe(false);
  });
  test('T13 AC3: 660–720 in a blocked room, rejected', () => {
    expect(check(660, 720, { blocked: true })).toBe(false);
  });
  test('T14 AC4: 630–690 with no bookings, allowed', () => {
    expect(check(630, 690, { bookings: [] })).toBe(true);
  });
});

describe('canBook — own cases and extra boundaries', () => {
  test('X1 AC1: 1380–1440 ends exactly at 24:00, allowed', () => {
    expect(check(1380, 1440)).toBe(true);
  });
  test('X2 AC4: 660–720 touches two bookings, allowed', () => {
    expect(check(660, 720, { bookings: TWO })).toBe(true);
  });
  test('B01 AC1: 541–570 first minute after now, allowed', () => {
    expect(check(541, 570)).toBe(true);
  });
  test('B02 AC1: 660–720 with now 700, rejected', () => {
    expect(check(660, 720, { now: 700 })).toBe(false);
  });
  test('B03 AC1: 701–720 with now 700, allowed', () => {
    expect(check(701, 720, { now: 700 })).toBe(true);
  });
  test('B04 AC4: 659–720 one minute over the booking end, rejected', () => {
    expect(check(659, 720)).toBe(false);
  });
  test('B05 AC4: 570–601 one minute into the booking start, rejected', () => {
    expect(check(570, 601)).toBe(false);
  });
  test('B06 AC4: 700–750 overlaps only the second booking, rejected', () => {
    expect(check(700, 750, { bookings: TWO })).toBe(false);
  });
  test('B07 AC4: 630–690 overlaps a booking listed second in an unsorted list, rejected', () => {
    expect(check(630, 690, { bookings: [TWO[1], TWO[0]] })).toBe(false);
  });
});

describe('canBook — data preservation', () => {
  test('AC5: an Available request leaves the bookings unchanged', () => {
    const bookings = [{ start: 600, end: 660 }];
    const before = structuredClone(bookings);
    expect(canBook({ start: 660, end: 720, now: NOW, blocked: false, bookings })).toBe(true);
    expect(bookings).toEqual(before);
  });
});