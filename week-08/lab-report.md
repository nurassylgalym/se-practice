# Week 08 — Lab report

**Name:** Nurassyl Galym
**Group:** CSCI2208
**Date:** 2026-11-09

Fill in every section. **Do not delete, rename or renumber the headings.** The checker and the
grader find your answers by them. You can add rows to any table, but never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Assistant I debugged with (tool) | Claude (claude.ai web, Pro plan) |
| Exact model (with its version, or `not displayed`) | Claude Opus 5.5 (model picker shows "Opus 5.5") |
| Where the skill was installed (ChatGPT / Claude web / Claude Code / prompt-only simulation) | Claude web |
| Where I ran the tests (Bolt terminal / my computer / Codespace) | my computer (Windows, cmd) |
| Vitest version (the `RUN  v…` line of a run) | 3.2.4 |
| Language of my booking module (`ts` or `js`) — the file I copied from `buggy/` | ts |

---

## 2. Task 1 — baseline, buggy code, failing tests

### 2.1 My Week 07 suite on my own code

The **real** output of your Week 07 suite, run in `week-08/app/` **before** you replace
anything. It should be green. If it is not, say why under the block.

```text
 RUN  v3.2.4 C:/Users/Nurassyl Galym/Desktop/KBTU/Software Engineering/Lab Week 1/se-practice/week-08/app

 ✓ src/booking.test.ts (24 tests) 10ms
   ✓ canBook — plan T01–T14 > T01 AC4: 660–720 touches the booking end, allowed 3ms
   ✓ canBook — plan T01–T14 > T02 AC1: 540–570 starts exactly at now, rejected 0ms
   ✓ canBook — plan T01–T14 > T03 AC1: 720–720 zero duration, rejected 0ms
   ✓ canBook — plan T01–T14 > T04 AC1: 750–720 reversed, rejected 0ms
   ✓ canBook — plan T01–T14 > T05 AC1: 1380–1441 past the end of the day, rejected 0ms
   ✓ canBook — plan T01–T14 > T06 AC2: 720–840 exactly 120 minutes, allowed 0ms
   ✓ canBook — plan T01–T14 > T07 AC2: 720–841 is 121 minutes, rejected 0ms
   ✓ canBook — plan T01–T14 > T08 AC4: 570–600 touches the booking start, allowed 0ms
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

 Test Files  1 passed (1)
      Tests  24 passed (24)
   Start at  16:20:40
   Duration  1.68s (transform 74ms, setup 0ms, collect 71ms, tests 10ms, environment 0ms, prepare 202ms)
```

All 24 tests pass on my own Week 07 code (T01–T14, X1–X2, B01–B07, AC5).

### 2.2 The same suite on the provided canBook

You copied the whole `canBook` function from `buggy/booking.ts` (or `.js`) over yours and changed
nothing else. This is the real output:

```text
 RUN  v3.2.4 C:/Users/Nurassyl Galym/Desktop/KBTU/Software Engineering/Lab Week 1/se-practice/week-08/app

 ❯ src/booking.test.ts (24 tests | 9 failed) 19ms
   × canBook — plan T01–T14 > T01 AC4: 660–720 touches the booking end, allowed 10ms
     → expected false to be true // Object.is equality
   ✓ canBook — plan T01–T14 > T02 AC1: 540–570 starts exactly at now, rejected 0ms
   ✓ canBook — plan T01–T14 > T03 AC1: 720–720 zero duration, rejected 0ms
   ✓ canBook — plan T01–T14 > T04 AC1: 750–720 reversed, rejected 0ms
   ✓ canBook — plan T01–T14 > T05 AC1: 1380–1441 past the end of the day, rejected 0ms
   × canBook — plan T01–T14 > T06 AC2: 720–840 exactly 120 minutes, allowed 1ms
     → Cannot add property 1, object is not extensible
   ✓ canBook — plan T01–T14 > T07 AC2: 720–841 is 121 minutes, rejected 0ms
   × canBook — plan T01–T14 > T08 AC4: 570–600 touches the booking start, allowed 1ms
     → expected false to be true // Object.is equality
   ✓ canBook — plan T01–T14 > T09 AC4: 630–690 partial overlap, rejected 0ms
   ✓ canBook — plan T01–T14 > T10 AC4: 570–690 contains the booking, rejected 0ms
   ✓ canBook — plan T01–T14 > T11 AC4: 615–645 inside the booking, rejected 0ms
   ✓ canBook — plan T01–T14 > T12 AC4: 600–660 identical to the booking, rejected 0ms
   ✓ canBook — plan T01–T14 > T13 AC3: 660–720 in a blocked room, rejected 0ms
   × canBook — plan T01–T14 > T14 AC4: 630–690 with no bookings, allowed 0ms
     → Cannot add property 0, object is not extensible
   × canBook — own cases and extra boundaries > X1 AC1: 1380–1440 ends exactly at 24:00, allowed 0ms
     → Cannot add property 1, object is not extensible
   × canBook — own cases and extra boundaries > X2 AC4: 660–720 touches two bookings, allowed 1ms
     → expected false to be true // Object.is equality
   × canBook — own cases and extra boundaries > B01 AC1: 541–570 first minute after now, allowed 0ms
     → Cannot add property 1, object is not extensible
   ✓ canBook — own cases and extra boundaries > B02 AC1: 660–720 with now 700, rejected 0ms
   × canBook — own cases and extra boundaries > B03 AC1: 701–720 with now 700, allowed 0ms
     → Cannot add property 1, object is not extensible
   ✓ canBook — own cases and extra boundaries > B04 AC4: 659–720 one minute over the booking end, rejected 0ms
   ✓ canBook — own cases and extra boundaries > B05 AC4: 570–601 one minute into the booking start, rejected 0ms
   ✓ canBook — own cases and extra boundaries > B06 AC4: 700–750 overlaps only the second booking, rejected 0ms
   ✓ canBook — own cases and extra boundaries > B07 AC4: 630–690 overlaps a booking listed second in an unsorted list, rejected 0ms
   × canBook — data preservation > AC5: an Available request leaves the bookings unchanged 0ms
     → expected false to be true // Object.is equality

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 9 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > canBook — plan T01–T14 > T01 AC4: 660–720 touches the booking end, allowed
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:25:29
     23| describe('canBook — plan T01–T14', () => {
     24|   test('T01 AC4: 660–720 touches the booking end, allowed', () => {
     25|     expect(check(660, 720)).toBe(true);
       |                             ^
     26|   });
     27|   test('T02 AC1: 540–570 starts exactly at now, rejected', () => {

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/9]⎯

 FAIL  src/booking.test.ts > canBook — plan T01–T14 > T06 AC2: 720–840 exactly 120 minutes, allowed
TypeError: Cannot add property 1, object is not extensible
 ❯ Module.canBook src/booking.ts:24:12
     22|   }
     23|   // keep the room's list current with the slot that was just found f…
     24|   bookings.push({ start, end });
       |            ^
     25|   return true;
     26| }
 ❯ check src/booking.test.ts:18:18
 ❯ src/booking.test.ts:40:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/9]⎯

 FAIL  src/booking.test.ts > canBook — plan T01–T14 > T08 AC4: 570–600 touches the booking start, allowed
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:46:29
     44|   });
     45|   test('T08 AC4: 570–600 touches the booking start, allowed', () => {
     46|     expect(check(570, 600)).toBe(true);
       |                             ^
     47|   });
     48|   test('T09 AC4: 630–690 partial overlap, rejected', () => {

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/9]⎯

 FAIL  src/booking.test.ts > canBook — plan T01–T14 > T14 AC4: 630–690 with no bookings, allowed
TypeError: Cannot add property 0, object is not extensible
 ❯ Module.canBook src/booking.ts:24:12
     22|   }
     23|   // keep the room's list current with the slot that was just found f…
     24|   bookings.push({ start, end });
       |            ^
     25|   return true;
     26| }
 ❯ check src/booking.test.ts:18:18
 ❯ src/booking.test.ts:64:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/9]⎯

 FAIL  src/booking.test.ts > canBook — own cases and extra boundaries > X1 AC1: 1380–1440 ends exactly at 24:00, allowed
TypeError: Cannot add property 1, object is not extensible
 ❯ Module.canBook src/booking.ts:24:12
     22|   }
     23|   // keep the room's list current with the slot that was just found f…
     24|   bookings.push({ start, end });
       |            ^
     25|   return true;
     26| }
 ❯ check src/booking.test.ts:18:18
 ❯ src/booking.test.ts:70:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[5/9]⎯

 FAIL  src/booking.test.ts > canBook — own cases and extra boundaries > X2 AC4: 660–720 touches two bookings, allowed
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:73:48
     71|   });
     72|   test('X2 AC4: 660–720 touches two bookings, allowed', () => {
     73|     expect(check(660, 720, { bookings: TWO })).toBe(true);
       |                                                ^
     74|   });
     75|   test('B01 AC1: 541–570 first minute after now, allowed', () => {

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[6/9]⎯

 FAIL  src/booking.test.ts > canBook — own cases and extra boundaries > B01 AC1: 541–570 first minute after now, allowed
TypeError: Cannot add property 1, object is not extensible
 ❯ Module.canBook src/booking.ts:24:12
     22|   }
     23|   // keep the room's list current with the slot that was just found f…
     24|   bookings.push({ start, end });
       |            ^
     25|   return true;
     26| }
 ❯ check src/booking.test.ts:18:18
 ❯ src/booking.test.ts:76:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[7/9]⎯

 FAIL  src/booking.test.ts > canBook — own cases and extra boundaries > B03 AC1: 701–720 with now 700, allowed
TypeError: Cannot add property 1, object is not extensible
 ❯ Module.canBook src/booking.ts:24:12
     22|   }
     23|   // keep the room's list current with the slot that was just found f…
     24|   bookings.push({ start, end });
       |            ^
     25|   return true;
     26| }
 ❯ check src/booking.test.ts:18:18
 ❯ src/booking.test.ts:82:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[8/9]⎯

 FAIL  src/booking.test.ts > canBook — data preservation > AC5: an Available request leaves the bookings unchanged
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:102:83
    100|     const bookings = [{ start: 600, end: 660 }];
    101|     const before = structuredClone(bookings);
    102|     expect(canBook({ start: 660, end: 720, now: NOW, blocked: false, …
       |                                                                                   ^
    103|     expect(bookings).toEqual(before);
    104|   });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[9/9]⎯


 Test Files  1 failed (1)
      Tests  9 failed | 15 passed (24)
   Start at  16:27:58
   Duration  1.91s (transform 85ms, setup 0ms, collect 87ms, tests 19ms, environment 0ms, prepare 206ms)
```

9 of 24 tests fail on the provided canBook. Two kinds of failure: T01, T08, X2 and AC5 return `false` for a request that only touches a booking (BUG-A). T06, T14, X1, B01 and B03 throw `TypeError: Cannot add property …, object is not extensible` at `bookings.push` (line 24), because my Week 07 helper `fresh()` passes a frozen array (BUG-B). AC5 fails for the wrong reason: its request 660–720 touches the booking, so BUG-A rejects it before the push is ever reached.


### 2.3 One failing test per bug

Add the two regression tests from README Part 1, step 5: one named `BUG-A` and one named `BUG-B`.
Run them **on the buggy code**. Both must fail here. That is the evidence that each test can see
its bug.

```text
 RUN  v3.2.4 C:/Users/Nurassyl Galym/Desktop/KBTU/Software Engineering/Lab Week 1/se-practice/week-08/app

 ❯ src/booking.test.ts (26 tests | 11 failed) 34ms
   × canBook — plan T01–T14 > T01 AC4: 660–720 touches the booking end, allowed 15ms
     → expected false to be true // Object.is equality
   ✓ canBook — plan T01–T14 > T02 AC1: 540–570 starts exactly at now, rejected 1ms
   ✓ canBook — plan T01–T14 > T03 AC1: 720–720 zero duration, rejected 0ms
   ✓ canBook — plan T01–T14 > T04 AC1: 750–720 reversed, rejected 0ms
   ✓ canBook — plan T01–T14 > T05 AC1: 1380–1441 past the end of the day, rejected 0ms
   × canBook — plan T01–T14 > T06 AC2: 720–840 exactly 120 minutes, allowed 1ms
     → Cannot add property 1, object is not extensible
   ✓ canBook — plan T01–T14 > T07 AC2: 720–841 is 121 minutes, rejected 0ms
   × canBook — plan T01–T14 > T08 AC4: 570–600 touches the booking start, allowed 1ms
     → expected false to be true // Object.is equality
   ✓ canBook — plan T01–T14 > T09 AC4: 630–690 partial overlap, rejected 0ms
   ✓ canBook — plan T01–T14 > T10 AC4: 570–690 contains the booking, rejected 0ms
   ✓ canBook — plan T01–T14 > T11 AC4: 615–645 inside the booking, rejected 0ms
   ✓ canBook — plan T01–T14 > T12 AC4: 600–660 identical to the booking, rejected 0ms
   ✓ canBook — plan T01–T14 > T13 AC3: 660–720 in a blocked room, rejected 0ms
   × canBook — plan T01–T14 > T14 AC4: 630–690 with no bookings, allowed 0ms
     → Cannot add property 0, object is not extensible
   × canBook — own cases and extra boundaries > X1 AC1: 1380–1440 ends exactly at 24:00, allowed 1ms
     → Cannot add property 1, object is not extensible
   × canBook — own cases and extra boundaries > X2 AC4: 660–720 touches two bookings, allowed 1ms
     → expected false to be true // Object.is equality
   × canBook — own cases and extra boundaries > B01 AC1: 541–570 first minute after now, allowed 0ms
     → Cannot add property 1, object is not extensible
   ✓ canBook — own cases and extra boundaries > B02 AC1: 660–720 with now 700, rejected 0ms
   × canBook — own cases and extra boundaries > B03 AC1: 701–720 with now 700, allowed 1ms
     → Cannot add property 1, object is not extensible
   ✓ canBook — own cases and extra boundaries > B04 AC4: 659–720 one minute over the booking end, rejected 0ms
   ✓ canBook — own cases and extra boundaries > B05 AC4: 570–601 one minute into the booking start, rejected 0ms
   ✓ canBook — own cases and extra boundaries > B06 AC4: 700–750 overlaps only the second booking, rejected 0ms
   ✓ canBook — own cases and extra boundaries > B07 AC4: 630–690 overlaps a booking listed second in an unsorted list, rejected 0ms
   × canBook — data preservation > AC5: an Available request leaves the bookings unchanged 1ms
     → expected false to be true // Object.is equality
   × canBook — regression tests for the provided bugs > BUG-A AC4: 690–720 touches only the start of the second booking, allowed 1ms
     → expected false to be true // Object.is equality
   × canBook — regression tests for the provided bugs > BUG-B AC5: 720–780 touches nothing, Available, bookings unchanged 4ms
     → expected [ { start: 600, end: 660 }, …(1) ] to deeply equal [ { start: 600, end: 660 } ]

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 11 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > canBook — plan T01–T14 > T01 AC4: 660–720 touches the booking end, allowed
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:25:29
     23| describe('canBook — plan T01–T14', () => {
     24|   test('T01 AC4: 660–720 touches the booking end, allowed', () => {
     25|     expect(check(660, 720)).toBe(true);
       |                             ^
     26|   });
     27|   test('T02 AC1: 540–570 starts exactly at now, rejected', () => {

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/11]⎯

 FAIL  src/booking.test.ts > canBook — plan T01–T14 > T06 AC2: 720–840 exactly 120 minutes, allowed
TypeError: Cannot add property 1, object is not extensible
 ❯ Module.canBook src/booking.ts:24:12
     22|   }
     23|   // keep the room's list current with the slot that was just found f…
     24|   bookings.push({ start, end });
       |            ^
     25|   return true;
     26| }
 ❯ check src/booking.test.ts:18:18
 ❯ src/booking.test.ts:40:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/11]⎯

 FAIL  src/booking.test.ts > canBook — plan T01–T14 > T08 AC4: 570–600 touches the booking start, allowed
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:46:29
     44|   });
     45|   test('T08 AC4: 570–600 touches the booking start, allowed', () => {
     46|     expect(check(570, 600)).toBe(true);
       |                             ^
     47|   });
     48|   test('T09 AC4: 630–690 partial overlap, rejected', () => {

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/11]⎯

 FAIL  src/booking.test.ts > canBook — plan T01–T14 > T14 AC4: 630–690 with no bookings, allowed
TypeError: Cannot add property 0, object is not extensible
 ❯ Module.canBook src/booking.ts:24:12
     22|   }
     23|   // keep the room's list current with the slot that was just found f…
     24|   bookings.push({ start, end });
       |            ^
     25|   return true;
     26| }
 ❯ check src/booking.test.ts:18:18
 ❯ src/booking.test.ts:64:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/11]⎯

 FAIL  src/booking.test.ts > canBook — own cases and extra boundaries > X1 AC1: 1380–1440 ends exactly at 24:00, allowed
TypeError: Cannot add property 1, object is not extensible
 ❯ Module.canBook src/booking.ts:24:12
     22|   }
     23|   // keep the room's list current with the slot that was just found f…
     24|   bookings.push({ start, end });
       |            ^
     25|   return true;
     26| }
 ❯ check src/booking.test.ts:18:18
 ❯ src/booking.test.ts:70:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[5/11]⎯

 FAIL  src/booking.test.ts > canBook — own cases and extra boundaries > X2 AC4: 660–720 touches two bookings, allowed
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:73:48
     71|   });
     72|   test('X2 AC4: 660–720 touches two bookings, allowed', () => {
     73|     expect(check(660, 720, { bookings: TWO })).toBe(true);
       |                                                ^
     74|   });
     75|   test('B01 AC1: 541–570 first minute after now, allowed', () => {

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[6/11]⎯

 FAIL  src/booking.test.ts > canBook — own cases and extra boundaries > B01 AC1: 541–570 first minute after now, allowed
TypeError: Cannot add property 1, object is not extensible
 ❯ Module.canBook src/booking.ts:24:12
     22|   }
     23|   // keep the room's list current with the slot that was just found f…
     24|   bookings.push({ start, end });
       |            ^
     25|   return true;
     26| }
 ❯ check src/booking.test.ts:18:18
 ❯ src/booking.test.ts:76:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[7/11]⎯

 FAIL  src/booking.test.ts > canBook — own cases and extra boundaries > B03 AC1: 701–720 with now 700, allowed
TypeError: Cannot add property 1, object is not extensible
 ❯ Module.canBook src/booking.ts:24:12
     22|   }
     23|   // keep the room's list current with the slot that was just found f…
     24|   bookings.push({ start, end });
       |            ^
     25|   return true;
     26| }
 ❯ check src/booking.test.ts:18:18
 ❯ src/booking.test.ts:82:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[8/11]⎯

 FAIL  src/booking.test.ts > canBook — data preservation > AC5: an Available request leaves the bookings unchanged
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:102:83
    100|     const bookings = [{ start: 600, end: 660 }];
    101|     const before = structuredClone(bookings);
    102|     expect(canBook({ start: 660, end: 720, now: NOW, blocked: false, …
       |                                                                                   ^
    103|     expect(bookings).toEqual(before);
    104|   });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[9/11]⎯

 FAIL  src/booking.test.ts > canBook — regression tests for the provided bugs > BUG-A AC4: 690–720 touches only the start of the second booking, allowed
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:110:83
    108|   test('BUG-A AC4: 690–720 touches only the start of the second booki…
    109|     const bookings = [{ start: 600, end: 660 }, { start: 720, end: 78…
    110|     expect(canBook({ start: 690, end: 720, now: NOW, blocked: false, …
       |                                                                                   ^
    111|   });
    112|   test('BUG-B AC5: 720–780 touches nothing, Available, bookings uncha…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[10/11]⎯

 FAIL  src/booking.test.ts > canBook — regression tests for the provided bugs > BUG-B AC5: 720–780 touches nothing, Available, bookings unchanged
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to deeply equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 780,
+     "start": 720,
+   },
  ]

 ❯ src/booking.test.ts:116:22
    114|     const before = structuredClone(bookings);
    115|     expect(canBook({ start: 720, end: 780, now: NOW, blocked: false, …
    116|     expect(bookings).toEqual(before);
       |                      ^
    117|   });
    118| });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[11/11]⎯


 Test Files  1 failed (1)
      Tests  11 failed | 15 passed (26)
   Start at  16:32:16
   Duration  1.02s (transform 92ms, setup 0ms, collect 112ms, tests 34ms, environment 0ms, prepare 163ms)
```

Both regression tests fail on the buggy code, each for its own reason. `BUG-A` (690–720, touches only the start of the second booking) gets `false` instead of `true`. `BUG-B` (720–780, touches nothing) gets the right answer `true`, but afterwards `bookings` has an extra element `{ start: 720, end: 780 }`, so the comparison with the copy fails. That is the failure for the right reason that my Week 07 AC5 test could not show.


---

## 3. Defect log

One row per defect. At least **BUG-A and BUG-B**. "Suspected cause" is your hypothesis
**before** you ask any assistant: the line and why.

| Defect | Test ID | Input | Expected | Actual | Suspected cause (line and why) |
| --- | --- | --- | --- | --- | --- |
| BUG-A | T01 (also T08, X2, `BUG-A`) | 660–720, now 540, bookings [600–660] | `true`: it only touches the booking at 660 (AC4) | `false` | Line 21 `if (start <= b.end && end >= b.start) return false;`. The comparisons are not strict: 660 <= 660 is true, so a request that starts exactly when a booking ends counts as an overlap. Should be `start < b.end && end > b.start`. |
| BUG-B | `BUG-B` (also T06, T14, X1, B01, B03) | 720–780, now 540, bookings [600–660] | `true`, and bookings still [600–660] (AC5) | `true`, but bookings become [600–660, 720–780]; on my frozen fixtures `TypeError: Cannot add property …, object is not extensible` | Line 24 `bookings.push({ start, end });`. The function writes the request into the caller's array, so checking availability changes booking data. A check should only read. The line should be deleted. My Week 07 AC5 test did not catch it: its request 660–720 touches the booking, so BUG-A returns `false` before the push is reached. |

---

## 4. Tasks 2–3 — the skill

**The checks from the deck, before you zip it.** Answer each one yes / no:

| Check | yes / no |
| --- | --- |
| The file is plain UTF-8 text, named exactly `SKILL.md` (not `SKILL.md.txt`) | yes |
| The first and the closing YAML delimiter are exactly three hyphens: `---` | yes |
| `name` is lowercase with hyphens, and `description` says WHEN to use it | yes |
| I read the whole file once: no passwords, API keys or private student data | yes |

**The contents of `skills/bug-detector.zip`.** Paste the listing (Windows: open the ZIP and copy
the paths; macOS/Linux: `unzip -l skills/bug-detector.zip`):

```text
Archive:  bug-detector.zip
  Length      Date    Time    Name
---------  ---------- -----   ----
        0  2026-11-09 16:37   bug-detector/
      570  2026-11-09 16:37   bug-detector/SKILL.md
---------                     -------
      570                     2 files
```

**Installation.** Where you uploaded it, what the upload said, and whether a new chat showed the
skill as enabled. If upload was not available, write `prompt-only simulation` and say why.
Screenshot of the result: `evidence/install.png`.

<!-- Write below this line -->

I uploaded `skills/bug-detector.zip` on claude.ai (Pro plan): Персонализация (Customize) → Skills → upload. The upload gave no validation errors and showed the notice "Загружено: bug-detector". The skill page lists `bug-detector`, v1, with one file `SKILL.md` and the same seven steps, and the toggle is on (enabled). Screenshot: `evidence/install.png`.

Note on how the file was made: the text of `SKILL.md` was copied word for word from README Part 2, step 3, and the ZIP was built with Claude's help, with my instructor's permission. I did not type it by hand. This is disclosed in `AI_USAGE.md`.


---

## 5. Task 4 — without the skill

A **fresh chat, with no skill enabled**. Paste exactly what you sent: the deck's question, then
the same input you will use in section 6 (AC1–AC6, the failing test output, the code of
`canBook`):

```text
~~~
  Find the root cause of the failed room-booking test. Propose minimal patch and regression test. Do not edit code.
~~~

Scenario: Smart Campus room availability. Continue the Smart Campus project from Practice #06 and the tests from Practice #07.
User story: As a student, I want to check a room's availability so that I can choose a valid booking time.
Use one room, fictional bookings, fixed time, and a Boolean availability decision. No login or database.

AC1 Reject start ≥ end and requests in the past.
AC2 Enforce the maximum allowed duration (120 minutes).
AC3 Reject a blocked room.
AC4 Reject overlaps; allow bookings that only touch at endpoints.
AC5 Return Available / Unavailable without changing booking data.
AC6 Preserve clear UI feedback on desktop and mobile.

Failing test output:
 FAIL  src/booking.test.ts > canBook — plan T01–T14 > T01 AC4: 660–720 touches the booking end, allowed
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:25:29
     23| describe('canBook — plan T01–T14', () => {
     24|   test('T01 AC4: 660–720 touches the booking end, allowed', () => {
     25|     expect(check(660, 720)).toBe(true);
       |                             ^
     26|   });
     27|   test('T02 AC1: 540–570 starts exactly at now, rejected', () => {

Code of canBook:
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
    if (start <= b.end && end >= b.start) return false;
  }
  // keep the room's list current with the slot that was just found free
  bookings.push({ start, end });
  return true;
}
```

**The assistant's answer, pasted unedited:**

```text
Root cause
The bug is in the overlap check. It uses inclusive comparisons:

~~~ts
if (start <= b.end && end >= b.start) return false;

~~~

This treats two intervals that only share an endpoint as overlapping. T01 asks for 660–720 next to an existing booking that ends at 660, presumably 600–660. The check then runs as:

* `660 <= 660` → true
* `720 >= 600` → true

So the function returns `false`, and the test expects `true`. That contradicts AC4: "allow bookings that only touch at endpoints". Nothing earlier in the function fails this request. 660–720 is a valid range, it's in the future, it's exactly 120 minutes (`120 > 120` is false), and the room isn't blocked. The overlap line is the only cause.
Second defect (not the cause of T01, but related)

~~~ts
bookings.push({ start, end });

~~~

This line breaks AC5 ("without changing booking data"). It's a check function, but it writes into the caller's array. If the tests share one bookings fixture, each successful `check()` adds a phantom booking. Later tests then fail or pass depending on the order they run in. That makes failures hard to track down, and it could hide the boundary bug or make a similar one appear elsewhere.
Minimal patch (proposed, not applied)

~~~diff
   for (const b of bookings) {
-    if (start <= b.end && end >= b.start) return false;
+    if (start < b.end && end > b.start) return false;
   }
-  // keep the room's list current with the slot that was just found free
-  bookings.push({ start, end });
   return true;

~~~

The first change fixes T01. The second is a deletion so the function no longer has the AC5 side effect. Nothing else changes.
Regression tests

~~~ts
describe('canBook — regression: AC4 boundaries & AC5 purity', () => {
  const base = { now: 540, blocked: false };
  const one = () => [{ start: 600, end: 660 }];

  test('R01 AC4: touching existing end is allowed', () => {
    expect(canBook({ ...base, start: 660, end: 720, bookings: one() })).toBe(true);
  });
  test('R02 AC4: touching existing start is allowed', () => {
    expect(canBook({ ...base, start: 560, end: 600, bookings: one() })).toBe(true);
  });
  test('R03 AC4: 1-minute overlap at either edge is rejected', () => {
    expect(canBook({ ...base, start: 659, end: 720, bookings: one() })).toBe(false);
    expect(canBook({ ...base, start: 560, end: 601, bookings: one() })).toBe(false);
  });
  test('R04 AC5: bookings array is not mutated', () => {
    const bookings = Object.freeze(one()) as { start: number; end: number }[];
    expect(() => canBook({ ...base, start: 660, end: 720, bookings })).not.toThrow();
    expect(bookings).toEqual([{ start: 600, end: 660 }]);
  });
  test('R05 AC5: same request twice gives the same answer', () => {
    const bookings = one();
    expect(canBook({ ...base, start: 660, end: 720, bookings })).toBe(true);
    expect(canBook({ ...base, start: 660, end: 720, bookings })).toBe(true);
  });
});

~~~

* R01–R03 cover both edges of the boundary, so changing `<` back to `<=` on either side fails a test.
* R04 catches any write to the bookings array: `push` on a frozen array throws.
* R05 catches the phantom-booking effect. With the current code, the second call returns `false`.

Each test builds its own bookings array, so the results don't depend on the order the tests run in.
```

Sent in a fresh chat on claude.ai (Opus 5.5), outside any project, with `bug-detector` switched off. The answer is pasted as copied. Its inner code fences (and the fences I put around the question) are shown as `~~~` so this report's code block stays intact. No other change.

---

## 6. Task 5 — with the skill

**Another fresh chat, with `bug-detector` enabled.** Send exactly the same input as in section 5.
Only the question changes, to the deck's skill question:

```text
~~~
  Use the bug-detector skill to diagnose the failed room-booking test.
~~~

Scenario: Smart Campus room availability. Continue the Smart Campus project from Practice #06 and the tests from Practice #07.
User story: As a student, I want to check a room's availability so that I can choose a valid booking time.
Use one room, fictional bookings, fixed time, and a Boolean availability decision. No login or database.

AC1 Reject start ≥ end and requests in the past.
AC2 Enforce the maximum allowed duration (120 minutes).
AC3 Reject a blocked room.
AC4 Reject overlaps; allow bookings that only touch at endpoints.
AC5 Return Available / Unavailable without changing booking data.
AC6 Preserve clear UI feedback on desktop and mobile.

Failing test output:
 FAIL  src/booking.test.ts > canBook — plan T01–T14 > T01 AC4: 660–720 touches the booking end, allowed
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:25:29
     23| describe('canBook — plan T01–T14', () => {
     24|   test('T01 AC4: 660–720 touches the booking end, allowed', () => {
     25|     expect(check(660, 720)).toBe(true);
       |                             ^
     26|   });
     27|   test('T02 AC1: 540–570 starts exactly at now, rejected', () => {

Code of canBook:
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
    if (start <= b.end && end >= b.start) return false;
  }
  // keep the room's list current with the slot that was just found free
  bookings.push({ start, end });
  return true;
}
```

**The assistant's answer, pasted unedited:**

```text
I'll load the bug-detector skill and run the diagnosis.
The test fails because the overlap check counts touching endpoints as a clash. There's also a second bug: the function changes the bookings list. I reproduced both with a small script, assuming the test fixture has one booking at 600–660 and `now = 540` (T02 suggests 540 is "now"). I haven't seen your `check()` helper, so that fixture is a guess.
1. Touching endpoints are rejected (AC4). Confirmed, and it's why T01 fails.

* Evidence: `canBook` returns `false` for 660–720 against a 600–660 booking. It also returns `false` for 550–600, which touches the booking's start, so the bug hits both ends.
* Root cause: the overlap check uses inclusive comparisons: 

~~~ts
if (start <= b.end && end >= b.start) return false;

~~~

When `start === b.end` (660 ≤ 660), that counts as an overlap. AC4 treats slots as half-open, `[start, end)`, so touching is allowed.
* Fix: 

~~~ts
if (start < b.end && end > b.start) return false;

~~~

* Regression tests:
   * 660–720 → `true`
   * 550–600 → `true` (touches the start)
   * 659–720 → `false` (overlaps by 1 minute)
   * 600–660 → `false` (same slot)

2. A plain availability check changes the booking data (AC5). Confirmed.

* Evidence: after checking a free slot at 700–760, the caller's `bookings` array also contains `{700, 760}`. Checking the same slot again then returns `false`.
* Root cause: `bookings.push({ start, end });` right before `return true`. The comment says it keeps the list current, but AC5 says checking must not change booking data.
* Fix: delete that line and its comment.
* Regression test: 

~~~ts
const b = [{ start: 600, end: 660 }];const snap = structuredClone(b);canBook({ start: 700, end: 760, now: 540, blocked: false, bookings: b });expect(b).toEqual(snap);

~~~

Calling it twice in a row on the same free slot should also return `true` both times.

Not confirmed:

* If your tests share one fixture array, the `push` could make later tests in T01–T14 fail depending on order. Fixing bug 1 alone might not make the whole suite pass until bug 2 is fixed too.
* AC1–AC3 look right: the `start > now` check, the 120-minute limit, and the blocked-room check all look correct.
* I can't judge AC6 (UI feedback on desktop and mobile) from this function.

I haven't edited the code, since the skill says to diagnose first. Tell me if you want both fixes applied and the tests added.
```

Fresh chat on claude.ai (Opus 5.5), outside any project, with `bug-detector` switched on. Pasted as copied; inner code fences shown as `~~~`, as in section 5.

Did the environment show that the skill was invoked? yes. The answer opens with "I'll load the bug-detector skill", and its layout follows the skill's steps: evidence, root cause, fix, test, then a separate "Not confirmed" list (step 4).

---

## 7. Comparison — judged against the actual code

Do not assume the skill did better. Judge both answers against the code and against what your
tests showed. Write a short verdict in each cell, and give a reason where they differ.

| Criterion | No skill | With skill |
| --- | --- | --- |
| Correct root cause | Correct for BUG-A: names the `<=`/`>=` line and shows `660 <= 660`. Also names `bookings.push` as a second AC5 defect, though the input showed only T01. | Correct for both, as two numbered defects, each with its own evidence. Adds 550–600 to show the bug hits the start side as well as the end. |
| Reproducible test | Five tests with fresh fixtures, but the AC5 ones use 660–720, a touching request. On the buggy code R04 **passes** (BUG-A returns `false` before the push, so nothing throws and nothing changes), and R05 fails on its first call because of BUG-A. Neither test can see BUG-B while BUG-A is there. | The BUG-B test uses 700–760, which touches nothing, so it fails for the right reason, like my own `BUG-B` test. Weak spot: it does not assert `.toBe(true)` on the result, so a `canBook` that always returns `false` would pass it. The code was copied onto one line. |
| Minimal proposed patch | Right two changes, but given as one diff for both bugs that also deletes the comment (3 lines). The lab wants one change per bug. Did not edit code. | The same two changes, but split per bug, so they map onto my two commits. Also says to delete the comment. Did not edit code; offered to apply the fixes only if asked. |
| Unsupported claims | Two wrong statements: "660–720 is exactly 120 minutes" (it is 60), and "with the current code, the second call [of R05] returns false" (the first call already returns `false`, because of BUG-A). | None wrong that I could find: I checked 550–600, 700–760 and the second call against the code by hand. "I reproduced both with a small script" is something I cannot verify. It marks the fixture (600–660, now 540) as a guess, which is right. |
| Clarity of explanation | Clear and well argued, one cause per bug, but mixes confirmed facts with "if the tests share one fixture" speculation in the same section. | Clearer: confirmed defects and "Not confirmed" points are in separate lists (skill step 4), and AC1–AC3 and AC6 are explicitly marked as checked or out of scope. |

**Which bugs did each answer find?** (BUG-A, BUG-B, both, neither)

- No skill: both, BUG-A as the cause of T01 and BUG-B as a second defect.
- With skill: both, each marked as confirmed, with separate evidence and a separate fix.
- Neither answer could know that my Week 07 fixtures are frozen, so neither predicted the `TypeError` in T06, T14, X1, B01 and B03. My test run showed that, not the assistants.

---

## 8. Task 6 — repair and regression

Review the proposed patch yourself, then make **one minimal change per bug**, one commit each.
Rerun the test that was failing, then the full suite.

### 8.1 The BUG-A patch

The change as a diff (`git diff`, or the old and the new line), then the real run:

```text
diff --git a/week-08/app/src/booking.ts b/week-08/app/src/booking.ts
index 1f12ebb..290596f 100644
--- a/week-08/app/src/booking.ts
+++ b/week-08/app/src/booking.ts
@@ -18,7 +18,7 @@ export function canBook({ start, end, now, blocked, bookings }: {
   if (end - start > 120) return false;
   if (blocked) return false;
   for (const b of bookings) {
-    if (start <= b.end && end >= b.start) return false;
+    if (start < b.end && end > b.start) return false;
   }
   // keep the room's list current with the slot that was just found free
   bookings.push({ start, end });

> npx vitest run -t "BUG-A"

 RUN  v3.2.4 C:/Users/Nurassyl Galym/Desktop/KBTU/Software Engineering/Lab Week 1/se-practice/week-08/app

 ✓ src/booking.test.ts (26 tests | 25 skipped) 5ms
   ↓ canBook — plan T01–T14 > T01 AC4: 660–720 touches the booking end, allowed
   ↓ canBook — plan T01–T14 > T02 AC1: 540–570 starts exactly at now, rejected
   ↓ canBook — plan T01–T14 > T03 AC1: 720–720 zero duration, rejected
   ↓ canBook — plan T01–T14 > T04 AC1: 750–720 reversed, rejected
   ↓ canBook — plan T01–T14 > T05 AC1: 1380–1441 past the end of the day, rejected
   ↓ canBook — plan T01–T14 > T06 AC2: 720–840 exactly 120 minutes, allowed
   ↓ canBook — plan T01–T14 > T07 AC2: 720–841 is 121 minutes, rejected
   ↓ canBook — plan T01–T14 > T08 AC4: 570–600 touches the booking start, allowed
   ↓ canBook — plan T01–T14 > T09 AC4: 630–690 partial overlap, rejected
   ↓ canBook — plan T01–T14 > T10 AC4: 570–690 contains the booking, rejected
   ↓ canBook — plan T01–T14 > T11 AC4: 615–645 inside the booking, rejected
   ↓ canBook — plan T01–T14 > T12 AC4: 600–660 identical to the booking, rejected
   ↓ canBook — plan T01–T14 > T13 AC3: 660–720 in a blocked room, rejected
   ↓ canBook — plan T01–T14 > T14 AC4: 630–690 with no bookings, allowed
   ↓ canBook — own cases and extra boundaries > X1 AC1: 1380–1440 ends exactly at 24:00, allowed
   ↓ canBook — own cases and extra boundaries > X2 AC4: 660–720 touches two bookings, allowed
   ↓ canBook — own cases and extra boundaries > B01 AC1: 541–570 first minute after now, allowed
   ↓ canBook — own cases and extra boundaries > B02 AC1: 660–720 with now 700, rejected
   ↓ canBook — own cases and extra boundaries > B03 AC1: 701–720 with now 700, allowed
   ↓ canBook — own cases and extra boundaries > B04 AC4: 659–720 one minute over the booking end, rejected
   ↓ canBook — own cases and extra boundaries > B05 AC4: 570–601 one minute into the booking start, rejected
   ↓ canBook — own cases and extra boundaries > B06 AC4: 700–750 overlaps only the second booking, rejected
   ↓ canBook — own cases and extra boundaries > B07 AC4: 630–690 overlaps a booking listed second in an unsorted list, rejected
   ↓ canBook — data preservation > AC5: an Available request leaves the bookings unchanged
   ✓ canBook — regression tests for the provided bugs > BUG-A AC4: 690–720 touches only the start of the second booking, allowed 2ms
   ↓ canBook — regression tests for the provided bugs > BUG-B AC5: 720–780 touches nothing, Available, bookings unchanged

 Test Files  1 passed (1)
      Tests  1 passed | 25 skipped (26)
   Start at  17:06:38
   Duration  823ms (transform 65ms, setup 0ms, collect 75ms, tests 5ms, environment 0ms, prepare 197ms)

> npx vitest run

 RUN  v3.2.4 C:/Users/Nurassyl Galym/Desktop/KBTU/Software Engineering/Lab Week 1/se-practice/week-08/app

 ❯ src/booking.test.ts (26 tests | 10 failed) 48ms
   × canBook — plan T01–T14 > T01 AC4: 660–720 touches the booking end, allowed 13ms
     → Cannot add property 1, object is not extensible
   ✓ canBook — plan T01–T14 > T02 AC1: 540–570 starts exactly at now, rejected 2ms
   ✓ canBook — plan T01–T14 > T03 AC1: 720–720 zero duration, rejected 1ms
   ✓ canBook — plan T01–T14 > T04 AC1: 750–720 reversed, rejected 1ms
   ✓ canBook — plan T01–T14 > T05 AC1: 1380–1441 past the end of the day, rejected 0ms
   × canBook — plan T01–T14 > T06 AC2: 720–840 exactly 120 minutes, allowed 1ms
     → Cannot add property 1, object is not extensible
   ✓ canBook — plan T01–T14 > T07 AC2: 720–841 is 121 minutes, rejected 0ms
   × canBook — plan T01–T14 > T08 AC4: 570–600 touches the booking start, allowed 1ms
     → Cannot add property 1, object is not extensible
   ✓ canBook — plan T01–T14 > T09 AC4: 630–690 partial overlap, rejected 1ms
   ✓ canBook — plan T01–T14 > T10 AC4: 570–690 contains the booking, rejected 0ms
   ✓ canBook — plan T01–T14 > T11 AC4: 615–645 inside the booking, rejected 0ms
   ✓ canBook — plan T01–T14 > T12 AC4: 600–660 identical to the booking, rejected 0ms
   ✓ canBook — plan T01–T14 > T13 AC3: 660–720 in a blocked room, rejected 0ms
   × canBook — plan T01–T14 > T14 AC4: 630–690 with no bookings, allowed 1ms
     → Cannot add property 0, object is not extensible
   × canBook — own cases and extra boundaries > X1 AC1: 1380–1440 ends exactly at 24:00, allowed 2ms
     → Cannot add property 1, object is not extensible
   × canBook — own cases and extra boundaries > X2 AC4: 660–720 touches two bookings, allowed 3ms
     → Cannot add property 2, object is not extensible
   × canBook — own cases and extra boundaries > B01 AC1: 541–570 first minute after now, allowed 2ms
     → Cannot add property 1, object is not extensible
   ✓ canBook — own cases and extra boundaries > B02 AC1: 660–720 with now 700, rejected 1ms
   × canBook — own cases and extra boundaries > B03 AC1: 701–720 with now 700, allowed 1ms
     → Cannot add property 1, object is not extensible
   ✓ canBook — own cases and extra boundaries > B04 AC4: 659–720 one minute over the booking end, rejected 0ms
   ✓ canBook — own cases and extra boundaries > B05 AC4: 570–601 one minute into the booking start, rejected 0ms
   ✓ canBook — own cases and extra boundaries > B06 AC4: 700–750 overlaps only the second booking, rejected 0ms
   ✓ canBook — own cases and extra boundaries > B07 AC4: 630–690 overlaps a booking listed second in an unsorted list, rejected 0ms
   × canBook — data preservation > AC5: an Available request leaves the bookings unchanged 11ms
     → expected [ { start: 600, end: 660 }, …(1) ] to deeply equal [ { start: 600, end: 660 } ]
   ✓ canBook — regression tests for the provided bugs > BUG-A AC4: 690–720 touches only the start of the second booking, allowed 1ms
   × canBook — regression tests for the provided bugs > BUG-B AC5: 720–780 touches nothing, Available, bookings unchanged 2ms
     → expected [ { start: 600, end: 660 }, …(1) ] to deeply equal [ { start: 600, end: 660 } ]

 [the 10 detailed failure blocks are left out here: T01, T06, T08, T14, X1, X2, B01, B03 all point at
  "TypeError ... booking.ts:24:12  bookings.push({ start, end });"; AC5 and BUG-B show the extra element
  { start: 660, end: 720 } / { start: 720, end: 780 } in bookings]

 Test Files  1 failed (1)
      Tests  10 failed | 16 passed (26)
   Start at  17:06:45
   Duration  1.17s (transform 76ms, setup 0ms, collect 108ms, tests 48ms, environment 0ms, prepare 259ms)
```

The BUG-A test passes after the one-line change. The full suite still has 10 failures, and all of them are BUG-B: T01, T08 and X2 used to fail on `false` (BUG-A) and now get past the overlap check, reach `bookings.push` on my frozen fixtures and throw `TypeError`. AC5 now fails for its real reason, the extra `{ start: 660, end: 720 }`. So BUG-A was hiding BUG-B in these tests. The only part I left out of the full run is the ten detailed failure blocks, as noted inside the block.


### 8.2 The BUG-B patch and the final run

The change as a diff, then the real output of the **full** suite. Every test must pass.

```text
diff --git a/week-08/app/src/booking.ts b/week-08/app/src/booking.ts
index 290596f..a2655ac 100644
--- a/week-08/app/src/booking.ts
+++ b/week-08/app/src/booking.ts
@@ -20,7 +20,5 @@ export function canBook({ start, end, now, blocked, bookings }: {
   for (const b of bookings) {
     if (start < b.end && end > b.start) return false;
   }
-  // keep the room's list current with the slot that was just found free
-  bookings.push({ start, end });
   return true;
 }
\ No newline at end of file

> npx vitest run -t "BUG-B"

 RUN  v3.2.4 C:/Users/Nurassyl Galym/Desktop/KBTU/Software Engineering/Lab Week 1/se-practice/week-08/app

 ✓ src/booking.test.ts (26 tests | 25 skipped) 4ms
   ↓ canBook — plan T01–T14 > T01 AC4: 660–720 touches the booking end, allowed
   ↓ canBook — plan T01–T14 > T02 AC1: 540–570 starts exactly at now, rejected
   ↓ canBook — plan T01–T14 > T03 AC1: 720–720 zero duration, rejected
   ↓ canBook — plan T01–T14 > T04 AC1: 750–720 reversed, rejected
   ↓ canBook — plan T01–T14 > T05 AC1: 1380–1441 past the end of the day, rejected
   ↓ canBook — plan T01–T14 > T06 AC2: 720–840 exactly 120 minutes, allowed
   ↓ canBook — plan T01–T14 > T07 AC2: 720–841 is 121 minutes, rejected
   ↓ canBook — plan T01–T14 > T08 AC4: 570–600 touches the booking start, allowed
   ↓ canBook — plan T01–T14 > T09 AC4: 630–690 partial overlap, rejected
   ↓ canBook — plan T01–T14 > T10 AC4: 570–690 contains the booking, rejected
   ↓ canBook — plan T01–T14 > T11 AC4: 615–645 inside the booking, rejected
   ↓ canBook — plan T01–T14 > T12 AC4: 600–660 identical to the booking, rejected
   ↓ canBook — plan T01–T14 > T13 AC3: 660–720 in a blocked room, rejected
   ↓ canBook — plan T01–T14 > T14 AC4: 630–690 with no bookings, allowed
   ↓ canBook — own cases and extra boundaries > X1 AC1: 1380–1440 ends exactly at 24:00, allowed
   ↓ canBook — own cases and extra boundaries > X2 AC4: 660–720 touches two bookings, allowed
   ↓ canBook — own cases and extra boundaries > B01 AC1: 541–570 first minute after now, allowed
   ↓ canBook — own cases and extra boundaries > B02 AC1: 660–720 with now 700, rejected
   ↓ canBook — own cases and extra boundaries > B03 AC1: 701–720 with now 700, allowed
   ↓ canBook — own cases and extra boundaries > B04 AC4: 659–720 one minute over the booking end, rejected
   ↓ canBook — own cases and extra boundaries > B05 AC4: 570–601 one minute into the booking start, rejected
   ↓ canBook — own cases and extra boundaries > B06 AC4: 700–750 overlaps only the second booking, rejected
   ↓ canBook — own cases and extra boundaries > B07 AC4: 630–690 overlaps a booking listed second in an unsorted list, rejected
   ↓ canBook — data preservation > AC5: an Available request leaves the bookings unchanged
   ↓ canBook — regression tests for the provided bugs > BUG-A AC4: 690–720 touches only the start of the second booking, allowed
   ✓ canBook — regression tests for the provided bugs > BUG-B AC5: 720–780 touches nothing, Available, bookings unchanged 2ms

 Test Files  1 passed (1)
      Tests  1 passed | 25 skipped (26)
   Start at  17:08:59
   Duration  894ms (transform 70ms, setup 0ms, collect 81ms, tests 4ms, environment 0ms, prepare 163ms)

> npx vitest run

 RUN  v3.2.4 C:/Users/Nurassyl Galym/Desktop/KBTU/Software Engineering/Lab Week 1/se-practice/week-08/app

 ✓ src/booking.test.ts (26 tests) 9ms
   ✓ canBook — plan T01–T14 > T01 AC4: 660–720 touches the booking end, allowed 2ms
   ✓ canBook — plan T01–T14 > T02 AC1: 540–570 starts exactly at now, rejected 0ms
   ✓ canBook — plan T01–T14 > T03 AC1: 720–720 zero duration, rejected 0ms
   ✓ canBook — plan T01–T14 > T04 AC1: 750–720 reversed, rejected 0ms
   ✓ canBook — plan T01–T14 > T05 AC1: 1380–1441 past the end of the day, rejected 0ms
   ✓ canBook — plan T01–T14 > T06 AC2: 720–840 exactly 120 minutes, allowed 0ms
   ✓ canBook — plan T01–T14 > T07 AC2: 720–841 is 121 minutes, rejected 0ms
   ✓ canBook — plan T01–T14 > T08 AC4: 570–600 touches the booking start, allowed 0ms
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
   Start at  17:09:05
   Duration  789ms (transform 67ms, setup 0ms, collect 70ms, tests 9ms, environment 0ms, prepare 180ms)
```

The BUG-B change deletes `bookings.push({ start, end });` and the comment above it, which no longer says anything true. The checker counts code lines only, so this is one changed line, and two for both bugs. All 26 tests pass: T01–T14, X1, X2, B01–B07, AC5, `BUG-A` and `BUG-B`. What the deck asks for holds: the touching cases (T01, T08, X2, `BUG-A`) are Available, overlaps (T09–T12, B04–B07) are still rejected, and the bookings stay unchanged (AC5, `BUG-B`, and every `check()` call on a frozen fixture).


---

## 9. What still fails, and what AI-assisted debugging cannot do

### 9.1 Checks I am keeping as FAIL or ERROR

Use the same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| none | The last checker run was clean: 31 PASS, 0 FAIL, 0 ERROR. |

### 9.2 One limitation of AI-assisted debugging

<!-- Use something that actually happened in sections 5-8. 20 words or more. -->
- Neither assistant could see my test file, only one failing test, so neither knew that my Week 07 `check()` helper passes a frozen array. Neither predicted the `TypeError` in T06, T14, X1, B01 and B03, or that T01, T08 and X2 would fail again on BUG-B once BUG-A was fixed. The no-skill answer still proposed R04 as a test for BUG-B with a touching request (660–720), and that test passes on the buggy code. It also said 660–720 is "exactly 120 minutes". So a diagnosis is only as good as the input it gets, and it can sound confident and still be wrong. Only running the real suite showed me which test failed and why.

---

## 10. Conclusion (80–150 words)

<!-- Answer both, in your own words, without the assistant (3-5 sentences, as the deck asks):
     (a) Did the skill help? Show it with one row of section 7.
     (b) What did your tests actually prove - and what did they not?
     Worthless: "The skill made the AI much better at debugging."
     Worth everything: "Both answers found BUG-A from the T01 failure. Only the skill answer
     separated BUG-B as a hypothesis instead of a fact, because step 4 told it to. BUG-B was only
     visible after the BUG-A patch: the AC5 test had been failing for the wrong reason." -->

<!-- Write your conclusion below this line -->

The skill helped, but less than I expected. Both chats found BUG-A and BUG-B from the same T01 failure. The difference was in the details. The skill answer gave a BUG-B test on 700–760, a request that touches nothing, so it fails for the right reason. The no-skill answer used 660–720, so BUG-A hid BUG-B. It also made two factual mistakes, which the skill answer did not. My tests proved more than either chat. My old AC5 test was failing for the wrong reason, and after the BUG-A fix T01, T08 and X2 failed again, now on `push`. The final run proves the touching and non-mutation cases on my inputs, not on every possible input, and nothing here checks AC6 in the UI.