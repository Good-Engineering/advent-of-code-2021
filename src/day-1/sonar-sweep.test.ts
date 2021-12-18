import { readFile } from "../utils";

const getReadingsFrom = (filename: string): number[] => {
  const data = readFile(filename);
  return data.split("\n").map((s) => parseInt(s, 10));
};

function sonarSweep(readings: number[]): number {
  return readings
    .slice(1)
    .map((reading, index) => reading - readings[index])
    .reduce((acc, delta) => (delta > 0 ? acc + 1 : acc), 0);
}

function slidingWindows(readings: number[]): number[] {
  const windowSize = 2;
  return readings.slice(windowSize).map((reading, index) => {
    const originalIndex = index + windowSize;
    return reading + readings[originalIndex - 1] + readings[originalIndex - 2];
  });
}

describe("Day 1", () => {
  test("Full Example", () => {
    const readings = getReadingsFrom("./day-1/input.txt");
    expect(sonarSweep(readings)).toBe(1665);
  });

  describe("Sonar Sweep", () => {
    test.each([
      [[], 0],
      [[1], 0],
      [[1, 2], 1],
      [[1, 2, 3], 2],
      [[1, 1], 0],
      [[1, 2, 1], 1],
      [[1, 2, 3, 2, 1, 2], 3],
      [[1, 1, 1, 1, 1, 1], 0],
    ])("it should work", (input, expected) => {
      expect(sonarSweep(input)).toBe(expected);
    });
  });

  test("getReadingsFrom", () => {
    const readings = getReadingsFrom("./day-1/test-input.txt");
    expect(readings).toStrictEqual([1, 2, 3]);
  });

  test.each([
    [
      [1, 2, 3, 4, 5],
      [6, 9, 12],
    ],
  ])("slidingWindows", (input, expected) => {
    expect(slidingWindows(input)).toStrictEqual(expected);
  });

  test("Full Sliding Windows Example", () => {
    const readings = getReadingsFrom("./day-1/input.txt");
    const sliding = slidingWindows(readings);
    expect(sonarSweep(sliding)).toBe(1702);
  });
});
