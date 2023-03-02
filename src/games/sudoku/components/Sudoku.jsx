import "../styles/Sudoku.css";
import { useEffect, useState } from "react";
import { createSudokuBoard } from "../utils/create-sudoku-board";
import { SudokuCell } from "./SudokuCell";
import { deepClone } from "../../../utils/deepClone";

export function Sudoku() {
  const [sudokuBoard, setSudokuBoard] = useState([]);
  const [answerBoard, setAnswerBoard] = useState([]);

  useEffect(() => {
    const [newSudokuBoard, newAnswerBoard] = createSudokuBoard();
    setSudokuBoard(newSudokuBoard);
    setAnswerBoard(newAnswerBoard);
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
          console.log(`Error: ${sudokuValues[i][j]} is not ${answerBoard[i][j]}`);
        }
      }
    }

    if (boardsMatch) {
      console.log("Victory!!");
    }
  }, [sudokuBoard]);

  function updateCell(row, column, newValue) {
    setSudokuBoard((curSudokuBoard) => {
      const newSudokuBoard = deepClone(curSudokuBoard);
      if (!newSudokuBoard[row][column].disabled) {
        newSudokuBoard[row][column].value = newValue;
      }
    });
  }

  return (
    <div className="Sudoku m-auto">
      {sudokuBoard.map((row) => {
        return (
          <div className="sudoku-row d-flex justify-content-center">
            {row.map((cell) => {
              return <SudokuCell className="sudoku-cell" {...cell} updateCell={updateCell} />;
            })}
          </div>
        );
      })}
    </div>
  );
}
