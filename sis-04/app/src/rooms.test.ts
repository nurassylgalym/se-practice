import { describe, test, expect } from 'vitest';
import { filterRooms } from './filter';
import { checkRoom } from './booking';
import type { Room } from './rooms';

// Fixed catalog for these tests only, so a change to the demo ROOMS cannot change a result.
const CATALOG: Room[] = [
  { id: 'a', name: 'A', capacity: 10, equipment: ['projector'], blocked: false, bookings: [{ start: 600, end: 660 }] },
  { id: 'b', name: 'B', capacity: 20, equipment: ['projector', 'whiteboard'], blocked: false, bookings: [] },
  { id: 'c', name: 'C', capacity: 30, equipment: ['projector', 'whiteboard'], blocked: true, bookings: [] },
  { id: 'd', name: 'D', capacity: 8, equipment: ['whiteboard'], blocked: false, bookings: [] },
];
const NOW = 540; // 09:00
const ids = (rooms: Room[]) => rooms.map((r) => r.id);

describe('filterRooms — F1, F2, F4', () => {
  test('F1: 15 attendees keeps only rooms with capacity >= 15', () => {
    expect(ids(filterRooms(CATALOG, { attendees: 15, equipment: [] }))).toEqual(['b', 'c']);
  });
  test('B5 F1: capacity exactly equal to attendees (20 for 20) is included', () => {
    expect(ids(filterRooms(CATALOG, { attendees: 20, equipment: [] }))).toContain('b');
  });
  test('B6 F1: capacity one below attendees (20 for 21) is excluded', () => {
    expect(ids(filterRooms(CATALOG, { attendees: 21, equipment: [] }))).toEqual(['c']);
  });
  test('F2: projector + whiteboard needs ALL items, the projector-only room is excluded', () => {
    expect(ids(filterRooms(CATALOG, { attendees: 1, equipment: ['projector', 'whiteboard'] }))).toEqual(['b', 'c']);
  });
  test('F2: no selected equipment means no equipment constraint', () => {
    expect(ids(filterRooms(CATALOG, { attendees: 1, equipment: [] }))).toEqual(['a', 'b', 'c', 'd']);
  });
  test('F4: 50 attendees with a projector match no room, the list is empty', () => {
    expect(filterRooms(CATALOG, { attendees: 50, equipment: ['projector'] })).toEqual([]);
  });
});

describe('checkRoom — F3, F5', () => {
  test('F3: a blocked room with a free slot is never available', () => {
    expect(checkRoom(CATALOG, 'c', { start: 660, end: 720, now: NOW })).toBe(false);
  });
  test('F5: same times 10:30–11:30, room a is booked and room b is free', () => {
    expect(checkRoom(CATALOG, 'a', { start: 630, end: 690, now: NOW })).toBe(false);
    expect(checkRoom(CATALOG, 'b', { start: 630, end: 690, now: NOW })).toBe(true);
  });
  test('F5: an unknown room id is not available', () => {
    expect(checkRoom(CATALOG, 'zzz', { start: 660, end: 720, now: NOW })).toBe(false);
  });
  test('AC5 F5: checkRoom leaves the catalog unchanged', () => {
    const before = structuredClone(CATALOG);
    checkRoom(CATALOG, 'a', { start: 660, end: 720, now: NOW });
    expect(CATALOG).toEqual(before);
  });
});

test('INT: filterRooms then checkRoom — of the 15+ rooms with a projector, only b is free 10:00–11:00', () => {
  const matches = filterRooms(CATALOG, { attendees: 15, equipment: ['projector'] });
  expect(ids(matches)).toEqual(['b', 'c']);
  const free = matches.filter((r) => checkRoom(CATALOG, r.id, { start: 600, end: 660, now: NOW }));
  expect(ids(free)).toEqual(['b']);
});
