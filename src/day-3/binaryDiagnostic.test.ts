import {
  getDiagnosticReport,
  renderGammaAndEpsilon,
  getLifeSupport,
  getNumberOfBits,
  getOxygenAndCo2,
  getPowerConsumption,
} from "./binaryDiagnostic";

describe("Binary Diagnostic", () => {
  describe("Outside", () => {
    test("Example 1", () => {
      const diagnosticReport = getDiagnosticReport("./day-3/example.txt");
      const [gamma, epsilon] = renderGammaAndEpsilon(diagnosticReport);
      expect(getPowerConsumption(gamma, epsilon)).toBe(198);
    });

    test("Example 2", () => {
      const diagnosticReport = getDiagnosticReport("./day-3/example.txt");
      const [oxygen, co2] = getOxygenAndCo2(diagnosticReport);
      expect([oxygen, co2]).toStrictEqual([0b10111, 0b01010]);
      expect(getLifeSupport(oxygen, co2)).toBe(230);
    });

    test("Puzzle 1", () => {
      const diagnosticReport = getDiagnosticReport("./day-3/input.txt");
      const [gamma, epsilon] = renderGammaAndEpsilon(diagnosticReport);
      expect(getPowerConsumption(gamma, epsilon)).toBe(4139586);
    });

    test("Puzzle 2", () => {
      const diagnosticReport = getDiagnosticReport("./day-3/input.txt");
      const [oxygen, co2] = getOxygenAndCo2(diagnosticReport);
      expect(getLifeSupport(oxygen, co2)).toBe(1800151);
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
    ])("renderGammaAndEpsilon", (report, gammaAndEpsilon) => {
      expect(renderGammaAndEpsilon(report)).toStrictEqual(gammaAndEpsilon);
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
