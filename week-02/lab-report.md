# Lab report — Practice #02: The Prompt Is an Engineering Input

**Name:** Nurassyl Galym
**Group:** SITE / Software Engineering
**Date:** September 20, 2026

---

## 1. The frozen experiment

| | |
| --- | --- |
| AI assistant | Gemini |
| Exact model name | Gemini 1.5 Flash / Gemini 2.5 Flash |
| Implementation language | Python |
| Date of the runs | September 20, 2026 |

**Non-Python students only** — paste your substituted Prompt B text here, so the substitution can
be checked:

```
n/a — used Python
```

**Confirmations:**

- Each prompt was sent in a **fresh chat**: yes
- No follow-up questions were asked before Part 7: yes
- Every output was saved **before** any editing: yes

---

## 2. Prompt A — minimal

**Prompt sent**:

```
Write Python code to analyze student marks.
```

**Assumptions the AI made that I never gave it**:

1. Function name `analyze_marks` and default `pass_mark=50`.
2. Output dictionary structure with exact keys `average`, `highest`, `lowest`, and `pass_rate`.
3. Validation behavior raising `ValueError` for invalid ranges (0–100), empty lists, and non-numeric types.

**Questions it should have asked and did not:**

1. What format should the output take (dictionary, class, tuple, or printed CLI)?
2. What are the specific validation boundaries and threshold rules for passing?

**Is the function named `analyze_marks` with the required signature?** yes

**First impression before testing**: The code looks surprisingly complete and appears to satisfy all project requirements immediately.

---

## 3. Prompt B — structured context

**Prompt sent**:

```
You are a Python developer. Implement analyze_marks(marks, pass_mark=50). Return average, highest, lowest, and pass_rate in a dictionary. Accept marks from 0 to 100; raise ValueError for an empty list, non-numeric values, or out-of-range values. Use no external libraries. Return code plus a short explanation.
```

**What B fixed compared to A:**

1. Explicitly mandated dictionary keys (`average`, `highest`, `lowest`, `pass_rate`).
2. Clearly defined exact conditions for raising `ValueError`.

**What B still leaves open:**

1. Precision handling for floating-point calculations (raw floats vs. 2-decimal rounding).
2. Explicit handling of boolean types, which inherit from `int` in Python.

---

## 4. Prompt C — examples and tests

**What I appended to Prompt B:**

```
Example: analyze_marks([40, 60, 80], 50) -> average 60, highest 80, lowest 40, pass_rate 66.67. Include tests for: one mark, decimals, custom pass_mark, empty list, text value, and marks below 0 or above 100. State any remaining assumptions before the code.
```

**Tests the AI wrote for itself**:

| Situation | Covered by the AI's tests? |
| --- | --- |
| one mark | yes |
| decimals | yes |
| custom pass_mark | yes |
| empty list | yes |
| text value | yes |
| below 0 / above 100 | yes |

**Do the AI's own tests pass against the AI's own code?** yes

**Do they agree with the harness in section 6?** yes

**Assumptions C stated explicitly before the code:** Rejection of `bool` types, non-list iterables, and keeping raw floating-point precision.

---

## 5. Prompt D — my combined prompt

**The complete prompt I wrote**:

```
You are a Python developer. Implement analyze_marks(marks, pass_mark=50). Return a dictionary with exact keys: "average", "highest", "lowest", and "pass_rate".

Requirements:

Accept a list of marks (numbers from 0 to 100). A mark passes when mark >= pass_mark.

Calculate pass_rate as a percentage (from 0 to 100).

Raise ValueError for invalid inputs: empty list, non-numeric values (including strings and booleans), or values strictly outside the range 0–100.

Raise ValueError if pass_mark is non-numeric or boolean.

Use no external libraries. Standard library only.

Example: analyze_marks([40, 60, 80], 50) returns {"average": 60.0, "highest": 80, "lowest": 40, "pass_rate": 66.66666666666667}.

Return only clean Python code with a brief explanation.
```

**What I deliberately added that A, B and C did not have:**

1. Explicit type check instruction against `bool` values (`isinstance(x, bool)`).
2. Direct specification that passing marks are inclusive (`mark >= pass_mark`).
3. Precise output key naming and raw float calculation rules.

**The ambiguity I found in the specification, and how I resolved it inside Prompt D:**
The main ambiguity was floating-point representation of `pass_rate` (whether to round to 2 decimal places like `66.67` or leave unrounded floats like `66.66666666666667`). Resolved in Prompt D by specifying raw float calculations while maintaining numeric tolerance compatibility.

---

## 6. Test results — the evidence

| # | Call | Required | A | B | C | D |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `analyze_marks([40, 60, 80], 50)` | avg 60 · high 80 · low 40 · rate 66.67 | PASS | PASS | PASS | PASS |
| 2 | `analyze_marks([100], 50)` | avg 100 · high 100 · low 100 · rate 100 | PASS | PASS | PASS | PASS |
| 3 | `analyze_marks([49.5, 50], 50)` | avg 49.75 · high 50 · low 49.5 · rate 50 | PASS | PASS | PASS | PASS |
| 4 | `analyze_marks([], 50)` | raises ValueError | PASS | PASS | PASS | PASS |
| 5 | `analyze_marks([40, "60"], 50)` | raises ValueError | PASS | PASS | PASS | PASS |
| 6 | `analyze_marks([-1, 50, 101], 50)` | raises ValueError | PASS | PASS | PASS | PASS |
| | **Totals** | | 6/6 | 6/6 | 6/6 | 6/6 |

**For every FAIL and ERROR above, one line: what was returned or raised instead.**

*(No FAIL or ERROR encountered)*

### Pasted terminal output — all four runs

**Prompt A**

```text
========================================================================
analyze_marks harness — week-02/code/prompt_a.py
tolerance for numeric comparison: 0.01
========================================================================
SIGNATURE: ok
------------------------------------------------------------------------
case 1  PASS   analyze_marks([40, 60, 80], 50)
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67
          got   : average=60.0, highest=80, lowest=40, pass_rate=66.66666666666666
------------------------------------------------------------------------
case 2  PASS   analyze_marks([100], 50)
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0
          got   : average=100.0, highest=100, lowest=100, pass_rate=100.0
------------------------------------------------------------------------
case 3  PASS   analyze_marks([49.5, 50], 50)
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0
          got   : average=49.75, highest=50, lowest=49.5, pass_rate=50.0
------------------------------------------------------------------------
case 4  PASS   analyze_marks([], 50)
          expect: ValueError
          got   : raised ValueError: Input must be a non-empty list of marks.
------------------------------------------------------------------------
case 5  PASS   analyze_marks([40, '60'], 50)
          expect: ValueError
          got   : raised ValueError: Invalid mark '60': all marks must be numbers.
------------------------------------------------------------------------
case 6  PASS   analyze_marks([-1, 50, 101], 50)
          expect: ValueError
          got   : raised ValueError: Invalid mark '-1': marks must be between 0 and 100.
------------------------------------------------------------------------
RESULT  6 PASS · 0 FAIL · 0 ERROR   (week-02/code/prompt_a.py)
========================================================================
```

**Prompt B**

```
========================================================================
analyze_marks harness — week-02/code/prompt_b.py
tolerance for numeric comparison: 0.01
========================================================================
SIGNATURE: ok
------------------------------------------------------------------------
case 1  PASS   analyze_marks([40, 60, 80], 50)
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67
          got   : average=60.0, highest=80, lowest=40, pass_rate=66.66666666666666
------------------------------------------------------------------------
case 2  PASS   analyze_marks([100], 50)
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0
          got   : average=100.0, highest=100, lowest=100, pass_rate=100.0
------------------------------------------------------------------------
case 3  PASS   analyze_marks([49.5, 50], 50)
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0
          got   : average=49.75, highest=50, lowest=49.5, pass_rate=50.0
------------------------------------------------------------------------
case 4  PASS   analyze_marks([], 50)
          expect: ValueError
          got   : raised ValueError: Input 'marks' must be a non-empty list.
------------------------------------------------------------------------
case 5  PASS   analyze_marks([40, '60'], 50)
          expect: ValueError
          got   : raised ValueError: Invalid mark '60': marks must be numbers.
------------------------------------------------------------------------
case 6  PASS   analyze_marks([-1, 50, 101], 50)
          expect: ValueError
          got   : raised ValueError: Invalid mark '-1': marks must be between 0 and 100.
------------------------------------------------------------------------
RESULT  6 PASS · 0 FAIL · 0 ERROR   (week-02/code/prompt_b.py)
========================================================================
```

**Prompt C**

```
========================================================================
analyze_marks harness — week-02/code/prompt_c.py
tolerance for numeric comparison: 0.01
========================================================================
SIGNATURE: ok
------------------------------------------------------------------------
case 1  PASS   analyze_marks([40, 60, 80], 50)
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67
          got   : average=60.0, highest=80, lowest=40, pass_rate=66.66666666666666
------------------------------------------------------------------------
case 2  PASS   analyze_marks([100], 50)
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0
          got   : average=100.0, highest=100, lowest=100, pass_rate=100.0
------------------------------------------------------------------------
case 3  PASS   analyze_marks([49.5, 50], 50)
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0
          got   : average=49.75, highest=50, lowest=49.5, pass_rate=50.0
------------------------------------------------------------------------
case 4  PASS   analyze_marks([], 50)
          expect: ValueError
          got   : raised ValueError: Input 'marks' must be a non-empty list.
------------------------------------------------------------------------
case 5  PASS   analyze_marks([40, '60'], 50)
          expect: ValueError
          got   : raised ValueError: Invalid mark '60': all marks must be numeric.
------------------------------------------------------------------------
case 6  PASS   analyze_marks([-1, 50, 101], 50)
          expect: ValueError
          got   : raised ValueError: Invalid mark '-1': marks must be between 0 and 100.
------------------------------------------------------------------------
RESULT  6 PASS · 0 FAIL · 0 ERROR   (week-02/code/prompt_c.py)
========================================================================
```

**Prompt D**

```
========================================================================
analyze_marks harness — week-02/code/prompt_d.py
tolerance for numeric comparison: 0.01
========================================================================
SIGNATURE: ok
------------------------------------------------------------------------
case 1  PASS   analyze_marks([40, 60, 80], 50)
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67
          got   : average=60.0, highest=80, lowest=40, pass_rate=66.66666666666666
------------------------------------------------------------------------
case 2  PASS   analyze_marks([100], 50)
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0
          got   : average=100.0, highest=100, lowest=100, pass_rate=100.0
------------------------------------------------------------------------
case 3  PASS   analyze_marks([49.5, 50], 50)
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0
          got   : average=49.75, highest=50, lowest=49.5, pass_rate=50.0
------------------------------------------------------------------------
case 4  PASS   analyze_marks([], 50)
          expect: ValueError
          got   : raised ValueError: Input 'marks' must be a non-empty list.
------------------------------------------------------------------------
case 5  PASS   analyze_marks([40, '60'], 50)
          expect: ValueError
          got   : raised ValueError: Invalid mark '60': all marks must be numeric.
------------------------------------------------------------------------
case 6  PASS   analyze_marks([-1, 50, 101], 50)
          expect: ValueError
          got   : raised ValueError: Invalid mark '-1': marks must be between 0 and 100.
------------------------------------------------------------------------
RESULT  6 PASS · 0 FAIL · 0 ERROR   (week-02/code/prompt_d.py)
========================================================================
```

---

## 7. Scoring

0–2 per criterion, using the rubric in `README.md` Part 7.

| Criterion | A | B | C | D |
| --- | --- | --- | --- | --- |
| Correctness (cases passed) | 2 | 2 | 2 | 2 |
| Requirement coverage | 2 | 2 | 2 | 2 |
| Verifiability (tests) | 0 | 0 | 2 | 2 |
| Assumptions stated | 0 | 1 | 2 | 2 |
| Noise (2 = none) | 2 | 2 | 1 | 2 |
| **Total / 10** | **6** | **7** | **9** | **10** |

**Prompt length, in words:** A 8 · B 44 · C 79 · D 96

**Words added per point gained:** B over A: 36 w/pt · C over B: 17.5 w/pt · D over C: 17 w/pt. This ratio shows that adding structured context and verifiability significantly improves quality with minimal prompt bloat.

---

## 8. Conclusion — 150–200 words

Prompt D scored highest (10/10) because it provided explicit requirements while eliminating test-suite noise. In production, I would use Prompt D because it unambiguously defines signature, validation rules, type checks, and return keys upfront. Modern LLMs like Gemini possess strong default assumptions that allowed Prompt A to pass Case 1 (`average=60.0, pass_rate=66.66666666666666`) and Case 4 (`ValueError` on empty list) without explicit instructions. However, relying on unstated model defaults is risky in software engineering. The single addition that bought the most correctness and reliability was specifying explicit type checks against booleans (`isinstance(x, bool)`) and inclusive thresholds (`mark >= pass_mark`), which directly guaranteed Case 3 (`pass_rate=50.0`). The test cases embedded inside Prompt C added minor noise to the primary code deliverable. The main specification ambiguity was `pass_rate` precision—whether to round to 2 decimals (`66.67`) or leave raw floats; resolving this in Prompt D ensured complete compliance across all test cases.

**Word count:** 168

---

## 9. Two questions for the debrief

Written before class, answered in class.

1.Why do modern LLMs default to standard function naming like analyze_marks even when given a minimal prompt?
2.At what point does adding detailed constraints to a prompt yield diminishing returns in automated code generation?
