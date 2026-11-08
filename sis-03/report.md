# SIS #03 — Report: Smart Campus Room Availability Checker

<!-- The ONLY file you write prose in. Keep every numbered heading (## 1. … ## 13.) and every
     ### sub-heading, and the **Label:** words — the checker finds your answers by them.
     Replace every "(write here)" and "(paste here)". Delete these <!-- --> comments if you like. -->

## 1. Setup and reuse

<!-- Model: the exact model with its version, as the tool shows it ("ChatGPT" is a tool, not a
     model). If the tool does not show it, write: not displayed
     Reuse: week-05 if code/original/booking_v1.py is your Week 05 v1, copied unedited;
     week-06 if web/original/ is your Week 06 v1 export; fresh if you generated it for this SIS. -->

| Item | Value |
| --- | --- |
| Coding assistant (tool) | Gemini (web) |
| Coding assistant model | Gemini 2.5 Flash |
| Bolt.new model | GLM 5.3 Flash |
| Bolt project link | https://bolt.new/p/72158651 |
| Language | Python 3.12 |
| Path | A |
| Python v1 from | week-05 |
| Web v1 from | week-06 |

## 2. Baseline — before any new AI exchange

<!-- Written by you, without AI, before the first exchange of this SIS. Commit and push it
     first (README §2). Reusing Week 05/06 work does not exempt you: this section is new. -->

### 2.1 Scope in my own words

**Scope:** One small page where a student picks a time for one room and sees if that time is free. It only checks. It does not book anything, there is no login, no database, no server, and the bookings are made up.

### 2.2 The acceptance criteria in my own words

| AC | In my own words |
| --- | --- |
| AC1 | Times are whole minutes from midnight. Start has to be before end, nothing below 0 or above 1440. And start must be later than now, so starting exactly at now is not allowed. |
| AC2 | A check can be 120 minutes long at most. 120 itself is fine, 121 is not. |
| AC3 | If the room is blocked, every check says no, no matter what time. |
| AC4 | If my time crosses any existing booking it's a no. But touching is fine: if a booking ends at 11:00, I can start at 11:00. |
| AC5 | The page shows a clear Available or Unavailable, nothing in between. Checking never changes the booking list. |
| AC6 | If I type something wrong, the page tells me what is wrong in normal words. And it still works on a phone screen. |

### 2.3 Likely failure points

<!-- At least two. The brief's examples: endpoint overlap, starts-now. -->

| # | Failure point | AC | How I will check it |
| --- | --- | --- | --- |
| 1 | Touching bookings: the code uses `<=` instead of `<` and rejects 11:00-12:00 right after a 10:00-11:00 booking | AC4 | T1: 660-720 with (600, 660) must be Available |
| 2 | Starting exactly now: the code checks `start < now` instead of `start <= now` and lets it through | AC1 | T6: 540-570 with now = 540 must be Unavailable |

### 2.4 The contract

| Parameter | Meaning | Type and allowed values |
| --- | --- | --- |
| `start` | minute the check starts | int, 0 to 1439, must be > now and < end |
| `end` | minute the check ends (not included) | int, start+1 to 1440, end - start <= 120 |
| `now` | current time in minutes | int, 0 to 1439, assumed valid |
| `blocked` | room is closed for booking | bool, True means always False |
| `existing` | bookings that already exist | list of (start, end) int pairs, may be empty, never changed |
| returns | whether this time can be booked | bool: True only if AC1-AC4 all hold, otherwise False |

### 2.5 Initial assumptions and manual checks

**Assumptions:**

1. `now` is always a valid minute (0-1439), so the function does not need to check it.
2. A booking covers its start minute but not its end minute, so (600, 660) is free again at 660.
3. The existing bookings themselves are valid and the list can be empty.

**Checked manually:**

- T1 and T6 worked out on paper before running any code: 660-720 touches (600, 660) so it is Available; 540-570 starts at now = 540 so it is Unavailable.
- T4 vs T5: 720-840 is exactly 120 minutes (Available), 720-841 is 121 (Unavailable).

## 3. Python v1 review

<!-- One row per conditional branch in code/original/booking_v1.py (your language's v1 on
     Path B). Quote the condition exactly. AC1-AC4 must all appear in the AC column. -->

| Branch in v1 (quoted) | AC | Satisfies it? | Why |
| --- | --- | --- | --- |
| `if not (0 <= start < end <= 1440 and start >= now): return False` | AC1 | No | Day bounds and order are right, but `start >= now` lets a request that starts exactly now pass. AC1 says strictly after now. T6 (540-570, now 540) returned True on v1. Final uses `start <= now` -> reject. |
| `if (end - start) > 120: return False` | AC2 | Yes | `>` rejects 121 and keeps exactly 120. T4 True, T5 False on v1. |
| `if blocked: return False` | AC3 | Yes | Any request on a blocked room is rejected, whatever the time. T3 False on v1. |
| `for b_start, b_end in existing: if start < b_end and end > b_start: return False` | AC4 | Yes | Strict `<` and `>` mean touching endpoints are not overlap, and the loop checks every booking. T1 True, T2 False, T10 False on v1. |
| `return True` | AC5 | Yes | Returns a real bool. v1 only reads `existing`, never changes it. T11 second call still True. |

## 4. Prototype v1 in Bolt.new

**Prompt as sent:** (Source: week-06, sent 2026-10-18)

~~~~text
Build a small responsive Smart Campus Room Availability Checker. Requirements: AC1: Accept a candidate interval only when 0 ≤ start < end ≤ 1440 and start is after the supplied current time. AC2: Reject a booking longer than 120 minutes. AC3: Reject the request when the selected room is blocked. AC4: Reject any interval that overlaps an existing booking; touching endpoints are allowed. AC5: Show a clear Available / Unavailable decision without changing the existing booking data. AC6: The page remains usable at desktop and narrow/mobile width and gives understandable validation feedback. Use fictional sample data only. Keep the implementation simple and within one-page scope. Do not add authentication, backend services, analytics, or unrelated features. After building, briefly list the main files/components you created.
~~~~

<!-- Main generated files or components, with their path inside web/original/
     (for example src/App.tsx). At least two. -->

| Generated file or component | Path | Its role |
| --- | --- | --- |
| Main page UI | `src/App.tsx` | Room dropdown, start/end/current-time inputs, verdict card, room details with today's bookings |
| Availability logic | `src/availability.ts` | `validateInterval` (AC1), `validateDuration` (AC2), `checkRoomBlocked` (AC3), `checkOverlap` (AC4); `evaluateAvailability` runs them in order |
| Sample data | `src/sampleData.ts` | 5 fictional rooms (Turing 110 blocked) and 6 fictional bookings |
| Types | `src/types.ts` | `Room`, `Booking`, `Verdict` |

**What v1 does:**

- One page, "Smart Campus Room Availability": pick a room, start, end, and a "Current time (sim)" field (default 09:00).
- Shows Available / Unavailable with a reason line, and the selected room's existing bookings.
- AC1 bug: `validateInterval` uses `start < currentTime`, so a start equal to now is accepted (T6).
- Blocked room Turing 110 is a disabled option in the dropdown, so the AC3 rejection can't be reached from the UI.
- No sample room has 10:00-11:00 as its only booking, and bookings can't be edited, so the base data of T1/T2/T10/T11 can't be set up.
- `package.json` lists `@supabase/supabase-js` although nothing uses it: a database client, out of scope.
- Time inputs are `<input type="time">`, which stop at 23:59, so 24:00 can't be entered (T8, T9).

## 5. Test cases — executed on both artifacts

<!-- Base for every case unless the row says otherwise: now = 540, blocked = False,
     existing = [(600, 660)]. Do not change the first four columns.
     Python columns: True, False or Error (it raised) — what the call actually returned.
       T11: the result of the SECOND call. T12: n/a.
       Path A: the checker runs both of your files on T1-T11 and compares (C2, C3).
     Page columns: Available, Unavailable or Not testable — what the page actually showed.
     Never write a result you did not observe. -->

| Case | Name | Input | Expected | Python v1 | Python final | Page v1 | Page final |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T1 | Touching | 660–720 | Available | True | True | | |
| T2 | Overlap | 630–690 | Unavailable | False | False | | |
| T3 | Blocked | 660–720, blocked | Unavailable | False | False | | |
| T4 | Exactly 120 min | 720–840 | Available | True | True | | |
| T5 | 121 min | 720–841 | Unavailable | False | False | | |
| T6 | Starts now | 540–570 | Unavailable | True | False | | |
| T7 | Reversed | 720–660 | Unavailable | False | False | | |
| T8 | Ends at midnight | 1380–1440 | Available | True | True | | |
| T9 | Past midnight | 1380–1441 | Unavailable | False | False | | |
| T10 | Second booking | 720–780, existing (600–660), (700–760) | Unavailable | False | False | | |
| T11 | Same check twice | 660–720, twice | Available | True | True | | |
| T12 | Narrow screen | T1 at ~375 px wide | Available | n/a | n/a | | |

## 6. Traceability

<!-- His table. Implementation / file: where the rule lives (booking.py line, a component).
     Test input: the case IDs from section 5. v1 / final actual: what those cases gave. -->

| AC | Implementation / file | Test input | Expected | v1 actual | Final actual |
| --- | --- | --- | --- | --- | --- |
| AC1 | (write here) | (write here) | (write here) | (write here) | (write here) |
| AC2 | (write here) | (write here) | (write here) | (write here) | (write here) |
| AC3 | (write here) | (write here) | (write here) | (write here) | (write here) |
| AC4 | (write here) | (write here) | (write here) | (write here) | (write here) |
| AC5 | (write here) | (write here) | (write here) | (write here) | (write here) |
| AC6 | (write here) | (write here) | (write here) | (write here) | (write here) |

## 7. Issue log

<!-- At least two, from v1 — a functional defect and a usability or code-quality issue where you
     have them. If every case passed on v1, log the preventive cleanup and say why.
     Reproduction names a case (T1-T12) or an AC. Priority: High, Medium or Low.
     Prompt / change: the focused prompt you sent, and what changed. Never "make it better". -->

| # | Issue | Reproduction | Priority | Prompt / change | Retest result |
| --- | --- | --- | --- | --- | --- |
| 1 | (write here) | (write here) | (write here) | (write here) | (write here) |
| 2 | (write here) | (write here) | (write here) | (write here) | (write here) |

**Before / after:** `evidence/before-1.png` → `evidence/after-1.png` show issue (write here)

## 8. Critique decisions

<!-- The AI's review against AC1-AC6 (stage C), claim by claim. At least three rows.
     How I verified it: the case, test or run that confirmed or refuted the claim.
     Decision: accept, reject or modify. At least one reject or modify — the reflection asks for it. -->

| # | AI claim or recommendation | How I verified it | Decision | Reason (AC or case) |
| --- | --- | --- | --- | --- |
| 1 | (write here) | (write here) | (write here) | (write here) |
| 2 | (write here) | (write here) | (write here) | (write here) |
| 3 | (write here) | (write here) | (write here) | (write here) |

## 9. Coding-agent analysis

### 9.1 The loop

<!-- One real pass through the loop from this assignment — with your assistant or with Bolt. -->

| Step | What happened in this assignment |
| --- | --- |
| User goal | (write here) |
| Model / plan | (write here) |
| Tool call | (write here) |
| Observation | (write here) |
| Next step | (write here) |
| Human review | (write here) |

### 9.2 Context, tools and permissions

<!-- At least three rows. Last column: Observed (you saw it happen) or Assumed (you infer it
     about the internals). Use both at least once. -->

| Tool | Context it used | Tools or permissions | Observed or assumed |
| --- | --- | --- | --- |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |

### 9.3 Checkpoint and dependability

**Safety checkpoint:** (write here)

**Reliability, security, responsibility:** (write here)

## 10. Reflection

<!-- 100-200 words, in your own words, no AI. Compare AI-assisted coding (the Python part) with
     vibe coding (the Bolt part); one example each of a reliability, an availability/usability and
     a security risk; why review, tool permissions and tests stay human responsibilities; one AI
     recommendation you rejected or modified, and why; what you would improve next without
     expanding the scope. -->

(write here)

## 11. Appendix A — AI exchanges

<!-- At least four. Complete prompts and complete responses, as text — never screenshots. Paste
     each inside the ~~~~ block that follows its label.
     Stage: Plan, Generate, Critique or Repair (the brief's A-D) — at least one of each.
     Source: this SIS, week-05 or week-06. Reused exchanges keep their original date.
     The Generate exchange for Python must contain your v1 exactly as it is in code/original/.
     Add B5, B6 … if you ran more. -->

### B1

- **Tool:** Gemini (web)
- **Model:** Gemini 2.5 Flash
- **Date:** 2026-10-10
- **Stage:** Plan
- **Source:** week-05

**Prompt:**

~~~~text
(paste here)
~~~~

**Response:**

~~~~text
Here is the proposed implementation plan, ordered check sequence, assumptions, and suggested boundary cases for can_book.

Implementation Plan & Ordered Checks
To evaluate the booking decision cleanly and fail fast, the function checks the acceptance criteria in the following order:

Check Parameter Integrity & AC1 (Time Boundaries & Chronology):
- Check if 0<=start<end<=1440.
- Check if start>=now.
- If any of these fail, return False.

Check AC2 (Maximum Duration):
- Calculate duration=end-start.
- Check if duration<=120.
- If false, return False.

Check AC3 (Room Blocked Status):
- Check if blocked is True.
- If true, return False.

Check AC4 (Overlap with Existing Bookings):
- Iterate through each tuple (b_start, b_end) in existing.
- Check for an overlap using interval logic: two intervals [start,end) and [b_start,b_end) overlap if and only if start<b_end and end>b_start.
- If an overlap is found, return False.

Decision (AC5):
- If all checks pass, return True.

Key Assumptions
- Zero-Modification Guarantee: The function will read existing strictly without altering the list or its inner tuples.
- Interval Boundary Model: Intervals are half-open [start,end), meaning touching endpoints (e.g., existing booking [600,660) and new request [660,720)) satisfy 660<660=>False for overlap, allowing contiguous bookings.
- Midnight Boundary: Total minutes in a single day are represented up to 1440 (24:00). Requests starting at or after 1440 or ending after 1440 are invalid.
- Input Types: All time values (start, end, now) are valid integers, blocked is a boolean, and existing is a list of valid integer pairs.

Suggested Boundary Test Cases
- Touching Endpoints (Valid Contiguous Slots)
- Partial & Enclosed Overlaps
- Maximum Duration Bounds (AC2)
- Immediate Start (AC1)
- Day Limit Endpoints (AC1)
- Invalid Interval Shapes
~~~~

### B2

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Stage:** (write here)
- **Source:** (write here)

**Prompt:**

~~~~text
(paste here)
~~~~

**Response:**

~~~~text
(paste here)
~~~~

### B3

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Stage:** (write here)
- **Source:** (write here)

**Prompt:**

~~~~text
(paste here)
~~~~

**Response:**

~~~~text
(paste here)
~~~~

### B4

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Stage:** (write here)
- **Source:** (write here)

**Prompt:**

~~~~text
(paste here)
~~~~

**Response:**

~~~~text
(paste here)
~~~~

## 12. Appendix B — Test output

### 12.1 Your suite

<!-- The complete terminal output of your final suite. Path A: python -m unittest -v, run inside
     code/ — the part ending in "Ran N tests" and OK or FAILED. -->

~~~~text
test_covers_existing_rejected (test_booking.BookingTests.test_covers_existing_rejected) ... ok
test_inside_existing_rejected (test_booking.BookingTests.test_inside_existing_rejected) ... ok
test_negative_start_rejected (test_booking.BookingTests.test_negative_start_rejected) ... ok
test_non_integer_rejected (test_booking.BookingTests.test_non_integer_rejected) ... ok
test_start_zero_allowed_when_now_earlier (test_booking.BookingTests.test_start_zero_allowed_when_now_earlier) ... ok
test_starts_before_now_rejected (test_booking.BookingTests.test_starts_before_now_rejected) ... ok
test_starts_one_after_now_allowed (test_booking.BookingTests.test_starts_one_after_now_allowed) ... ok
test_t10_second_booking_rejected (test_booking.BookingTests.test_t10_second_booking_rejected) ... ok
test_t11_same_check_twice_and_no_mutation (test_booking.BookingTests.test_t11_same_check_twice_and_no_mutation) ... ok
test_t1_touching_end_is_allowed (test_booking.BookingTests.test_t1_touching_end_is_allowed) ... ok
test_t2_overlap_rejected (test_booking.BookingTests.test_t2_overlap_rejected) ... ok
test_t3_blocked_rejected (test_booking.BookingTests.test_t3_blocked_rejected) ... ok
test_t4_exactly_120_allowed (test_booking.BookingTests.test_t4_exactly_120_allowed) ... ok
test_t5_121_rejected (test_booking.BookingTests.test_t5_121_rejected) ... ok
test_t6_starts_now_rejected (test_booking.BookingTests.test_t6_starts_now_rejected) ... ok
test_t7_reversed_rejected (test_booking.BookingTests.test_t7_reversed_rejected) ... ok
test_t8_ends_at_midnight_allowed (test_booking.BookingTests.test_t8_ends_at_midnight_allowed) ... ok
test_t9_past_midnight_rejected (test_booking.BookingTests.test_t9_past_midnight_rejected) ... ok
test_touching_start_is_allowed (test_booking.BookingTests.test_touching_start_is_allowed) ... ok
test_zero_length_rejected (test_booking.BookingTests.test_zero_length_rejected) ... ok

----------------------------------------------------------------------
Ran 20 tests in 0.003s

OK

C:\Users\Nurassyl Galym\Desktop\KBTU\Software Engineering\Lab Week 1\se-practice\sis-03\code>   cd ..\..

C:\Users\Nurassyl Galym\Desktop\KBTU\Software Engineering\Lab Week 1\se-practice>
~~~~

### 12.2 Path B only — three faults you planted

<!-- Path A: leave this table as it is. Path B: three rows — the line you broke, the AC it
     breaks, the test that failed. -->

| # | Line you broke | AC | Test that failed |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |

## 13. Remaining limitations and known fails

<!-- One row per check ID in submission.yml known_fails, and any limitation you know of.
     If the checker is clean and you know of none, one row that says so. -->

| Check ID or limitation | Why it stays | What I would do next |
| --- | --- | --- |
| (write here) | (write here) | (write here) |