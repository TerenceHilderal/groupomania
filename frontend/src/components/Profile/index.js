import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./Account.scss";
import Alert from "../Alert";
import UserContext from "../Context";

function Profile() {
	const [success, setSuccess] = useState(false);
	// requête delete pour pouvoir supprimer son profil
	const handleDeleteUser = () => {
		// const header = (axios.defaults.headers.common["Authorization"] = token);
		axios
			.delete("http://localhost:3000/api/users/delete")
			.then(response => {
				setSuccess(true);
				setTimeout(() => {
					window.location = "/";
				}, 5000);
				localStorage.clear();
			})
			.catch(err => setSuccess(false));
	};
	const profile = useContext(UserContext);
	const admin = JSON.stringify(profile.isAdmin);

	return (
		<div className="container-fluid">
			<div className="header">
				{success ? <Alert /> : null}
				<div>
					<h1>My profile</h1>
				</div>
				<div className="introduction">
					<h2>Welcome {profile.username}</h2>
					<p>
						You are in your private space , here will be displayed some
						information about you , only those you enter during your
						inscription. * We will not keep information about you without your
						consentment.
					</p>
				</div>
				<div className="informations">
					<h3>Your informations:</h3>
					<ul>
						<li>Email:{profile.email}</li>
						<li>Username:{profile.username} </li>
						<li>Your role in our company :{profile.role} </li>
						<li>Advantage administrator : {admin} </li>
					</ul>
				</div>
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
	);
}

export default Profile;
