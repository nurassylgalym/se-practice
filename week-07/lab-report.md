# Week 07 — Lab report

**Name:** Nurassyl Galym
**Group:** CSCI2208
**Date:** 7 November 2026

Fill in every section. **Do not delete, rename or renumber the headings.** The checker and the
grader find your answers by them. You can add rows to any table, but never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Project I continue (`week-06` = my Week 06 Bolt project, `starter` = the provided starter) | week-06 |
| Bolt project link (or `not shared`, and why) | not shared — the Week 06 export is committed in the repo, and the code I test is in `week-07/app` |
| Assistant that generated the tests (tool) | Claude (claude.ai, fresh chat) |
| Exact model (with its version, or `not displayed`) | Claude Opus 5.5 |
| Where I ran the tests (Bolt terminal / my computer / Codespace) | my computer (Windows, Node v26.13.0) |
| Vitest version (the `RUN  v…` line of a run) | 3.2.4 |
| Test command | `npx vitest run` (same as `npm test`) |

---

## 2. Task 1 — baseline and the booking function

**Before editing:** where did the booking decision live in the project you started from?

| | |
| --- | --- |
| File and function (or "inside the page component") | `src/availability.ts`, function `evaluateAvailability`, which calls `checkRoomBlocked`, `validateInterval`, `validateDuration` and `checkOverlap` |
| Its inputs | `room` (a Room object or null), `start`, `end`, `currentTime` (minutes after midnight) and the array of all bookings for all rooms |
| What it returned | an object `{ ok: boolean, reason?: string }`, where `reason` is the error message text |
| How the page used it | `App.tsx` called it once a room and both times were chosen; `result.ok` chose the Available / Unavailable verdict and `result.reason` was shown as the message |

**What I changed to extract `canBook`.** Say which file it now lives in, what you moved, and why
the behaviour did not change. Also say which file of the page now calls it. 40 words or more.

<!-- Write below this line -->

I created `src/booking.ts` with `canBook({ start, end, now, blocked, bookings })` and copied the conditions from `availability.ts` in the same order: blocked room, NaN times, start < 0 or end > 1440, start >= end, start <= now, duration > 120, and the overlap check `start < b.end && end > b.start`. I did not rewrite any condition, so the decisions stay the same. `App.tsx` now imports `canBook` and passes it `room.blocked` and the bookings of the selected room, filtered by room name before the call, which is what `checkOverlap` did inside. `evaluateAvailability` is still called only to get the text of the error message, so the rules now exist in two places. I see that as a weak point. I checked three cases in the browser with the current time 09:00 (Athena 101 10:00–11:00 Available, 09:30–10:30 Unavailable, Turing 110 Unavailable) and the verdicts are the same as before the change.

---

## 3. Task 2 — the test plan

Default fixture: `now = 540`, `blocked = false`, `bookings = [{ start: 600, end: 660 }]`, fresh
for every test. **The Expected column comes from AC1–AC4, never from the code.** Write the
**reason** for each expected result **before** you send the generation prompt.

| ID | Candidate / changed input | Expected | AC | Reason (in your words) |
| --- | --- | --- | --- | --- |
| T01 | 660–720 (touching after) | true | AC4 | 660 is where the booking ends, not inside it. The two intervals only touch, and AC4 allows that. |
| T02 | 540–570 (starts now) | false | AC1 | Start 540 equals now. AC1 needs start strictly after now, so a slot that starts right now is too late. |
| T03 | 720–720 (zero duration) | false | AC1 | Start and end are both 720, so start < end fails. A zero-length booking is not a real interval. |
| T04 | 750–720 (reversed) | false | AC1 | Start 750 is after end 720, so the interval is backwards and start < end fails. |
| T05 | 1380–1441 (past day end) | false | AC1 | End 1441 is one minute past 1440, the end of the day. AC1 says end must be at most 1440. |
| T06 | 720–840 (120 minutes) | true | AC2 | 720 to 840 is exactly 120 minutes. AC2 only rejects longer than 120, so 120 is still fine. |
| T07 | 720–841 (121 minutes) | false | AC2 | 720 to 841 is 121 minutes, one minute over the limit, so AC2 rejects it. |
| T08 | 570–600 (touching before) | true | AC4 | The request ends at 600, exactly when the booking starts. They touch but share no minute. |
| T09 | 630–690 (partial overlap) | false | AC4 | 630–690 starts inside the booking, so 630–660 is shared. That is an overlap. |
| T10 | 570–690 (contains booking) | false | AC4 | 570–690 covers the whole booking 600–660, so every minute of the booking is shared. |
| T11 | 615–645 (inside booking) | false | AC4 | 615–645 sits fully inside 600–660, so all of it is already taken. |
| T12 | 600–660 (identical interval) | false | AC4 | Same start and same end as the booking, so the whole slot is already taken. |
| T13 | 660–720, blocked = true | false | AC3 | The time itself is fine (it only touches the booking), but the room is blocked, and AC3 rejects any request then. |
| T14 | 630–690, bookings = [] | true | AC4 | No bookings means nothing to overlap. 630 is after now and 60 minutes is under the limit, so it is valid. |
| AC5 | an Available request — the bookings after the call equal the bookings before | true, data unchanged | AC5 | Checking availability must not book anything. The bookings array has to look the same before and after the call. |
| X1 | 1380–1440 (ends exactly at the end of the day) | true | AC1 | End 1440 is allowed because AC1 says end ≤ 1440. 60 minutes, after now, no overlap, so it should pass. |
| X2 | 660–720, bookings = [600–660, 720–780] (touches two bookings) | true | AC4 | The request touches one booking at 660 and the next at 720 but shares no minute with either, so AC4 allows it. |

X1 and X2 are **your own two cases**: a boundary or a state that T01–T14 do not reach. Fill all
five columns.

---

## 4. Task 3 — the generation prompt and the first suite

**The prompt exactly as I sent it.** Use the deck's prompt with `[our test framework]` replaced by
`Vitest`, followed by the case table from section 3:

```text
Generate tests for the existing booking function using Vitest. Use AC1–AC6 and the reviewed case table below.

Import the real function used by the page. Keep its code unchanged. Use fixed time and fresh fixtures. Assert exact decisions and unchanged booking data.

Return the test file, run command, and AC mapping. Flag unclear requirements. We will run the tests ourselves.

AC1: Accept a candidate interval only when 0 ≤ start < end ≤ 1440 and start is after the supplied current time.
AC2: Reject a booking longer than 120 minutes.
AC3: Reject the request when the selected room is blocked.
AC4: Reject any interval that overlaps an existing booking; touching endpoints are allowed.
AC5: Show a clear Available / Unavailable decision without changing the existing booking data.
AC6: The page remains usable at desktop and narrow/mobile width and gives understandable validation feedback.

Default fixture: now = 540, blocked = false, bookings = [{ start: 600, end: 660 }]

| ID | Input | Expected | AC |
| T01 | 660–720 (touching after) | true | AC4 |
| T02 | 540–570 (starts now) | false | AC1 |
| T03 | 720–720 (zero duration) | false | AC1 |
| T04 | 750–720 (reversed) | false | AC1 |
| T05 | 1380–1441 (past day end) | false | AC1 |
| T06 | 720–840 (120 minutes) | true | AC2 |
| T07 | 720–841 (121 minutes) | false | AC2 |
| T08 | 570–600 (touching before) | true | AC4 |
| T09 | 630–690 (partial overlap) | false | AC4 |
| T10 | 570–690 (contains booking) | false | AC4 |
| T11 | 615–645 (inside booking) | false | AC4 |
| T12 | 600–660 (identical) | false | AC4 |
| T13 | 660–720, blocked = true | false | AC3 |
| T14 | 630–690, bookings = [] | true | AC4 |
| AC5 | an Available request, bookings unchanged after the call | true, data unchanged | AC5 |
| X1 | 1380–1440 | true | AC1 |
| X2 | 660–720, bookings = [600–660, 720–780] | true | AC4 |

The function (src/booking.ts):export interface BookingRequest {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: { start: number; end: number }[];
}

export function canBook({ start, end, now, blocked, bookings }: BookingRequest): boolean {
  if (blocked) return false;
  if (Number.isNaN(start) || Number.isNaN(end)) return false;
  if (start < 0 || end > 1440) return false;
  if (start >= end) return false;
  if (start <= now) return false;
  if (end - start > 120) return false;
  return !bookings.some((b) => start < b.end && end > b.start);
}
```

I added the AC1–AC6 text because the assistant in a fresh chat could not see it otherwise.

**The assistant's answer: run command, AC mapping and any unclear requirements it flagged,
pasted unedited.** Its test file goes to `suites/first/` and is not pasted here:

```text
I'll write the Vitest file, then run it once here against a copy of `canBook` to make sure it passes.

I've written `src/booking.test.ts`. It has 17 tests: T01–T14, X1, X2 and one for AC5. I ran it once here against an unchanged copy of `canBook`, and all 17 passed.

**Run:**
```bash
npm i -D vitest
npx vitest run src/booking.test.ts
```

**How the file meets your requirements:**
- **Real function:** it imports `canBook` from `./booking`, so it should sit next to `src/booking.ts`. Check that the page imports from that same module, not a copy inside the component.
- **Fixed time:** `now` is always 540, passed in as input. Nothing reads the real clock.
- **Fresh fixtures:** `defaults()` builds a new request for every test.
- **Exact decisions:** every case uses `toBe(true)` or `toBe(false)`, so a "truthy" result won't pass.
- **Data unchanged:** every case checks that the bookings still equal a deep copy taken before the call. The AC5 test also checks that the same array and the same objects are still in place and nothing was added.

**AC mapping**

| AC | Covered by |
|---|---|
| AC1 (valid range, after now) | T02, T03, T04, T05, X1 |
| AC2 (≤ 120 min) | T06, T07 |
| AC3 (blocked room) | T13 |
| AC4 (overlap, touching allowed) | T01, T08–T12, T14, X2 |
| AC5 (decision, data unchanged) | AC5 test, plus the data check in every case. Only the boolean result is tested. |
| AC6 (layout, validation feedback) | Not covered. This is page behaviour, so it needs a component or end-to-end test, or a manual check at desktop and mobile widths. |

**Unclear requirements:**
1. **AC5 "clear Available / Unavailable decision":** the function only returns a boolean. The wording the user sees isn't specified or tested.
2. **AC1 doesn't say what to do with bad numbers.** The code rejects `NaN`, but the ACs never mention it, non-integer minutes, or `Infinity`. Infinity ends up rejected only because it fails the range checks.
3. **Range of `now` isn't stated.** For example, `now = 1440` or a negative value isn't covered. It's also unclear whether a past booking should still count as an overlap.
4. **Bad existing bookings:** nothing says how to treat bookings that are reversed or overlap each other.
5. **No reason for a rejection:** the function doesn't say why it said no, but AC6 asks for understandable validation feedback. Specific messages need a richer return value or separate validation in the page.
6. **Unclear table mapping:** T14 (no bookings) is mapped to AC4 but is really a baseline "nothing to clash with" case. T13 only shows that a blocked room is rejected even when the slot is otherwise valid.
7. **Blocked versus invalid input:** when the room is blocked and the input is also invalid, the result is `false` either way. The ACs don't say which reason should be shown.
```

The first suite was saved to `suites/first/` **before** I changed anything in it: yes

---

## 5. Task 4 — review of the first suite

Review it **before** you run it. Look at the imports, the expected values, isolation, duplicates
and skipped tests. Make one row per decision. At least **two** rows, and each one names the kind of
weakness (the deck's table: *no exception occurred* · *expected = current output* · *only valid
requests* · *mocked booking function*, or your own) and the AC that decides it.

| # | Test or part of the suite | What is weak or wrong | Decision: accept / revise / reject | AC or reason |
| --- | --- | --- | --- | --- |
| 1 | The whole T01–T14, X1, X2 block (`it.each` over a `cases` array) | Table-driven: one title template instead of a separate test per case, which the lab rules forbid. If one case fails, it is harder to trace it to its ID. My own weakness, not one of the deck's four. | revise | Lab rule: one test per case with the ID in its title. Covers AC1–AC4 |
| 2 | Expected values of T01–T14, X1, X2 | Checked for "expected = current output". Every value matches what I got from the ACs in section 3 before generating. None were copied from the code. | accept | AC1–AC4 |
| 3 | `AC5: Available decision leaves booking data untouched` | Checked for "no exception occurred". It calls canBook on an Available request (660–720), asserts exactly true and compares bookings with a structuredClone copy taken before the call. | accept | AC5 |
| 4 | Imports | Checked for "mocked booking function". It imports the real `canBook` from `./booking`, the same module App.tsx uses. No vi.mock. | accept | AC5, the page uses the same function |
| 5 | The assistant's claim that all 17 tests passed | It says it ran the suite against a copy of canBook. That is not evidence: I did not see that run, and the copy may differ from my file. Own weakness. | reject | Lab rule: only a real terminal run counts |

---

## 6. Task 5 — running, diagnosing, improving

### 6.1 The first run

The **real** terminal output of the first run of the first suite, pasted unedited. Include the
`RUN  v…` line and the `Tests` summary line. A build message or the assistant saying "tests pass"
is not a run.

```text
 RUN  v3.2.4 C:/Users/Nurassyl Galym/Desktop/KBTU/Software Engineering/Lab Week 1/se-practice/week-07/app

 ✓ src/booking.test.ts (17 tests) 8ms
   ✓ canBook > 'T01' ['AC4'] 'touching after': 660–720 → true 4ms
   ✓ canBook > 'T02' ['AC1'] 'starts now': 540–570 → false 0ms
   ✓ canBook > 'T03' ['AC1'] 'zero duration': 720–720 → false 0ms
   ✓ canBook > 'T04' ['AC1'] 'reversed': 750–720 → false 0ms
   ✓ canBook > 'T05' ['AC1'] 'past day end': 1380–1441 → false 0ms
   ✓ canBook > 'T06' ['AC2'] 'exactly 120 minutes': 720–840 → true 0ms
   ✓ canBook > 'T07' ['AC2'] '121 minutes': 720–841 → false 0ms
   ✓ canBook > 'T08' ['AC4'] 'touching before': 570–600 → true 0ms
   ✓ canBook > 'T09' ['AC4'] 'partial overlap': 630–690 → false 0ms
   ✓ canBook > 'T10' ['AC4'] 'contains booking': 570–690 → false 0ms
   ✓ canBook > 'T11' ['AC4'] 'inside booking': 615–645 → false 0ms
   ✓ canBook > 'T12' ['AC4'] 'identical': 600–660 → false 0ms
   ✓ canBook > 'T13' ['AC3'] 'room blocked': 660–720 → false 0ms
   ✓ canBook > 'T14' ['AC4'] 'no bookings': 630–690 → true 0ms
   ✓ canBook > 'X1' ['AC1'] 'ends exactly at 1440': 1380–1440 → true 0ms
   ✓ canBook > 'X2' ['AC4'] 'gap between two bookings': 660–720 → true 0ms
   ✓ canBook > AC5: Available decision leaves booking data untouched 1ms

 Test Files  1 passed (1)
      Tests  17 passed (17)
   Start at  22:02:19
   Duration  3.86s (transform 42ms, setup 0ms, collect 58ms, tests 8ms, environment 0ms, prepare 594ms)
```

**Each failure, diagnosed** (the deck's table: import/runner error · assertion mismatch · result
changing per run · no tests discovered). Write `none` in the first row if nothing failed.

| Failing test | Observed failure | First check | Test repair or implementation fix? | Action taken |
| --- | --- | --- | --- | --- |
| none | All 17 tests passed on the first run. | — | — | No fix needed. The suite still has to be rewritten without `it.each` (section 5, row 1). |

### 6.2 The improvement prompt

The deck's improvement prompt exactly as sent, followed by the actual output from 6.1. Then
paste the assistant's answer, unedited:

```text
Review this test suite against AC1–AC6 and our case table. Identify incorrect expectations, weak assertions, duplicated cases, and missing boundaries.

For each proposed change, explain the requirement and the defect it could detect. Improve the tests without changing correct expectations to match buggy behavior.

Use the actual failure output below. Separate test repairs from implementation fixes.

C:\Users\Nurassyl Galym\Desktop\KBTU\Software Engineering\Lab Week 1\se-practice\week-07\app>npx vitest run

 RUN  v3.2.4 C:/Users/Nurassyl Galym/Desktop/KBTU/Software Engineering/Lab Week 1/se-practice/week-07/app

 ✓ src/booking.test.ts (17 tests) 8ms
   ✓ canBook > 'T01' ['AC4'] 'touching after': 660–720 → true 4ms
   ✓ canBook > 'T02' ['AC1'] 'starts now': 540–570 → false 0ms
   ✓ canBook > 'T03' ['AC1'] 'zero duration': 720–720 → false 0ms
   ✓ canBook > 'T04' ['AC1'] 'reversed': 750–720 → false 0ms
   ✓ canBook > 'T05' ['AC1'] 'past day end': 1380–1441 → false 0ms
   ✓ canBook > 'T06' ['AC2'] 'exactly 120 minutes': 720–840 → true 0ms
   ✓ canBook > 'T07' ['AC2'] '121 minutes': 720–841 → false 0ms
   ✓ canBook > 'T08' ['AC4'] 'touching before': 570–600 → true 0ms
   ✓ canBook > 'T09' ['AC4'] 'partial overlap': 630–690 → false 0ms
   ✓ canBook > 'T10' ['AC4'] 'contains booking': 570–690 → false 0ms
   ✓ canBook > 'T11' ['AC4'] 'inside booking': 615–645 → false 0ms
   ✓ canBook > 'T12' ['AC4'] 'identical': 600–660 → false 0ms
   ✓ canBook > 'T13' ['AC3'] 'room blocked': 660–720 → false 0ms
   ✓ canBook > 'T14' ['AC4'] 'no bookings': 630–690 → true 0ms
   ✓ canBook > 'X1' ['AC1'] 'ends exactly at 1440': 1380–1440 → true 0ms
   ✓ canBook > 'X2' ['AC4'] 'gap between two bookings': 660–720 → true 0ms
   ✓ canBook > AC5: Available decision leaves booking data untouched 1ms

 Test Files  1 passed (1)
      Tests  17 passed (17)
   Start at  22:02:19
   Duration  3.86s (transform 42ms, setup 0ms, collect 58ms, tests 8ms, environment 0ms, prepare 594ms)
```

**The assistant's answer:**

```text
I'll check the suite against the ACs and the case table, rewrite it, then run it against an unchanged copy of `canBook`.

I've rewritten `booking.test.ts`: it now has 25 tests and all pass against your unchanged `canBook`. The run you pasted has no failures (17/17 passed), so there was no failure output to work from. A green run only means the old suite was too weak to catch some bugs. To check the new tests, I planted three bugs in a copy of `canBook` and confirmed the new tests catch each one (details at the end).

## Review findings

**Incorrect expectations: none.** Every expected value in the suite matches AC1–AC4 and your table, and I didn't change any of them.

**Weak assertions and isolation problems**

| # | Problem | Requirement | Bug it could have missed |
|---|---|---|---|
| W1 | `now` was always 540, so the code could ignore the `now` it's given | AC1 (start must be after the supplied current time) | Code that hard-codes 540 or uses the real clock |
| W2 | Every overlap test had the clash in the first booking | AC4 ("any" existing booking) | Code that checks only `bookings[0]`, or stops after the first booking |
| W3 | Booking lists were always sorted, so sorting them in place changed nothing | AC5 (booking data unchanged) | `bookings.sort()` inside `canBook` mutating the page's data |
| W4 | The `bookings` arrays in the case list were passed in as they are, shared across runs | Your "fresh fixtures" rule | One test's mutation leaking into later tests or watch-mode reruns |
| W5 | Mutation was only checked with `toEqual` after the call | AC5 | A change made and then undone during the call |

**The fixes:**
- Each test now gets a fresh, deep-frozen copy of its bookings, so any write throws an error. This covers W3–W5.
- B02 and B03 move `now` to 700 (W1).
- B06 and B07 put the clash in the second booking and in an unsorted list (W2, W3).

**Duplicated cases**
- The old AC5 test used the same input as T01 and repeated a check every case already did. It's now two tests, one Available and one Unavailable, both on an unsorted two-booking list, so they test something new.
- T01 and T13 are the same slot, and T09 and T14 are the same slot. That's intentional: each pair changes one thing (blocked, or no bookings), so I kept them and renamed them to make that clear.

**Missing boundaries (added)**

| ID | Case | Requirement | Bug it catches |
|---|---|---|---|
| B01 | 541–570 → true | AC1, first minute after now | An extra off-by-one, e.g. `start <= now + 1` |
| B02 | now=700, 660–720 → false | AC1 | `now` ignored or hard-coded |
| B03 | now=700, 701–720 → true | AC1 | Same, from the accepting side |
| B04 | 659–720 → false | AC4, 1-minute overlap at booking end | Treating near-touching as touching |
| B05 | 570–601 → false | AC4, 1-minute overlap at booking start | Same |
| B06 | overlaps 2nd booking only → false | AC4 | Only the first booking checked |
| B07 | unsorted list, overlaps the booking listed second → false | AC4 | Code that relies on the list being sorted |

## Test repairs and implementation fixes

**Test repairs:** everything above, all in the test file.

**Implementation fixes:** none needed. Nothing in the evidence shows `canBook` breaking an AC. Some things worth raising with whoever owns the requirements:
1. **The `start < 0` check can never decide the result.** AC1 also requires `start > now`, so whenever `now ≥ 0` the start can't be negative anyway. The check only matters if `now` can be negative, which the ACs don't define. I didn't add a test, because any expected value would be a guess.
2. **`now` isn't validated.** Values like 1440, a negative number or `NaN` aren't covered by the ACs.
3. **`NaN`, `Infinity` and fractional minutes** are only partly handled and not specified, so they're not tested.
4. **AC6 asks for understandable feedback,** but the function only returns `true` or `false`, so the page can't say why a request was rejected. Meeting AC6 means returning a reason from `canBook`, or validating separately in the page.

## Not covered by these tests
- **AC6** (layout and validation messages) and **AC5's on-screen Available / Unavailable text** need a component test, e.g. with Testing Library, or a manual check at desktop and mobile widths.
- **How the page works out `now`** from the clock (minutes since midnight, time zone) is where a real bug would most likely hide. Test it with `vi.setSystemTime` in a page-level test, not in this file.

## How I checked the new tests
| Planted bug | Old suite | New suite |
|---|---|---|
| `bookings.sort()` in place | passed (missed) | 5 failures |
| Only `bookings[0]` checked | passed (missed) | B06 and B07 fail |
| `start <= 540` instead of `now` | passed (missed) | B03 fails |

Run it with `npx vitest run`, as before. Your Vitest 3.2.4 supports everything the file uses.

[The answer also contained a rewritten test file. It still used it.each, so I did not commit it as it was. What I took from it is listed below.]
```

**What I applied.** I accepted the extra boundaries B01–B07 and the fresh, deep-frozen copy of the bookings for every test, because they catch bugs my first suite missed (a hard-coded `now`, checking only the first booking, sorting the bookings in place). I did not take the file as it was: it still used `it.each`, which the lab rules forbid, so I wrote every case as its own `test()` with the ID in the title. I kept one AC5 test on an Available request, compared with a `structuredClone` copy taken before the call. No expected value changed, and `booking.ts` was not touched. The final suite has 24 tests.

### 6.3 The final run

The **real** output of the final suite (`booking.test.*` beside your module), after every
change and after restoring the correct code from section 7. Every test must pass. If a real defect
is still open, leave its test failing and explain it in 9.1.

```text
 RUN  v3.2.4 C:/Users/Nurassyl Galym/Desktop/KBTU/Software Engineering/Lab Week 1/se-practice/week-07/app

 ✓ src/booking.test.ts (24 tests) 4ms

 Test Files  1 passed (1)
      Tests  24 passed (24)
   Start at  22:31:20
   Duration  533ms (transform 41ms, setup 0ms, collect 46ms, tests 4ms, environment 0ms, prepare 136ms)
```

---

## 7. Task 6 — deliberate defects

You need a reviewed, passing suite first. Then introduce **one** defect at a time in your booking
module, leave the tests unchanged, run, record, and **restore** the code. A syntax or import
error does not count as detection.

| Trial | Intentional change | Detected / Survived | Failing test ID(s) | If it survived: why, and what you added |
| --- | --- | --- | --- | --- |
| M1 | Reject duration >= 120 instead of > 120 | Detected | T06 | — |
| M2 | Treat touching endpoints as an overlap | Detected | T01, T08, X2, AC5 | — |
| M3 | Remove the blocked-room rejection | Detected | T13 | — |

**The run of each mutant, pasted unedited.** Paste the `Tests` summary line and the failing test
names at least:

```text
--- M1: if (end - start >= 120) return false;
 RUN  v3.2.4 C:/Users/Nurassyl Galym/Desktop/KBTU/Software Engineering/Lab Week 1/se-practice/week-07/app

 ❯ src/booking.test.ts (24 tests | 1 failed) 21ms
   ✓ canBook — plan T01–T14 > T01 AC4: 660–720 touches the booking end, allowed 3ms
   ✓ canBook — plan T01–T14 > T02 AC1: 540–570 starts exactly at now, rejected 0ms
   ✓ canBook — plan T01–T14 > T03 AC1: 720–720 zero duration, rejected 0ms
   ✓ canBook — plan T01–T14 > T04 AC1: 750–720 reversed, rejected 0ms
   ✓ canBook — plan T01–T14 > T05 AC1: 1380–1441 past the end of the day, rejected 0ms
   × canBook — plan T01–T14 > T06 AC2: 720–840 exactly 120 minutes, allowed 12ms
     → expected false to be true // Object.is equality
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

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > canBook — plan T01–T14 > T06 AC2: 720–840 exactly 120 minutes, allowed
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:40:29
     38|   });
     39|   test('T06 AC2: 720–840 exactly 120 minutes, allowed', () => {
     40|     expect(check(720, 840)).toBe(true);
       |                             ^
     41|   });
     42|   test('T07 AC2: 720–841 is 121 minutes, rejected', () => {

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed (1)
      Tests  1 failed | 23 passed (24)
   Start at  22:29:13
   Duration  1.16s (transform 43ms, setup 0ms, collect 72ms, tests 21ms, environment 0ms, prepare 135ms)

--- M2: return !bookings.some((b) => start <= b.end && end >= b.start);
 RUN  v3.2.4 C:/Users/Nurassyl Galym/Desktop/KBTU/Software Engineering/Lab Week 1/se-practice/week-07/app

 ❯ src/booking.test.ts (24 tests | 4 failed) 20ms
   × canBook — plan T01–T14 > T01 AC4: 660–720 touches the booking end, allowed 14ms
     → expected false to be true // Object.is equality
   ✓ canBook — plan T01–T14 > T02 AC1: 540–570 starts exactly at now, rejected 0ms
   ✓ canBook — plan T01–T14 > T03 AC1: 720–720 zero duration, rejected 0ms
   ✓ canBook — plan T01–T14 > T04 AC1: 750–720 reversed, rejected 0ms
   ✓ canBook — plan T01–T14 > T05 AC1: 1380–1441 past the end of the day, rejected 0ms
   ✓ canBook — plan T01–T14 > T06 AC2: 720–840 exactly 120 minutes, allowed 0ms
   ✓ canBook — plan T01–T14 > T07 AC2: 720–841 is 121 minutes, rejected 0ms
   × canBook — plan T01–T14 > T08 AC4: 570–600 touches the booking start, allowed 1ms
     → expected false to be true // Object.is equality
   ✓ canBook — plan T01–T14 > T09 AC4: 630–690 partial overlap, rejected 0ms
   ✓ canBook — plan T01–T14 > T10 AC4: 570–690 contains the booking, rejected 0ms
   ✓ canBook — plan T01–T14 > T11 AC4: 615–645 inside the booking, rejected 0ms
   ✓ canBook — plan T01–T14 > T12 AC4: 600–660 identical to the booking, rejected 0ms
   ✓ canBook — plan T01–T14 > T13 AC3: 660–720 in a blocked room, rejected 0ms
   ✓ canBook — plan T01–T14 > T14 AC4: 630–690 with no bookings, allowed 0ms
   ✓ canBook — own cases and extra boundaries > X1 AC1: 1380–1440 ends exactly at 24:00, allowed 0ms
   × canBook — own cases and extra boundaries > X2 AC4: 660–720 touches two bookings, allowed 0ms
     → expected false to be true // Object.is equality
   ✓ canBook — own cases and extra boundaries > B01 AC1: 541–570 first minute after now, allowed 0ms
   ✓ canBook — own cases and extra boundaries > B02 AC1: 660–720 with now 700, rejected 0ms
   ✓ canBook — own cases and extra boundaries > B03 AC1: 701–720 with now 700, allowed 0ms
   ✓ canBook — own cases and extra boundaries > B04 AC4: 659–720 one minute over the booking end, rejected 0ms
   ✓ canBook — own cases and extra boundaries > B05 AC4: 570–601 one minute into the booking start, rejected 0ms
   ✓ canBook — own cases and extra boundaries > B06 AC4: 700–750 overlaps only the second booking, rejected 0ms
   ✓ canBook — own cases and extra boundaries > B07 AC4: 630–690 overlaps a booking listed second in an unsorted list, rejected 0ms
   × canBook — data preservation > AC5: an Available request leaves the bookings unchanged 0ms
     → expected false to be true // Object.is equality

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 4 ⎯⎯⎯⎯⎯⎯⎯

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

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/4]⎯

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

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/4]⎯

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

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/4]⎯

 FAIL  src/booking.test.ts > canBook — data preservation > AC5: an Available request leaves the bookings unchanged
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:102:83
    100|     const bookings = [{ start: 600, end: 660 }];
    101|     const before = structuredClone(bookings);
    102|     expect(canBook({ start: 660, end: 720, now: NOW, blocked: false, b…
       |                                                                                   ^
    103|     expect(bookings).toEqual(before);
    104|   });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/4]⎯


 Test Files  1 failed (1)
      Tests  4 failed | 20 passed (24)
   Start at  22:30:07
   Duration  589ms (transform 49ms, setup 0ms, collect 77ms, tests 20ms, environment 0ms, prepare 152ms)

--- M3: removed if (blocked) return false;
 RUN  v3.2.4 C:/Users/Nurassyl Galym/Desktop/KBTU/Software Engineering/Lab Week 1/se-practice/week-07/app

 ❯ src/booking.test.ts (24 tests | 1 failed) 14ms
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
   × canBook — plan T01–T14 > T13 AC3: 660–720 in a blocked room, rejected 6ms
     → expected true to be false // Object.is equality
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

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > canBook — plan T01–T14 > T13 AC3: 660–720 in a blocked room, rejected
AssertionError: expected true to be false // Object.is equality

- Expected
+ Received

- false
+ true

 ❯ src/booking.test.ts:61:48
     59|   });
     60|   test('T13 AC3: 660–720 in a blocked room, rejected', () => {
     61|     expect(check(660, 720, { blocked: true })).toBe(false);
       |                                                ^
     62|   });
     63|   test('T14 AC4: 630–690 with no bookings, allowed', () => {

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed (1)
      Tests  1 failed | 23 passed (24)
   Start at  22:31:02
   Duration  1.08s (transform 41ms, setup 0ms, collect 47ms, tests 14ms, environment 0ms, prepare 97ms)
```

All three changes reverted, and the full suite run again (section 6.3): yes

---

## 8. Task 7 — manual UI checks

Use `now = 09:00` and an existing `10:00–11:00` booking. Do them in the page in a browser. Save a
screenshot of each as `evidence/ui-1.png` … `evidence/ui-5.png`. Take **ui-4 at phone width**
(about 375 px, portrait).

| # | Action | Expected observation | AC | What I observed | Pass / Fail / Not testable |
| --- | --- | --- | --- | --- | --- |
| U1 | Check 11:00–12:00, unblocked | Available, with the fixed sample booking | AC5 | | Pass / Fail / Not testable |
| U2 | Enable blocked, then check again | Unavailable replaces the earlier result | AC3, AC5 | | Pass / Fail / Not testable |
| U3 | Clear a required input and submit | Understandable validation feedback | AC6 | | Pass / Fail / Not testable |
| U4 | Use a narrow (phone) width | Controls and result remain usable | AC6 | | Pass / Fail / Not testable |
| U5 | Repeat the checks on the same data | Existing bookings remain unchanged | AC5 | | Pass / Fail / Not testable |

---

## 9. Comparison and what still fails

### 9.1 Checks I am keeping as FAIL or ERROR

Use the same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| | |

### 9.2 Original and improved suites

| Measure | First suite | Improved suite |
| --- | --- | --- |
| Executed / passed / failed | | |
| Requirements with meaningful tests (AC IDs and gaps) | | |
| Selected mutants detected | | |
| Accepted / revised / rejected tests | | |
| Remaining limitations | | |

### 9.3 What no AC decides

Call your function with `bookings = [{ start: 700, end: 650 }]` (a reversed existing booking)
and a request of 660–720. What does it return? Does any AC say what it should return? (This is
the value you declare in `submission.yml` under `assumptions.invalid_existing_booking`.)

-

---

## 10. Conclusion (120–180 words)

<!-- Answer all three in your own words, without the assistant:
     (a) Which mistake in the FIRST suite would have let a wrong canBook pass, and how did you find it?
     (b) What does your final green run prove, and what does it NOT prove? Use a mutant or a UI check.
     (c) One testing limitation that remains.
     Worthless: "The AI wrote good tests and they all passed."
     Worth everything: "The first suite expected T06 (exactly 120 minutes) to be rejected. That
     contradicts AC2, and it failed on a correct canBook. If I had changed the code to make it
     pass, M1 would have become the real behaviour." -->

<!-- Write your conclusion below this line -->