import { deepClone } from "../../../utils/deepClone";
import { shuffle } from "./shuffle";

export function createSudokuBoard() {
	// Generate a solved grid
	// First, generate a single row
	const sudokuValues = [];
	sudokuValues[0] = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
	// Now generate more rows by using this row with an offset
	for (let i = 1; i < 9; i++) {
		const offset = i % 3 === 0 ? 1 : 3; // Rows at i=3 and i=6 should only be offset once

		const seedRow = deepClone(sudokuValues[i - 1]);
		for (let j = 0; j < offset; j++) {
			const temp = seedRow.shift();
			seedRow.push(temp);
		}

		sudokuValues[i] = seedRow;
	}

	// Then we map our values into our actual board
	const sudokuBoard = sudokuValues.map((row, rowIndex) => {
		return row.map((value, columnIndex) => {
			{
				return {
					value,
					x: rowIndex,
					y: columnIndex,
				};
			}
		});
	});

  return sudokuBoard;
}
