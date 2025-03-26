import { render, screen } from "@testing-library/react";
import { RawEvent } from "../types";
import "@testing-library/jest-dom";

let mockData: RawEvent[] = [
  { id: 1, start: "9:00", duration: 60 },
  { id: 2, start: "10:00", duration: 45 },
];

jest.mock("../data/data.json", () => mockData);

describe("App component", () => {
  test("renders events correctly", () => {
    const App = require("../App").default;
    render(<App />);

    const events = document.querySelectorAll(".event-card");
    expect(events.length).toBe(2);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();

    const firstEvent = events[0] as HTMLElement;
    const secondEvent = events[1] as HTMLElement;
    expect(firstEvent.style.top).toBe("0vh");

    const secondEventTop = parseFloat(secondEvent.style.top);
    expect(secondEventTop).toBeCloseTo(100 / 12, 5);
  });

  test("handles overlapping events", () => {
    mockData = [
      { id: 1, start: "9:00", duration: 60 },
      { id: 2, start: "9:30", duration: 60 },
    ];

    jest.resetModules();
    jest.mock("../data/data.json", () => mockData);

    const App = require("../App").default;
    render(<App />);

    const events = document.querySelectorAll(".event-card");
    expect(events.length).toBe(2);

    const firstEvent = events[0] as HTMLElement;
    const secondEvent = events[1] as HTMLElement;

    expect(firstEvent.style.width).toBe("50%");
    expect(secondEvent.style.width).toBe("50%");
    expect(secondEvent.style.left).toBe("50%");
  });
});
