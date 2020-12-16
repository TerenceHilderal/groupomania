import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.scss";
function Footer() {
	return (
		<footer className=" footer">
			<NavLink to="#">About </NavLink>
			<NavLink to="#">Conditions</NavLink>
			<NavLink to="#">Privacy policies</NavLink>
			<NavLink to="#">Settings</NavLink>
		</footer>
	);
}
export default Footer;
