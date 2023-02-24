import "../styles/Cell.css";
import { useEffect, useState } from "react";

export function Cell({ value, revealed, flagged, x, y, toggleFlag, revealCell, gameState, numRows, numColumns }) {
	const [isHovering, setIsHovering] = useState(false);
	const [image, setImage] = useState("");

	useEffect(() => {
		// 3 cases: unrevealed, unrevealed and flagged, revealed,
		if (!revealed && flagged) {
			setImage(isHovering ? "images/minesweeper/flagged-hover.png" : "images/minesweeper/flagged.png");
		} else if (!revealed) {
			setImage(isHovering ? "images/minesweeper/unrevealed-hover.png" : "images/minesweeper/unrevealed.png");
		} else {
			switch (value) {
				case "X":
					setImage("images/minesweeper/mine.png");
					break;
				case "0":
					setImage("images/minesweeper/revealed.png");
					break;
				case "1":
					setImage("images/minesweeper/one.png");
					break;
				case "2":
					setImage("images/minesweeper/two.png");
					break;
				case "3":
					setImage("images/minesweeper/three.png");
					break;
				case "4":
					setImage("images/minesweeper/four.png");
					break;
				case "5":
					setImage("images/minesweeper/five.png");
					break;
				case "6":
					setImage("images/minesweeper/six.png");
					break;
				case "7":
					setImage("images/minesweeper/seven.png");
					break;
				case "8":
					setImage("images/minesweeper/eight.png");
					break;
			}
		}
	}, [revealed, flagged, isHovering]);

	return (
		<div
			className="Cell"
			onClick={() => gameState === "play" && revealCell(x, y)}
			onContextMenu={(e) => gameState === "play" && toggleFlag(e, x, y)}
			onMouseEnter={() => gameState === "play" && setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			<img src={image} onDragStart={(e) => e.preventDefault()} />
		</div>
	);
}
