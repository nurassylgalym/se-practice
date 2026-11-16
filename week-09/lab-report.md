# Week 09 — Lab Report: canBook as a Tool

Fill in every section. Do not delete or renumber the headings: the README and the checker point at
them. Replace every `<!-- comment -->` with your own text (comments are ignored by the checker).

**Name:** Nurassyl Galym
**Student ID:** 26B030025
**GitHub:** nurassylgalym

---

## 1. Setup

| | |
| --- | --- |
| Assistant (frozen for the whole lab) | Claude (claude.ai) |
| Exact model (or "not displayed") | Claude Opus 5.5, medium effort |
| Three fresh chats for R1, R2, R3? (yes / no) | yes |
| Python version (`python --version`) | [ВСТАВЬ: python --version] |

## 2. Your tool definition — a reason for every constraint

Paste your final `tool/check_room.json`, then fill the table: one row per constraint you wrote.

```json
{
  "name": "check_room",
  "description": "Checks whether one room can be booked for a requested time slot today and answers Available or Unavailable. Every time is given in whole minutes since midnight, from 0 to 1440 (10:00 is 600, 24:00 is 1440). It only checks: it does not save, create or change any booking.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "start": {"type": "integer", "minimum": 0, "maximum": 1440, "description": "Requested start, minutes since midnight."},
      "end": {"type": "integer", "minimum": 0, "maximum": 1440, "description": "Requested end, minutes since midnight; 1440 means 24:00."},
      "now": {"type": "integer", "minimum": 0, "maximum": 1440, "description": "The current time, minutes since midnight."},
      "blocked": {"type": "boolean", "description": "true if the room is blocked (e.g. maintenance)."},
      "bookings": {
        "type": "array",
        "description": "Existing bookings for the room today; may be empty.",
        "items": {
          "type": "object",
          "properties": {
            "start": {"type": "integer", "minimum": 0, "maximum": 1440},
            "end": {"type": "integer", "minimum": 0, "maximum": 1440}
          },
          "required": ["start", "end"],
          "additionalProperties": false
        }
      }
    },
    "required": ["start", "end", "now", "blocked", "bookings"],
    "additionalProperties": false
  }
}
```

| Field | Constraint (e.g. `"type": "integer"`, `"maximum": 1440`) | What goes wrong without it |
| --- | --- | --- |
| start, end, now | `"type": "integer"` | The model can send `"11:00"` (S03) or `600.5` (S10) and canBook gets a string or a half minute it cannot compare. |
| start, end, now | `"minimum": 0` | A time before midnight like `-30` (S06) gets through and the function has to handle a time that does not exist. |
| start, end, now | `"maximum": 1440` (not `exclusiveMaximum`) | Without it `1500` (S07) passes. I used `maximum`, not `exclusiveMaximum`, so `end = 1440` (24:00, S11) stays valid as AC1 allows. |
| blocked | `"type": "boolean"` | `"false"` as a string (S09) is truthy in JS, so the room would be treated as blocked. |
| top level | all five fields in `required` | A call without `now` (S04) passes, and the function cannot check "start after now". |
| top level | `"additionalProperties": false` | The model can invent fields like `"room": "204"` (S05) and believe the tool uses them, but canBook ignores them silently. |
| bookings | `"type": "array"` with no `minItems` | An empty list must be allowed (S02); `minItems: 1` would refuse the R2 call. |
| bookings.items | `"type": "object"`, `required: ["start","end"]`, `additionalProperties: false` | A booking as a pair `[660, 720]` (S12) or with no end (S08) passes, and the overlap check (AC4) reads `undefined`. |
| bookings.items.start/end | `"type": "integer"`, `0`–`1440` | Booking times would have no unit or range, the same problems as the top-level fields. |
| description | says minutes, 0–1440, "does not save" | The model does not know the unit and may send hours or "10:00"; it may also think the call books the room. |

## 3. The twelve calls — first run and final run

Your **first** run's S verdicts (before any fix), and your final ones. For every case that changed,
say what you changed.

First run = the provided empty template (no properties, no constraints), before I wrote anything. Final run = the definition in §2.

| Case | First run | Final run | What you changed |
| --- | --- | --- | --- |
| S01 | PASS | PASS | — |
| S02 | PASS | PASS | — (no `minItems` on bookings, so `[]` stays valid) |
| S03 | FAIL | PASS | `"type": "integer"` on end |
| S04 | FAIL | PASS | all five fields in `required` |
| S05 | FAIL | PASS | `"additionalProperties": false` on the top level |
| S06 | FAIL | PASS | `"minimum": 0` on start |
| S07 | FAIL | PASS | `"maximum": 1440` on end |
| S08 | FAIL | PASS | `items` with `required: ["start", "end"]` |
| S09 | FAIL | PASS | `"type": "boolean"` on blocked |
| S10 | FAIL | PASS | `"type": "integer"` on start (600.5 is not a whole minute) |
| S11 | PASS | PASS | — (`maximum: 1440`, not `exclusiveMaximum`, so 1440 stays valid) |
| S12 | FAIL | PASS | `items` `"type": "object"` refuses a pair |

## 4. Function calling — what the model wrote

For each request, paste the model's reply exactly, then judge it against the request.

### R1

```text
{"name": "check_room", "arguments": {"start": 600, "end": 660, "now": 540, "blocked": false, "bookings": [{"start": 660, "end": 720}]}}
```

Expected: start 600 (10:00), end 660 (11:00), now 540 (9:00), blocked false, bookings [{660, 720}]. The model's call matches on all five arguments, so F3 passes. The booking 11:00–12:00 only touches the requested slot, and canBook should answer Available (AC4: touching is allowed). That is the function's decision, not the model's.

### R2

```text
{"name": "check_room", "arguments": {"start": 840, "end": 990, "now": 810, "blocked": true, "bookings": []}}
```

Expected: start 840 (14:00), end 990 (16:30), now 810 (13:30), blocked true, bookings []. The model's call matches, so F6 passes. It did not refuse to call even though the room is blocked and the slot is 150 minutes, which is the right behaviour: the call is valid against the schema, and it is canBook that answers Unavailable twice over (AC3 blocked, AC2 more than 120 minutes). The 16:30 → 990 conversion is where I expected a slip, and there wasn't one.

### R3

```text
The checker only works for today. Which slot today do you want (start and end time), what time is it now, is the room blocked, and what bookings does it already have?
```

Missing: the current time (now), the exact start and end ("afternoon" and "a couple of hours" are not numbers), whether the room is blocked, and the existing bookings. "Tomorrow" cannot be expressed at all, because the tool only knows minutes of one day, and the model noticed that: it said the checker only works for today. It asked instead of calling, as the prompt told it to, so nothing was invented. Strictly, it asked four things in one sentence rather than "one short question", but it still did not guess. If it had called, values like now = 720 or start = 780 would have passed the schema, because they are valid integers in 0–1440. The schema cannot tell a real value from a guessed one.

## 5. What the schema cannot check

A JSON Schema with these keywords looks at one field at a time. It cannot compare two fields, and it cannot see what the function does.

- **AC1** — only partly. The schema enforces that start, end and now are whole numbers in 0–1440. It cannot enforce `start < end` or "start after now", because both compare two fields and there is no keyword for that. `start = 600, end = 600` is a valid call.
- **AC2** — "at most 120 minutes" is `end - start <= 120`, again a relation between two fields. The R2 call (150 minutes) passes the schema.
- **AC3** — the schema can say blocked is a boolean, not that `true` means Unavailable. Forbidding `true` with `enum: [false]` would refuse a legal call like R2, which must reach the function.
- **AC4** — overlap means comparing the request with every booking in the list. The schema checks each booking's shape, not whether it overlaps.
- **AC5** — "does not save anything" is behaviour of the code. The schema only describes input.
- **AC6** — the page's feedback is UI; there is no page in a tool call.

So AC2, AC3, AC4, AC5 and most of AC1 can only be enforced inside canBook.

## 6. Permissions — allow, ask or block

| # | Action | Decision (allow / ask / block) | Reason (the risk, in one sentence or more) |
| --- | --- | --- | --- |
| A1 | call `check_room` with the times the user just typed | allow | It only reads and never saves (AC5), and the schema refuses broken calls, so the worst case is a wrong Available/Unavailable answer the user can see. |
| A2 | read `week-08/app/src/booking.ts` | allow | Reading a source file in my own repo changes nothing and there are no secrets in it. |
| A3 | edit `booking.ts` to raise the 120-minute limit to 180 | block | One user asking for 3 hours is not a reason to change a business rule (AC2) for everyone; that is a requirements decision, and it would also break my Week 07–08 tests. |
| A4 | run `npm test` in `week-08/app` | allow | Running tests does not change the source and is how the agent checks its work; the risk is that it executes whatever scripts are in package.json, which is why A3-style edits are blocked. |
| A5 | run `git reset --hard` to undo its own last three edits | ask | `reset --hard` throws away every uncommitted change in tracked files, mine included, not only the agent's three edits, and there is no undo. |
| A6 | `git commit` its change on the `week-09` branch | allow | A commit on a feature branch is local and reversible, and it still has to go through my PR review before main. |
| A7 | `git push` to `main` | block | It skips the PR and review entirely and publishes the change to everyone; the course also forbids committing to main. |
| A8 | send the contents of `.env` to an MCP server it found online | block | `.env` holds secrets and the server is unknown; once the keys leave the machine they are leaked and cannot be taken back. |

## 7. Checkpoint

Before letting such an agent edit anything, I would commit everything first so there is a clean point to return to. My checkpoint is the commit with my tool definition:

`40b1448` — Week 09: check_room tool definition

The command back to it:

```bash
git reset --hard 40b1448
```

It throws away every commit made after this one on the week-09 branch and every uncommitted change in tracked files. New untracked files the agent created stay on disk; removing them needs `git clean -fd`. It is the same command as A5, and that is the point: I run it myself, knowing what it deletes, and the agent does not.

## 8. Checker output

Paste the **whole** output of your last `python tests/check_tool.py`, unedited.

```text
[ВСТАВЬ: полный вывод последнего прогона]
```

## 9. What still fails

[ВСТАВЬ: "None" если 30/30. Если что-то FAIL — перечисли ID и причину]

## 10. Conclusion (80–150 words)

The schema checks shape, never meaning. S03 is refused because "11:00" is not an integer, but start = 600 with end = 600 passes, and so does the R2 call: a blocked room for 150 minutes is a perfectly valid call, and only canBook says Unavailable (AC2, AC3). The model is a separate layer. R3 gave no current time, no exact hours and no bookings, and if the model had guessed now = 720 the schema would have accepted it, because 720 is a valid integer. So the description has to teach the units, the schema stops broken calls, and the rules stay in the function. Permissions are another question again: A8 breaks no schema and is still the most dangerous action on the list.