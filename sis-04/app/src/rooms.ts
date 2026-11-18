export type Room = {
  id: string;
  name: string;
  capacity: number;
  equipment: string[];
  blocked: boolean;
  bookings: { start: number; end: number }[]; // minutes after midnight, 600 = 10:00
};

export const ROOMS: Room[] = [
  { id: 'r1', name: 'Athena 101', capacity: 40, equipment: ['projector', 'whiteboard', 'mic'], blocked: false,
    bookings: [{ start: 540, end: 600 }, { start: 840, end: 930 }] },
  { id: 'r2', name: 'Curie 202', capacity: 25, equipment: ['whiteboard'], blocked: false,
    bookings: [{ start: 660, end: 720 }, { start: 780, end: 840 }] },
  { id: 'r3', name: 'Turing 110', capacity: 60, equipment: ['projector', 'mic'], blocked: true,
    bookings: [] },
  { id: 'r4', name: 'Da Vinci 305', capacity: 18, equipment: ['whiteboard'], blocked: false,
    bookings: [{ start: 960, end: 1020 }] },
  { id: 'r5', name: 'Feynman 220', capacity: 35, equipment: ['projector', 'whiteboard'], blocked: false,
    bookings: [{ start: 600, end: 690 }] },
];
