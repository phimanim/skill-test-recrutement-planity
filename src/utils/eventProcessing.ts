import { RawEvent, LayoutProcessedEvent } from "../types";
import { timeToMinutes } from "./timeUtils";

// Returns true if events overlap in time
function doEventsOverlap(a: LayoutProcessedEvent, b: LayoutProcessedEvent) {
  return a.startMinutes < b.endMinutes && b.startMinutes < a.endMinutes;
}

export function processEvents(events: RawEvent[]): LayoutProcessedEvent[] {
  if (!events?.length) return [];

  // Convert times to minutes and add layout properties
  let processed = events.map((evt) => ({
    ...evt,
    startMinutes: timeToMinutes(evt.start),
    endMinutes: timeToMinutes(evt.start) + evt.duration,
    width: 100,
    left: 0,
    column: 0,
  }));

  // Sort by start time and duration
  processed.sort((a, b) => {
    if (a.startMinutes !== b.startMinutes) {
      return a.startMinutes - b.startMinutes;
    }
    return a.duration - b.duration;
  });

  // Keep track of last event in each column to find where to put new events
  let columnLastEvents: LayoutProcessedEvent[] = [];

  // Find a column for each event
  processed.forEach((evt) => {
    let col = 0;
    while (col < columnLastEvents.length) {
      if (!doEventsOverlap(columnLastEvents[col], evt)) {
        break;
      }
      col++;
    }

    evt.column = col;
    columnLastEvents[col] = evt;

    // Update widths of all overlapping events
    let overlapping = processed.filter(
      (other) =>
        other.startMinutes <= evt.endMinutes &&
        other.endMinutes >= evt.startMinutes
    );

    // Get max column number among overlapping events
    let maxCol = Math.max(...overlapping.map((e) => e.column));

    // Update all overlapping events
    let colWidth = 100 / (maxCol + 1);
    overlapping.forEach((e) => {
      e.width = colWidth;
      e.left = e.column * colWidth;
    });
  });

  return processed;
}
