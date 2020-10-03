import React from "react";
import "./Header.scss";
function Header() {
	const handleLogout = () => {
		localStorage.clear();
		window.location = "/";
	};
	return (
		<header className="navbar navbar-expand-lg navbar-light">
			<a href="/">Groupomania</a>
			<button className="navbar-toggler">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse">
				<ul className="navbar-nav ml-auto">
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
