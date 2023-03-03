import { Button } from "react-bootstrap";

export function GameBar({ resetGame }) {
	return (
		<div className="GameBar d-flex justify-content-center align-items-center p-3">
			<Button className="m-1" variant="outline-primary" onClick={resetGame}>
				Reset
			</Button>
		</div>
	);
}
