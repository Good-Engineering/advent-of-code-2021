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

function getGammaAndEpsilon(diagnosticReport: number[][]) {
  const numberOfBits = getNumberOfBits(diagnosticReport);
  const gamma = Array(numberOfBits).fill(0);
  const epsilon = Array(numberOfBits).fill(0);
  for (let i = 0; i < numberOfBits; i++) {
    [gamma[i], epsilon[i]] = isBitCommonlyOn(diagnosticReport, i)
      ? [1, 0]
      : [0, 1];
  }
  return { gamma, epsilon };
}

export function renderGammaAndEpsilon(
  diagnosticReport: DiagnosticReport
): [Gamma, Epsilon] {
  const { gamma, epsilon } = getGammaAndEpsilon(diagnosticReport);

  return [renderBinary(gamma), renderBinary(epsilon)];
}

function isBitCommonlyOn(oxygen: number[][], i: number) {
  return (
    oxygen
      .map((numArray) => numArray[i] || -1)
      .reduce((acc, n) => acc + n, 0) >= 0
  );
}

export function getOxygenAndCo2(
  diagnosticReport: DiagnosticReport
): [number, number] {
  let oxygen = diagnosticReport;
  for (let i = 0; oxygen.length > 1; i++) {
    const commonBit = isBitCommonlyOn(oxygen, i) ? 1 : 0;
    oxygen = oxygen.filter((num) => num[i] === commonBit);
  }

  let co2 = diagnosticReport;
  for (let i = 0; co2.length > 1; i++) {
    const uncommonBit = isBitCommonlyOn(co2, i) ? 0 : 1;
    co2 = co2.filter((num) => num[i] === uncommonBit);
  }
  return [renderBinary(oxygen[0]), renderBinary(co2[0])];
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

export function getLifeSupport(oxygen: number, co2: number) {
  return oxygen * co2;
}
