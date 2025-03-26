export interface RawEvent {
  id: number;
  start: string; // Format: "HH:mm" in 24-hour time
  duration: number; // Minutes
}

export interface TimeProcessedEvent extends RawEvent {
  startMinutes: number; // Time converted to minutes from 9:00am
  endMinutes: number; // End time in minutes from 9:00am
}

export interface LayoutProcessedEvent extends TimeProcessedEvent {
  column: number;
  width: number; // Percentage
  left: number; // Percentage
}
