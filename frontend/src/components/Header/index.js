import React, { useContext } from "react";
import "./Header.scss";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import { NavLink, withRouter } from "react-router-dom";
import { UserContext } from "../Context";

const Header = ({ history }) => {
	const { profile, handleAlert } = useContext(UserContext);
	const token = localStorage.getItem("token");

	const handleLogout = () => {
		localStorage.clear();
		history.push("/");
		handleAlert("success", "You Logout is a success");
	};

	return (
		<>
			<header className="navbar sticky-top navbar-expand-lg navbar-light">
				<img
					src="/images/icon-left-font-monochrome-white.svg"
					height="45"
					color="red"
				/>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarTogglerDemo01"
					aria-controls="navbarTogglerDemo01"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
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
			<div className="alert"></div>

			{/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
				<button
					class="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarTogglerDemo01"
					aria-controls="navbarTogglerDemo01"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarTogglerDemo01">
					<a class="navbar-brand" href="#">
						Hidden brand
					</a>
					<ul class="navbar-nav mr-auto mt-2 mt-lg-0">
						<li class="nav-item active">
							<a class="nav-link" href="#">
								Home <span class="sr-only">(current)</span>
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">
								Link
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link disabled" href="#">
								Disabled
							</a>
						</li>
					</ul>
				</div>
			</nav> */}
		</>
	);
};
export default withRouter(Header);
