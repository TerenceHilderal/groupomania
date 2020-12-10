import React, { useContext } from "react";
import "./Header.scss";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import { NavLink, withRouter } from "react-router-dom";
import { UserContext } from "../Context";

const Header = ({ history }) => {
	const { profile, handleAlert, setProfile } = useContext(UserContext);
	const token = localStorage.getItem("token");

	const handleLogout = () => {
		localStorage.clear();
		setProfile(null);
		history.push("/");
		handleAlert("success", "You Logout is a success");
	};

	return (
		<>
			<header class="navbar sticky-top navbar-expand-lg navbar-light ">
				<a class="navbar-brand" href="/wall">
					<img
						src="/images/icon-left-font-monochrome-white.svg"
						height="45"
						color="red"
						alt="brand"
					/>
				</a>
				<button
					class="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				{token ? (
					<div class="collapse navbar-collapse" id="navbarNav">
						<ul class="navbar-nav">
							<li class="nav-item active">
								<NavLink to="/wall">
									<HomeIcon fontSize="large" />
									<p>Home</p>
								</NavLink>
							</li>
							<li class="nav-item">
								<NavLink to="/myprofile/">
									<PersonIcon fontSize="large" />
									{profile ? <p>{profile.username}</p> : null}
								</NavLink>
							</li>
							<li class="nav-item">
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
					<div class="collapse navbar-collapse" id="navbarNav">
						<ul class="navbar-nav">
							<li class="nav-item">
								<button
									type="button"
									onClick={() => history.push("/login")}
									className="btn btn-success"
								>
									Login
								</button>
							</li>
						</ul>
					</div>
				)}
			</header>
		</>
	);
};
export default withRouter(Header);
