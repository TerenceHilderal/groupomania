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
	return (
		<header className="navbar navbar-expand-lg navbar-light">
			<a className="navbar" href="/">
				Groupomania
			</a>
			<button className="navbar-toggler">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse">
				<ul className="navbar-nav ml-auto">
					<li>
						<NavLink to="/wall">
							<HomeIcon fontSize="large" />
							<p>Home</p>
						</NavLink>
					</li>
					<li>
						<NavLink to="/myprofile/:id">
							<PersonIcon fontSize="large" />
							<p>Profile</p>
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
		</header>
	);
}
export default Header;
