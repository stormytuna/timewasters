import "../styles/Sudoku.css";
import { useEffect, useState } from "react";
import { createSudokuBoard } from "../utils/create-sudoku-board";
import { SudokuCell } from "./SudokuCell";
import { deepClone } from "../../../utils/deepClone";
import { GameBar } from "./GameBar";
import JSConfetti from "js-confetti";
import { useStopwatch } from "react-timer-hook";

export function Sudoku() {
	const [sudokuBoard, setSudokuBoard] = useState([]);
	const [answerBoard, setAnswerBoard] = useState([]);
	const [wonGame, setWonGame] = useState(false);
	const { minutes, seconds, isRunning, start, pause, reset } = useStopwatch({ autoStart: false });

	useEffect(() => {
		resetGame();
	}, []);

	useEffect(() => {
		// Check if our sudoku board actually has values
		if (sudokuBoard.length < 9) {
			return;
		}

		// Check if we've won
		const sudokuValues = sudokuBoard.map((row) => row.map((cell) => cell.value));

		let boardsMatch = true;
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				if (sudokuValues[i][j] === "" || sudokuValues[i][j] !== answerBoard[i][j]) {
					boardsMatch = false;
				}
			}
		}

		// If our current board matches the answer board, we've won the game
		if (boardsMatch && !wonGame) {
			// Disable ALL of our cells
			let newSudokuBoard = deepClone(sudokuBoard);
			newSudokuBoard = newSudokuBoard.map((row) =>
				row.map((cell) => {
					const newCell = deepClone(cell);
					newCell.disabled = true;
					return newCell;
				})
			);
			setSudokuBoard(newSudokuBoard);

			// Confetti
			const confetti = new JSConfetti();
			confetti.addConfetti();

			// Pause our timer
			pause();

			// Set wonGame
			setWonGame(true);
		}
	}, [sudokuBoard]);

	function updateCell(row, column, newValue) {
		const newSudokuBoard = deepClone(sudokuBoard);
		if (!newSudokuBoard[row][column].disabled) {
			newSudokuBoard[row][column].value = newValue;
		}
		setSudokuBoard(newSudokuBoard);
	}

	function resetGame() {
		const [newSudokuBoard, newAnswerBoard] = createSudokuBoard();
		setSudokuBoard(newSudokuBoard);
		setAnswerBoard(newAnswerBoard);

		// Reset timer
		reset();
		pause();
	}

	function startStopwatch() {
		if (!isRunning) {
			start();
			reset();
		}
	}

	return (
		<div className="Sudoku m-auto p-4">
			<GameBar minutes={minutes} seconds={seconds} resetGame={resetGame} />
			{sudokuBoard.map((row) => {
				return (
					<div className="sudoku-row d-flex justify-content-center">
						{row.map((cell) => {
							return <SudokuCell className="sudoku-cell" {...cell} updateCell={updateCell} startStopwatch={startStopwatch} />;
						})}
					</div>
				);
			})}
		</div>
	);
}
