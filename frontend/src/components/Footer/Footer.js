import React, { Component } from "react";
import styles from "./Footer.module.scss";
function Footer() {
	return (
		<div>
			<nav className={styles.footer}>
				<a href="#">A propos </a>
				<a href="#">Centre Assistance</a>
				<a href="#">Conditions</a>
				<a href="#">Politiques de confidentialité</a>
				<a href="#">Cookies</a>
				<a href="#">Paramètres</a>
			</nav>
		</div>
	);
}
export default Footer;
