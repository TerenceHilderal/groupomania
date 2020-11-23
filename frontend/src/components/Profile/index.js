import React, { useState, useContext, useEffect } from "react";
import "./Account.scss";
import Alert from "../Alert";
import { handleDelete } from "../../api/users";
import { handleProfile, token } from "../../api/users";
import { withRouter } from "react-router-dom";
import { UserContext } from "../Context";

function Profile({ history }) {
	const [success, setSuccess] = useState(false);

	const { profile, setProfile } = useContext(UserContext);

	const handleDeleteUser = () => {
		handleDelete()
			.then(response => {
				setSuccess(true);
				setTimeout(() => {
					history.push("/");
				}, 5000);
				localStorage.clear();
			})
			.catch(err => setSuccess(false));
	};

	// const profile = useContext(UserContext);
	// const admin = JSON.stringify(profile.isAdmin);

	return (
		<>
			{profile ? (
				<div className="container-fluid">
					{success ? <Alert /> : null}
					<div className="header">
						<div>
							<h1>My profile</h1>
						</div>
						<div className="introduction">
							<h2>Welcome {profile.username}</h2>
							<p>
								You are in your private space , here will be displayed some
								information about you , only those you enter during your
								inscription. * We will not keep information about you without
								your consentment.
							</p>
						</div>
						<div className="informations">
							<h3>Your informations:</h3>
							<ul>
								<li>Email:{profile.email}</li>
								<li>Username:{profile.username} </li>
								<li>Your role in our company :{profile.role} </li>
								<li>
									Advantage administrator : {JSON.stringify(profile.isAdmin)}{" "}
								</li>
							</ul>
						</div>
						v
						<div className="button">
							<button
								type="button"
								onClick={handleDeleteUser}
								className="btn btn-danger"
							>
								Delete my account
							</button>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
}

export default withRouter(Profile);
