import "../styles/Alarm.css";
import { InputGroup, Form, Button } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { toArray } from "../utils/toArray";
import { formatTime } from "../utils/formatTime";

export function Alarm() {
	const [timer, setTimer] = useState({ hours: 0, minutes: 0, seconds: 0 });
	const [timerActive, setTimerActive] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			if (!timerActive) {
				return;
			}

			const newTimer = { ...timer };

			if (newTimer.seconds === 0) {
				if (newTimer.minutes === 0) {
					if (newTimer.hours === 0) {
						setTimerActive(false);

						// Display a notification
						const notification = new Notification("Time wasted!", {
							body: "Thanks for stopping by, now it's time to go continue whatever you were waiting for",
							icon: "favicon.ico",
						});
						setTimeout(() => notification.close(), 10 * 1000);

						document.title = "Timewasters";

						return;
					} else {
						newTimer.hours--;
						newTimer.minutes = 59;
					}
				} else {
					newTimer.minutes--;
					newTimer.seconds = 59;
				}
			} else {
				newTimer.seconds--;
			}

			setTimer(newTimer);
			// Sets our title to "Timewasters (HH:MM:SS)"
			document.title = `Timewasters (${formatTime(timer.hours)}:${formatTime(timer.minutes)}:${formatTime(timer.seconds)})`;
		}, 1000);

		return () => clearInterval(interval);
	});

	function validateInput(e) {
		// Stop us inputting a number more than 3 digits
		if (e.target.value.length >= 3) {
			e.preventDefault();
		}
	}

	function submitStopwatchTime(e) {
		// First get our values
		const children = toArray(e.target.parentNode.childNodes);
		let hours = parseInt(children.find((child) => child.id === "hours").value) || 0;
		let minutes = parseInt(children.find((child) => child.id === "minutes").value) || 0;
		let seconds = parseInt(children.find((child) => child.id === "seconds").value) || 0;

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
		setTimerActive(true);
	}

	function resetStopwatchTime(e) {
		setTimer({ hours: 0, minutes: 0, seconds: 0 });
		setTimerActive(false);
	}

	if (!timerActive) {
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
			<InputGroup className="InputGroup">
				<InputGroup.Text id="alarm-time">
					<img src="icons/stopwatch.svg" />
				</InputGroup.Text>
				<Form.Control id="hours" className="text-center" size="sm" value={formatTime(timer.hours)} disabled aria-label="Stopwatch" aria-describedby="alarm-time" onBeforeInput={validateInput} />
				<Form.Control id="minutes" className="text-center" size="sm" value={formatTime(timer.minutes)} disabled aria-label="Stopwatch" aria-describedby="alarm-time" onBeforeInput={validateInput} />
				<Form.Control id="seconds" className="text-center" size="sm" value={formatTime(timer.seconds)} disabled aria-label="Stopwatch" aria-describedby="alarm-time" onBeforeInput={validateInput} />
				<Button variant="primary" id="button-alarm-time" onClick={resetStopwatchTime}>
					Reset
				</Button>
			</InputGroup>
		</div>
	);
}
