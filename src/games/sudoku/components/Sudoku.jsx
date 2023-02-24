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
      {sudokuBoard.map((row, index) => {
        return (
          <div key={`sudoku-row-${index}`} className="sudoku-row d-flex justify-content-center">
            {row.map((cell) => {
              return <SudokuCell key={`sudoku-cell-${cell.x}-${cell.y}`} />;
            })}
          </div>
        );
      })}
    </div>
  );
}
