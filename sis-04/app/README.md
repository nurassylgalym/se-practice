# Smart Campus Room Availability Checker — SIS #04

React 18 + TypeScript + Vite + Tailwind. Fictional data only, no backend.

## Setup

```bash
npm install
```

## Run

```bash
npm run dev
```

Open http://localhost:5173/

## Test

```bash
npx vitest run
```

## Modules (src/)

- `rooms.ts` — `Room` type and the `ROOMS` catalog (5 fictional rooms with their own bookings)
- `filter.ts` — `filterRooms`: capacity >= attendees (F1), all selected equipment (F2)
- `booking.ts` — `canBook` (AC1–AC5) and `checkRoom` (the chosen room's data, F3/F5)
- `time.ts` — `toMinutes` / `fmt` helpers for the page
- `App.tsx` — the page; imports the modules above, holds no data or rules
- `booking.test.ts`, `rooms.test.ts` — Vitest tests