# Week 05 — Lab report

**Name: Nurassyl Galym**
**Group: Monday 16:00-19:00**
**Date: 10.11.2026**

Fill in every section. **Do not delete, rename or renumber the headings** — the checker and the
grader find your answers by them. Add rows to any table; never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Assistant (tool) | Gemini |
| **Exact** model name | Gemini 2.5 Flash |
| Language and version | Python 3.12 |
| Path | A |
| My Week 04 declaration for touching bookings | allowed |

---

## 2. Task 1 — the plan

**The assistant's plan, pasted unedited:**

```text
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
```

**What the plan invented or changed.** One row for every rule in the plan that is not in the
contract or in AC1–AC5, or that says something different from them. If you found none, write one
row saying which lines of the plan you checked against which AC.

| # | What the plan said | What the contract or the AC says | What I did |
| --- | --- | --- | --- |
| 1 | Plan step 1: "Check if start>=now" | AC1: the start must be in the future, so strictly start > now | I missed it at first and kept >=. The checker found it (F1, F3). Fixed in the final version. |
| 2 | Plan steps 2–5 (duration, blocked, overlap, result) | AC2–AC5 | Checked each step against its AC. No other differences. |

**Boundary cases the assistant suggested that I kept as tests:**

- Touching endpoints (existing booking [600,660) and request [660,720) -> True)
- Partial and enclosed overlaps with existing bookings (request [630,690) against [600,660) -> False)
- Maximum duration bounds (exact 120 minutes -> True, 121 minutes -> False)
- Starting exactly at `now` -> False (changed from the plan), starting at now+1 -> True
- Day limit endpoints (ending at 1440 -> True, ending after 1440 -> False)
- Invalid interval shapes (zero duration `start == end`, negative duration `start > end`)

---

## 3. Task 2 — the first version (v1), read before it was run

v1 is saved as `code/original/booking_v1.py`, exactly as the assistant returned it: yes

**AC map.** One row per condition in v1. Quote the line.

| # | Line in v1 | AC it implements | Correct as written? If not, why |
| --- | --- | --- | --- |
| 1 | `if not (0 <= start < end <= 1440 and start >= now): return False` | AC1 | No. `start >= now` lets a request that starts exactly now through. AC1 needs start > now. |
| 2 | `if (end - start) > 120: return False` | AC2 | Correct as written |
| 3 | `if blocked: return False` | AC3 | Correct as written |
| 4 | `for b_start, b_end in existing: if start < b_end and end > b_start: return False` | AC4 | Correct as written |
| 5 | `return True` | AC5 | Correct as written |

**Anything in v1 that no AC asks for** (extra validation, a buffer between bookings, logging,
saving the booking, a different return type):

- Nothing extra: no logging, no buffer, no side effects. The only problem is the wrong comparison in AC1.

---

## 4. Task 3 — my own tests

Base input for every row unless the row says otherwise: `now=540, blocked=False, existing=[(600, 660)]`.

| # | Test name | Request (start, end) | What differs from the base input | Expected | AC | Result on v1 | Result on final |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | test_01_touching_endpoints | (660, 720) | None | True | AC4 | PASS | PASS |
| 2 | test_02_overlap | (630, 690) | None | False | AC4 | PASS | PASS |
| 3 | test_03_blocked | (660, 720) | blocked=True | False | AC3 | PASS | PASS |
| 4 | test_04_exactly_2_hours | (720, 840) | None | True | AC2 | PASS | PASS |
| 5 | test_05_over_2_hours | (720, 841) | None | False | AC2 | PASS | PASS |
| 6 | test_06_starts_now | (540, 570) | start == now | False | AC1 | FAIL | PASS |
| 7 | test_07_starts_in_past | (539, 570) | start < now | False | AC1 | PASS | PASS |
| 8 | test_08_zero_length | (600, 600) | start == end | False | AC1 | PASS | PASS |
| 9 | test_09_reversed_times | (700, 600) | start > end | False | AC1 | PASS | PASS |
| 10 | test_10_day_bounds_midnight | (1320, 1440) | existing=[] | True | AC1 | PASS | PASS |
| 11 | test_11_exceeds_midnight | (1320, 1441) | existing=[] | False | AC1 | PASS | PASS |
| 12 | test_12_multiple_existing_no_overlap | (720, 780) | existing=[(600,660),(800,860)] | True | AC4 | PASS | PASS |
| 13 | test_13_existing_list_unchanged | (660, 720) | assert existing is unmutated | True | AC5 | PASS | PASS |
| 14 | test_14_touching_left_and_right | (600, 660) | existing=[(540,600),(660,720)] | True | AC4 | PASS | PASS |
| 15 | test_15_starts_one_after_now | (541, 570) | start == now+1 | True | AC1 | PASS | PASS |
| 16 | test_16_new_covers_existing | (590, 670) | None | False | AC4 | PASS | PASS |
| 17 | test_17_existing_covers_new | (620, 680) | existing=[(600,720)] | False | AC4 | PASS | PASS |
| 18 | test_18_identical_interval | (600, 660) | None | False | AC4 | PASS | PASS |
| 19 | test_19_overlap_left_side | (570, 630) | None | False | AC4 | PASS | PASS |
| 20 | test_20_overlap_only_with_last_booking | (720, 780) | existing=[(600,660),(700,760)] | False | AC4 | PASS | PASS |
| 21 | test_21_overlap_only_with_second_booking | (790, 850) | existing=[(600,660),(800,860)] | False | AC4 | PASS | PASS |
| 22 | test_22_start_at_zero_now_zero | (0, 60) | now=0, existing=[] | False | AC1 | FAIL | PASS |
| 23 | test_23_end_exactly_1440_ok | (1380, 1440) | existing=[] | True | AC1 | PASS | PASS |
| 24 | test_24_blocked_without_overlap | (720, 780) | blocked=True, existing=[] | False | AC3 | PASS | PASS |
| 25 | test_25_empty_existing_valid_request | (600, 660) | existing=[] | True | AC5 | PASS | PASS |
| 26 | test_26_end_over_midnight_short_request | (1400, 1450) | existing=[] | False | AC1 | PASS | PASS |
| 27 | test_27_existing_order_and_content_unchanged | (700, 760) and (610, 650) | existing=[(800,860),(600,660)] | assert unchanged | AC5 | PASS | PASS |

---

## 5. Task 4 — debugging with evidence

| # | Input (the full call) | Expected | Actual | Cause (quote the line) | Fix | Who proposed the fix |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | can_book(540, 570, 540, False, [(600, 660)]) | False | True | `if not (0 <= start < end <= 1440 and start >= now): return False` | `start >= now` → `start > now` | The checker showed the failure (F1, F3), I made the fix myself |

**The debug prompt I sent, and the assistant's answer** (leave the block empty if you did not use it):

```text
```

---

## 6. Task 5 — the critique

**The assistant's critique, pasted unedited:**

```text
1. Line 4: Condition `start > now` violates AC1 (which states `start >= now`).
   This rejects bookings starting at the current minute.

2. Line 8: Condition `end - start > 120` correctly implements AC2.

3. Line 12: Condition `if blocked:` correctly implements AC3.

4. Line 16: Condition `start < b_end and end > b_start` correctly implements AC4 (allows touching endpoints).

5. Line 20: Return value correctly implements AC5 and leaves existing unmodified.

Подробный разбор проблем для лабораторного отчёта:

* Проблема с AC1 (Линия 4):
   * В коде: `if not (0 <= start < end <= 1440 and start > now):`
   * В AC1: `AC1: 0 <= start < end <= 1440, and start >= now.`

   * Анализ: Код использует строгое неравенство `start > now`, из-за чего вызов вида `can_book(540, 570, now=540, ...)` возвращает `False`. Однако критерий AC1 допускает бронирования, начинающиеся прямо сейчас (`start >= now`).
* Остальные критерии (AC2–AC5):
   * AC2: Выражение `end - start > 120` ровно отсекает интервалы длиннее 120 минут (2 часов).
   * AC3: Проверка `if blocked:` правильно блокирует забронированные админом комнаты.
   * AC4: Условие `start < b_end and end > b_start` использует строгие знаки неравенства, что корректно обрабатывает полуоткрытые интервалы $[start, end)$ и пропускает касающиеся граничные точки (например, `660` и `660`).
   * AC5: Передаваемый список `existing` только читается в цикле `for` и не мутируется
```

| # | Suggestion | accept / reject | Reason — cite the AC or the contract line | Suite after the change |
| --- | --- | --- | --- | --- |
| 1 | Change `start > now` back to `start >= now` (Gemini says AC1 allows a start at the current minute) | reject | AC1 requires the start to be in the future, so start == now must be rejected. Checker F1 and F3 ("AC1 the start is in the future") expect False for can_book(540, 570, 540, ...) and pass only with `start > now`. Gemini's quote of AC1 does not match the task text. | 27 PASS |
| 2 | Line `end - start > 120` correctly implements AC2 | accept | AC2: at most 120 minutes. No change needed. Checked with test_04 (120 -> True) and test_05 (121 -> False). | 27 PASS |
| 3 | Line `if blocked:` correctly implements AC3 | accept | AC3: a blocked room accepts nothing. No change needed. Checked with test_03 and test_24. | 27 PASS |
| 4 | Condition `start < b_end and end > b_start` correctly implements AC4 | accept | AC4: overlaps are rejected, touching endpoints are allowed. No change needed. Checked with test_01 and test_14. | 27 PASS |
| 5 | `existing` is only read and the return value is correct | accept | AC5: the result is a real Boolean and the inputs are left unchanged. No change needed. Checked with test_13, test_27 and the assertIs checks. | 27 PASS |

---

## 7. Change log — v1 to final

| # | What changed (the line, before → after) | Why | Evidence: the test or check that moved |
| --- | --- | --- | --- |
| 1 | Line 1: `start >= now` → `start > now` | AC1 says the start must be in the future, so a request starting exactly now is not allowed | F1, F3: FAIL → PASS. test_06 and test_22 fail on v1 and pass on final. |
| 2 | Tests: test_06 expectation changed True → False, test_14–test_27 added, assertTrue/assertFalse → assertIs | My test_06 copied the wrong rule from the plan. The mutation checks showed the suite was too weak (test_11 hid the 1440 bound behind AC2, test_13 did not catch in-place changes of a longer list). | M1, M2, M7, M8, M10: NOT caught → caught (see 8.2) |

---

## 8. Evidence — real output

### 8.1 My suite, final run

Paste the **complete** terminal output. For Python: everything `python -m unittest -v` printed.

```text
test_01_touching_endpoints (test_booking.TestCanBook.test_01_touching_endpoints) ... ok
test_02_overlap (test_booking.TestCanBook.test_02_overlap) ... ok
test_03_blocked (test_booking.TestCanBook.test_03_blocked) ... ok
test_04_exactly_2_hours (test_booking.TestCanBook.test_04_exactly_2_hours) ... ok
test_05_over_2_hours (test_booking.TestCanBook.test_05_over_2_hours) ... ok
test_06_starts_now (test_booking.TestCanBook.test_06_starts_now) ... ok
test_07_starts_in_past (test_booking.TestCanBook.test_07_starts_in_past) ... ok
test_08_zero_length (test_booking.TestCanBook.test_08_zero_length) ... ok
test_09_reversed_times (test_booking.TestCanBook.test_09_reversed_times) ... ok
test_10_day_bounds_midnight (test_booking.TestCanBook.test_10_day_bounds_midnight) ... ok
test_11_exceeds_midnight (test_booking.TestCanBook.test_11_exceeds_midnight) ... ok
test_12_multiple_existing_no_overlap (test_booking.TestCanBook.test_12_multiple_existing_no_overlap) ... ok
test_13_existing_list_unchanged (test_booking.TestCanBook.test_13_existing_list_unchanged) ... ok
test_14_touching_left_and_right (test_booking.TestCanBook.test_14_touching_left_and_right) ... ok
test_15_starts_one_after_now (test_booking.TestCanBook.test_15_starts_one_after_now) ... ok
test_16_new_covers_existing (test_booking.TestCanBook.test_16_new_covers_existing) ... ok
test_17_existing_covers_new (test_booking.TestCanBook.test_17_existing_covers_new) ... ok
test_18_identical_interval (test_booking.TestCanBook.test_18_identical_interval) ... ok
test_19_overlap_left_side (test_booking.TestCanBook.test_19_overlap_left_side) ... ok
test_20_overlap_only_with_last_booking (test_booking.TestCanBook.test_20_overlap_only_with_last_booking) ... ok
test_21_overlap_only_with_second_booking (test_booking.TestCanBook.test_21_overlap_only_with_second_booking) ... ok
test_22_start_at_zero_now_zero (test_booking.TestCanBook.test_22_start_at_zero_now_zero) ... ok
test_23_end_exactly_1440_ok (test_booking.TestCanBook.test_23_end_exactly_1440_ok) ... ok
test_24_blocked_without_overlap (test_booking.TestCanBook.test_24_blocked_without_overlap) ... ok
test_25_empty_existing_valid_request (test_booking.TestCanBook.test_25_empty_existing_valid_request) ... ok
test_26_end_over_midnight_short_request (test_booking.TestCanBook.test_26_end_over_midnight_short_request) ... ok
test_27_existing_order_and_content_unchanged (test_booking.TestCanBook.test_27_existing_order_and_content_unchanged) ... ok

----------------------------------------------------------------------
Ran 27 tests in 0.004s

OK
```

### 8.2 The checker, final run

Paste the **complete** output of `python tests/check_booking.py`. Paste it **last**: if you edit
this file afterwards, run the checker again and paste again.

```text
Week 05 - can_book: the function, your tests, the evidence   (Path A)

PASS   F1   the six cases from the task table           6 of 6 cases
PASS   F2   AC1 time order and day bounds               5 of 5 cases
PASS   F3   AC1 the start is in the future              5 of 5 cases
PASS   F4   AC2 at most 120 minutes                     3 of 3 cases
PASS   F5   AC3 a blocked room accepts nothing          2 of 2 cases
PASS   F6   AC4 every kind of overlap is rejected       5 of 5 cases
PASS   F7   AC4 touching endpoints are allowed          3 of 3 cases
PASS   F8   AC4 every existing booking is checked       4 of 4 cases
PASS   F9   AC5 the result is a real Boolean            3 of 3 cases
PASS   F10  AC5 the inputs are left unchanged           2 of 2 cases
PASS   O1   the assistant's first version is kept       v1 kept (35 lines)
PASS   S1   your suite has at least 11 tests            27 tests
PASS   S2   your suite is green on your own code        27 tests, OK
PASS   M1   your tests catch a fault in AC1             caught by test_06_starts_now, test_22_start_at_zero_now_zero
PASS   M2   your tests catch a fault in AC1             caught by test_26_end_over_midnight_short_request
PASS   M3   your tests catch a fault in AC1             caught by test_08_zero_length
PASS   M4   your tests catch a fault in AC2             caught by test_04_exactly_2_hours, test_10_day_bounds_midnight
PASS   M5   your tests catch a fault in AC3             caught by test_03_blocked, test_24_blocked_without_overlap
PASS   M6   your tests catch a fault in AC4             caught by test_01_touching_endpoints, test_14_touching_left_and_right
PASS   M7   your tests catch a fault in AC4             caught by test_20_overlap_only_with_last_booking, test_21_overlap_only_with_second_booking
PASS   M8   your tests catch a fault in AC4             caught by test_16_new_covers_existing
PASS   M9   your tests catch a fault in AC5             caught by test_13_existing_list_unchanged, test_27_existing_order_and_content_unchanged
PASS   M10  your tests catch a fault in AC5             caught by test_27_existing_order_and_content_unchanged
PASS   L1   report 1: tool, model and language          tool, model and language recorded
PASS   L2   report 2: the plan, and what you corrected  plan pasted, 2 row(s) on what you corrected or verified
PASS   L3   report 3: v1 mapped to AC1-AC4              5 conditions mapped, AC1-AC4 all present
PASS   L4   report 4: at least 11 of your tests listed  27 tests listed
PASS   L5   report 5: debugging evidence                1 row(s) of input / expected / actual
PASS   L6   report 6: the critique, each point judged   critique pasted, 5 points judged
PASS   L7   report 7: change log                        2 change-log row(s)
PASS   L8   report 8.1: real output of your suite       suite output pasted
PASS   L9   report 10: conclusion of 120-180 words      162 words
------------------------------------------------------------------------------
v1 (code/original/booking_v1.py): passes F2 F4 F5 F6 F7 F8 F9 F10 - fails F1 F3 - identical to your final: no
SUMMARY pass=32 fail=0 error=0   (32 checks)
Behaviour and shape are clean. This says nothing about the quality of your review.
```

### 8.3 Path B only — three faults I planted myself

Break your own function on purpose, one line at a time, run your suite, restore the line.

| # | Line I changed (before → after) | AC it breaks | Test that failed |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |

The three failing runs (Path A students leave this block empty):

```text
```

---

## 9. What still fails, and what the contract does not say

### 9.1 Checks I am keeping as FAIL or ERROR

The same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| none | |

### 9.2 Outside the contract

The contract says times are integers. It does not say what `can_book` does when one is not —
`600.5`, or the string `"600"`. What does **your** function do, and why is that the right call?

- My function has no type checks. `600.5` simply works with the comparisons, and `"600"` raises a TypeError when compared with an int. I left it that way: the contract promises integers, so extra validation would be a rule nobody asked for, and a loud crash is better than quietly returning False for garbage input.

### 9.3 A bound that never decides

One of the bounds written in AC1 can never be the *only* reason a request is rejected. Which one,
and why?

- `0 <= start`. AC1 also needs start > now, and now is never negative, so start is already at least 1. A request can never be rejected only because start is below 0.

---

## 10. Conclusion (120–180 words)

<!-- Answer all three, in your own words, without the assistant:
     (a) Explain the overlap condition in your final code — why those two comparisons, and why
         they let touching bookings through.
     (b) Which fault did your tests miss the longest, and what did the missing test have in common
         with the ones you already had?
     (c) What did you have to decide that neither the contract nor the assistant decided for you?
     Worthless: "the AI made a mistake and I fixed it."
     Worth everything: "F7 failed on can_book(570, 600, ...): v1 compared with <= on the start
     side, so a booking that ends exactly when another begins was rejected." -->

<!-- Write your conclusion below this line -->
The overlap check is `start < b_end and end > b_start`. A new booking clashes only if it starts before the old one ends and ends after the old one starts. When I start exactly at `b_end`, the first comparison is false, so nothing overlaps and back-to-back bookings go through. Same logic on the left side with `end > b_start`.

My tests missed `start >= now` the longest. I copied it from the plan, wrote "correct as written" in the AC map, and then wrote test_06 to expect True. The test just repeated my mistake, so the whole suite was green and wrong. I never checked it against the AC text. The checker (F1, F3) caught it. Later it also showed that test_11 hid the 1440 bound behind AC2, because a 121-minute request gets rejected before the day limit matters.

What I decided myself was non-integer input. The contract says nothing, so I added no validation: floats work, strings crash.