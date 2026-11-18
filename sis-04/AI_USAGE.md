# AI Usage Disclosure — SIS #04

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Date | Used for | Which files it touched |
| --- | --- | --- | --- | --- |
| Claude (claude.ai) | Claude Opus 5.5 | 2026-11-16 | drafting the repository map and the context message (report 2.1–2.2) | report.md |
| Claude (claude.ai), fresh chat | Claude Opus 5.5 | 2026-11-16 | codebase analysis (Task 1): risks R1–R11 | none (read-only answer; report 3.1 written from it after checking the lines) |
| Claude (claude.ai), fresh chat | Claude Opus 5.5 | 2026-11-16 | improvement plan (steps 0–8), one suggestion rejected (report 3.3) | none |
| Claude (claude.ai) | Claude Opus 5.5 | 2026-11-16 | feature extension (Task 2): rooms catalog, filterRooms, checkRoom, filter UI | app/src/rooms.ts, filter.ts, booking.ts, App.tsx, time.ts |
| Claude (claude.ai) | Claude Opus 5.5 | 2026-11-16 | refactoring (Task 3): removing availability.ts / sampleData.ts / types.ts, MAX_MINUTES, before/after diagrams | app/src/booking.ts, App.tsx, diagrams/before.puml, diagrams/after.puml |
| Claude (claude.ai) | Claude Opus 5.5 | 2026-11-16 | tests (Task 4): rooms.test.ts, B1–B4 added to four booking.test.ts titles | app/src/rooms.test.ts, app/src/booking.test.ts |
| Claude (claude.ai) | Claude Opus 5.5 | 2026-11-18 | drafting report sections 1–8 and the reflection in section 10 (with the instructor's permission for AI use in text), and app/README.md, from my own runs, files and decisions | report.md, app/README.md |

<!-- Delete rows you did not use the assistant for; add rows for anything else. The optional
     extension (an existing skill or a read-only MCP server) goes here too, with its permissions. -->

**The assistant wrote, or helped write, tests in `app/`:** yes
All 11 tests in `src/rooms.test.ts`, and the four B1–B4 tests in `src/booking.test.ts` (T01, T06, T07, T09: titles extended and the helper call replaced by a direct `canBook` call with the same times and expected values). I checked every expected value against the rules, not against the code: e.g. F1 with 15 attendees must keep only the 20- and 30-seat rooms, F2 must drop the projector-only room, B5 keeps the room whose capacity equals the attendees, B6 drops the room one seat short.
<!-- Either answer is allowed. If "yes": which tests, and how you checked that their EXPECTED values
     come from AC1–AC5 and F1–F5, not from what the code happens to return. -->

**Every run pasted in report.md was produced by my code on my machine (or Codespace), unedited:** yes

**Every number in report.md section 7 was measured the way its row says:** yes

**I shared no credentials, keys or private data with any tool:** yes

**Everything I submitted, I can explain and defend in class — including filterRooms, checkRoom and
why each module exists:** yes

**Anything I accepted from the AI without fully understanding it:**
useEffect: src/App.tsx, the useEffect that clears roomId when the room leaves the filtered list: I know what it does on the page, but not exactly when React runs it.

Signed: Nurassyl Galym
Date: 2026-11-16