import React, { Component } from "react";
import { styles } from "./Header.module.scss";

function Header() {
	return (
		<header className="navbar navbar-expand-lg navbar-light">
			<a href="/">Groupomania</a>
			<button className="navbar-toggler">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse">
				<ul className="navbar-nav ml-auto">
					<li></li>
					<li> Login</li>
				</ul>
			</div>
		</header>
	);
}
export default Header;
