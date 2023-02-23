export function createBoard(numRows, numColumns, numBombs) {
  const board = [];

  // First, create a blank board, just a jagged array of cell objects
  for (let x = 0; x < numRows; x++) {
    const column = [];

    for (let y = 0; y < numColumns; y++) {
      column.push({
        value: "0",
        revealed: false,
        x: x,
        y: y,
        flagged: false,
      });
    }

    board.push(column);
  }

  // Randomly place our bombs
  const maxBombs = numRows * numColumns * 0.4; // Our board should have a maximum bomb % of 40%
  numBombs = Math.min(numBombs, maxBombs);

  let bombsPlaced = 0;
  while (bombsPlaced < numBombs) {
    const x = randomInteger(0, numRows);
    const y = randomInteger(0, numColumns);
    const cell = board[x][y];

    if (cell.value === "0") {
      cell.value = "X";
      bombsPlaced++;
    }
  }

  // Add our numbers
  for (let row = 0; row < numRows; row++) {
    for (let column = 0; column < numColumns; column++) {
      const cell = board[row][column];

      // Check our cell isn't a bomb
      if (cell.value === "X") {
        continue;
      }

      // Check each space from top left to bottom right
      let adjacentBombs = 0;

      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          // Skip our centre cell
          if (x === 0 && y === 0) {
            continue;
          }

          // Check our cell actually exists
          const rowToCheck = row + x;
          const columnToCheck = column + y;
          if (rowToCheck < 0 || columnToCheck < 0 || rowToCheck >= numRows || columnToCheck >= numColumns) {
            continue;
          }

          const cellToCheck = board[rowToCheck][columnToCheck];

          // Check if it's a bomb
          if (cellToCheck.value === "X") {
            adjacentBombs++;
          }
        }
      }

      // Set this cells value
      cell.value = adjacentBombs.toString();
    }
  }

  return board;
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
