import { timeToMinutes } from "../timeUtils";

describe("timeUtils", () => {
  test("converts time to minutes from 9:00am", () => {
    expect(timeToMinutes("9:00")).toBe(0);
    expect(timeToMinutes("9:30")).toBe(30);
    expect(timeToMinutes("10:15")).toBe(75);
    expect(timeToMinutes("12:00")).toBe(180);
  });
});
