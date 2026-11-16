# SIS #04 — Report: Evolving the Smart Campus Room Availability Checker

<!-- The ONLY file you write prose in. Keep every numbered heading (## 1. … ## 10.), every
     ### sub-heading and every **Label:** word — the checker finds your answers by them.
     Replace every "(write here)" and "(paste here)". Delete these <!-- --> comments if you like. -->

## 1. Setup and starting point

<!-- Model: the exact model with its version, as the tool shows it ("ChatGPT" is a tool, not a
     model). If the tool does not show it, write: not displayed
     Starting point: week-08 | week-07 | sis-03 | starter   (README section 3)
     Baseline commit: the commit that brings your starting point into sis-04/app/ UNCHANGED —
     git rev-parse --short HEAD right after that commit. It is your "initial version". -->

| Item | Value |
| --- | --- |
| Assistant (tool) | Claude (claude.ai) |
| Assistant model | Claude Opus 5.5 |
| Starting point | week-08 |
| Baseline commit | 658b750 |
| Language (ts or js) | ts |
| Vitest version | 3.2.4 |
| Where I ran the tests | local machine, Windows, cmd |

### 1.1 Baseline run

<!-- Before you change anything: run the tests of your starting point inside app/ and paste the
     REAL output. No tests yet (starter, sis-03)? Paste the run anyway: Vitest prints
     "No test files found". That is your honest "original" number, 0/0. -->

```text
 RUN  v3.2.4 C:/Users/Nurassyl Galym/Desktop/KBTU/Software Engineering/Lab Week 1/se-practice/sis-04/app

 ✓ src/booking.test.ts (26 tests) 15ms
   ✓ canBook — plan T01–T14 > T01 AC4: 660–720 touches the booking end, allowed 4ms
   ✓ canBook — plan T01–T14 > T02 AC1: 540–570 starts exactly at now, rejected 1ms
   ✓ canBook — plan T01–T14 > T03 AC1: 720–720 zero duration, rejected 0ms
   ✓ canBook — plan T01–T14 > T04 AC1: 750–720 reversed, rejected 1ms
   ✓ canBook — plan T01–T14 > T05 AC1: 1380–1441 past the end of the day, rejected 0ms
   ✓ canBook — plan T01–T14 > T06 AC2: 720–840 exactly 120 minutes, allowed 1ms
   ✓ canBook — plan T01–T14 > T07 AC2: 720–841 is 121 minutes, rejected 0ms
   ✓ canBook — plan T01–T14 > T08 AC4: 570–600 touches the booking start, allowed 1ms
   ✓ canBook — plan T01–T14 > T09 AC4: 630–690 partial overlap, rejected 0ms
   ✓ canBook — plan T01–T14 > T10 AC4: 570–690 contains the booking, rejected 0ms
   ✓ canBook — plan T01–T14 > T11 AC4: 615–645 inside the booking, rejected 0ms
   ✓ canBook — plan T01–T14 > T12 AC4: 600–660 identical to the booking, rejected 0ms
   ✓ canBook — plan T01–T14 > T13 AC3: 660–720 in a blocked room, rejected 0ms
   ✓ canBook — plan T01–T14 > T14 AC4: 630–690 with no bookings, allowed 0ms
   ✓ canBook — own cases and extra boundaries > X1 AC1: 1380–1440 ends exactly at 24:00, allowed 0ms
   ✓ canBook — own cases and extra boundaries > X2 AC4: 660–720 touches two bookings, allowed 0ms
   ✓ canBook — own cases and extra boundaries > B01 AC1: 541–570 first minute after now, allowed 0ms
   ✓ canBook — own cases and extra boundaries > B02 AC1: 660–720 with now 700, rejected 0ms
   ✓ canBook — own cases and extra boundaries > B03 AC1: 701–720 with now 700, allowed 0ms
   ✓ canBook — own cases and extra boundaries > B04 AC4: 659–720 one minute over the booking end, rejected 0ms
   ✓ canBook — own cases and extra boundaries > B05 AC4: 570–601 one minute into the booking start, rejected 0ms
   ✓ canBook — own cases and extra boundaries > B06 AC4: 700–750 overlaps only the second booking, rejected 0ms
   ✓ canBook — own cases and extra boundaries > B07 AC4: 630–690 overlaps a booking listed second in an unsorted list, rejected 0ms
   ✓ canBook — data preservation > AC5: an Available request leaves the bookings unchanged 0ms
   ✓ canBook — regression tests for the provided bugs > BUG-A AC4: 690–720 touches only the start of the second booking, allowed 0ms
   ✓ canBook — regression tests for the provided bugs > BUG-B AC5: 720–780 touches nothing, Available, bookings unchanged 0ms

 Test Files  1 passed (1)
      Tests  26 passed (26)
   Start at  17:33:57
   Duration  1.01s (transform 74ms, setup 0ms, collect 82ms, tests 15ms, environment 0ms, prepare 304ms)
```

## 2. Context for the assistant

### 2.1 Repository map

<!-- The concise map you gave the assistant: the files that matter and one line each on what
     they do. A tree is fine:  src/App.tsx — the page, holds the rooms and the form … -->

```text
sis-04/app — Vite + React 18 + TypeScript + Tailwind, tests with Vitest 3.2.4
src/main.tsx         — entry point, renders <App />
src/App.tsx          — the whole page: room <select>, start/end/current-time inputs, verdict box,
                       room details and its bookings; has its own toMinutes() parser; picks the
                       room's bookings by room NAME; calls canBook() for the verdict AND
                       evaluateAvailability() for the reason text
src/booking.ts       — canBook({ start, end, now, blocked, bookings }): AC1–AC5 as one pure boolean function
src/availability.ts  — validateInterval (AC1), validateDuration (AC2), checkRoomBlocked (AC3),
                       checkOverlap (AC4), evaluateAvailability() returning { ok, reason };
                       also fmt() and the constants MINUTES_PER_DAY = 1440, MAX_DURATION = 120
src/sampleData.ts    — ROOMS: 5 rooms (id, name, building, capacity, blocked; no equipment, no bookings);
                       INITIAL_BOOKINGS: 6 bookings, each linked to a room by its name string
src/types.ts         — Booking, Room, Verdict types
src/booking.test.ts  — 26 Vitest tests for canBook (T01–T14, X1–X2, B01–B07, AC5, BUG-A, BUG-B), all pass
index.html, src/index.css, vite/tailwind/postcss/tsconfig configs — build and styling
```

### 2.2 The context message as sent

<!-- The whole first message of your analysis chat: the map, AC1–AC6, F1–F5 and the constraints
     (no login, payments, live APIs or database; fictional data only). Unedited. -->

```text
I'm extending an existing React + TypeScript app (Smart Campus Room Availability Checker) for a
university assignment. The five source files are attached. Repository map:

sis-04/app — Vite + React 18 + TypeScript + Tailwind, tests with Vitest 3.2.4
src/main.tsx         — entry point, renders <App />
src/App.tsx          — the whole page: room <select>, start/end/current-time inputs, verdict box,
                       room details and its bookings; has its own toMinutes() parser; picks the
                       room's bookings by room NAME; calls canBook() for the verdict AND
                       evaluateAvailability() for the reason text
src/booking.ts       — canBook({ start, end, now, blocked, bookings }): AC1–AC5 as one pure boolean function
src/availability.ts  — validateInterval (AC1), validateDuration (AC2), checkRoomBlocked (AC3),
                       checkOverlap (AC4), evaluateAvailability() returning { ok, reason };
                       also fmt() and the constants MINUTES_PER_DAY = 1440, MAX_DURATION = 120
src/sampleData.ts    — ROOMS: 5 rooms (id, name, building, capacity, blocked; no equipment, no bookings);
                       INITIAL_BOOKINGS: 6 bookings, each linked to a room by its name string
src/types.ts         — Booking, Room, Verdict types
src/booking.test.ts  — 26 Vitest tests for canBook (T01–T14, X1–X2, B01–B07, AC5, BUG-A, BUG-B), all pass
index.html, src/index.css, vite/tailwind/postcss/tsconfig configs — build and styling

Requirements that must NOT change (AC1–AC6):
AC1 Reject start >= end and requests in the past.
AC2 Enforce the maximum allowed duration (120 minutes).
AC3 Reject a blocked room.
AC4 Reject overlaps; allow bookings that only touch at endpoints.
AC5 Return Available / Unavailable without changing booking data.
AC6 Clear, responsive feedback on desktop and mobile.

New feature: a catalog of at least 4 fictional rooms, each with id, name, capacity, equipment list,
blocked status and its own bookings. Show only the rooms that match the user's requirements.
F1 Capacity filter: room capacity >= requested attendees.
F2 Equipment filter: the room must contain ALL selected items.
F3 A blocked room is never reported as available.
F4 A clear empty state when no rooms match.
F5 Changing the selected room refreshes the result; the check uses THAT room's bookings.

Constraints: no login, payments, live APIs or database; fictional data only. Fixed layout:
src/rooms.ts (type Room + const ROOMS), src/filter.ts filterRooms(rooms, { attendees, equipment }),
src/booking.ts canBook (unchanged) + checkRoom(rooms, roomId, { start, end, now }) that calls canBook.
App.tsx imports these and holds no room data and no rule of its own. The 26 existing tests must stay green.

Please:
1. List the maintainability risks in this code that matter for this change, each with the file,
   the function and the concrete evidence (lines).
2. Propose a prioritised plan of small, safe steps, smallest first, each testable on its own.
Do NOT write code yet and do NOT propose a full rewrite.
```

## 3. Codebase analysis (Task 1)

### 3.1 Maintainability risks

<!-- At least three, found in YOUR starting code. "Where" names a file or a function(),
     e.g. src/App.tsx, check(). Evidence is what you saw, not what the assistant said.
     Priority: High / Medium / Low. -->

| # | Risk | Where (file / function) | Evidence | Priority |
| --- | --- | --- | --- | --- |
| 1 | Two separate rule engines decide one request | `src/App.tsx` L50–58: `canBook()` for the verdict, `evaluateAvailability()` for the reason | The verdict comes from `canBook` (`booking.ts` L16–21), the reason text from `availability.ts` (`validateInterval`, `validateDuration`, `checkRoomBlocked`, `checkOverlap`). AC1–AC4 are written twice, in a different order: blocked is checked 1st in `availability.ts` L79 and 4th in `booking.ts` L19. Today both give the same true/false, but every rule change must be made in two files or verdict and reason drift apart. | High |
| 2 | Bookings are linked to rooms by name, not by id | `src/App.tsx` `roomBookings` L36–44; `src/availability.ts` `checkOverlap()` L59–61 | The room is found by id (`r.id === roomId`, L32), its bookings by `b.room === room.name`. `INITIAL_BOOKINGS` in `sampleData.ts` stores the name string. Renaming a room silently drops its bookings and the room would show Available while booked. F5 needs the chosen room's own bookings. | High |
| 3 | Room data and the Room type do not fit the new model, and the page holds the data | `src/types.ts` `Room`; `src/sampleData.ts` `ROOMS`; `src/App.tsx` L13, L25 | `Room` has no `equipment` and no `bookings`, so F1/F2 cannot be filtered and the room cannot own its bookings. `App.tsx` imports `ROOMS` and `INITIAL_BOOKINGS` directly and keeps bookings in state. | High |
| 4 | Limits are magic numbers in three places | `src/booking.ts` `canBook()` L16 (1440), L18 (120); `src/availability.ts` L8–9; `src/App.tsx` L139 help text | 120 is written in three places and 1440 in two. Changing AC2 means three edits, and the help text can drift from the rule. | Medium |
| 5 | The simulated current time cannot be set to 00:00 | `src/App.tsx` L132, the current-time `onChange` handler with a logical-OR fallback to `currentTime` | 00:00 gives 0, which is falsy, so the OR fallback keeps the old value and the input snaps back. Small, but it gets in the way when testing F5 by hand. | Low |

### 3.2 Improvement plan — before editing

<!-- Numbered, in the order you will do it, smallest safe step first. Written BEFORE you change
     code: the commit that adds this section comes before the commit that changes app/src. -->

1. Add `src/rooms.ts` with the new `Room` type (id, name, capacity, equipment, blocked, bookings) and `ROOMS`: the 5 existing rooms with their bookings nested inside and an equipment list added. Not wired into the page yet, so nothing can break. Run all tests.
2. Add `src/filter.ts` `filterRooms` test-first: F1, F2, F4, B5, B6 with a fixed catalog inside the test file. Run all tests.
3. Add `checkRoom` to `src/booking.ts` test-first, calling the unchanged `canBook` with the chosen room's `blocked` and `bookings`: F3, F5, INT. Add the B1–B4 IDs to the existing test titles. Run all tests.
4. Rewire `App.tsx`: rooms from `rooms.ts`, verdict only from `checkRoom`, bookings from `room.bookings` (fixes risk 1 and 2). Check the page by hand against the baseline.
5. Add the filter UI: attendees input and equipment checkboxes, room list from `filterRooms`, empty state (F4), clear the selected room and the result when it drops out of the list or changes (F5). Blocked rooms stay visible with a Blocked badge. Check at phone width (AC6).
6. Remove the duplicates: delete `availability.ts` and `sampleData.ts` and the old types, move `toMinutes`/`fmt` into one time helper, build the help text from the 120 constant (risk 4), fix the 00:00 bug (risk 5). One deletion per commit, all tests after each.
7. Diagrams before/after, screenshots, final run, report.

### 3.3 One AI suggestion I rejected or modified

| Suggestion (as the assistant made it) | Decision | Why — with the AC, F-rule, test or file behind it |
| --- | --- | --- |
| Step 1: a parity test that sweeps start/end/now × blocked and asserts `canBook(...) === evaluateAvailability(...).ok`; step 4: keep `availability.ts` as a reason-only module behind `checkRoom`, guarded by that parity test. | Rejected | Keeping `availability.ts` keeps AC1–AC4 implemented twice (risk 1 in 3.1), which README section 8 asks me to remove; the parity test only guards the duplication instead of removing it. I delete `availability.ts`, the verdict comes only from `checkRoom` → `canBook`, and the 26 existing `canBook` tests already cover AC1–AC5. |

## 4. Feature extension (Task 2)

### 4.1 What I added

<!-- Short: the catalog (how many rooms, which equipment), how the filter is chosen on the page,
     what the empty state says, what happens to an old result when the room changes. -->

(write here)

### 4.2 Demonstration

<!-- One row per screenshot in evidence/. Say what is on it: the filter values, the rooms shown,
     the room selected, the times entered and the result. -->

| Screenshot | What it shows |
| --- | --- |
| `evidence/filter-match.png` | (write here) |
| `evidence/filter-empty.png` | (write here) |
| `evidence/switch-a.png` | (write here) |
| `evidence/switch-b.png` | (write here) |
| `evidence/narrow.png` | (write here) |

## 5. Refactoring (Task 3)

<!-- The diagrams are diagrams/before.puml and diagrams/after.puml (README section 8). -->

### 5.1 Module responsibilities after

| Module or component | Responsibility |
| --- | --- |
| `src/rooms.ts` | (write here) |
| `src/booking.ts` | (write here) |
| `src/filter.ts` | (write here) |
| (write here) | (write here) |

### 5.2 Design decisions

<!-- At least two. The alternative is what you could have done instead (often what the assistant
     proposed). The why names an AC, an F-rule, a test or a risk from 3.1. -->

| Decision | Alternative I did not take | Why |
| --- | --- | --- |
| (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) |

### 5.3 Duplication removed

<!-- One row per duplicated location that is gone. Count what you can point at, nothing else. -->

| Before (file / function, what was repeated) | After (where it lives now) |
| --- | --- |
| (write here) | (write here) |

## 6. Automated tests (Task 4)

### 6.1 Test plan

<!-- One row per required ID. A test may carry several IDs in its title,
     e.g. test('T06 B1 AC2: exactly 120 minutes is available', …) covers B1 and AC2. -->

| ID | Test title (as in the file) | Input → expected |
| --- | --- | --- |
| AC1 | (write here) | (write here) |
| AC2 | (write here) | (write here) |
| AC3 | (write here) | (write here) |
| AC4 | (write here) | (write here) |
| AC5 | (write here) | (write here) |
| F1 | (write here) | (write here) |
| F2 | (write here) | (write here) |
| F3 | (write here) | (write here) |
| F4 | (write here) | (write here) |
| F5 | (write here) | (write here) |
| B1 | (write here) | (write here) |
| B2 | (write here) | (write here) |
| B3 | (write here) | (write here) |
| B4 | (write here) | (write here) |
| B5 | (write here) | (write here) |
| B6 | (write here) | (write here) |
| INT | (write here) | (write here) |

### 6.2 Commands

<!-- The commands exactly as you typed them, from app/. -->

```text
(paste here)
```

### 6.3 Final run

<!-- The REAL output of the full run on your final code. Every test passes, and the number of
     tests equals what your test files hold (R2). -->

```text
(paste here)
```

## 7. Quality evaluation (Task 5)

<!-- Original = your baseline commit. Final = what you submit. "How I obtained it" says how you
     measured, so someone else could repeat it: "1.1 and 6.3 runs", "counted in 5.3",
     "git ls-files app/src". Do not invent a metric. Tests: write passed/total, e.g. 19/19. -->

| Measure | Original | Final | How I obtained it |
| --- | --- | --- | --- |
| Automated tests passed / total | (write here) | (write here) | (write here) |
| Duplicated logic locations removed | (write here) | (write here) | (write here) |
| Code structure: modules and their responsibilities | (write here) | (write here) | (write here) |
| Remaining limitation | (write here) | (write here) | (write here) |

## 8. AI evidence appendix

<!-- At least three exchanges, one ### 8.N block each: the analysis (Task 1), the plan, and at
     least one implementation, refactoring or test exchange. Copy the block for more.
     The prompt as you sent it; the output may be cut to the part you used, with "[…]" where
     you cut. Verified by: the test, run, file or check that confirmed it — not "it looked right". -->

### 8.1 Exchange 1

**Tool and model:** Claude (claude.ai), Claude Opus 5.5
**Date:** 2026-11-16
**Purpose:** codebase analysis and improvement plan (Task 1), fresh chat, the five source files attached

**Prompt:**

```text
I'm extending an existing React + TypeScript app (Smart Campus Room Availability Checker) for a
university assignment. The five source files are attached. Repository map:

sis-04/app — Vite + React 18 + TypeScript + Tailwind, tests with Vitest 3.2.4
src/main.tsx         — entry point, renders <App />
src/App.tsx          — the whole page: room <select>, start/end/current-time inputs, verdict box,
                       room details and its bookings; has its own toMinutes() parser; picks the
                       room's bookings by room NAME; calls canBook() for the verdict AND
                       evaluateAvailability() for the reason text
src/booking.ts       — canBook({ start, end, now, blocked, bookings }): AC1–AC5 as one pure boolean function
src/availability.ts  — validateInterval (AC1), validateDuration (AC2), checkRoomBlocked (AC3),
                       checkOverlap (AC4), evaluateAvailability() returning { ok, reason };
                       also fmt() and the constants MINUTES_PER_DAY = 1440, MAX_DURATION = 120
src/sampleData.ts    — ROOMS: 5 rooms (id, name, building, capacity, blocked; no equipment, no bookings);
                       INITIAL_BOOKINGS: 6 bookings, each linked to a room by its name string
src/types.ts         — Booking, Room, Verdict types
src/booking.test.ts  — 26 Vitest tests for canBook (T01–T14, X1–X2, B01–B07, AC5, BUG-A, BUG-B), all pass
index.html, src/index.css, vite/tailwind/postcss/tsconfig configs — build and styling

Requirements that must NOT change (AC1–AC6):
AC1 Reject start >= end and requests in the past.
AC2 Enforce the maximum allowed duration (120 minutes).
AC3 Reject a blocked room.
AC4 Reject overlaps; allow bookings that only touch at endpoints.
AC5 Return Available / Unavailable without changing booking data.
AC6 Clear, responsive feedback on desktop and mobile.

New feature: a catalog of at least 4 fictional rooms, each with id, name, capacity, equipment list,
blocked status and its own bookings. Show only the rooms that match the user's requirements.
F1 Capacity filter: room capacity >= requested attendees.
F2 Equipment filter: the room must contain ALL selected items.
F3 A blocked room is never reported as available.
F4 A clear empty state when no rooms match.
F5 Changing the selected room refreshes the result; the check uses THAT room's bookings.

Constraints: no login, payments, live APIs or database; fictional data only. Fixed layout:
src/rooms.ts (type Room + const ROOMS), src/filter.ts filterRooms(rooms, { attendees, equipment }),
src/booking.ts canBook (unchanged) + checkRoom(rooms, roomId, { start, end, now }) that calls canBook.
App.tsx imports these and holds no room data and no rule of its own. The 26 existing tests must stay green.

Please:
1. List the maintainability risks in this code that matter for this change, each with the file,
   the function and the concrete evidence (lines).
2. Propose a prioritised plan of small, safe steps, smallest first, each testable on its own.
Do NOT write code yet and do NOT propose a full rewrite.
```

**Output used:**

```text
| R1 | App.tsx lines 50–58 + 166, canBook and evaluateAvailability | The verdict comes from canBook (L52).
The reason text comes from a second, separate engine (L56). [...] Blocked is checked first in
availability.ts L79 but fourth in booking.ts L19. [...] Every AC change has to be made twice. |
| R2 | App.tsx L31–34 vs L36–44 | The room is found by id (r.id === roomId), but its bookings are found
by name (b.room === room.name). | F5 requires the check to use that room's bookings. [...] |
[...]
| R5 | Magic numbers in 3 places: booking.ts L16 (1440) and L18 (120); availability.ts L8–9; App.tsx L139 [...] |
| R9 | App.tsx L132 toMinutes(...) || currentTime | 00:00 gives 0, which is falsy, so the sim clock can
never be set to midnight. |
[...]
Step 2: src/rooms.ts (new file, not wired in). [...] Port the 5 existing rooms and nest their 6 bookings.
Step 3: src/filter.ts filterRooms (pure, F1/F2/F4). [...]
Step 4: checkRoom in booking.ts (F3/F5/AC5). It looks up the room by id, then calls canBook({ start, end,
now, blocked: room.blocked, bookings: room.bookings }). The verdict comes only from canBook.
Step 5: Rewire App.tsx to rooms.ts + checkRoom. [...]
Step 6: Add the filter UI. [...] Clear roomId when the selected room drops out of the filtered list.
```

**Problems found:** (1) R1 says the two engines could show a red box with an empty reason; I compared `canBook` (booking.ts L16–21) with `evaluateAvailability` (availability.ts L72–92) and today they return false in the same cases, so it is a drift risk, not a current bug. (2) It proposed keeping `availability.ts` plus a parity sweep test, which keeps AC1–AC4 duplicated (see 3.3). (3) Its step 2 tests the demo `ROOMS` data, but README section 9 requires a fixed catalog inside the test file. (4) R8 and R11 describe future code, not something in the current files, so I did not list them as risks.

**Changes made:** kept R1, R2, R4+R6 (merged into risk 3), R5 and R9 after checking each line myself; rejected the parity test and the reason-only `availability.ts`; my plan in 3.2 deletes `availability.ts` and `sampleData.ts` and writes the filter and checkRoom tests against a catalog inside the test file.

**Verified by:** reading the cited lines in `App.tsx` (L31–58, L132, L139), `availability.ts` (L8–9, L59–61, L79) and `booking.ts` (L16–19) at baseline commit 658b750; the baseline run in 1.1 (26/26) is the reference every later step must keep green.

### 8.2 Exchange 2

**Tool and model:** Claude (claude.ai), Claude Opus 5.5
**Date:** 2026-11-16
**Purpose:** implementation and tests for plan steps 1–3: src/rooms.ts, filterRooms, checkRoom, src/rooms.test.ts

**Prompt:**

```text
Implement steps 1–3 of my plan in sis-04/app/src. Do not touch App.tsx, availability.ts or sampleData.ts yet.
1. src/rooms.ts: export type Room = { id, name, capacity, equipment: string[], blocked, bookings: { start, end }[] }
   and const ROOMS with the 5 rooms from sampleData.ts (same ids, names, capacities, blocked flags),
   their 6 bookings nested by room, plus a fictional equipment list (projector, whiteboard, mic, ...).
2. src/filter.ts: filterRooms(rooms, { attendees, equipment }) — F1 capacity >= attendees,
   F2 the room has ALL selected items (empty selection = no constraint). Must not mutate input.
3. src/booking.ts: keep canBook exactly as is; add checkRoom(rooms, roomId, { start, end, now }) that
   finds the room by id and calls canBook with that room's blocked and bookings; unknown id -> false.
4. A new test file src/rooms.test.ts with a FIXED catalog inside the file (not ROOMS), one test per case,
   no mocks, no test.each, IDs as words in titles: F1, F2, F3, F4, F5, B5, B6, INT.
   Expected values must come from the rules, not from running the code.
Also tell me which titles in booking.test.ts I should extend with B1, B2, B3, B4.
Keep the code compact.
```

**Output used:**

```text
// src/filter.ts
export function filterRooms(rooms: Room[], { attendees, equipment }: { attendees: number; equipment: string[] }): Room[] {
  return rooms.filter((r) => r.capacity >= attendees && equipment.every((e) => r.equipment.includes(e)));
}
// src/booking.ts (canBook unchanged, added below it)
export function checkRoom(rooms: Room[], roomId: string, { start, end, now }: { start: number; end: number; now: number }): boolean {
  const room = rooms.find((r) => r.id === roomId);
  return room ? canBook({ start, end, now, blocked: room.blocked, bookings: room.bookings }) : false;
}
// src/rooms.test.ts — fixed CATALOG a(10, projector, booked 600–660), b(20, projector+whiteboard),
// c(30, projector+whiteboard, blocked), d(8, whiteboard); 11 tests: F1, B5 F1, B6 F1, F2 x2, F4, F3,
// F5 x2, AC5 F5, INT [...]
Extend: T06 -> B1, T07 -> B2, T01 -> B3, T09 -> B4.
```

**Problems found:** (1) The first answer said to only add B1–B4 to the titles of T01, T06, T07 and T09, but those tests call my helper `check()`, not `canBook`, and README section 9 says B1–B4 must call `canBook` or `checkRoom`. (2) `rooms.ts` drops `bookedBy` from the bookings, because the fixed `Room` type has only `start` and `end`, so the page will no longer show who booked a slot.

**Changes made:** in T01, T06, T07 and T09 the helper call was replaced by a direct `canBook({ ..., bookings: fresh(ONE) })` with the same times and the same expected value; the frozen bookings still make any write throw. I accepted dropping `bookedBy` to keep the required `Room` shape. I checked each expected value in `rooms.test.ts` against F1–F5 by hand, e.g. F1 for 15 attendees must keep only the 20- and 30-seat rooms.

**Verified by:** `npx vitest run` in `app/` on my machine: `Test Files 2 passed (2)`, `Tests 37 passed (37)` (26 old + 11 new). The assistant also reported a mutation check: `every` → `some` fails 5 tests including F2, `>=` → `>` fails B5, `blocked: false` in checkRoom fails F3 and INT.

### 8.3 Exchange 3

**Tool and model:** (write here)
**Date:** (write here)
**Purpose:** (write here)

**Prompt:**

```text
(paste here)
```

**Output used:**

```text
(paste here)
```

**Problems found:** (write here)
**Changes made:** (write here)
**Verified by:** (write here)

## 9. Checker results and known fails

<!-- Every check still FAIL or ERROR in your last run of python tests/check_sis.py, and why.
     The same IDs go in submission.yml known_fails. None left? Write: none. -->

| Check | Why it still fails |
| --- | --- |
| (write here) | (write here) |

## 10. AI reflection (Task 6)

<!-- 200–300 words, your own words, no assistant. Answer all five:
     What context did you provide the AI assistant? Which generated suggestions were useful or
     incorrect? What did you personally verify? How did tests influence your engineering
     decisions? What would you improve next? -->

(write here)