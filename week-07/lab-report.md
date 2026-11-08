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
| Assistant that generated the tests (tool) | |
| Exact model (with its version, or `not displayed`) | |
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
(paste here)
```

**The assistant's answer: run command, AC mapping and any unclear requirements it flagged,
pasted unedited.** Its test file goes to `suites/first/` and is not pasted here:

```text
(paste here)
```

The first suite was saved to `suites/first/` **before** I changed anything in it: yes / no

---

## 5. Task 4 — review of the first suite

Review it **before** you run it. Look at the imports, the expected values, isolation, duplicates
and skipped tests. Make one row per decision. At least **two** rows, and each one names the kind of
weakness (the deck's table: *no exception occurred* · *expected = current output* · *only valid
requests* · *mocked booking function*, or your own) and the AC that decides it.

| # | Test or part of the suite | What is weak or wrong | Decision: accept / revise / reject | AC or reason |
| --- | --- | --- | --- | --- |
| 1 | | | accept / revise / reject | |
| 2 | | | accept / revise / reject | |

---

## 6. Task 5 — running, diagnosing, improving

### 6.1 The first run

The **real** terminal output of the first run of the first suite, pasted unedited. Include the
`RUN  v…` line and the `Tests` summary line. A build message or the assistant saying "tests pass"
is not a run.

```text
(paste here)
```

**Each failure, diagnosed** (the deck's table: import/runner error · assertion mismatch · result
changing per run · no tests discovered). Write `none` in the first row if nothing failed.

| Failing test | Observed failure | First check | Test repair or implementation fix? | Action taken |
| --- | --- | --- | --- | --- |
| | | | | |

### 6.2 The improvement prompt

The deck's improvement prompt exactly as sent, followed by the actual output from 6.1. Then
paste the assistant's answer, unedited:

```text
(paste here)
```

### 6.3 The final run

The **real** output of the final suite (`booking.test.*` beside your module), after every
change and after restoring the correct code from section 7. Every test must pass. If a real defect
is still open, leave its test failing and explain it in 9.1.

```text
(paste here)
```

---

## 7. Task 6 — deliberate defects

You need a reviewed, passing suite first. Then introduce **one** defect at a time in your booking
module, leave the tests unchanged, run, record, and **restore** the code. A syntax or import
error does not count as detection.

| Trial | Intentional change | Detected / Survived | Failing test ID(s) | If it survived: why, and what you added |
| --- | --- | --- | --- | --- |
| M1 | Reject duration >= 120 instead of > 120 | Detected / Survived | | |
| M2 | Treat touching endpoints as an overlap | Detected / Survived | | |
| M3 | Remove the blocked-room rejection | Detected / Survived | | |

**The run of each mutant, pasted unedited.** Paste the `Tests` summary line and the failing test
names at least:

```text
(paste here)
```

All three changes reverted, and the full suite run again (section 6.3): yes / no

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