import {
  applyCommand,
  applyCommandWithAim,
  Command,
  dive,
  diveWithAim,
  getPlannedCourse,
  getPuzzleAnswer,
  Position,
  position,
  PositionWithAim,
  positionWithAim,
} from "./dive";

describe("Dive", () => {
  describe("Outside", () => {
    test("Example 1", () => {
      const plannedCourse = getPlannedCourse("./day-2/example.txt");
      const startingPosition = position(0, 0);
      const finalPosition = dive(startingPosition, plannedCourse);
      const answer = getPuzzleAnswer(finalPosition);
      expect(finalPosition).toStrictEqual(position(15, 10));
      expect(answer).toStrictEqual(150);
    });

    test("Example 2", () => {
      const plannedCourse = getPlannedCourse("./day-2/example.txt");
      const startingPosition = positionWithAim(0, 0);
      const finalPosition = diveWithAim(startingPosition, plannedCourse);
      const answer = getPuzzleAnswer(finalPosition);
      expect(finalPosition).toStrictEqual(positionWithAim(15, 60, 10));
      expect(answer).toStrictEqual(900);
    });

    test("Puzzle 1", () => {
      const plannedCourse = getPlannedCourse("./day-2/input.txt");
      const startingPosition = position();
      const finalPosition = dive(startingPosition, plannedCourse);
      const answer = getPuzzleAnswer(finalPosition);
      expect(finalPosition).toStrictEqual(position(2065, 917));
      expect(answer).toStrictEqual(1893605);
    });

    test("Puzzle 2", () => {
      const plannedCourse = getPlannedCourse("./day-2/input.txt");
      const startingPosition = positionWithAim();
      const finalPosition = diveWithAim(startingPosition, plannedCourse);
      const answer = getPuzzleAnswer(finalPosition);
      expect(finalPosition).toStrictEqual(positionWithAim(2065, 1026990, 917));
      expect(answer).toStrictEqual(2120734350);
    });
  });

  describe("Inside", () => {
    test("getPlannedCourse", () => {
      const plannedCourse = getPlannedCourse("./day-2/example.txt");
      expect(plannedCourse).toStrictEqual([
        ["forward", 5],
        ["down", 5],
        ["forward", 8],
        ["up", 3],
        ["down", 8],
        ["forward", 2],
      ]);
    });

    test.each<[Position, Command, Position]>([
      [position(1, 1), ["forward", 2], position(3, 1)],
      [position(1, 1), ["down", 2], position(1, 3)],
      [position(1, 1), ["up", 2], position(1, -1)],
    ])("applyCommand", (startingPosition, command, expectedPosition) => {
      expect(applyCommand(startingPosition, command)).toStrictEqual(
        expectedPosition
      );
    });

    test.each<[PositionWithAim, Command, PositionWithAim]>([
      [positionWithAim(1, 1, 1), ["forward", 2], positionWithAim(3, 3, 1)],
      [positionWithAim(1, 1, 1), ["down", 2], positionWithAim(1, 1, 3)],
      [positionWithAim(1, 1, 1), ["up", 2], positionWithAim(1, 1, -1)],
    ])("applyCommandWithAim", (startingPosition, command, expectedPosition) => {
      expect(applyCommandWithAim(startingPosition, command)).toStrictEqual(
        expectedPosition
      );
    });
  });
});
