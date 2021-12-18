import { readFile } from "../utils";

export type Position = [number, number];
export type PositionWithAim = [number, number, number];
export type Instruction = "forward" | "down" | "up";
export type Command = [Instruction, number];
export type PlannedCourse = Command[];

export const position = (
  horizontalPosition: number = 0,
  depth: number = 0
): Position => [horizontalPosition, depth];

export const positionWithAim = (
  horizontalPosition: number = 0,
  depth: number = 0,
  aim: number = 0
): PositionWithAim => [horizontalPosition, depth, aim];

export const getPlannedCourse = (inputFile: string): PlannedCourse => {
  const input = readFile(inputFile);

  return input
    .split("\n")
    .map((line) => line.split(" "))
    .map((line) => [line[0] as Instruction, parseInt(line[1])]);
};

export const getPuzzleAnswer = (
  finalPosition: Position | PositionWithAim
): number => finalPosition[0] * finalPosition[1];

export function dive(
  startingPosition: Position,
  plannedCourse: PlannedCourse
): Position {
  return plannedCourse.reduce(applyCommand, startingPosition);
}

export function diveWithAim(
  startingPosition: PositionWithAim,
  plannedCourse: PlannedCourse
): PositionWithAim {
  return plannedCourse.reduce(applyCommandWithAim, startingPosition);
}

export function applyCommand(
  startingPosition: Position,
  command: Command
): Position {
  const displacement = getDisplacement(command);
  return position(
    startingPosition[0] + displacement[0],
    startingPosition[1] + displacement[1]
  );
}

export function applyCommandWithAim(
  startingPosition: PositionWithAim,
  command: Command
): PositionWithAim {
  const [horizontal, depth, aim] = startingPosition;
  const [instruction, distance] = command;

  switch (instruction) {
    case "down":
      return positionWithAim(horizontal, depth, aim + distance);
    case "up":
      return positionWithAim(horizontal, depth, aim - distance);
    case "forward":
      return positionWithAim(
        horizontal + distance,
        depth + aim * distance,
        aim
      );
  }
  return positionWithAim();
}

const getDisplacement = (command: Command): [number, number] => {
  const [instruction, distance] = command;
  switch (instruction) {
    case "forward":
      return [distance, 0];
    case "down":
      return [0, distance];
    case "up":
      return [0, -distance];
  }
};
