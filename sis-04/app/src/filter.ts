import type { Room } from './rooms';

// F1: capacity >= attendees. F2: the room has ALL selected items (none selected = no constraint).
export function filterRooms(rooms: Room[], { attendees, equipment }: { attendees: number; equipment: string[] }): Room[] {
  return rooms.filter((r) => r.capacity >= attendees && equipment.every((e) => r.equipment.includes(e)));
}
