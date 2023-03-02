import { makepuzzle, solvepuzzle } from "sudoku";

export function createSudokuBoard() {
  // Generate our source grids using the sudoku library
  const puzzle = makepuzzle();
  const solvedPuzzle = solvepuzzle(puzzle);

  // Map them into jagged arrays
  const jaggedPuzzle = [];
  for (let i = 0; i < 9; i++) {
    const row = [];
    for (let j = 0; j < 9; j++) {
      const offset = i * 9;
      const nextIndex = offset + j;
      row.push(puzzle[nextIndex]);
    }
    jaggedPuzzle.push(row);
  }

  const jaggedSolvedPuzzle = [];
  for (let i = 0; i < 9; i++) {
    const row = [];
    for (let j = 0; j < 9; j++) {
      const offset = i * 9;
      const nextIndex = offset + j;
      row.push(solvedPuzzle[nextIndex]);
    }
    jaggedSolvedPuzzle.push(row);
  }

  // Map our them into usable arrays
  const usablePuzzle = jaggedPuzzle.map((row, rowIndex) =>
    row.map((value, columnIndex) => {
      return {
        x: rowIndex,
        y: columnIndex,
        value: value === null ? "" : value + 1,
        disabled: value !== "",
      };
    })
  );

  const usableSolvedPuzzle = jaggedSolvedPuzzle.map((row) => row.map((value) => (value === null ? "" : value + 1)));

  // Return our puzzle and our answer
  return [usablePuzzle, usableSolvedPuzzle];
}
