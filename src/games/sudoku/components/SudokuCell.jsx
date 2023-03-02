import { useEffect, useState } from "react";

export function SudokuCell({ x, y, value, disabled, updateCell }) {
  const [styles, setStyles] = useState({});
  const [displayValue, setDisplayValue] = useState(value);

  // Making borders programatically here, not sure how to do it in CSS
  useEffect(() => {
    const newStyles = {};

    // All cells have a border by default
    newStyles.border = "1px solid black";

    // Thicker borders on inside
    if (x === 2 || x === 5) {
      newStyles.borderBottom = "2px solid black";
    }
    if (x === 3 || x === 6) {
      newStyles.borderTop = "2px solid black";
    }
    if (y === 2 || y === 5) {
      newStyles.borderRight = "2px solid black";
    }
    if (y === 3 || y === 6) {
      newStyles.borderLeft = "2px solid black";
    }

    // Remove borders around outside
    if (x === 0) {
      newStyles.borderTop = "none";
    }
    if (x === 8) {
      newStyles.borderBottom = "none";
    }
    if (y === 0) {
      newStyles.borderLeft = "none";
    }
    if (y === 8) {
      newStyles.borderRight = "none";
    }

    setStyles(newStyles);
  }, []);

  function handleInput(e) {
    e.preventDefault();

    // Handle deleting stuff
    if (e.key === "Backspace" || e.key === "Delete") {
      updateCell(x, y, "");
      setDisplayValue("");
      return;
    }

    // Handle changing the number
    const keyPressed = parseInt(e.key);
    if (keyPressed) {
      updateCell(x, y, keyPressed);
      setDisplayValue(keyPressed);
    }
  }

  return (
    <div className="SudokuCell" style={styles} disabled={disabled}>
      <input type="text" onKeyUp={handleInput} value={displayValue} />
    </div>
  );
}
