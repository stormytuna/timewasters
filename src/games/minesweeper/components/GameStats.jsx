import { formatTime } from "../../../utils/formatTime";

export function GameStats({ minutes, seconds, revealedCells, totalCells, flagsPlaced, totalMines }) {
	return (
		<div className="GameStats d-flex justify-content-around align-items-center p-2">
			<span className="timer">
				Time: <span className="timer-value">{`${formatTime(minutes)}:${formatTime(seconds)}`}</span>
			</span>
			<span className="cells">
				Cells revealed: <span className="cells-value">{`${revealedCells} / ${totalCells}`}</span>
			</span>
			<span className="flags">
				Flags placed: <span className="flags-value">{`${flagsPlaced} / ${totalMines}`}</span>
			</span>
		</div>
	);
}
