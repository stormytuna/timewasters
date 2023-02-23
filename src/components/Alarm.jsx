import "../styles/Alarm.css";
import { InputGroup, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { toArray } from "../utils/toArray";

export function Alarm() {
	const [timer, setTimer] = useState(null);

	function validateInput(e) {
		// Stop us inputting a number more than 3 digits
		if (e.target.value.length >= 3) {
			e.preventDefault();
		}
	}

	function submitStopwatchTime(e) {
		// First get our values
		const children = toArray(e.target.parentNode.childNodes);
		let hours = children.find((child) => child.id === "hours").value || 0;
		let minutes = children.find((child) => child.id === "minutes").value || 0;
		let seconds = children.find((child) => child.id === "seconds").value || 0;

		// Now we optimise, making our minutes and seconds less than 60
		while (seconds >= 60) {
			seconds -= 60;
			minutes++;
		}
		while (minutes >= 60) {
			minutes -= 60;
			hours++;
		}

		// Now we set our timer object
		setTimer({ hours, minutes, seconds });
	}

	function resetStopwatchTime(e) {
		setTimer(null);
	}

	if (timer === null) {
		return (
			<div className="Alarm">
				<InputGroup className="InputGroup">
					<InputGroup.Text id="set-alarm-time">
						<img src="icons/stopwatch.svg" />
					</InputGroup.Text>
					<Form.Control id="hours" className="text-center" size="sm" type="number" placeholder="H:00" aria-label="Stopwatch" aria-describedby="set-alarm-time" onBeforeInput={validateInput} />
					<Form.Control id="minutes" className="text-center" size="sm" type="number" placeholder="M:00" aria-label="Stopwatch" aria-describedby="set-alarm-time" onBeforeInput={validateInput} />
					<Form.Control id="seconds" className="text-center" size="sm" type="number" placeholder="S:00" aria-label="Stopwatch" aria-describedby="set-alarm-time" onBeforeInput={validateInput} />
					<Button variant="primary" id="button-set-alarm-time" onClick={submitStopwatchTime}>
						Start
					</Button>
				</InputGroup>
			</div>
		);
	}

	return (
		<div className="Alarm">
			<div className="Alarm">
				<InputGroup className="InputGroup">
					<InputGroup.Text id="alarm-time">
						<img src="icons/stopwatch.svg" />
					</InputGroup.Text>
					<Form.Control id="hours" className="text-center fw-bold" size="sm" value={timer.hours} disabled aria-label="Stopwatch" aria-describedby="alarm-time" onBeforeInput={validateInput} />
					<Form.Control id="minutes" className="text-center fw-bold" size="sm" value={timer.minutes} disabled aria-label="Stopwatch" aria-describedby="alarm-time" onBeforeInput={validateInput} />
					<Form.Control id="seconds" className="text-center fw-bold" size="sm" value={timer.seconds} disabled aria-label="Stopwatch" aria-describedby="alarm-time" onBeforeInput={validateInput} />
					<Button variant="primary" id="button-alarm-time" onClick={resetStopwatchTime}>
						Reset
					</Button>
				</InputGroup>
			</div>
		</div>
	);
}
