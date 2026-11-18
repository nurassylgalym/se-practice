# Week 10 — Lab report

**Name:** Galym Nurassyl
**Group:** CSCI2208
**Date:** 2026-11-18

Fill in every section. **Do not delete, rename or renumber the headings.** The checker and the
grader find your answers by them. You can add rows to any table, but never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Assistant I reviewed with (tool) | Claude (chat) |
| Exact model (with its version, or `not displayed`) | Claude Opus 5.5 |
| Where the assistant read the project (Bolt.new / Claude Code / Cursor / Copilot / chat with pasted files) | chat; it fetched the public GitHub repo `nurassylgalym/se-practice`, branch `week-10` |
| Starting point (`week-08` or `week-07`) | week-08 |
| Baseline commit — the checkpoint of Part 0 | 313f4c9 |
| Where I ran the tests (Bolt terminal / my computer / Codespace) | my computer (VS Code terminal, Windows cmd) |
| Vitest version (the `RUN  v…` line of a run) | 3.2.4 |

---

## 2. Task 1 — the baseline

### 2.1 The project's commands

Run each command in `week-10/app/` before any change. **Exists:** `yes` or `no` (is there such a
script, or such a tool in `package.json`?). **Result:** `pass`, `fail`, `missing` or `not run`.

| Command | Exists | Result | Note |
| --- | --- | --- | --- |
| `npx vitest run` | yes | pass | 26 passed (26), Vitest v3.2.4 |
| `npm test` | yes | pass | script `test` = `vitest run`; 26 passed |
| `npm run test:unit` (the test command in `AGENTS.md`) | no | missing | `npm error Missing script: "test:unit"` - AGENTS.md line 26 names a command that does not exist |
| `npm run build` | yes | pass | `vite build`, built in 3.05s; warning: caniuse-lite is outdated |
| `npm run lint` | yes | pass | `eslint .`, no errors; warning: TypeScript 5.6.3 is outside the range @typescript-eslint supports (<5.6.0) |

### 2.2 The baseline test run

The **real** output of `npx vitest run` in `week-10/app/`, before any change:

```text
 RUN  v3.2.4 C:/Users/Nurassyl Galym/Desktop/KBTU/Software Engineering/Lab Week 1/se-practice/week-10/app

 ✓ src/booking.test.ts (26 tests) 6ms
   ✓ canBook — plan T01–T14 > T01 AC4: 660–720 touches the booking end, allowed 2ms
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
   ✓ canBook — regression tests for the provided bugs > BUG-A AC4: 690–720 touches only the start of the second booking, allowed 0ms
   ✓ canBook — regression tests for the provided bugs > BUG-B AC5: 720–780 touches nothing, Available, bookings unchanged 0ms

 Test Files  1 passed (1)
      Tests  26 passed (26)
   Start at  18:57:45
   Duration  1.26s (transform 56ms, setup 0ms, collect 59ms, tests 6ms, environment 0ms, prepare 178ms)
```

### 2.3 The agent reads the playbook

What you sent, exactly (the Practice #09 prompt):

```text
Read the root AGENTS.md before making changes. Summarize the project constraints and the exact test commands you found. Do not edit anything yet. If you cannot read AGENTS.md, tell me, and I will paste its content. Do not claim that AGENTS.md was automatically loaded.
```

The assistant's answer, pasted unedited:

```text
I couldn't read AGENTS.md because it isn't anywhere I can get to.

* This workspace: there was no AGENTS.md here. The folder was empty apart from config files.
* Your GitHub repo `nurassylgalym/se-practice`: I cloned the public version and checked every branch on GitHub (`main`, `sis-01` to `sis-04`, `week-01` to `week-09`). None of them has an AGENTS.md (or CLAUDE.md), at the root or in any subfolder. There's also no `week-10` branch on GitHub yet.

So I have no project constraints or test commands to give you yet. The file is probably only on your computer, or on a `week-10` branch you haven't pushed. Either paste its content here, or push the branch and tell me its name, and I'll read it and give you the summary. I haven't edited anything.

[me] I pushed the branch week-10. The project root is week-10/app/ and the file is week-10/app/AGENTS.md.

I read `week-10/app/AGENTS.md` from your `week-10` branch myself, by fetching the branch. It wasn't loaded automatically. It's identical to `week-10/provided/AGENTS.md`. I haven't edited anything.

## Project constraints in the file

- **Stack:** React + TypeScript on Vite. The booking rule `canBook` is in `src/booking.ts`, the page is `src/App.tsx`, and the tests are in `src/booking.test.ts`.
- **Acceptance contract:**
  - AC1: reject a start that isn't before the end, and reject requests in the past.
  - AC2: a booking can be at most 120 minutes.
  - AC3: reject a blocked room.
  - AC4: reject overlaps. A request that only touches a booking at an endpoint also counts as an overlap.
  - AC5: return Available or Unavailable without changing the booking data.
- **Permissions it gives the agent:** edit any file, add packages, and add a Supabase table plus a login page if bookings need to persist.
- **Before finishing:** check that the page still loads. Once the build passes, run `npx netlify deploy --prod`.
- **Data:** it says to use real room names and the real timetable from the KBTU portal.

## Commands, exactly as written

| Purpose | Command in AGENTS.md |
|---|---|
| Install | `npm install` |
| Dev server | `npm run dev` |
| Tests | `npm run test:unit` |
| Build | `npm run build` |

## Where the file doesn't match the code

I compared it with the repo, and some of it is wrong or risky. That fits a "Risk Review" practice:

1. **The test command doesn't exist.** `package.json` has no `test:unit` script, so the tests actually run with `npm test` (which runs `vitest run`). The file also leaves out the `lint` and `typecheck` scripts.
2. **AC4 contradicts the code and tests.** `canBook` uses strict overlap (`start < b.end && end > b.start`), so a request that only touches a booking is allowed. Tests T01, T08, X2 and BUG-A expect touching to be allowed. If an agent followed AC4 as written, it would break those tests.
3. **The permissions go too far.** Being allowed to edit any file, add packages freely, and add Supabase plus a login page invites scope creep and handling secrets.
4. **The deploy step publishes outside the repo.** `netlify deploy --prod` is a live production deploy, and it needs credentials.
5. **The real portal data is a privacy and scraping risk.** The repo already has `src/sampleData.ts`, which can be used instead.

When you're ready, tell me which of these you want handled in the refactor.
```

Which rules in its summary are wrong for this project, and how you know:

<!-- Write below this line -->

The assistant repeated every rule the file states, and most of them are wrong for this project:

- **Tests: `npm run test:unit`** - there is no such script (2.1: `Missing script`); the real command is `npm test`, which runs `vitest run`.
- **AC4 "touching also counts as an overlap"** - the contract says the opposite: touching at an endpoint is allowed. `canBook` uses `start < b.end && end > b.start`, and T01, T08, X2 and BUG-A expect touching to be allowed.
- **AC6 is missing** - the file lists AC1-AC5 only, so UI feedback on desktop and mobile is not in the agent's contract at all.
- **"Use real room names and the real timetable from the KBTU portal"** - the scope is one fictional room with fictional bookings, no real data.
- **"Edit any file", "add packages"** - too broad for a one-module checker; nothing limits the scope of a change.
- **"Add a small Supabase table and a login page"** - the scope says no login and no database.
- **"`npx netlify deploy --prod`" after the build** - an external production deploy; the scope forbids external services, and it needs credentials.
- It also does not say that the tests must pass before a change is proposed, and it does not mention that the app has five rooms in `src/sampleData.ts`, while the scope says one room.

To its credit, it said it could not read the file at first and fetched it itself; it did not claim the file was loaded automatically. I know the rules are wrong from the README scope (one room, AC1-AC6), from `package.json` and from the tests in `src/booking.test.ts`.

---

## 3. Tasks 2–3 — the read-only review and the challenge

### 3.1 The review prompt and the answer

Where it ran, and how you made sure it could not edit:

<!-- Write below this line -->

Claude Opus 5.5 in a fresh chat. It read the public repo `nurassylgalym/se-practice`, branch `week-10` (commit `313f4c9`), in its own sandbox; it cannot write to my computer or push to my repo. Before I sent the prompt, it had already cloned the branch, run the baseline and tried patches in its own scratch copy (it said so itself), which is an agent-operations finding: it did more than it was asked. After the answer, `git status` on my machine showed no change in `week-10/app/` (only my own `lab-report.md` was modified).

What you sent, exactly (the deck's prompt):

```text
Act as a cautious software reviewer. Inspect this Smart Campus Room Availability Checker WITHOUT editing files. Identify risks in correctness, security, privacy, reliability, maintainability, and agent operations. For each risk, cite the exact file/function or missing check, explain the impact, suggest a way to verify it, and state uncertainty. Do not invent test results.
```

The assistant's answer, pasted unedited:

```text
Read-only review of `week-10/app/` on branch `week-10` at commit `313f4c9`. I edited no files, and `git status` shows no changes.

**What I actually ran in this checkout, and what I didn't.** I ran these myself earlier in this session, before any change:
- `npx vitest run`: 26 passed (26), Vitest v3.2.4.
- `npm run build`: passed.
- `npm run lint`: passed with no warnings.
- `npm run typecheck`: passed.
- `npm run test:unit`: failed with `Missing script: "test:unit"`.

I also compared `canBook` with `evaluateAvailability` on every room in `sampleData.ts`, with start and end values around the boundaries (including NaN, -1 and 1441) and three different "now" times. I ran this from a temporary test file and then deleted it. The two never disagreed. I did **not** open the page in a browser, and I ran no UI, mobile or accessibility checks.

---

## Agent operations

**A1. The playbook tells the agent to deploy to production.**
- **Where:** `AGENTS.md` line 38: "publish a preview with `npx netlify deploy --prod`".
- **Impact:** after any green build, an agent following the file publishes an unreviewed build to a public production site. `--prod` is not a preview. `netlify` isn't in `package.json`, so `npx` would download and run a tool from outside the project.
- **How to verify:** read line 38. Ask an agent "what do you do before you finish?" and check whether it repeats the instruction.
- **Uncertainty:** low that the instruction is there. Whether the deploy would actually succeed depends on Netlify credentials on the machine, which I can't see.

**A2. The playbook names a test command that doesn't exist.**
- **Where:** `AGENTS.md` line 26, `npm run test:unit`. `package.json` only has `"test": "vitest run"`.
- **Impact:** an agent can't verify its own change. It may stop, invent a script, or report success without a real run.
- **How to verify:** run `npm run test:unit`. I got `Missing script`.
- **Uncertainty:** none on the missing script. How a given agent reacts to it is uncertain.

**A3. The permissions are too broad, and nothing stops an agent from bending the tests.**
- **Where:** `AGENTS.md` lines 31–32: "Edit any file in the project" and "Add packages when a task needs them".
- **Impact:** an agent can edit `src/booking.test.ts` to make a failing case pass, or add dependencies outside the scope. No line forbids weakening tests, and no line requires a passing run before a change is called done.
- **How to verify:** read the "You may" and "Before you finish" sections. Neither one requires running and passing the tests.
- **Uncertainty:** whether an agent would actually do this is plausible but unverified.

**A4. The playbook may not be loaded at all.**
- **Where:** `AGENTS.md`, together with `.bolt/prompt`.
- **Impact:** Bolt reads `.bolt/prompt`, which asks for "production"-worthy, fully featured pages. That pushes toward exactly the scope creep the contract forbids, and nothing guarantees `AGENTS.md` is read alongside it.
- **How to verify:** ask the tool to summarize `AGENTS.md` without pasting it in.
- **Uncertainty:** this depends on the tool, so I can't confirm it from the files.

## Correctness

**C1. The playbook's AC4 contradicts the acceptance contract.**
- **Where:** `AGENTS.md` line 19: "touches a booking at an endpoint also counts as an overlap". The contract, `canBook` (`src/booking.ts` line 21, `start < b.end && end > b.start`) and the UI hint in `App.tsx` all say touching endpoints are **allowed**.
- **Impact:** an agent told to "make the code follow AGENTS.md" would change `<` to `<=`. Tests T01, T08, X2 and the BUG-A test would then fail, or be rewritten to match.
- **How to verify:** compare line 19 with the README's §3 contract and with tests T01 and T08.
- **Uncertainty:** low.

**C2. The playbook leaves out AC6.**
- **Where:** `AGENTS.md`, "Acceptance contract" section. It lists AC1–AC5 only.
- **Impact:** an agent has no instruction to keep clear feedback on desktop and mobile. Layout or message regressions would look acceptable to it.
- **How to verify:** read the section.
- **Uncertainty:** none.

**C3. The simulated "now" can't be set to 00:00.**
- **Where:** `src/App.tsx` line 132: `setCurrentTime(toMinutes(e.target.value) || currentTime)`. `toMinutes("00:00")` returns `0`, which counts as false, so the old value is kept.
- **Impact:** AC1 behaviour at midnight can't be checked in the UI. The input snaps back without saying why.
- **How to verify:** run `npm run dev`, set "Current time (sim)" to 00:00, and see if it stays.
- **Uncertainty:** high confidence from reading the code, but I haven't run it in a browser.

**C4. A booking ending at 24:00 can't be entered in the UI.**
- **Where:** `src/App.tsx` line 20, `h > 23 → NaN`. The footer says the day window is 00:00–24:00, and `canBook` accepts `end = 1440` (test X1).
- **Impact:** the last slot of the day can't be requested from the page. Minor, but the logic and the UI disagree.
- **How to verify:** try to enter an end time of 24:00 in the form.
- **Uncertainty:** the browser's `type="time"` input may not even allow 24:00, so this may be a browser limit as well.

**C5. The data has more than one room.**
- **Where:** `src/sampleData.ts` has 5 rooms in `ROOMS`, and `App.tsx` has a room selector. The lab scope is "One room".
- **Impact:** this goes beyond the agreed scope, and it adds per-room filtering code (`roomBookings` in `App.tsx`) that the contract doesn't cover.
- **How to verify:** read `sampleData.ts` lines 3–9.
- **Uncertainty:** whether the grader treats this as a defect or as inherited code.

## Maintainability

**M1. The booking rules are implemented twice.**
- **Where:**
  - `src/booking.ts` `canBook` gives the verdict (`App.tsx` line 52).
  - `src/availability.ts` `evaluateAvailability`, `validateInterval`, `validateDuration`, `checkRoomBlocked` and `checkOverlap` give the message (`App.tsx` line 56).
  - The two even check in a different order: blocked first in one, the interval first in the other.
- **Impact:** a fix applied to one copy and not the other makes the page show "Unavailable" with the wrong reason, or with an empty one (`result?.reason` at line 166 would be `undefined`). That breaks AC6. Only `canBook` is tested, so this drift would go unnoticed.
- **How to verify:** compare the outputs of both functions on the same inputs. They agreed on everything I compared, so this is a latent risk, not a current bug.
- **Uncertainty:** the duplication is certain. Whether drift happens depends on future changes.

**M2. There is no README or architecture note.**
- **Where:** missing: `app/README.md`. `AGENTS.md`'s "Project" paragraph names `booking.ts`, `App.tsx` and the tests, but not `availability.ts` or `sampleData.ts`.
- **Impact:** an agent or a new person can't tell which module owns which rule. That makes M1 more likely.
- **How to verify:** `ls app/`.
- **Uncertainty:** none.

**M3. There's no formatter, CI or hooks.**
- **Where:**
  - missing: Prettier config
  - missing: `.github/workflows/`
  - missing: pre-commit hooks
- **Impact:** nothing re-runs `npm test` or `npm run lint` automatically when an agent pushes, so a red suite could be merged.
- **How to verify:** list the files. None of them exist in this branch.
- **Uncertainty:** none.

## Security

**S1. The playbook invites a backend and login, with no rule about secrets.**
- **Where:** `AGENTS.md` line 33: "add a small Supabase table and a login page". There is no line forbidding API keys, `.env` files or credentials.
- **Impact:** an agent may add a Supabase URL and key to source code or to a committed `.env`, adding real authentication and a database the contract forbids. `.gitignore` does ignore `.env`, but a key hard-coded in `src/` would still be committed.
- **How to verify:** read line 33, and search `AGENTS.md` for "secret", "key" and "env".
- **Uncertainty:** whether an agent would follow it. No secret is in the repo today, as far as I saw in `src/` and the config files.

**S2. Dependency versions use `^` ranges.**
- **Where:** `package.json`. This is softened by the committed `package-lock.json`.
- **Impact:** low. `npm install` without the lockfile, or an agent running `npm update`, could pull new minor versions.
- **How to verify:** `npm ci` uses the lockfile, while `npm install <pkg>` changes it.
- **Uncertainty:** I ran no vulnerability audit (`npm audit`), so I make no claim about known vulnerabilities.

## Privacy

**P1. The playbook asks for real data.**
- **Where:** `AGENTS.md` line 12: "use real room names and the real timetable from the KBTU portal".
- **Impact:** an agent could scrape or paste a real timetable, including real lecturers' names, into `sampleData.ts`. That breaks the "fictional bookings" scope and could expose personal data in a public repo.
- **How to verify:** read line 12.
- **Uncertainty:** low.

**P2. Person-like names appear in the sample data and on the page.**
- **Where:** `src/sampleData.ts` `bookedBy` has names like "Dr. Patel" and "Prof. Lee". They are rendered at `App.tsx` line 222 and in the overlap message at `availability.ts` line 65.
- **Impact:** they look fictional, but they're shaped like real people's names. If real names replace them (see P1), the page would display them to any visitor.
- **How to verify:** read `sampleData.ts` lines 12–17.
- **Uncertainty:** I believe the current names are invented, but I can't prove it.

## Reliability

**L1. Nothing tests the page.**
- **Where:** missing: any test of `App.tsx` or `availability.ts`. The only suite is `src/booking.test.ts`, which tests `canBook`.
- **Impact:** regressions in time parsing (C3, C4), in the messages (M1), or in the mobile layout (AC6) wouldn't be caught.
- **How to verify:** `grep -r "App\|availability" src/*.test.ts` finds nothing.
- **Uncertainty:** none.

**L2. Tests use a fixed "now", but the page starts at 09:00.**
- **Where:** `App.tsx` line 29 (`9 * 60`) and test `NOW = 540`. Both are fixed, which is good, but the UI never uses the real clock.
- **Impact:** low. AC1 "in the past" means relative to the simulated time, which could confuse a user.
- **How to verify:** read the code.
- **Uncertainty:** whether this was intended by the earlier labs.

---

**What I checked and did not find:**
- `canBook` does not modify `bookings`: there is no `push` or assignment, and the frozen-fixture tests pass.
- NaN input is rejected.
- Overlap detection doesn't depend on booking order (test B07).
- There's no SQL or HTML injection surface: there's no database, and React escapes the text it renders.
- Lint, typecheck and build passed on my runs listed at the top.
```

### 3.2 Challenging the AI's claims

At least **five** claims from the answer, across at least **three** categories. **What I
inspected** is what you opened or ran yourself. **Label:** `confirmed`, `plausible` or
`unsupported`.

| # | The AI's claim (short) | Category | What I inspected | Label | Why |
| --- | --- | --- | --- | --- | --- |
| 1 | A1: `AGENTS.md` line 38 tells the agent to run `npx netlify deploy --prod` after the build | Agent operations | `app/AGENTS.md` line 38; `netlify` is not in `package.json` | confirmed | the line is there word for word; `--prod` is a production deploy, not a preview |
| 2 | A2: the test command `npm run test:unit` does not exist | Agent operations | ran `npm run test:unit` in `week-10/app` | confirmed | my run: `npm error Missing script: "test:unit"`; `package.json` has only `"test": "vitest run"` |
| 3 | C1: AC4 in `AGENTS.md` contradicts the contract | Correctness | `app/AGENTS.md` line 19, README §3, `src/booking.ts` `canBook`, tests T01, T08, X2, BUG-A | confirmed | line 19 says touching counts as an overlap; the contract and `start < b.end && end > b.start` allow touching, and T01/T08 expect `true` |
| 4 | C3: the simulated "now" cannot be set to 00:00 | Correctness | the `onChange` of "Current time (sim)" in `src/App.tsx`; `npm run dev`, typed 00:00 | confirmed | `toMinutes("00:00")` is 0, and the OR fallback keeps the old value; in the browser the field snapped back to the previous time |
| 5 | C4: a booking that ends at 24:00 cannot be entered in the UI | Correctness | `toMinutes` in `src/App.tsx`, test X1, the `type="time"` input | plausible | true that the page cannot send `end = 1440`, but a `type="time"` input cannot hold 24:00 in any browser, so it is a browser limit as much as a code bug |
| 6 | M1: the rules are implemented twice (`canBook` and `evaluateAvailability`) | Maintainability | `src/booking.ts`, `src/availability.ts`, the two calls in `src/App.tsx` | confirmed | both files check interval, duration, blocked and overlap; the verdict comes from one, the message from the other |
| 7 | "I compared `canBook` with `evaluateAvailability` on every room ... the two never disagreed" | Maintainability | looked for the test file in `src/`; there is none, it says it deleted it | plausible | I could not reproduce this run, so it stays unverified; reading the code I found no case where they differ |
| 8 | S1: `AGENTS.md` invites Supabase and a login, and has no rule about secrets | Security | `app/AGENTS.md` line 33; searched the file for "secret", "key", ".env" | confirmed | line 33 is there; the search finds nothing that forbids keys or `.env` files |
| 9 | "`npm run lint`: passed with no warnings" | Reliability | ran `npm run lint` on my machine | unsupported | my run passed but printed a warning: TypeScript 5.6.3 is not supported by @typescript-eslint (<5.6.0); its run happened in its own sandbox, so "no warnings" is not true for this project as I run it |
| 10 | P2: person-like names in `bookedBy` are shown on the page | Privacy | `src/sampleData.ts` `INITIAL_BOOKINGS`, `src/App.tsx` booking list | plausible | "Dr. Patel", "Prof. Lee" look invented and are rendered; it only becomes personal data if an agent follows line 12 and uses real names |
| 11 | L1: nothing tests the page | Reliability | `src/` - the only test file is `booking.test.ts`, it imports only `canBook` | confirmed | no test of `App.tsx` or `availability.ts` exists |

---

## 4. Task 4 — the risk register

### 4.1 The register

At least five risks, each `confirmed` or `plausible`; at least two `confirmed`; at least three
categories. **Score = L × I.** **Component** is a path inside `app/` or `missing: <check>`.

| ID | Category | Cause → event → consequence | Component | Evidence | Status | L | I | Score | Mitigation | Owner | Verification |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R1 | Agent operations | The playbook contradicts the contract → an agent follows it: runs `npx netlify deploy --prod` (line 38), adds Supabase and a login page (line 33), uses real KBTU names and timetable (line 12), treats touching endpoints as an overlap (line 19), calls a test command that does not exist (line 26) → unreviewed public deploy, broken AC4, real personal data, and no way for the agent to check its own work | `AGENTS.md` | lines 12, 19, 26, 31-33, 38 of `app/AGENTS.md`; `npm run test:unit` → `Missing script` in 2.1; AC6 is not listed at all | confirmed | 3 | 3 | 9 | minimal approved patch of `AGENTS.md` (Part 6) | Galym Nurassyl | `check_audit.py` A2, A3, C1-C6 PASS; `git diff app/AGENTS.md` reviewed |
| R2 | Correctness | the logical-OR fallback in the "Current time (sim)" `onChange` (`toMinutes(value)` OR `currentTime`) treats 00:00 (= 0) as "no input" → the simulated "now" cannot be set to midnight and silently keeps the old value → AC1 is judged against a time the user did not choose, so the verdict is wrong | `src/App.tsx` | the `onChange` of the "Current time (sim)" input in `src/App.tsx`; by hand: typing 00:00 snaps back to the previous time; the logic is inline in App.tsx, so no test reaches it | confirmed | 2 | 2 | 4 | refactor (Part 8): move `toMinutes` and the "now" fallback into a pure function in `src/booking.ts`, fallback only on NaN | Galym Nurassyl | regression test `R2 AC1` fails before, passes after; full suite green; manual check at 00:00 |
| R3 | Maintainability | the availability rule is written twice: `canBook` decides the verdict, `evaluateAvailability` re-implements AC1-AC4 for the message → a fix to one copy (as BUG-A/BUG-B in Week 08, which touched only `booking.ts`) leaves the other stale → "Unavailable" with an empty or wrong reason (AC6) | `src/availability.ts evaluateAvailability` | `src/App.tsx` takes `verdict` from `canBook` and `result?.reason` from `evaluateAvailability`; both files contain the same interval, duration and overlap checks | confirmed | 2 | 2 | 4 | make `evaluateAvailability` reuse the `canBook` checks (one source of truth) | Galym Nurassyl | a test that compares both on a grid of inputs |
| R4 | Reliability | no test of the page and no CI → a change that breaks `src/App.tsx` (AC6 feedback) still shows "26 passed" → an agent can report "tests pass" while the page is broken | `missing: a test of src/App.tsx (integration) and a CI workflow` | only `src/booking.test.ts` exists, it imports only `canBook`; no `.github/workflows/` | confirmed | 2 | 2 | 4 | add a CI workflow running `npm test` and `npm run build`; later a page test | Galym Nurassyl | the workflow runs on push and its log is linked in the PR |
| R5 | Correctness | the contract says one room, but `src/sampleData.ts` has five rooms and `App.tsx` a room selector → scope drift: the room-name filter (`b.room === room.name`) is untested and an agent may build more on the multi-room path | `src/sampleData.ts` | `ROOMS` holds 5 rooms (`r1`-`r5`); `INITIAL_BOOKINGS` filtered by room name in `App.tsx` and `checkOverlap` | confirmed | 3 | 1 | 3 | reduce to one fictional room, or state the deviation in `AGENTS.md` | Galym Nurassyl | `sampleData.ts` has one room; suite green |
| R6 | Privacy | `bookedBy` stores person-like names ("Dr. Patel", "Prof. Lee") and the old playbook line 12 asks for real KBTU data → an agent replaces them with real staff names → personal data in a public repo | `src/sampleData.ts` | `INITIAL_BOOKINGS[].bookedBy`; line 12 of `provided/AGENTS.md` | plausible | 1 | 3 | 3 | the patched playbook forbids real names; keep invented labels | Galym Nurassyl | C1 PASS; review `sampleData.ts` in every diff |
| R7 | Security | outdated dev dependencies → `npm install` reports 26 vulnerabilities (2 critical, 15 high) → a known flaw in the dev tooling could be exploited on the developer machine | `package-lock.json` | `npm install` output in Part 1: "26 vulnerabilities (2 low, 7 moderate, 15 high, 2 critical)" | confirmed | 1 | 2 | 2 | review `npm audit`, update only the affected dev packages in a separate, approved change | Galym Nurassyl | `npm audit` shows no critical/high; suite and build green |

### 4.2 The top two for action

Two confirmed risks, highest score first, each with the evidence that justifies its score.

1. **R1** — 3 x 3 = 9. Likely, because an agent repeats what the file says (2.3) and line 38 runs a production deploy as soon as the build passes, which it already does (2.1); serious, because a public deploy, a login with a database and real names all break the scope and cannot be undone by a test.
2. **R2** — 2 x 2 = 4. Possible, because it only shows when "now" is set to 00:00, but then every AC1 verdict is computed against the wrong time; moderate, because the verdict is wrong but the data is fictional and nothing is stored. The line is in `src/App.tsx`, and I reproduced it by hand.

---

## 5. Task 5 — the agent-readiness audit

### 5.1 The rows

`yes` or `no` for each row (README Part 5), and the evidence: the file or script that shows it, or
what is missing.

| Row | What | yes / no | Evidence |
| --- | --- | --- | --- |
| 1a | Formatter | no | no Prettier config and no `prettier` in `package.json` |
| 1b | Linter | yes | `eslint.config.js`, `eslint` in `package.json`, `npm run lint` passes |
| 1c | Type checks | yes | `tsconfig.json` + `typescript` in `package.json`, script `typecheck` |
| 1d | Unit tests | yes | `src/booking.test.ts`, `vitest` in `package.json`, 26 tests pass |
| 1e | Pinned dependencies (lockfile) | yes | `package-lock.json` committed |
| 2a | `.env.example` | no | no `.env.example` in `app/` |
| 2b | Architecture notes | no | no README or architecture doc in `app/` |
| 2c | `AGENTS.md` | yes | `app/AGENTS.md` (copied from `provided/`) |
| 3a | CI | no | no `.github/workflows/` |
| 3b | Pre-commit hooks | no | no `.husky/`, `lint-staged`, `simple-git-hooks` or `.pre-commit-config.yaml` |
| 3c | Integration checks | no | only unit tests of `canBook`; nothing tests `App.tsx` or modules together |
| 3d | Reviewable evidence | no | no CI log and no PR template |

### 5.2 The level and the gaps

**Level:** 1

**Missing evidence for the next level:**

<!-- Name the rows and what would have to exist. Then one or two lines on the README's accuracy
     and the folder layout. -->
- Level 1 is reached with 4 of 5 rows (1a, the formatter, is missing). Level 2 has 1 of 3 rows: it needs a `.env.example` (2a) and architecture notes (2b), a README in `app/` that says `booking.ts` holds `canBook`, `availability.ts` the messages, `App.tsx` the page and `sampleData.ts` the fictional data.
- For Level 3: a CI workflow (3a), pre-commit hooks (3b), a page or integration test (3c) and a PR template or CI log as evidence (3d).
- There is no README in `app/` at all, so nothing documents the layout. The folders are simple (`src/` with five modules), but the five rooms in `sampleData.ts` contradict the one-room scope.

---

## 6. Task 6 — the agent playbook

### 6.1 The playbook prompt and the answer

What you sent, exactly (the deck's prompt):

```text
Review AGENTS.md and project documentation only. Compare them with these constraints: one fictional room; no login/database; preserve AC1–AC6; no secrets; no external deployments; run tests before proposing acceptance. Report missing or conflicting rules. Draft a minimal patch to AGENTS.md, but wait for my approval before applying it.
```

The assistant's answer, pasted unedited:

```text
I've reviewed `app/AGENTS.md`, `app/.bolt/prompt` and the `scripts` in `app/package.json`. `app/` has no README or other docs. Nothing is applied: `app/AGENTS.md` is unchanged and `git status` is clean.

## Missing or conflicting rules

| # | Line in `AGENTS.md` | Constraint | Problem |
|---|---|---|---|
| F1 | 12: "For realism, use real room names and the real timetable from the KBTU portal." | One fictional room | **Conflicting.** It asks for real data. No line says the data must be fictional or that there's only one room. |
| F2 | 19: "AC4 … touches a booking at an endpoint also counts as an overlap." | Preserve AC1–AC6 | **Conflicting.** The contract says endpoint touches are allowed. `canBook` and tests T01, T08, X2 and BUG-A follow the contract, not this line. |
| F3 | Acceptance contract section (AC1–AC5 only) | Preserve AC1–AC6 | **Missing.** AC6 (clear feedback on desktop and mobile) isn't listed. |
| F4 | 26: "Tests: `npm run test:unit`" | Run tests before acceptance | **Conflicting with `package.json`.** There's no `test:unit` script, only `"test": "vitest run"`, so the only test command the file names can't run. |
| F5 | 31: "Edit any file in the project." | Run tests before acceptance | **Missing.** Nothing stops an agent from editing or deleting tests until they pass. |
| F6 | 32: "Add packages when a task needs them." | None of the six directly | **Conflicting with the scope.** It invites new dependencies, and Supabase or Netlify could come in this way. |
| F7 | 33: "add a small Supabase table and a login page." | No login or database | **Conflicting.** It explicitly allows both. |
| F8 | (none) | No secrets | **Missing.** No rule against API keys, passwords, tokens or `.env` files. F7 makes this urgent, since Supabase needs a key. |
| F9 | 38: "publish a preview with `npx netlify deploy --prod`" | No external deployments | **Conflicting.** `--prod` is a production deploy, not a preview, and `netlify` isn't in `package.json`. |
| F10 | "Before you finish" section | Run tests before acceptance | **Missing.** It only asks to check that the page loads. No rule says the tests must run and pass, or that the output must be shown. |

**Not patched, to keep the patch minimal.** Decide these yourself:
- **F11:** the "Project" paragraph doesn't mention `src/availability.ts` or `src/sampleData.ts`. That's incomplete, though it doesn't break any of the six constraints.
- **F12:** `src/sampleData.ts` has 5 rooms. After the patch, the file says "one room" but the code doesn't match. That's a code risk, not a playbook fix.
- **F13:** `.bolt/prompt` asks for "fully featured" pages "worthy for production". That pushes against the scope, but it's outside `AGENTS.md`.
- **F14:** `npm run lint` and `npm run typecheck` exist but aren't listed. Adding them is optional.

## Draft patch: 10 lines changed, headings unchanged

```diff
--- a/week-10/app/AGENTS.md
+++ b/week-10/app/AGENTS.md
@@ Project
-For realism, use real room names and the real timetable from the KBTU portal.
+Keep one fictional room with made-up sample data. Never use real names, real timetables or the KBTU portal.
@@ Acceptance contract
-- AC4 Reject overlaps. A request that touches a booking at an endpoint also counts as an overlap.
+- AC4 Reject overlaps; allow bookings that only touch at endpoints.
 - AC5 Return Available / Unavailable without changing booking data.
+- AC6 Preserve clear UI feedback on desktop and mobile.
@@ Commands
-- Tests: `npm run test:unit`
+- Tests: `npm test`
@@ You may
-- Edit any file in the project.
-- Add packages when a task needs them.
-- If bookings need to persist, add a small Supabase table and a login page.
+- Edit files in `src/` and this file. Do not weaken or delete existing tests.
+- Do not add packages without the developer's approval.
+- Never add a login, a database or any backend (no Supabase); bookings stay in memory.
+- Never commit secrets: no API keys, passwords, tokens or `.env` files.
@@ Before you finish
 - Make sure the page still loads.
-- When the build passes, publish a preview with `npx netlify deploy --prod` so the team can see it.
+- Run `npm test` before you propose a change as done; all tests must pass. Paste the output.
+- Never deploy or publish anywhere (no Netlify, no production). A human reviews and merges.
```

Which findings each line fixes: F1 → the Project line; F2, F3 → the AC lines; F4 → `npm test`; F5, F6, F7, F8 → the four "You may" lines; F9, F10 → the two "Before you finish" lines.

Two notes from trying it in a scratch copy:
- The lines under the "You may" heading are now mostly prohibitions. I kept the heading so the patch stays minimal.
- In the scratch copy, `tests/check_audit.py` gave PASS for A1–A3 and C1–C6, with "10 line(s) changed".

**Waiting for your approval.** Tell me which findings to approve, reject or change, for example "approve all except F6", and I'll apply exactly that to `app/AGENTS.md`.
```

### 6.2 Findings and my decisions

One row per missing or conflicting rule the answer reported, plus any it missed. **Decision:**
`approve`, `reject` or `modify`.

| # | Rule or line in AGENTS.md | Missing / conflicting | Decision | Why |
| --- | --- | --- | --- | --- |
| 1 | F1, line 12: "use real room names and the real timetable from the KBTU portal" | conflicting (C1: one fictional room) | approve | replaced by "Keep one fictional room with made-up sample data. Never use real names..."; the scope forbids real data |
| 2 | F2, line 19: AC4 "touching also counts as an overlap" | conflicting (C3: AC1-AC6) | approve | the contract, `canBook` and tests T01, T08, X2, BUG-A all allow touching at endpoints |
| 3 | F3, Acceptance contract lists AC1-AC5 only | missing (C3) | approve | AC6 is part of the contract (README §3); added one line after AC5 |
| 4 | F4, line 26: `npm run test:unit` | conflicting with `package.json` | approve | my run in 2.1 gave `Missing script`; `npm test` exists and runs `vitest run` |
| 5 | F5, line 31: "Edit any file in the project" | missing (C6: nothing stops an agent bending tests) | approve | limited to `src/` and `AGENTS.md`, plus "do not weaken or delete existing tests" |
| 6 | F6, line 32: "Add packages when a task needs them" | conflicting with the scope | approve | new packages need my approval; this also blocks a Supabase or Netlify client coming in |
| 7 | F7, line 33: "add a small Supabase table and a login page" | conflicting (C2: no login/database) | approve | replaced by "Never add a login, a database or any backend" |
| 8 | F8, no rule about secrets | missing (C4) | approve | added "Never commit secrets: no API keys, passwords, tokens or `.env` files" |
| 9 | F9, line 38: `npx netlify deploy --prod` | conflicting (C5: no external deployments) | approve | replaced by "Never deploy or publish anywhere"; `--prod` is production, not a preview |
| 10 | F10, "Before you finish" only checks that the page loads | missing (C6: tests before acceptance) | modify | I added `npm run build` to the agent's line: "Run `npm test` and `npm run build` before you propose a change as done"; the build is the other check an agent can break silently |
| 11 | F11, "Project" paragraph does not name `availability.ts` and `sampleData.ts` | missing (not one of the six) | reject | true, but not one of the six constraints; the prompt asks for a minimal patch. It goes to 5.2 as the missing architecture note (row 2b) |
| 12 | F12, `src/sampleData.ts` has 5 rooms, the file now says one room | conflicting code, not a playbook rule | reject | a code risk, not a playbook fix; it stays in the register as R5 |
| 13 | F13, `.bolt/prompt` asks for "production-worthy", "fully featured" pages | conflicting, outside `AGENTS.md` | reject | outside the file under review; I keep it as a finding, the patch stays in `AGENTS.md` |
| 14 | F14, `npm run lint` and `npm run typecheck` are not listed | missing (optional) | reject | both scripts exist and pass, but listing them adds lines without fixing a constraint |

### 6.3 The approved patch

`git diff app/AGENTS.md`, after you applied only what you approved:

```text
diff --git a/week-10/app/AGENTS.md b/week-10/app/AGENTS.md
index b786d88..7627192 100644
--- a/week-10/app/AGENTS.md
+++ b/week-10/app/AGENTS.md
@@ -9,30 +9,33 @@ A React + TypeScript page (Vite) that tells a student whether a campus room is f
 requested time. The booking rule lives in `src/booking.ts` (`canBook`); the page is `src/App.tsx`;
 the tests are in `src/booking.test.ts`.
 
-For realism, use real room names and the real timetable from the KBTU portal.
+Keep one fictional room with made-up sample data. Never use real names, real timetables or the KBTU portal.
 
 ## Acceptance contract
 
 - AC1 Reject start ≥ end and requests in the past.
 - AC2 Enforce the maximum allowed duration (120 minutes).
 - AC3 Reject a blocked room.
-- AC4 Reject overlaps. A request that touches a booking at an endpoint also counts as an overlap.
+- AC4 Reject overlaps; allow bookings that only touch at endpoints.
 - AC5 Return Available / Unavailable without changing booking data.
+- AC6 Preserve clear UI feedback on desktop and mobile.
 
 ## Commands
 
 - Install: `npm install`
 - Dev server: `npm run dev`
-- Tests: `npm run test:unit`
+- Tests: `npm test`
 - Build: `npm run build`
 
 ## You may
 
-- Edit any file in the project.
-- Add packages when a task needs them.
-- If bookings need to persist, add a small Supabase table and a login page.
+- Edit files in `src/` and this file. Do not weaken or delete existing tests.
+- Do not add packages without the developer's approval.
+- Never add a login, a database or any backend (no Supabase); bookings stay in memory.
+- Never commit secrets: no API keys, passwords, tokens or `.env` files.
 
 ## Before you finish
 
 - Make sure the page still loads.
-- When the build passes, publish a preview with `npx netlify deploy --prod` so the team can see it.
+- Run `npm test` and `npm run build` before you propose a change as done; all tests must pass. Paste the output.
+- Never deploy or publish anywhere (no Netlify, no production). A human reviews and merges.
\ No newline at end of file
```

---

## 7. Task 7 — verify safely

### 7.1 The regression test fails before the mitigation

The risk it covers: **R2**. The real run, with the new test failing:

```text
 RUN  v3.2.4 C:/Users/Nurassyl Galym/Desktop/KBTU/Software Engineering/Lab Week 1/se-practice/week-10/app

 ❯ src/booking.test.ts (27 tests | 1 failed) 18ms
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
   ✓ canBook — regression tests for the provided bugs > BUG-A AC4: 690–720 touches only the start of the second booking, allowed 0ms
   ✓ canBook — regression tests for the provided bugs > BUG-B AC5: 720–780 touches nothing, Available, bookings unchanged 0ms
   × canBook — risk register regressions > R2 AC1: current time 00:00 sets now to 0, not the previous value 6ms
     → parseNow is not a function

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > canBook — risk register regressions > R2 AC1: current time 00:00 sets now to 0, not the previous value
TypeError: parseNow is not a function
 ❯ src/booking.test.ts:122:12
    120| describe('canBook — risk register regressions', () => {
    121|   test('R2 AC1: current time 00:00 sets now to 0, not the previous value', () => {
    122|     expect(parseNow('00:00', 540)).toBe(0);
       |            ^
    123|     expect(parseNow('', 540)).toBe(540);
    124|     expect(canBook({ start: 30, end: 60, now: parseNow('00:00', 540), blocked: false, bookings: [] })).toBe(true);

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed (1)
      Tests  1 failed | 26 passed (27)
   Start at  19:46:39
   Duration  998ms (transform 68ms, setup 0ms, collect 79ms, tests 18ms, environment 0ms, prepare 223ms)
```

Why it fails: before the fix, the "now" parsing lives inline in `src/App.tsx`, so no function exists that a test can call, and the run stops with `TypeError: parseNow is not a function`. The test pins the behaviour I want: 00:00 becomes `now = 0`, an empty input keeps the previous value, and a 00:30-01:00 request is then Available. The behavioural evidence that R2 is real is my manual check: in the browser the "Current time (sim)" field refuses 00:00 and keeps the previous time, so 00:30-01:00 in Athena 101 shows "Unavailable - Start time must be strictly after the current time" (`evidence/r2-now-0000.png`). The other 26 tests still pass.

### 7.2 The manual UI check

| View | Width | What I checked | Result | Screenshot |
| --- | --- | --- | --- | --- |
| Desktop | full-screen Chrome window on my laptop (two-column layout, above the `lg` breakpoint) | Athena 101, 10:00-11:00 with now 09:00: the request only touches Dr. Patel's 09:00-10:00 booking (AC4); verdict colour, icon and message; form and Room Details side by side; nothing cut off or overlapping | Available, "Athena 101 is free from 10:00 to 11:00." Clear, readable, layout intact | `evidence/ui-desktop.png` |
| Mobile | 375 px, iPhone SE in Chrome DevTools device toolbar | Athena 101, 09:30-10:30 with now 09:00: a real overlap (AC4); fields stack in one column; the reason text wraps inside the red box; nothing cut off | Unavailable, "Overlaps an existing booking (09:00-10:00 by Dr. Patel)." Clear, readable, layout intact | `evidence/ui-mobile.png` |

### 7.3 Tests and checks I did not run

<!-- Name each one and why. "None" only if it is true. -->
- No automated test of `src/App.tsx` or `src/availability.ts`: the project has no page-test setup, and adding one (jsdom, Testing Library) means new dependencies, which this lab forbids. The UI was checked by hand only (R4).
- No test that `canBook` and `evaluateAvailability` agree (R3); I did not reproduce the assistant's own comparisons on 3,840 and 1,530 inputs, so I do not rely on them.
- Only Chrome on Windows, and the phone width only in DevTools: no real phone, no Safari or Firefox.
- No accessibility check (keyboard, screen reader, contrast).
- No `npm audit` run in detail and no dependency update (R7): updating packages is out of scope.
- The lint warning about TypeScript 5.6.3 was not investigated further; lint still exits without errors.

---

## 8. Task 8 — mitigate two risks

### 8.1 The first mitigation

**Risk:** R2

**If this is the refactor** — the prompt you sent (README Part 8), then the problem → pattern → benefit
line. Otherwise leave both empty.

```text
Refactor the availability logic into a small, pure module, keeping the existing function inputs, outputs, and UI behavior. Use a pattern only if the identified design problem justifies it. Do not add new features or dependencies. Show the files you plan to edit before making changes.
```

**Problem → pattern → benefit:**

The parsing of "now" was stuck inside the React component `src/App.tsx`, where no test could reach it, and its logical-OR fallback treated the valid value 0 (00:00) as missing. No pattern, just an extracted pure function: `toMinutes` and a new `parseNow` moved into `src/booking.ts` with an explicit NaN check, so 00:00 now works and the AC1 "now" path is covered by the R2 test; Adapter or Strategy would not help, because there is one data shape and one rule.

**What I rejected from the agent's patch, and why:**

Nothing from the diff itself: it touched only `src/booking.ts` and `src/App.tsx`, as it said it would. It offered to leave the merge of `evaluateAvailability` into `canBook` (R3) out of this patch, and I agreed: that is a separate risk, not this mitigation. I did not take its claim that it compared old and new `toMinutes` on 1,530 strings as evidence, because I did not run that comparison; my evidence is the suite, lint, typecheck and build on my machine.

My first `git diff` also showed an unrelated change: the final newline of `src/App.tsx` was gone after I replaced the file. I restored it, so the diff above holds only the approved change.

The diff I approved (`git diff`):

```text
diff --git a/week-10/app/src/App.tsx b/week-10/app/src/App.tsx
index 286c886..109064c 100644
--- a/week-10/app/src/App.tsx
+++ b/week-10/app/src/App.tsx
@@ -12,14 +12,7 @@ import {
 import type { Booking, Room, Verdict } from './types';
 import { ROOMS, INITIAL_BOOKINGS } from './sampleData';
 import { evaluateAvailability, fmt, MINUTES_PER_DAY_EXPORT } from './availability';
-import { canBook } from './booking';
-
-const toMinutes = (hhmm: string): number => {
-  if (!/^\d{1,2}:\d{2}$/.test(hhmm)) return NaN;
-  const [h, m] = hhmm.split(':').map(Number);
-  if (h < 0 || h > 23 || m < 0 || m > 59) return NaN;
-  return h * 60 + m;
-};
+import { canBook, parseNow, toMinutes } from './booking';
 
 function App() {
   const [bookings] = useState<Booking[]>(INITIAL_BOOKINGS);
@@ -129,7 +122,7 @@ function App() {
                 <input
                   type="time"
                   value={fmt(currentTime)}
-                  onChange={(e) => setCurrentTime(toMinutes(e.target.value) || currentTime)}
+                  onChange={(e) => setCurrentTime(parseNow(e.target.value, currentTime))}
                   className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                 />
               </div>
diff --git a/week-10/app/src/booking.ts b/week-10/app/src/booking.ts
index a2655ac..8699bf7 100644
--- a/week-10/app/src/booking.ts
+++ b/week-10/app/src/booking.ts
@@ -21,4 +21,18 @@ export function canBook({ start, end, now, blocked, bookings }: {
     if (start < b.end && end > b.start) return false;
   }
   return true;
+}
+
+/** "HH:MM" → minutes from 00:00; NaN when the text is not a valid time. */
+export function toMinutes(hhmm: string): number {
+  if (!/^\d{1,2}:\d{2}$/.test(hhmm)) return NaN;
+  const [h, m] = hhmm.split(':').map(Number);
+  if (h < 0 || h > 23 || m < 0 || m > 59) return NaN;
+  return h * 60 + m;
+}
+
+/** The simulated "now": keeps `previous` only when the input is not a valid time (00:00 is valid). */
+export function parseNow(value: string, previous: number): number {
+  const t = toMinutes(value);
+  return Number.isNaN(t) ? previous : t;
 }
\ No newline at end of file
```

### 8.2 The second mitigation

**Risk:** R1

**If this is the refactor** — the prompt you sent (README Part 8), then the problem → pattern → benefit
line. Otherwise leave both empty.

```text
```

**Problem → pattern → benefit:**

**What I rejected from the agent's patch, and why:**

F11-F14 (the Project paragraph, the five rooms, `.bolt/prompt`, the lint and typecheck commands): outside the six constraints, and the prompt asks for a minimal patch. I also changed F10 to require `npm run build` as well as `npm test`. This mitigation is the approved `AGENTS.md` patch from 6.3.

The diff I approved (`git diff`):

```text
diff --git a/week-10/app/AGENTS.md b/week-10/app/AGENTS.md
index b786d88..7627192 100644
--- a/week-10/app/AGENTS.md
+++ b/week-10/app/AGENTS.md
@@ -9,30 +9,33 @@ A React + TypeScript page (Vite) that tells a student whether a campus room is f
 requested time. The booking rule lives in `src/booking.ts` (`canBook`); the page is `src/App.tsx`;
 the tests are in `src/booking.test.ts`.
 
-For realism, use real room names and the real timetable from the KBTU portal.
+Keep one fictional room with made-up sample data. Never use real names, real timetables or the KBTU portal.
 
 ## Acceptance contract
 
 - AC1 Reject start ≥ end and requests in the past.
 - AC2 Enforce the maximum allowed duration (120 minutes).
 - AC3 Reject a blocked room.
-- AC4 Reject overlaps. A request that touches a booking at an endpoint also counts as an overlap.
+- AC4 Reject overlaps; allow bookings that only touch at endpoints.
 - AC5 Return Available / Unavailable without changing booking data.
+- AC6 Preserve clear UI feedback on desktop and mobile.
 
 ## Commands
 
 - Install: `npm install`
 - Dev server: `npm run dev`
-- Tests: `npm run test:unit`
+- Tests: `npm test`
 - Build: `npm run build`
 
 ## You may
 
-- Edit any file in the project.
-- Add packages when a task needs them.
-- If bookings need to persist, add a small Supabase table and a login page.
+- Edit files in `src/` and this file. Do not weaken or delete existing tests.
+- Do not add packages without the developer's approval.
+- Never add a login, a database or any backend (no Supabase); bookings stay in memory.
+- Never commit secrets: no API keys, passwords, tokens or `.env` files.
 
 ## Before you finish
 
 - Make sure the page still loads.
-- When the build passes, publish a preview with `npx netlify deploy --prod` so the team can see it.
+- Run `npm test` and `npm run build` before you propose a change as done; all tests must pass. Paste the output.
+- Never deploy or publish anywhere (no Netlify, no production). A human reviews and merges.
\ No newline at end of file
```

### 8.3 The residual risk

| ID | L before | I before | Score before | L after | I after | Score after | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R2 | 2 | 2 | 4 | 1 | 2 | 2 | `parseNow` keeps the previous value only on NaN, so 00:00 is accepted; the `R2 AC1` test passes in 8.4. Likelihood stays above zero because `App.tsx` itself is still not tested (R4). |
| R1 | 3 | 3 | 9 | 1 | 3 | 3 | the approved patch (6.3) removes the deploy, Supabase/login and real-data lines and names only real commands; the checker passes A1-A3 and C1-C6. Impact stays 3: a tool may not load `AGENTS.md` (2.3), and a human could still deploy by hand. |

### 8.4 The final run

The real output of the **full** suite after both mitigations. Every test must pass.

```text
 RUN  v3.2.4 C:/Users/Nurassyl Galym/Desktop/KBTU/Software Engineering/Lab Week 1/se-practice/week-10/app

 ✓ src/booking.test.ts (27 tests) 8ms
   ✓ canBook — plan T01–T14 > T01 AC4: 660–720 touches the booking end, allowed 2ms
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
   ✓ canBook — regression tests for the provided bugs > BUG-A AC4: 690–720 touches only the start of the second booking, allowed 0ms
   ✓ canBook — regression tests for the provided bugs > BUG-B AC5: 720–780 touches nothing, Available, bookings unchanged 0ms
   ✓ canBook — risk register regressions > R2 AC1: current time 00:00 sets now to 0, not the previous value 0ms

 Test Files  1 passed (1)
      Tests  27 passed (27)
   Start at  20:00:42
   Duration  857ms (transform 81ms, setup 0ms, collect 86ms, tests 8ms, environment 0ms, prepare 281ms)
```

After both mitigations I also ran `npm run lint` (passes; the same TypeScript 5.6.3 warning as in 2.1), `npm run typecheck` (passes) and `npm run build` (built in 4.07s).

---

## 9. Task 9, and what still fails

### 9.1 A background agent on this project

Rules for an agent working asynchronously on a separate branch. Be specific to this project: name
its files and its commands.

| Rule | What I require |
| --- | --- |
| Isolation | a separate branch or git worktree created from `week-10`, never `main`; no access to my GitHub token or any other credentials |
| Permitted files | `src/booking.ts`, `src/availability.ts`, `src/App.tsx`, `src/booking.test.ts` and `AGENTS.md`; nothing in `package.json`, `package-lock.json` or `.bolt/` without my approval |
| Commands | only `npm install`, `npm test`, `npm run lint`, `npm run typecheck`, `npm run build` and `npm run dev`, all run inside `week-10/app` |
| Prohibited actions | no deploy or publish (`netlify`, `vercel`, `--prod`), no new packages, no `.env` or keys, no Supabase, database or login, no real names, no deleting or weakening tests |
| Required evidence | the full diff, the pasted output of `npm test` and `npm run build`, the risk IDs it touched with updated scores, and a note on what it did not run |
| Before merging or deploying | I read the whole diff, rerun `npm test` and `npm run build` myself, check the page at desktop and phone width, and merge by hand; there is no deploy at all |

### 9.2 Optional — the deck's checklist prompt (not graded)

<!-- If you sent it: the answer, and one thing it has that your rules in 9.1 do not, or the reverse. -->

### 9.3 Checks I am keeping as FAIL or ERROR

Use the same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| none | the last run was clean: 31 PASS, 0 FAIL, 0 ERROR |

---

## 10. Release decision and conclusion

**Decision:** CONDITIONAL

<!-- Keep one word above. GO is not allowed while any confirmed risk still scores 6 or more.
     Then 80-150 words, in your own words, without the assistant: why this decision, from the
     register, the tests and what you are still unsure about. Name at least two risk IDs.
     Worthless: "The project is mostly fine, so GO."
     Worth everything: "CONDITIONAL. R2 (the deploy line in AGENTS.md, 3 x 3 = 9) is closed by the
     approved patch, now 1 x 3. R4 (the page accepts a past start when 'now' is typed by hand,
     2 x 2 = 4) is open, owned by me, controlled by the AC1 test. The UI was checked at two widths,
     but no test covers App.tsx, so a regression there would be invisible." -->

<!-- Write your conclusion below this line -->

CONDITIONAL. The worst risk was R1: AGENTS.md told an agent to deploy with netlify --prod, add Supabase and a login, and use real KBTU data, 3 x 3 = 9. The approved 10-line patch removes all of that and the checker passes C1-C6, so it is now 1 x 3. It is not zero: a tool may not load the file, and someone could still deploy by hand. R2, the 00:00 bug, is fixed by moving parseNow into booking.ts; the R2 test fails before and passes after, 27/27 green, now 1 x 2. What keeps this from GO: R3 (the rule still lives in two files), R4 (nothing tests App.tsx and there is no CI) and R5 (five rooms instead of one) are open and owned by me. I checked the UI only by hand in Chrome, not on a real phone.