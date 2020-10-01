import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import "./Sidebar.scss";
import { NavLink } from "react-router-dom";

function Sidebar() {
	return (
		<div className="sidebar">
			<NavLink to="/wall">
				<HomeIcon fontSize="large" />
				<p>Home</p>
			</NavLink>
			<NavLink to="/myprofile">
				<PersonIcon fontSize="large" />
				<p>Profile</p>
			</NavLink>
			<EmailIcon fontSize="large" />
			<p>Email</p>
		</div>
	);
}

export default Sidebar;