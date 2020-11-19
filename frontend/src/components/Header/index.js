import React, { useContext, useEffect } from "react";
import "./Header.scss";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import { NavLink, withRouter } from "react-router-dom";
import { UserContext } from "../Context";

function Header({ history }) {
	const handleLogout = () => {
		localStorage.clear();
		// window.location = "/";
		history.push("/");
	};

	const { profile } = useContext(UserContext);
	// console.log(profile);

	const token = localStorage.getItem("token");

	return (
		<header className="navbar navbar-expand-lg navbar-light">
			<img
				src="/images/icon-left-font-monochrome-white.svg"
				height="45"
				color="red"
			/>
			<button className="navbar-toggler">
				<span className="navbar-toggler-icon"></span>
			</button>
			{token ? (
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
								{profile ? <p>{profile.username}</p> : null}
							</NavLink>
						</li>
						<li>
							<button
								type="button"
								onClick={handleLogout}
								className="btn btn-warning"
							>
								Logout
							</button>
						</li>
					</ul>
				</div>
			) : (
				<div className="collapse navbar-collapse">
					<ul className="navbar-nav ml-auto">
						<button
							type="button"
							className="btn btn-success"
							onClick={() => history.push("/login")}
						>
							Login
						</button>
					</ul>
				</div>
			)}
		</header>
	);
}
export default withRouter(Header);
