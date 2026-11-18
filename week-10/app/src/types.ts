export interface Booking {
  id: string;
  room: string;
  start: number; // minutes from 00:00
  end: number;
  bookedBy: string;
}

export interface Room {
  id: string;
  name: string;
  building: string;
  capacity: number;
  blocked: boolean;
}

export type Verdict = 'available' | 'unavailable' | 'idle';
