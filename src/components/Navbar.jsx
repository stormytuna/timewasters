import "../styles/Navbar.css";
import { Alarm } from "./Alarm";

export function Navbar() {
	return (
		<div className="Navbar d-flex align-items-center justify-content-center p-1">
			<Alarm />
		</div>
	);
}
