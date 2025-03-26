import { processEvents } from "../eventProcessing";
import { RawEvent } from "../../types";

describe("processEvents", () => {
  test("handles non-overlapping events", () => {
    const events: RawEvent[] = [
      { id: 1, start: "9:00", duration: 30 },
      { id: 2, start: "10:00", duration: 30 },
    ];

    const result = processEvents(events);

    expect(result[0].width).toBe(100);
    expect(result[1].width).toBe(100);
  });

  test("handles two overlapping events", () => {
    const events: RawEvent[] = [
      { id: 1, start: "9:00", duration: 60 },
      { id: 2, start: "9:30", duration: 60 },
    ];

    const result = processEvents(events);

    expect(result[0].width).toBe(50);
    expect(result[1].width).toBe(50);

    // Events should be in adjacent columns
    expect(result[0].column).toBe(0);
    expect(result[1].column).toBe(1);
  });

  test("handles three overlapping events", () => {
    const events: RawEvent[] = [
      { id: 1, start: "9:00", duration: 60 },
      { id: 2, start: "9:15", duration: 60 },
      { id: 3, start: "9:30", duration: 60 },
    ];

    const result = processEvents(events);

    expect(result[0].width).toBeCloseTo(33.33, 1);
    expect(result[1].width).toBeCloseTo(33.33, 1);
    expect(result[2].width).toBeCloseTo(33.33, 1);

    expect(result[0].column).toBe(0);
    expect(result[1].column).toBe(1);
    expect(result[2].column).toBe(2);
  });

  test("handles chain of overlapping events", () => {
    const events: RawEvent[] = [
      { id: 1, start: "9:00", duration: 60 }, // 9:00-10:00
      { id: 2, start: "9:45", duration: 60 }, // 9:45-10:45
      { id: 3, start: "10:30", duration: 60 }, // 10:30-11:30
    ];

    const result = processEvents(events);

    // Event 1 overlaps with 2, 2 overlaps with 3, but 1 doesn't overlap with 3
    // 1 and 2 should have the same width, and 2 and 3 should have the same width
    expect(result[0].width).toBe(50);
    expect(result[1].width).toBe(50);
    expect(result[2].width).toBe(50);
  });
});
