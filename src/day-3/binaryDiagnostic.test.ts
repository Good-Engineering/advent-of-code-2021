import {
  getDiagnosticReport,
  getGammaAndEpsilon,
  getNumberOfBits,
  getPowerConsumption,
} from "./binaryDiagnostic";

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
        [0, 0, 1, 0, 0],
        [1, 1, 1, 1, 0],
        [1, 0, 1, 1, 0],
        [1, 0, 1, 1, 1],
        [1, 0, 1, 0, 1],
        [0, 1, 1, 1, 1],
        [0, 0, 1, 1, 1],
        [1, 1, 1, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 0, 0, 1],
        [0, 0, 0, 1, 0],
        [0, 1, 0, 1, 0],
      ]);
    });

    test.each([
      [getDiagnosticReport("./day-3/example.txt"), [0b10110, 0b01001]],
    ])("getGammaAndEpsilon", (report, gammaAndEpsilon) => {
      expect(getGammaAndEpsilon(report)).toStrictEqual(gammaAndEpsilon);
    });

    test.each([
      [
        [
          [0, 0],
          [0, 1],
          [1, 0],
        ],
        2,
      ],
      [
        [
          [0, 0, 0],
          [0, 0, 1],
          [1, 0, 0],
        ],
        3,
      ],
      [getDiagnosticReport("./day-3/example.txt"), 5],
    ])("getNumberOfBits", (report, numberOfBits) => {
      expect(getNumberOfBits(report)).toBe(numberOfBits);
    });
  });
});
