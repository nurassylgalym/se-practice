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
| `if not (0 <= start < end <= 1440 and start >= now): return False` | AC1 | No | Day bounds and order are right, but `start >= now` lets a request that starts exactly now pass. My Week 05 prompt itself said `start >= now` and the plan repeated it ("immediate bookings starting right now are valid"), so v1 followed my prompt; the SIS AC1 says strictly after now. T6 (540-570, now 540) returned True on v1. Final uses `start <= now` -> reject. |
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
- Observed on 2026-11-09 (Da Vinci 305, current time 09:00): T4 12:00-14:00 "Available, Da Vinci 305 is free from 12:00 to 14:00"; T5 12:00-14:01 "Unavailable, Bookings cannot be longer than 120 minutes"; T6 09:00-09:30 "Available, Da Vinci 305 is free from 09:00 to 09:30" (bug); T7 12:00-11:00 "Unavailable, Start time must be earlier than end time". Screenshots in `evidence/` (t4, t5, v1-T6, t7, t8-9).
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
| T1 | Touching | 660–720 | Available | True | True | Not testable | Available |
| T2 | Overlap | 630–690 | Unavailable | False | False | Not testable | Unavailable |
| T3 | Blocked | 660–720, blocked | Unavailable | False | False | Not testable | Unavailable |
| T4 | Exactly 120 min | 720–840 | Available | True | True | Available | Available |
| T5 | 121 min | 720–841 | Unavailable | False | False | Unavailable | Unavailable |
| T6 | Starts now | 540–570 | Unavailable | True | False | Available | Unavailable |
| T7 | Reversed | 720–660 | Unavailable | False | False | Unavailable | Unavailable |
| T8 | Ends at midnight | 1380–1440 | Available | True | True | Not testable | Not testable |
| T9 | Past midnight | 1380–1441 | Unavailable | False | False | Not testable | Not testable |
| T10 | Second booking | 720–780, existing (600–660), (700–760) | Unavailable | False | False | Not testable | Unavailable |
| T11 | Same check twice | 660–720, twice | Available | True | True | Not testable | Available |
| T12 | Narrow screen | T1 at ~375 px wide | Available | n/a | n/a | Not testable | Available |

Page final runs, 2026-11-09, Bolt preview, current time 09:00, rooms after repair 1 (Da Vinci 305: only 10:00-11:00; Hopper 330: 10:00-11:00 and 11:40-12:40). T1 Da Vinci 11:00-12:00; T2 Da Vinci 10:30-11:30 ("Overlaps an existing booking (10:00-11:00 by Art Studio)"); T3 Turing 110 11:00-12:00 ("Turing 110 is currently blocked and cannot be booked"); T4-T7 Da Vinci as in v1, T6 now "Start time must be strictly after the current time"; T8/T9 the end field stops at 23:59, typing 24 is not accepted; T10 Hopper 330 12:00-13:00 ("Overlaps an existing booking (11:40-12:40 by Writing Workshop)"); T11 Da Vinci 11:00-12:00, end changed to 12:30 and back to 12:00, Available again with the bookings list unchanged; T12 T1 in Chrome DevTools at iPhone SE 375x667, Available (`evidence/final-narrow.png`).

## 6. Traceability

<!-- His table. Implementation / file: where the rule lives (booking.py line, a component).
     Test input: the case IDs from section 5. v1 / final actual: what those cases gave. -->

| AC | Implementation / file | Test input | Expected | v1 actual | Final actual |
| --- | --- | --- | --- | --- | --- |
| AC1 | `code/booking.py` lines 3-7; page `src/availability.ts` `validateInterval` | T6, T7, T8, T9 | T6/T7/T9 reject, T8 accept | Python: T6 True (fault), T7/T9 False, T8 True. Page: T6 Available (fault), T7 Unavailable, T8/T9 Not testable | Python: all as expected. Page: T6/T7 Unavailable, T8/T9 Not testable |
| AC2 | `code/booking.py` line 8; page `validateDuration` | T4, T5 | T4 accept, T5 reject | Python T4 True, T5 False; page Available / Unavailable | Python T4 True, T5 False; page Available / Unavailable |
| AC3 | `code/booking.py` line 10; page `checkRoomBlocked` | T3 | reject | Python False; page Not testable (Turing 110 disabled in the dropdown) | Python False; page Unavailable with the blocked reason |
| AC4 | `code/booking.py` line 12; page `checkOverlap` | T1, T2, T10 | T1 accept, T2/T10 reject | Python T1 True, T2/T10 False; page Not testable (no room with only 10:00-11:00) | Python T1 True, T2/T10 False; page Available / Unavailable / Unavailable |
| AC5 | `code/booking.py` returns a bool and only reads `existing`; page `evaluateAvailability` never writes bookings | T11, `test_t11_same_check_twice_and_no_mutation` | Available twice, list unchanged | Python True; page Not testable | Python True; page Available twice, bookings list unchanged |
| AC6 | page `src/App.tsx` reason line under the verdict, responsive layout | T5, T7, T12 | clear reason; usable at 375 px | Page: reasons shown for T5/T7; T12 Not testable | Page: reasons shown; T12 Available at 375 px, single column |

## 7. Issue log

<!-- At least two, from v1 — a functional defect and a usability or code-quality issue where you
     have them. If every case passed on v1, log the preventive cleanup and say why.
     Reproduction names a case (T1-T12) or an AC. Priority: High, Medium or Low.
     Prompt / change: the focused prompt you sent, and what changed. Never "make it better". -->

| # | Issue | Reproduction | Priority | Prompt / change | Retest result |
| --- | --- | --- | --- | --- | --- |
| 1 | Base data for T1, T2, T10, T11, T12 cannot be set up on the page: no room has 10:00-11:00 as its only booking and bookings cannot be edited | Page v1, all rooms checked: Da Vinci 305 only 16:00-17:00, Feynman 220 10:00-11:30. T1/T2/T10/T11/T12 Not testable (AC4, AC5) | High | Bolt: "Cases T1, T2, T10 and T11 cannot be set up: no sample room has 10:00-11:00 as its only booking (Da Vinci 305 has only 16:00-17:00). Change only src/sampleData.ts: make Da Vinci 305's only booking 10:00-11:00, and add one fictional room "Hopper 330" (not blocked) with exactly two bookings, 10:00-11:00 and 11:40-12:40. Change nothing else." Bolt read and edited only `src/sampleData.ts` | The preview first still showed 16:00-17:00; after a manual reload Da Vinci 305 shows 10:00-11:00 and Hopper 330 shows both bookings. T1 Available, T2 Unavailable, T10 Unavailable, T11 Available twice, T12 Available |
| 2 | "Current time (sim)" ignores 00:00 and keeps the old value, so midnight cannot be used as now | Typed 0000 + Tab in the field -> it stayed 09:00 (AC1, AC6). Code: the handler falls back to the old value with a logical OR, and 0 is falsy | Medium | Bolt: "Typing 00:00 into "Current time (sim)" is ignored and the field keeps the old value, so a current time of midnight cannot be tested (AC1). Make the smallest change in src/App.tsx so 00:00 is accepted. Change nothing else." Bolt searched, read and edited only `src/App.tsx`, then built the project | Bolt said it had not tested in a browser. I typed 0000 + Tab after reload: the field shows 00:00. T1-T7, T10-T12 rerun, unchanged |
| 3 | The exported project still lists `@supabase/supabase-js`, a database client nothing imports (out of scope, security) | Downloaded `web/final/project/package.json`, line 14: `"@supabase/supabase-js": "^2.57.4"`; the brief excludes database and backend, and nothing in AC1-AC6 needs one; the checker had flagged the same in v1 | High | Bolt: "package.json lists "@supabase/supabase-js", a database client, but nothing in src imports it, and the brief excludes any database or backend. Remove only this dependency from package.json and package-lock.json. Change nothing else." Bolt searched for supabase, read package.json, removed it with the package manager and rebuilt | `package.json` in the new export has no supabase; T1 still Available after reload. Bolt offered to also fix npm audit warnings: rejected, out of scope |
| 4 | (carried from week-06 final) start equal to current time accepted | Page v1 T6: 09:00-09:30 at 09:00 -> Available (AC1) | High | week-06 prompt in `src/availability.ts`: `start < currentTime` -> `start <= currentTime` | T6 final: Unavailable, "Start time must be strictly after the current time" |
| 5 | (carried from week-06 final) blocked room disabled in the dropdown, so AC3 is never shown | Page v1 T3: Turing 110 greyed out, cannot be selected (AC3) | Medium | week-06 prompt in `src/App.tsx`: removed `disabled` and the `[blocked]` suffix from the options | T3 final: Unavailable, "Turing 110 is currently blocked and cannot be booked" |

**Before / after:** `evidence/before-1.png` → `evidence/after-1.png` show issue 1: before, Da Vinci 305 has only the 16:00-17:00 booking so T1 cannot be set up; after, Da Vinci 305 has only 10:00-11:00 and 11:00-12:00 shows Available

## 8. Critique decisions

<!-- The AI's review against AC1-AC6 (stage C), claim by claim. At least three rows.
     How I verified it: the case, test or run that confirmed or refuted the claim.
     Decision: accept, reject or modify. At least one reject or modify — the reflection asks for it. -->

| # | AI claim or recommendation | How I verified it | Decision | Reason (AC or case) |
| --- | --- | --- | --- | --- |
| 1 | (first "Claim 1") `start <= now` in `booking.py` wrongly rejects a booking that starts exactly at now | Ran `can_book(600, 660, 600, False, [])` -> False and `can_book(601, 660, 600, False, [])` -> True; T6 and `test_t6_starts_now_rejected` are green | reject | AC1 says start strictly after now, so False is correct. Gemini contradicted itself in the same answer and then dropped this claim. |
| 2 | `now` is not type-checked, so `now = True` slips through | Ran `can_book(600, 660, True, False, [])` -> True (Python treats True as 1) | reject | The contract says `now` is always valid (0-1439). Checking it would add a rule that is not in AC1-AC5. |
| 3 | AC6: the function returns a bare bool instead of a message, and nothing is made for mobile | The contract requires `True`/`False`. On the page, T5 showed "Bookings cannot be longer than 120 minutes" and T7 "Start time must be earlier than end time" | modify | AC6 is about the page, not the function. The function stays a bool; the feedback point is valid only for the page, and v1 already shows a reason. Narrow width is checked by T12 and `final-narrow.png`, not by the function. |
| 4 | A malformed tuple in `existing`, like `(600, 660, 720)`, crashes with ValueError | Ran it: `ValueError: too many values to unpack (expected 2)` -> the claim is true | reject | The contract says `existing` holds valid `(start, end)` pairs. Adding a guard is out of scope; it changes no AC1-AC5 result for valid input. |

**What the critique missed:** it never mentioned the real AC1 defect in the TypeScript v1, `if (start < currentTime)` in `src/availability.ts`, which lets start == current time through. That is what T6 showed on the page (Available). So the review found nothing true that mattered and missed the one real bug.

## 9. Coding-agent analysis

### 9.1 The loop

<!-- One real pass through the loop from this assignment — with your assistant or with Bolt. -->

| Step | What happened in this assignment |
| --- | --- |
| User goal | Make 00:00 usable in "Current time (sim)" (issue 2, AC1) without touching anything else |
| Model / plan | Bolt (GLM 5.3 Flash) said in its reply that midnight is stored as 0, which the old handler treated as no value, and planned to change only that handler |
| Tool call | Bolt showed 4 actions: Searched `sim|Current time`, Read `src/App.tsx`, Edited `src/App.tsx`, Built project to verify changes |
| Observation | The build passed, but Bolt wrote that it had no browser tool and had not tested the field, and asked me to check it |
| Next step | Bolt stopped and handed back. I reloaded the preview, typed 0000 + Tab, and the field kept 00:00; then I reran T1-T7 and T10-T12 |
| Human review | I checked which files it touched (only App.tsx), confirmed the fix by hand, and only then exported the final. In repair 1 the same review caught that the preview still showed the old data until a manual reload |

### 9.2 Context, tools and permissions

<!-- At least three rows. Last column: Observed (you saw it happen) or Assumed (you infer it
     about the internals). Use both at least once. -->

| Tool | Context it used | Tools or permissions | Observed or assumed |
| --- | --- | --- | --- |
| Bolt.new (repair 1) | The project files; its action list shows it read `src/sampleData.ts` before and after editing | Read and edit project files; it edited only the file my prompt allowed | Observed |
| Bolt.new (repair 2) | Searched the project for "sim / Current time", then read `src/App.tsx` | Edit files and run a build in its sandbox; no browser (it said so itself) | Observed |
| Bolt.new (in general) | Probably the whole project plus the earlier chat, not only the files in the action list | It could also install packages or rewrite any file, since nothing I saw limits it to one file; my prompt was the only limit | Assumed |
| Gemini 2.5 Flash (critique, new chat) | Only the two attached files and my prompt; it named lines from them | No code execution: it described outputs like "raises ValueError" without running anything (I ran them myself) | Assumed |

### 9.3 Checkpoint and dependability

**Safety checkpoint:** Before I accept any AI change I look at which files it touched, reload and run the affected cases myself (T1-T12 on the page, `python -m unittest` for the function), and check the export for network calls, storage, login or new packages.

**Reliability, security, responsibility:** The agent reported success twice in a way I could not trust as is: once the preview still showed old data, once it said it never tested in a browser. So reliability comes from my reruns, not from its summary. Security: v1 shipped a Supabase database client nobody asked for, so I read the dependencies before accepting an export. The agent can edit and build, but deciding that the result is correct and in scope stays my responsibility, because I am the one who submits it.

## 10. Reflection

<!-- 100-200 words, in your own words, no AI. Compare AI-assisted coding (the Python part) with
     vibe coding (the Bolt part); one example each of a reliability, an availability/usability and
     a security risk; why review, tool permissions and tests stay human responsibilities; one AI
     recommendation you rejected or modified, and why; what you would improve next without
     expanding the scope. -->

The Python part felt much safer than the Bolt part. With can_book I could read every line and run 20 tests. With Bolt I only saw the page, so I clicked through every case by hand and still couldn't test some of them. Reliability: v1 accepted a start equal to now (T6). Gemini didn't invent that, it copied `start >= now` from my own Week 05 prompt, so the AI repeats my mistakes too. Usability: on the v1 page I couldn't set up T1, and 00:00 as current time was ignored. Security: Bolt added a Supabase database client to a project that needs no database. Bolt also said its fixes worked, but once the preview still showed old data and once it admitted it never opened a browser. So review, tests and deciding what the tool may touch stay my job. I rejected Gemini's advice to type-check `now`, because the contract says inputs are valid, and Bolt's offer to fix npm warnings, because it was out of scope. Next I would let the end field reach 24:00 so T8 and T9 become testable.

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
[Message 1 in the same chat — context]
Scenario: Smart Campus study room booking.
User story: As a student, I want to check a room's availability so that I can choose a valid booking time.
Feature: implement can_book(...) for one selected room. Return a decision.
The complete system handles saving and confirmation.
Function contract
can_book(start, end, now, blocked, existing)
Times are integer minutes after midnight on one date. Example: 600 means 10:00.
now is valid (0-1439). blocked is a Boolean.
existing contains valid (start, end) tuples for this room's active bookings only.
Return True or False. Keep all inputs unchanged.
Acceptance criteria
AC1: 0 <= start < end <= 1440, and start >= now.
AC2: Duration is at most 120 minutes.
AC3: The room is not blocked.
AC4: No overlap with an existing booking. Touching endpoints are allowed.
AC5: Return True only when AC1-AC4 hold. Return False otherwise and never alter existing.
Intervals include the start and exclude the end.
This is the scenario, the function contract and the acceptance criteria. Use only these.
Wait for my first request.

[Gemini's reply to message 1]
Acknowledge the contract, scenario, and acceptance criteria. Ready when you are—send over your first request!

[Message 2 — the plan request]
Propose a short implementation plan for can_book. List the checks in order and identify assumptions. Use Python 3 and the supplied rules. Do not write code yet. Suggest boundary cases that could expose an incorrect implementation.
~~~~

**Response:**

~~~~text
Here is the proposed implementation plan, ordered check sequence, assumptions, and suggested boundary cases for `can_book`.

Implementation Plan & Ordered Checks
To evaluate the booking decision cleanly and fail fast, the function checks the acceptance criteria in the following order:

1. Check Parameter Integrity & AC1 (Time Boundaries & Chronology):

   * Check if $0 \le \text{start} < \text{end} \le 1440$.

   * Check if $\text{start} \ge \text{now}$.

   * If any of these fail, return `False`.

2. Check AC2 (Maximum Duration):

   * Calculate $\text{duration} = \text{end} - \text{start}$.

   * Check if $\text{duration} \le 120$.

   * If false, return `False`.

3. Check AC3 (Room Blocked Status):

   * Check if `blocked` is `True`.

   * If true, return `False`.

4. Check AC4 (Overlap with Existing Bookings):

   * Iterate through each tuple `(b_start, b_end)` in `existing`.

   * Check for an overlap using interval logic: two intervals $[\text{start}, \text{end})$ and $[b\_start, b\_end)$ overlap if and only if $\text{start} < b\_end$ and $\text{end} > b\_start$.

   * If an overlap is found, return `False`.

5. Decision (AC5):

   * If all checks pass, return `True`.

Key Assumptions

* Zero-Modification Guarantee: The function will read `existing` strictly without altering the list or its inner tuples.

* Interval Boundary Model: Intervals are half-open $[start, end)$, meaning touching endpoints (e.g., existing booking $[600, 660)$ and new request $[660, 720)$) satisfy $660 < 660 \implies \text{False}$ for overlap, allowing contiguous bookings.

* Midnight Boundary: Total minutes in a single day are represented up to $1440$ (24:00). Requests starting at or after $1440$ or ending after $1440$ are invalid.

* Input Types: All time values (`start`, `end`, `now`) are valid integers, `blocked` is a boolean, and `existing` is a list of valid integer pairs.

Suggested Boundary Test Cases

1. Touching Endpoints (Valid Contiguous Slots):

   * Request: `start = 660`, `end = 720`, `now = 540`, `blocked = False`, `existing = [(600, 660)]` $\rightarrow$ Expected: `True`.

   * Request: `start = 540`, `end = 600`, `now = 540`, `blocked = False`, `existing = [(600, 660)]` $\rightarrow$ Expected: `True`.

2. Partial & Enclosed Overlaps:

   * Request overlapping existing slot $[600, 660)$: `start = 630`, `end = 690` $\rightarrow$ Expected: `False`.

   * Existing slot $[600, 720)$ completely enclosing request $[630, 660)$: `start = 630`, `end = 660` $\rightarrow$ Expected: `False`.

3. Maximum Duration Bounds (AC2):

   * Exactly 120 minutes: `start = 600`, `end = 720` $\rightarrow$ Expected: `True`.

   * 121 minutes: `start = 600`, `end = 721` $\rightarrow$ Expected: `False`.

4. Immediate Start (AC1):

   * Booking starting right now: `start = now`, `end = now + 60` $\rightarrow$ Expected: `True`.

   * Booking starting 1 minute in the past: `start = now - 1` $\rightarrow$ Expected: `False`.

5. Day Limit Endpoints (AC1):

   * Ending exactly at midnight: `start = 1320`, `end = 1440`, `now = 1200` $\rightarrow$ Expected: `True`.

   * Ending beyond midnight: `start = 1380`, `end = 1441` $\rightarrow$ Expected: `False`.

6. Invalid Interval Shapes:

   * Zero duration (`start == end`): `start = 600`, `end = 600` $\rightarrow$ Expected: `False`.

   * Negative duration (`start > end`): `start = 700`, `end = 600` $\rightarrow$ Expected: `False`.
~~~~

### B2

- **Tool:** Gemini (web)
- **Model:** Gemini 2.5 Flash
- **Date:** 2026-10-10
- **Stage:** Generate
- **Source:** week-05

**Prompt:**

~~~~text
Implement can_book in booking.py using the supplied contract and AC1-AC5. Keep the signature. Use only the standard library. Do not modify existing. Return the function and explain each condition. Keep the feature within the stated scope.
~~~~

**Response:**

~~~~text
Here is the implementation for `can_book` in `booking.py`, followed by an explanation of each condition.

```python
def can_book(start: int, end: int, now: int, blocked: bool, existing: list) -> bool:
    """
    Determines if a study room can be booked given the request parameters and constraints.
    
    Parameters:
        start (int): Start time in minutes after midnight (0-1440).
        end (int): End time in minutes after midnight (0-1440).
        now (int): Current time in minutes after midnight (0-1439).
        blocked (bool): True if the room is blocked by an administrator.
        existing (list): List of (start, end) tuples for active bookings on this room.
        
    Returns:
        bool: True if all acceptance criteria AC1-AC4 hold, False otherwise.
    """
    # AC1: Check time bounds, interval ordering, and chronology
    if not (0 <= start < end <= 1440 and start >= now):
        return False

    # AC2: Check maximum booking duration limit (120 minutes)
    if (end - start) > 120:
        return False

    # AC3: Check if room is blocked
    if blocked:
        return False

    # AC4: Check for interval overlaps with existing active bookings
    # Interval overlap condition for half-open intervals [start, end) and [b_start, b_end):
    # Two intervals overlap if and only if start < b_end and end > b_start.
    for b_start, b_end in existing:
        if start < b_end and end > b_start:
            return False

    # AC5: Return True only when all AC1-AC4 conditions pass
    return True

```

---

### Condition Explanations

1. **`0 <= start < end <= 1440 and start >= now` (AC1)**
* `0 <= start`: The booking cannot start before midnight (minute 0).
* `start < end`: Ensures a positive duration; prevents zero-length (`start == end`) or inverted (`start > end`) time intervals.
* `end <= 1440`: The booking must end within the same date (1440 minutes = 24 hours).
* `start >= now`: Prevents booking time slots in the past; immediate bookings starting right `now` are valid.


2. **`(end - start) <= 120` / `(end - start) > 120` (AC2)**
* Enforces the maximum duration limit of 120 minutes (2 hours). Requests exceeding 120 minutes return `False`.


3. **`if blocked:` (AC3)**
* Rejects any booking request if the room is marked as blocked by an administrator.


4. **`start < b_end and end > b_start` (AC4)**
* Tests for overlap between the requested interval $[\text{start}, \text{end})$ and each existing booking $[\text{b\_start}, \text{b\_end})$.
* Using strict inequalities handles half-open intervals properly: touching endpoints (e.g., existing $[600, 660)$ and request $[660, 720)$) evaluate to `660 < 660` (which is `False`), allowing contiguous bookings without false overlap flags.


5. **Return Decision (AC5)**
* Returns `True` if and only if no checks fail. The input list `existing` is iterated over directly without mutation or reordering, strictly maintaining input immutability.
~~~~

### B3

- **Tool:** Gemini (web), new chat
- **Model:** Gemini 2.5 Flash
- **Date:** 2026-11-09
- **Stage:** Critique
- **Source:** this SIS

**Prompt:**

~~~~text
[Attached files: sis-03/code/booking.py, sis-03/web/original/project/src/availability.ts]

Review this Python function can_book and this TypeScript availability logic against these acceptance criteria. List each problem as a separate claim with the AC it violates and a concrete input that shows it.
AC1: integer minutes, 0 <= start < end <= 1440, start strictly after now.
AC2: duration at most 120 minutes, exactly 120 allowed.
AC3: reject every request when the room is blocked.
AC4: reject overlap with any booking; touching endpoints are not overlap.
AC5: unambiguous Available/Unavailable; never mutate existing bookings.
AC6: understandable validation feedback; usable on narrow/mobile screens.
~~~~

**Response:**

~~~~text
To analyze the Python function `can_book` in `booking.py` and the TypeScript availability logic against Acceptance Criteria AC1–AC6, we examine each piece of logic step-by-step to identify violations, cite the violated AC, and provide concrete input values demonstrating the bug.

---

### **Issue Claims & AC Violations**

#### **Claim 1: Incorrect rejection of immediate bookings starting right now (`start == now`)**

* **AC Violated:** **AC1** (*"0 <= start < end <= 1440, start strictly after now"*)
* **Problem:** In `booking.py` (line 6), the Python implementation evaluates `if not (0 <= start < end <= 1440) or start <= now: return False`. Because it uses `start <= now`, it rejects any valid booking that starts exactly at `now`. However, AC1 states that `start` must be strictly after `now` (`start > now`).
* **Concrete Input:**
* `start = 600`
* `end = 660`
* `now = 600`
* `blocked = False`
* `existing = []`


* **Observed vs Expected:**
* **Observed:** Returns `False`


* **Expected:** Returns `True` (since `0 <= 600 < 660 <= 1440` and `600 > 599`, or `start` is strictly after `now` if `now` was 599; when `start == 600` and `now == 600`, `start > now` is `False`, which correctly rejects, but when `start = 601` and `now = 600`, it passes. Specifically, the function checks `start <= now` to return `False`, which correctly enforces `start > now`. However, checking the contract in `booking.py`: `start <= now` returns `False`, which means it requires `start > now`. But notebook source AC1 specifies `start >= now` in original contracts vs prompt text stating `start strictly after now`. Under the prompt's explicit AC1 (*start strictly after now*), `start <= now` returning `False` enforces `start > now`).



Let's re-verify line 6 of `booking.py`:
`if not (0 <= start < end <= 1440) or start <= now:`

* If `start = 600` and `now = 540`: `start <= now` is `600 <= 540` (False), so it proceeds.
* If `start = 600` and `now = 600`: `start <= now` is `600 <= 600` (True), returning `False`. Since AC1 in the prompt requires **start strictly after now** (`start > now`), returning `False` for `start == now` is compliant with `start > now`.

Let's carefully check all lines in `booking.py` against AC1–AC6:

---

### **Claim 1: Type checking rejects valid non-boolean integer subtypes or misses missing parameters / improper types**

* **AC Violated:** **AC1** (*"integer minutes, 0 <= start < end <= 1440, start strictly after now"*)
* **Problem:** `booking.py` only validates integer types for `start` and `end` (`for v in (start, end): if isinstance(v, bool) or not isinstance(v, int): return False`), but it fails to check `isinstance(now, int)` or validate that `now` is not a `bool`. If `now` is passed as a boolean or float, type safety under AC1 is compromised.


* **Concrete Input:**
* `start = 600`, `end = 660`, `now = True`, `blocked = False`, `existing = []`


* **Observed vs Expected:**
* **Observed:** `start <= now` evaluates `600 <= True` (False in Python 3, since `True == 1`), leading to evaluation continuing instead of failing type validation.
* **Expected:** `False` due to invalid `now` parameter type under AC1 integer minute requirements.



---

### **Claim 2: Incomplete validation feedback and lack of mobile/responsive screen support in TypeScript UI**

* **AC Violated:** **AC6** (*"understandable validation feedback; usable on narrow/mobile screens"*)
* **Problem:** Returning a plain boolean (`True`/`False`) without explanation does not provide understandable feedback to end users when a booking is rejected (e.g., distinguishing whether the room is blocked, the duration exceeds 120 minutes, or there is a schedule overlap). Furthermore, fixed-width UI components or raw boolean responses fail to provide responsive layout controls suitable for narrow mobile displays.
* **Concrete Input:**
* `start = 600`, `end = 780` (180 minutes duration), `now = 540`, `blocked = False`, `existing = []`


* **Observed vs Expected:**
* **Observed:** Function returns a bare `False`.


* **Expected:** Returns descriptive user-facing validation feedback (e.g., `"Duration exceeds maximum limit of 120 minutes"`) formatted for mobile viewports.



---

### **Claim 3: Missing validation for existing booking tuple structure in AC4**

* **AC Violated:** **AC4** (*"reject overlap with any booking; touching endpoints are not overlap"*) & **AC5** (*"unambiguous Available/Unavailable; never mutate existing bookings"*)
* **Problem:** In `booking.py`, `all(end <= s or start >= e for s, e in existing)` assumes every entry in `existing` is a valid 2-element sequence `(s, e)`. If `existing` contains malformed elements or non-tuple data, the function raises a `ValueError`/`TypeError` crash instead of cleanly returning `False` or handling availability unambiguously under AC5.


* **Concrete Input:**
* `start = 660`, `end = 720`, `now = 540`, `blocked = False`, `existing = [(600, 660, 720)]`


* **Observed vs Expected:**
* **Observed:** Raises `ValueError: too many values to unpack (expected 2)`.


* **Expected:** Returns `False` unambiguously without crashing.



---

### **Summary of Acceptance Criteria Mapping**

| # | AC Violated | Claim / Problem | Concrete Input Example |
| --- | --- | --- | --- |
| **1** | **AC1** | `now` parameter is not validated for integer type, allowing boolean/non-integer values to bypass type checks.

 | `can_book(600, 660, True, False, [])` |
| **2** | **AC4 / AC5** | Unpacking `existing` tuples without structure checks causes unhandled exceptions rather than unambiguous `False` decisions.

 | `can_book(660, 720, 540, False, [(600, 660, 720)])` |
| **3** | **AC6** | Returning binary booleans provides no understandable validation messages or mobile-adapted status feedback for UI integration.

 | `can_book(600, 780, 540, False, [])` |
~~~~

### B4

- **Tool:** Bolt.new
- **Model:** GLM 5.3 Flash
- **Date:** 2026-11-09
- **Stage:** Repair
- **Source:** this SIS

**Prompt:**

~~~~text
[Repair 1]
Cases T1, T2, T10 and T11 cannot be set up: no sample room has 10:00-11:00 as its only booking (Da Vinci 305 has only 16:00-17:00). Change only src/sampleData.ts: make Da Vinci 305's only booking 10:00-11:00, and add one fictional room "Hopper 330" (not blocked) with exactly two bookings, 10:00-11:00 and 11:40-12:40. Change nothing else.

[Repair 2, same project, next message]
Typing 00:00 into "Current time (sim)" is ignored and the field keeps the old value, so a current time of midnight cannot be tested (AC1). Make the smallest change in src/App.tsx so 00:00 is accepted. Change nothing else.

[Repair 3, same project, next message]
package.json lists "@supabase/supabase-js", a database client, but nothing in src imports it, and the brief excludes any database or backend. Remove only this dependency from package.json and package-lock.json. Change nothing else.
~~~~

**Response:**

~~~~text
[Repair 1 — 3 actions taken: Read src/sampleData.ts, Edited src/sampleData.ts, Read src/sampleData.ts]
I updated the sample data so the three test cases can now be set up. Da Vinci 305's only booking is now 10:00-11:00. I added a new room, Hopper 330, which is not blocked and has two bookings: 10:00-11:00 and 11:40-12:40. No other files were changed.

[Repair 2 — 4 actions taken: Searched sim|Current time, Read src/App.tsx, Edited src/App.tsx, Built project to verify changes]
The "Current time (sim)" field now accepts 00:00. The cause was that midnight is stored as zero, which the old code treated as "no value" and ignored. I changed only the handler for that field in the app file, and the project builds successfully. I haven't tested it in a browser, since there's no browser tool here, so please try typing 00:00 in that field to confirm.

[Repair 3 — 2 actions taken: Searched supabase, Read package.json; 2 commands executed: Remove unused supabase-js dependency, Verify project still builds]
The source has no Supabase imports, so the dependency is unused. I'll remove it with the package manager so the lock file stays consistent.
I removed the unused database client from the project's dependencies, and the project still builds. Nothing in the app used it, and I did not touch any other dependencies or code. The package manager also reported existing security warnings in the installed packages; I left those alone since you asked for only this change, but I can look at them if you want.
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
| T8, T9 on the page | `<input type="time">` stops at 23:59, so 24:00 and 24:01 cannot be entered; marked Not testable (C4 accepts this). The Python function covers both (T8 True, T9 False) | Replace the end field with one that can express 24:00, without changing AC1 |
| npm audit warnings in the Bolt export | Bolt reported existing security warnings in installed dev packages; fixing them was not asked and is outside AC1-AC6, so I left them | Review them separately, upgrade only if a fix keeps the page in scope |
| `now` and `existing` are not validated in `can_book` | The contract says `now` is valid and `existing` holds valid pairs, so extra checks would add rules (critique rows 2 and 4) | Nothing, unless the contract changes |