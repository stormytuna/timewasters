import { Button } from "react-bootstrap";
import { formatTime } from "../../../utils/formatTime";

export function GameBar({ minutes, seconds, resetGame }) {
	return (
		<div className="GameBar d-flex justify-content-center align-items-center p-3">
			<span className="timer m-1">
				Time: <span className="timer-value">{`${formatTime(minutes)}:${formatTime(seconds)}`}</span>
			</span>
			<Button className="m-1" variant="outline-primary" onClick={resetGame}>
				Reset
			</Button>
		</div>
	);
}
