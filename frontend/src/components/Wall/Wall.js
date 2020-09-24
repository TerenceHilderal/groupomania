import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import styles from "../Sidebar/Sidebar.module.scss";

export class Wall extends Component {
	render() {
		return (
			<div>
				<div className={styles.sidebar}>
					<Sidebar />
				</div>
			</div>
		);
	}
}

export default Wall;
