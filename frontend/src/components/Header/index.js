import React from "react";
import "./Header.scss";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import { NavLink } from "react-router-dom";

function Header() {
	const handleLogout = () => {
		localStorage.clear();
		window.location = "/";
	};
	const myProfile = JSON.parse(localStorage.getItem("profile"));

	return (
		<header className="navbar navbar-expand-lg navbar-light">
			<a className="navbar" href="/">
				<img
					src="/images/icon-left-font-monochrome-white.svg"
					height="45"
					backgroundColor="red"
				/>
			</a>
			"
			<button className="navbar-toggler">
				<span className="navbar-toggler-icon"></span>
			</button>
			{myProfile ? (
				<div className="collapse navbar-collapse">
					<ul className="navbar-nav ml-auto">
						<li>
							<NavLink to="/wall">
								<HomeIcon fontSize="large" />
								<p>Home</p>
							</NavLink>
						</li>
						<li>
							<NavLink to="/myprofile/">
								<PersonIcon fontSize="large" />
								{myProfile ? <p>{myProfile.username}</p> : null}
							</NavLink>
						</li>
						<li>
							<button
								type="button"
								onClick={handleLogout}
								class="btn btn-warning"
							>
								Logout
							</button>
						</li>
					</ul>
				</div>
			) : (
				<button type="button" class="btn btn-success">
					Login
				</button>
			)}
		</header>
	);
}
export default Header;
