# AI Usage Disclosure — SIS #03

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Used for | Which files it touched | Reused from |
| --- | --- | --- | --- | --- |
| Gemini (web) | Gemini 2.5 Flash | the plan (stage A) | none (plan only, report §11 B1) | week-05 |
| Gemini (web) | Gemini 2.5 Flash | Python v1 (stage B) | `code/original/booking_v1.py` | week-05 |
| Bolt.new | GLM 5.3 Flash | web prototype v1 (stage B) | `web/original/` | week-06 |
| Gemini (web), new chat | Gemini 2.5 Flash | critique (stage C) | none (review only, report §8, §11 B3) | this SIS |
| Bolt.new | GLM 5.3 Flash | repair (stage D): sample data, 00:00 current time, removing Supabase | `web/final/project/src/sampleData.ts`, `src/App.tsx`, `package.json`, `package-lock.json` | this SIS |
| Claude (claude.ai) | Claude Opus 5.5 | final `can_book` and the 20 tests; step-by-step guidance; drafting report text (§3-§9, §13) from my runs and screenshots | `code/booking.py`, `code/test_booking.py`, `report.md` | this SIS |
| Claude (claude.ai) | Claude Opus 5.5 | drafts of report §2 (baseline) and §10 (reflection), used with the instructor's permission; I edited them | `report.md` §2, §10 | this SIS |

**The assistant wrote, or helped write, my tests in `code/`:** yes
<!-- Either answer is allowed. If "yes": say which tests, and how you checked that their EXPECTED
     values come from AC1–AC5 and not from what the generated code happens to return. -->
Claude wrote all 20 tests in `code/test_booking.py`. Their expected values are the Expected column of T1-T11 from the brief plus boundary cases taken straight from AC1-AC5 (start at now+1, zero length, 1440/1441, touching on both sides). I ran them against v1: it fails two, `test_t6_starts_now_rejected` (the AC1 fault I found by reading v1) and `test_non_integer_rejected` (v1 does not check types; the checker notes this test goes beyond the contract, so it does not count for M), and the checker confirms the suite catches all ten faulty versions (M1-M10).

**`code/original/` and `web/original/` hold the AI's first versions exactly as returned:** yes

**Every result in report.md section 5 was actually run or seen, not assumed:** yes

**Everything I submitted, I can explain and defend in class — including the overlap condition
and what the agent did in section 9:** yes

**Anything I accepted from the AI without fully understanding it:**
<!-- Name the file and the line. An honest entry here costs far less than a blank one that turns out to be untrue. -->
Nothing in the logic. I did not read every generated line of `web/final/project/src/App.tsx` (the styling and layout markup); I checked its behaviour through T1-T12 instead.

Signed: Nurassyl Galym
Date: 2026-11-09