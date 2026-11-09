# Week 08 — Lab report

**Name:** Nurassyl Galym
**Group:**
**Date:** 2026-11-09

Fill in every section. **Do not delete, rename or renumber the headings.** The checker and the
grader find your answers by them. You can add rows to any table, but never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Assistant I debugged with (tool) | |
| Exact model (with its version, or `not displayed`) | |
| Where the skill was installed (ChatGPT / Claude web / Claude Code / prompt-only simulation) | |
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
| The file is plain UTF-8 text, named exactly `SKILL.md` (not `SKILL.md.txt`) | yes / no |
| The first and the closing YAML delimiter are exactly three hyphens: `---` | yes / no |
| `name` is lowercase with hyphens, and `description` says WHEN to use it | yes / no |
| I read the whole file once: no passwords, API keys or private student data | yes / no |

**The contents of `skills/bug-detector.zip`.** Paste the listing (Windows: open the ZIP and copy
the paths; macOS/Linux: `unzip -l skills/bug-detector.zip`):

```text
(paste here)
```

**Installation.** Where you uploaded it, what the upload said, and whether a new chat showed the
skill as enabled. If upload was not available, write `prompt-only simulation` and say why.
Screenshot of the result: `evidence/install.png`.

<!-- Write below this line -->

---

## 5. Task 4 — without the skill

A **fresh chat, with no skill enabled**. Paste exactly what you sent: the deck's question, then
the same input you will use in section 6 (AC1–AC6, the failing test output, the code of
`canBook`):

```text
(paste here)
```

**The assistant's answer, pasted unedited:**

```text
(paste here)
```

---

## 6. Task 5 — with the skill

**Another fresh chat, with `bug-detector` enabled.** Send exactly the same input as in section 5.
Only the question changes, to the deck's skill question:

```text
(paste here)
```

**The assistant's answer, pasted unedited:**

```text
(paste here)
```

Did the environment show that the skill was invoked? yes / no / not shown

---

## 7. Comparison — judged against the actual code

Do not assume the skill did better. Judge both answers against the code and against what your
tests showed. Write a short verdict in each cell, and give a reason where they differ.

| Criterion | No skill | With skill |
| --- | --- | --- |
| Correct root cause | | |
| Reproducible test | | |
| Minimal proposed patch | | |
| Unsupported claims | | |
| Clarity of explanation | | |

**Which bugs did each answer find?** (BUG-A, BUG-B, both, neither)

-

---

## 8. Task 6 — repair and regression

Review the proposed patch yourself, then make **one minimal change per bug**, one commit each.
Rerun the test that was failing, then the full suite.

### 8.1 The BUG-A patch

The change as a diff (`git diff`, or the old and the new line), then the real run:

```text
(paste here)
```

### 8.2 The BUG-B patch and the final run

The change as a diff, then the real output of the **full** suite. Every test must pass.

```text
(paste here)
```

---

## 9. What still fails, and what AI-assisted debugging cannot do

### 9.1 Checks I am keeping as FAIL or ERROR

Use the same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| | |

### 9.2 One limitation of AI-assisted debugging

<!-- Use something that actually happened in sections 5-8. 20 words or more. -->
-

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