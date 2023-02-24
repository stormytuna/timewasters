import "../styles/Navbar.css";
import { Alarm } from "./Alarm";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Navbar() {
	return (
		<div className="Navbar d-flex align-items-center justify-content-between p-1">
			<DropdownButton title="Navigation" id="nav-dropdown">
				<Dropdown.Item>
					<Link to="minesweeper">Minesweeper</Link>
				</Dropdown.Item>
				<Dropdown.Divider />
				<Dropdown.Item>
					<Link to="about">About</Link>
				</Dropdown.Item>
			</DropdownButton>
			<Alarm />
		</div>
	);
}
