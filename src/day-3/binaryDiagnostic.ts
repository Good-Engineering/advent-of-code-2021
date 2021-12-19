import { range, readFile } from "../utils";

type DiagnosticReport = number[][];
type Gamma = number;
type Epsilon = number;

export function getDiagnosticReport(filepath: string): DiagnosticReport {
  const data = readFile(filepath);
  return data.split("\n").map((n) => n.split("").map((n) => parseInt(n)));
}

function getNumberOfBitsForValue(max: number) {
  let bits = 0;
  while (max > 0) {
    bits += 1;
    max >>= 1;
  }
  return bits;
}

export function getNumberOfBits(diagnosticReport: DiagnosticReport): number {
  return diagnosticReport[0].length;
}

export function getGammaAndEpsilon(
  diagnosticReport: DiagnosticReport
): [Gamma, Epsilon] {
  const numberOfBits = getNumberOfBits(diagnosticReport);
  const gamma = Array(numberOfBits).fill(0);
  const epsilon = Array(numberOfBits).fill(0);
  for (let i = 0; i < numberOfBits; i++) {
    [gamma[i], epsilon[i]] =
      diagnosticReport
        .map((numArray) => numArray[i] || -1)
        .reduce((acc, n) => acc + n, 0) >= 0
        ? [1, 0]
        : [0, 1];
  }

  return [renderBinary(gamma), renderBinary(epsilon)];
}

export function renderBinary(binaryArray: number[]) {
  return binaryArray.reduce(
    (acc, bit, index) => acc + bit * 2 ** (binaryArray.length - index - 1),
    0
  );
}

export function getPowerConsumption(gamma: number, epsilon: number) {
  return gamma * epsilon;
}
