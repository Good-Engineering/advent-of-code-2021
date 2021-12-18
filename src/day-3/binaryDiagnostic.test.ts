import { range, readFile } from "../utils";

type DiagnosticReport = number[];
type Gamma = number;
type Epsilon = number;

function getDiagnosticReport(filepath: string): DiagnosticReport {
  const data = readFile(filepath);
  return data.split("\n").map((n) => parseInt(n, 2));
}

function getNumberOfBitsForValue(max: number) {
  let bits = 0;
  while (max > 0) {
    bits += 1;
    max >>= 1;
  }
  return bits;
}

function getNumberOfBits(diagnosticReport: DiagnosticReport): number {
  let max = Math.max(...diagnosticReport);
  return getNumberOfBitsForValue(max);
}

function getGammaAndEpsilon(
  diagnosticReport: DiagnosticReport
): [Gamma, Epsilon] {
  const numberOfBits = getNumberOfBits(diagnosticReport);
  return [...range(numberOfBits)]
    .map((n) =>
      diagnosticReport
        .map((d) => d >> (n - 1))
        .map((n) => n % 2)
        .reduce((acc, curr) => (curr ? acc + 1 : acc - 1), 0) > 0
        ? [0b1, 0b0]
        : [0b0, 0b1]
    )
    .reduce<[number, number]>(
      (acc, bits, index) => [
        acc[0] + bits[0] * 2 ** index,
        acc[1] + bits[1] * 2 ** index,
      ],
      [0, 0]
    );
}

function getPowerConsumption(gamma: number, epsilon: number) {
  return gamma * epsilon;
}

describe("Binary Diagnostic", () => {
  describe("Outside", () => {
    test("Example 1", () => {
      const diagnosticReport = getDiagnosticReport("./day-3/example.txt");
      const [gamma, epsilon] = getGammaAndEpsilon(diagnosticReport);
      expect(getPowerConsumption(gamma, epsilon)).toBe(198);
    });

    test("Puzzle 1", () => {
      const diagnosticReport = getDiagnosticReport("./day-3/input.txt");
      const [gamma, epsilon] = getGammaAndEpsilon(diagnosticReport);
      expect(getPowerConsumption(gamma, epsilon)).toBe(4139586);
    });
  });

  describe("Inside", () => {
    test("getDiagnosticReport", () => {
      expect(getDiagnosticReport("./day-3/example.txt")).toStrictEqual([
        0b00100, 0b11110, 0b10110, 0b10111, 0b10101, 0b01111, 0b00111, 0b11100,
        0b10000, 0b11001, 0b00010, 0b01010,
      ]);
    });

    test.each([
      [
        [0b0, 0b1, 0b1],
        [0b1, 0b0],
      ],
      [
        [0b0, 0b0, 0b1],
        [0b0, 0b1],
      ],
      [getDiagnosticReport("./day-3/example.txt"), [0b10110, 0b01001]],
    ])("getGammaAndEpsilon", (report, gammaAndEpsilon) => {
      expect(getGammaAndEpsilon(report)).toStrictEqual(gammaAndEpsilon);
    });

    test.each([
      [[0b0, 0b01, 0b10], 2],
      [[0b0, 0b0001, 0b100], 3],
      [getDiagnosticReport("./day-3/example.txt"), 5],
    ])("getNumberOfBits", (report, numberOfBits) => {
      expect(getNumberOfBits(report)).toBe(numberOfBits);
    });
  });
});
