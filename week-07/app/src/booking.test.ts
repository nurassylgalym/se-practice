import { describe, it, expect } from "vitest";
import { canBook, type BookingRequest } from "./booking"; // same module the page imports

type Booking = { start: number; end: number };

// Fixed clock: "now" is an input (minutes since midnight), never read from Date.
const NOW = 540;

// Fresh fixture per test, so no test can leak state into another.
const defaults = (): Omit<BookingRequest, "start" | "end"> => ({
  now: NOW,
  blocked: false,
  bookings: [{ start: 600, end: 660 }],
});

type Case = {
  id: string;
  ac: string;
  label: string;
  start: number;
  end: number;
  expected: boolean;
  blocked?: boolean;
  bookings?: Booking[];
};

const cases: Case[] = [
  { id: "T01", ac: "AC4", label: "touching after", start: 660, end: 720, expected: true },
  { id: "T02", ac: "AC1", label: "starts now", start: 540, end: 570, expected: false },
  { id: "T03", ac: "AC1", label: "zero duration", start: 720, end: 720, expected: false },
  { id: "T04", ac: "AC1", label: "reversed", start: 750, end: 720, expected: false },
  { id: "T05", ac: "AC1", label: "past day end", start: 1380, end: 1441, expected: false },
  { id: "T06", ac: "AC2", label: "exactly 120 minutes", start: 720, end: 840, expected: true },
  { id: "T07", ac: "AC2", label: "121 minutes", start: 720, end: 841, expected: false },
  { id: "T08", ac: "AC4", label: "touching before", start: 570, end: 600, expected: true },
  { id: "T09", ac: "AC4", label: "partial overlap", start: 630, end: 690, expected: false },
  { id: "T10", ac: "AC4", label: "contains booking", start: 570, end: 690, expected: false },
  { id: "T11", ac: "AC4", label: "inside booking", start: 615, end: 645, expected: false },
  { id: "T12", ac: "AC4", label: "identical", start: 600, end: 660, expected: false },
  { id: "T13", ac: "AC3", label: "room blocked", start: 660, end: 720, blocked: true, expected: false },
  { id: "T14", ac: "AC4", label: "no bookings", start: 630, end: 690, bookings: [], expected: true },
  { id: "X1", ac: "AC1", label: "ends exactly at 1440", start: 1380, end: 1440, expected: true },
  {
    id: "X2", ac: "AC4", label: "gap between two bookings", start: 660, end: 720,
    bookings: [{ start: 600, end: 660 }, { start: 720, end: 780 }], expected: true,
  },
];

describe("canBook", () => {
  it.each(cases)("$id [$ac] $label: $start–$end → $expected", (c) => {
    const req: BookingRequest = {
      ...defaults(),
      start: c.start,
      end: c.end,
      ...(c.blocked !== undefined && { blocked: c.blocked }),
      ...(c.bookings !== undefined && { bookings: c.bookings }),
    };
    const before = structuredClone(req.bookings);

    const result = canBook(req);

    expect(result).toBe(c.expected);       // exact boolean, not truthy/falsy
    expect(req.bookings).toEqual(before);  // existing data unchanged (AC5)
  });

  it("AC5: Available decision leaves booking data untouched", () => {
    const req: BookingRequest = { ...defaults(), start: 660, end: 720 };
    const ref = req.bookings;
    const item = ref[0];
    const before = structuredClone(ref);

    expect(canBook(req)).toBe(true);
    expect(req.bookings).toBe(ref);   // same array, not reassigned
    expect(ref[0]).toBe(item);        // same object
    expect(ref).toEqual(before);      // same contents
    expect(ref).toHaveLength(1);      // nothing appended
  });
});