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
			<header className="navbar sticky-top navbar-expand-lg navbar-light ">
				<NavLink className="navbar-brand" to="/wall">
					<img
						src="/images/icon-left-font-monochrome-white.svg"
						height="45"
						color="red"
						alt="brand"
					/>
				</NavLink>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				{token ? (
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav ">
							<li className=" nav-item active" aria-current="true">
								<NavLink to="/wall">
									<HomeIcon fontSize="large" />
									<p>Home</p>
								</NavLink>
							</li>
							<li className=" nav-item ">
								<NavLink to="/myprofile/">
									<PersonIcon fontSize="large" />
									{profile ? <p>{profile.username}</p> : null}
								</NavLink>
							</li>
							<li className="nav-item">
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
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item">
								<button
									type="button"
									onClick={() => history.push("/login")}
									className="btn btn-warning"
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
