import type { Booking, Room } from './types';

export const ROOMS: Room[] = [
  { id: 'r1', name: 'Athena 101', building: 'North Wing', capacity: 40, blocked: false },
  { id: 'r2', name: 'Curie 202', building: 'Science Block', capacity: 25, blocked: false },
  { id: 'r3', name: 'Turing 110', building: 'East Hall', capacity: 60, blocked: true },
  { id: 'r4', name: 'Da Vinci 305', building: 'Arts Quad', capacity: 18, blocked: false },
  { id: 'r5', name: 'Feynman 220', building: 'Science Block', capacity: 35, blocked: false },
];

export const INITIAL_BOOKINGS: Booking[] = [
  { id: 'b1', room: 'Athena 101', start: 9 * 60, end: 10 * 60, bookedBy: 'Dr. Patel' },
  { id: 'b2', room: 'Athena 101', start: 14 * 60, end: 15 * 60 + 30, bookedBy: 'Seminar Group' },
  { id: 'b3', room: 'Curie 202', start: 11 * 60, end: 12 * 60, bookedBy: 'Lab Team A' },
  { id: 'b4', room: 'Curie 202', start: 13 * 60, end: 14 * 60, bookedBy: 'Prof. Lee' },
  { id: 'b5', room: 'Da Vinci 305', start: 16 * 60, end: 17 * 60, bookedBy: 'Art Studio' },
  { id: 'b6', room: 'Feynman 220', start: 10 * 60, end: 11 * 60 + 30, bookedBy: 'Physics Dept' },
];
