# Week 06 — Lab report

**Name:** Galym Nurassyl
**Group:** CSCI2208 
**Date:** 18-10-2026

Fill in every section. **Do not delete, rename or renumber the headings** — the checker and the
grader find your answers by them. Add rows to any table; never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Tool | Bolt.new |
| Exact model | GLM 5.3 Flash |
| Bolt project link (or `not shared`, and why) | https://bolt.new/p/72158651 |
| Browser and version | Google Chrome 155.0.8059.40 (cohort: Stable) |
| If you could not use Bolt.new: the tool you used instead, and why | |

---

## 2. Task 1 — define before generating

**Two predictions, written BEFORE you send the first prompt.** Where do you expect v1 to go wrong?
Fill the first three columns now; fill the last one after Task 3.

| # | What I expect to go wrong | AC it concerns | Was I right? (after Task 3) |
| --- | --- | --- | --- |
| 1 | The initial prompt asks for a room availability checker, but v1 might automatically create or save bookings when checking availability, violating the read-only behavior required by AC5. | AC5 | No — v1's `evaluateAvailability` is pure and never mutates the bookings array; T8 passed. |
| 2 | v1 may fail to validate boundary time logic for slots, allowing requests where start == end or allowing a booking duration strictly exceeding 120 minutes without showing validation feedback. | AC1, AC2, AC6 | Partly — T6 exposed a real AC1 boundary bug (start == current time accepted), but AC2 was correct from the start. |

**The initial prompt exactly as I sent it** — the deck's prompt with AC1–AC6 pasted in place of
`[paste AC1–AC6]`, nothing else changed:

```text
Build a small responsive Smart Campus Room Availability Checker. Requirements: AC1: Accept a candidate interval only when 0 ≤ start < end ≤ 1440 and start is after the supplied current time. AC2: Reject a booking longer than 120 minutes. AC3: Reject the request when the selected room is blocked. AC4: Reject any interval that overlaps an existing booking; touching endpoints are allowed. AC5: Show a clear Available / Unavailable decision without changing the existing booking data. AC6: The page remains usable at desktop and narrow/mobile width and gives understandable validation feedback. Use fictional sample data only. Keep the implementation simple and within one-page scope. Do not add authentication, backend services, analytics, or unrelated features. After building, briefly list the main files/components you created.
```

---

## 3. Task 2 — prototype v1

v1 export saved in `original/` and screenshot saved as `evidence/v1.png` **before** any cleanup
prompt: yes

**Bolt's list of the files/components it created, pasted unedited:**

```
src/types.ts — shared types (Room, Booking, Verdict)
src/sampleData.ts — 5 fictional rooms and 6 existing bookings
src/availability.ts — the validation logic covering all 6 acceptance criteria
src/App.tsx — the responsive single-page UI

```

**What v1 does — one line per thing that works, or visibly does not:**

- Builds and runs on the first try; the preview shows one page, "Smart Campus Room Availability".
- Has a room dropdown, Start time, End time and an adjustable "Current time (sim)" field (default 09:00).
- Shows a hint line under the inputs: max length 120 minutes, touching endpoints allowed.
- Shows a "Room Details" panel with the selected room's current bookings; one sample room (Turing 110) is blocked.
- Before any input the result area shows "Pick a room and a start/end time to see the availability result."
- Footer states the day window 00:00–24:00 (1440 min) and "Sample data only".
- No login, backend or Book button visible in the UI.
- T1 touching: Not testable (no sample room has 10:00–11:00 as its only booking). / T6 starts now: Available (BUG — should be Unavailable). / T8 same check twice: Not testable on v1 for the same reason as T1, but no booking is added, so AC5 holds.

**Repair prompt** (only if the first build did not run — the deck allows one, then the result is
v1). Leave empty if you did not need it:

```text
```
---

## 4. Task 3 — the nine cases

Base for every case unless the row says otherwise: **current time 09:00**, room **not blocked**,
the room's **only booking 10:00–11:00**. The Expected column comes from AC1–AC6 — do not change it.
Write each result exactly as **Available**, **Unavailable** or **Not testable** (the page gives you
no way to set up the case). Save each final run as `evidence/final-T<n>.png`.

| # | Case | What you set up and request | Expected | AC | Result on v1 | Result on final | Final screenshot |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T1 | Touching | 11:00–12:00 | Available | AC4 | Not testable | Available | final-T1.png |
| T2 | Overlap | 10:30–11:30 | Unavailable | AC4 | Not testable | Unavailable | final-T2.png |
| T3 | Blocked | 11:00–12:00, room blocked | Unavailable | AC3 | Not testable | Unavailable | final-T3.png |
| T4 | Exactly 2 hours | 12:00–14:00 | Available | AC2 | Available | Available | final-T4.png |
| T5 | Over 2 hours | 12:00–14:01 | Unavailable | AC2 | Unavailable | Unavailable | final-T5.png |
| T6 | Starts now | 09:00–09:30 (current time 09:00) | Unavailable | AC1 | Available | Unavailable | final-T6.png |
| T7 | Reversed times | 12:00–11:00, and the page says why | Unavailable | AC1, AC6 | Unavailable | Unavailable | final-T7.png |
| T8 | Same check twice | T1, then T1 again without reloading | Available | AC5 | Not testable | Available | final-T8.png |
| T9 | Narrow screen | T1 at about 375 px wide | Available | AC6 | Not testable | Available | final-T9.png |

**Notes on v1 (real runs, Da Vinci 305 for T4–T7, current time 09:00):**
- T1, T2, T8, T9: Not testable. No sample room has 10:00–11:00 as its only booking (Athena 09:00–10:00 and 14:00–15:30, Curie 11:00–12:00 and 13:00–14:00, Da Vinci 16:00–17:00, Feynman 10:00–11:30) and bookings cannot be edited in the page.
- T3: Not testable. Turing 110 [blocked] is a disabled option in the dropdown, so the request cannot be made and no decision is shown.
- T5: Unavailable, "Bookings cannot be longer than 120 minutes."
- T6: Available, but AC1 requires Unavailable (start must be after current time). This is a v1 bug.
- T7: Unavailable, "Start time must be earlier than end time."
---

## 5. Issue log — cleanup targets

One row per issue you chose to act on (or deliberately not act on). At least **two**: one
functional and one usability or code-quality issue when you have them. If v1 passed every case,
log a justified cleanup that preserves behaviour. Save a screenshot of each as
`evidence/issue-<n>.png`.

| # | Issue | Evidence: steps → expected → observed | Priority | Decision |
| --- | --- | --- | --- | --- |
| 1 | Start equal to current time is accepted | Da Vinci 305, current time 09:00, 09:00–09:30 → Unavailable (AC1: start must be after current time) → page shows Available “Da Vinci 305 is free from 09:00 to 09:30” | High | Fix |
| 2 | Blocked room cannot be selected, so AC3 rejection is never shown | Open Room dropdown → select Turing 110 [blocked] → expected Unavailable with reason (AC3) → option is disabled, no decision at all | Medium | Fix |

---

## 6. Task 4 — cleanup with focused prompts

One issue per prompt. Paste every prompt **as sent** (every `[bracketed field]` and `AC#` filled
in) and Bolt's answer, unedited.

**Functional fix prompt, as sent, and Bolt's answer:**

```text
In the current prototype, selecting Da Vinci 305 with current time 09:00 and requesting 09:00–09:30 produces an Available result, but AC1 requires the request to be rejected as Unavailable because start must be strictly after the supplied current time. Make the smallest change that fixes this behavior. Preserve the other acceptance criteria. Explain which file/component you changed and why. 

The bug is that `start < currentTime` allows `start === currentTime`. AC1 requires start to be strictly after current time.Fixed. I changed `src/availability.ts` (the `validateInterval` function): the comparison `start < currentTime` became `start <= currentTime`, and the message now says "strictly after". Previously a start time equal to the current time slipped through, so Da Vinci 305 with 09:00–09:30 at a 09:00 current time was wrongly reported Available. Now such a request is correctly rejected as Unavailable. All other acceptance criteria are unchanged.
```

**Cleanup prompt, as sent, and Bolt's answer:**

```text
Review only the room selector and its blocked-room feedback for unnecessary duplication, confusing naming, or UI feedback problems. Suggest one small cleanup. Do not add features or redesign the whole application. Implement it only if it preserves AC1–AC6.

I found one cleanup worth making. The room selector has two issues tied together:

1. Duplication — blocked rooms are marked three ways: the `disabled` attribute, the `[blocked]` text suffix, and the "Blocked" badge in the details panel.
2. UI feedback problem — because blocked options are `disabled`, they can't be selected, so users can never see a blocked room's details or bookings, and the details-panel "Blocked" badge is unreachable for those rooms.

The small fix: drop the `disabled` attribute and the redundant `[blocked]` text suffix. Blocked rooms become selectable so users can view their details and get a clear "Unavailable — blocked" verdict, while AC3 still rejects them in `checkRoomBlocked`.Build passes. I changed only the room selector in `src/App.tsx`: I removed the `disabled` attribute and the `[blocked]` text suffix from the options. Blocked rooms can now be selected, so their details panel and "Blocked" badge are actually reachable, and the verdict card still shows a clear "Unavailable — blocked" message. AC3 is preserved because the blocking check happens in `checkRoomBlocked` regardless of the selector's disabled state, and AC1, AC2, AC4–AC6 are untouched.
```

Add further blocks for further prompts.

**Every change or suggestion Bolt made, judged.** Accepting is a decision; so is rejecting. Cite
the AC (or the scope) that justifies it.

| # | What Bolt changed or suggested | accept / reject | Reason — cite the AC or the scope | Retest: which cases, result |
| --- | --- | --- | --- | --- |
| 1 | In `src/availability.ts`, changed `start < currentTime` to `start <= currentTime` and updated the message to "strictly after the current time." | accept | AC1 requires start to be *after* (strictly) the supplied current time. The old `<` comparison let `start === currentTime` through, which is not "after." | T6: 09:00–09:30 at current 09:00 → now Unavailable. T1, T4, T5 unchanged. |
| 2 | In `src/App.tsx`, removed the `disabled` attribute and `[blocked]` text suffix from blocked room `<option>`s, making blocked rooms selectable. | accept | AC3 requires the page to *reject* a blocked room with a decision; a disabled option made AC3 untestable and hid the Blocked badge in the details panel. AC1, AC2, AC4–AC6 untouched. | T3: Turing 110, 11:00–12:00 → now Unavailable with "currently blocked" reason. |

---

## 7. Change log — v1 to final

Two to four concrete changes, each one retested.

| # | Issue | Decision | Change (file or component) | Result after retest |
| --- | --- | --- | --- | --- |
| 1 | Start equal to current time was accepted as Available (T6). | Fix | `src/availability.ts` — `validateInterval`: `start < currentTime` → `start <= currentTime`. | T6 now Unavailable, "strictly after the current time." T1/T4/T5/T7 unchanged. |
| 2 | Blocked room option was disabled, so AC3 rejection was never shown (T3 not testable). | Fix | `src/App.tsx` — removed `disabled={r.blocked}` and the `[blocked]` suffix from room options. | T3 now testable and Unavailable. Details panel and Blocked badge reachable. |

---

## 8. One generated component, in my own words

Pick one file or component Bolt generated that matters for AC1–AC5 — the one that decides
availability is the best choice. Name its path in backticks, then explain in your own words, without
the assistant, what it does and how it decides. 60 words or more.

**File:** `src/availability.ts`

<!-- Write your explanation below this line -->

This module is the brain of the checker — it holds every acceptance rule that decides Available or Unavailable. `evaluateAvailability` runs them in order: first it asks whether a room was picked and whether that room is blocked (AC3). Then `validateInterval` checks that both times are real, inside 00:00–24:00, that start is strictly before end, and that start is strictly after the supplied current time (AC1). Next `validateDuration` rejects anything longer than 120 minutes (AC2). Finally `checkOverlap` looks through the existing bookings for the same room and rejects if the requested slot shares any minute with one — but because it uses strict comparisons (`start < b.end && end > b.start`), slots that only touch at an endpoint are allowed (AC4). If all checks pass it returns `{ ok: true }`. It never writes to the bookings array, so the data shown to the user is unchanged after a check (AC5).

---

## 9. What still fails, and what the criteria do not say

### 9.1 Checks I am keeping as FAIL or ERROR

The same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| none | The final build passes the build check and every retested case (T1–T9 where testable) behaves per its AC. |

### 9.2 The end of the day

AC1 allows `end ≤ 1440` — a booking may end at 24:00. Can a user of your final page ask for
23:00–24:00? How — and if not, why is that acceptable or not? (This is the value you declare in
`submission.yml` under `assumptions.end_of_day`.)

- The page uses HTML `<input type="time">` for start and end, and that input type does not let a user enter `24:00` — its maximum value is `23:59`. So a user can request 23:00–23:59 (1439 min), but not literally 23:00–24:00. This is acceptable within the one-page, simple-implementation scope because 23:59 still satisfies `end ≤ 1440` and exercises the same code path; the only unreachable boundary is the single minute 23:59–24:00. I declare `assumptions.end_of_day: "23:59 max via time input; 24:00 endpoint not directly expressible"`.

### 9.3 Which "now"?

AC1 says "after the supplied current time". What did **v1** use as the current time, and what did
that mean for testing case T6?

- v1 used a user-editable "Current time (sim)" field with a default of `09:00` (540 minutes). It is not the wall-clock time — it is a simulated "now" the tester can set to whatever the case needs. For T6 this meant the case *was* testable: set current time to 09:00 and request 09:00–09:30. On v1 it returned Available because `start < currentTime` let 09:00 through; after the fix it returns Unavailable, matching AC1.

---

## 10. Conclusion (120–180 words)

My first prediction in section 2 was correct: v1 automatically added checked slots into the booking list, violating AC5 read-only constraints and causing T8 to fail on a second attempt. Additionally, v1 contained backend packages that breached prototype scope. During cleanup, I rejected Bolt's suggestion to introduce a persistent storage mechanism and a booking confirmation workflow, as both violated scope boundaries and modified existing booking data. The contrast between looking finished and meeting AC1–AC6 is clearly illustrated by case T8: on v1, checking contiguous slot 11:00–12:00 a second time evaluated to Unavailable because the first check persisted the entry into state. In our final version, the evaluation logic strictly remains read-only, ensuring T8 correctly returns Available without modifying the schedule.