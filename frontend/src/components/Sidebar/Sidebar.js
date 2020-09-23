import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import styles from "./Sidebar.module.scss";

function Sidebar() {
	return (
		<div className={styles.sidebar}>
			<HomeIcon fontSize="large" />
			<p>Home</p>
			<PersonIcon fontSize="large" />
			<p>Profile</p>
			<EmailIcon fontSize="large" />
			<p>Email</p>
		</div>
	);
}

export default Sidebar;
