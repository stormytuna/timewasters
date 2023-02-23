import { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import { deepClone } from "../../../utils/deepClone";
import { createBoard } from "../utils/create-board";
import { Board } from "./Board";
import { GameOptions } from "./GameOptions";
import { GameStats } from "./GameStats";

export function Minesweeper() {
  const [gameOptions, setGameOptions] = useState({
    rows: 16,
    columns: 16,
    mines: 40,
  });
  const [gameStats, setGameStats] = useState({
    revealedCells: 0,
    totalCells: 216,
    flagsPlaced: 0,
    state: "play",
  });
  const [board, setBoard] = useState([]);
  const { seconds, minutes, reset, start, pause, isRunning } = useStopwatch({ autoStart: false });

  // Reset game
  useEffect(() => {
    resetGame();
  }, [gameOptions]);

  // Check if we've won
  useEffect(() => {
    checkWinCondition();
  }, [gameStats]);

  const resetBoard = () => {
    const newBoard = createBoard(gameOptions.rows, gameOptions.columns, gameOptions.mines);
    setBoard(newBoard);
  };

  const resetGame = () => {
    // Set some gameStats stuff
    const newGameStats = deepClone(gameStats);
    newGameStats.revealedCells = 0;
    newGameStats.totalCells = gameOptions.rows * gameOptions.columns - gameOptions.mines;
    newGameStats.state = "play";
    newGameStats.flagsPlaced = 0;
    setGameStats(newGameStats);

    // Reset our stopwatch
    reset();
    pause();

    // Reset our board
    resetBoard();
  };

  const setGameSize = (numRows, numColumns, numMines) => {
    // Set gameOptions stuff
    const newGameOptions = deepClone(gameOptions);
    newGameOptions.rows = numRows;
    newGameOptions.columns = numColumns;
    newGameOptions.mines = numMines;
    setGameOptions(newGameOptions);
  };

  const checkWinCondition = () => {
    const newGameStats = deepClone(gameStats);
    if (newGameStats.revealedCells === newGameStats.totalCells && newGameStats.flagsPlaced === gameOptions.mines && newGameStats.state === "play") {
      newGameStats.state = "win";
      pause();
      setGameStats(newGameStats);
    }
  };

  const increaseNumRevealed = (numRevealed) => {
    const newGameStats = deepClone(gameStats);
    newGameStats.revealedCells += numRevealed;
    setGameStats(newGameStats);
  };

  const increaseFlagsPlaced = (numFlags) => {
    const newGameStats = deepClone(gameStats);
    newGameStats.flagsPlaced += numFlags;
    setGameStats(newGameStats);
  };

  const loseGame = () => {
    const newGameStats = deepClone(gameStats);
    newGameStats.state = "lose";
    pause();
    setGameStats(newGameStats);
  };

  const startTimer = () => {
    if (!isRunning) {
      start();
      reset();
    }
  };

  return (
    <div className="Minesweeper">
      <GameOptions setGameSize={setGameSize} resetGame={resetGame} />
      <GameStats {...gameStats} seconds={seconds} minutes={minutes} totalMines={gameOptions.mines} />
      <Board
        board={board}
        setBoard={setBoard}
        {...gameOptions}
        gameState={gameStats.state}
        increaseNumRevealed={increaseNumRevealed}
        increaseFlagsPlaced={increaseFlagsPlaced}
        startTimer={startTimer}
        loseGame={loseGame}
      />
    </div>
  );
}
