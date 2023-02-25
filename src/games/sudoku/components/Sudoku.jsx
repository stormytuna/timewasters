import "../styles/Sudoku.css";
import { useEffect, useState } from "react";
import { createSudokuBoard } from "../utils/create-sudoku-board";
import { SudokuCell } from "./SudokuCell";

export function Sudoku() {
	const [sudokuBoard, setSudokuBoard] = useState([]);

	useEffect(() => {
		setSudokuBoard(createSudokuBoard());
	}, []);

	return (
		<div className="Sudoku m-auto">
			{sudokuBoard.map((row) => {
				return (
					<div className="sudoku-row d-flex justify-content-center">
						{row.map((cell) => {
							return <SudokuCell className="sudoku-cell" {...cell} />;
						})}
					</div>
				);
			})}
		</div>
	);
}
