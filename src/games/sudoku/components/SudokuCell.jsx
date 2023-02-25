import { useEffect, useState } from "react";

export function SudokuCell({ x, y, value }) {
	const [styles, setStyles] = useState({});
	const [displayedValue, setDisplayedValue] = useState(value);

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

		const newDisplayValue = e.target.value.toString().slice(-1);

		if (newDisplayValue === "0" || !parseInt(newDisplayValue)) {
			return;
		}

		setDisplayedValue(newDisplayValue);
	}

	function handleDelete(e) {
		e.preventDefault();

		if (e.key === "Backspace" || e.key === "Delete") {
			setDisplayedValue("");
		}
	}

	return (
		<div className="SudokuCell" style={styles}>
			<input type="number" onChange={handleInput} onKeyUp={handleDelete} value={displayedValue} />
		</div>
	);
}
