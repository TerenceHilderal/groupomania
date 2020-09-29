import React, { useState } from "react";
import styles from "./Account.scss";
import axios from "axios";
import { withRouter } from "react-router-dom";

import Sidebar from "../Sidebar";

// requête get pour recupérer les informations du profile

// requête put pour pouvoir modifier les informations

// requête get pour pouvoir récuperer tout ses posts

function Account({ match }) {
	console.log(match);
	const idUser = match.params.id;
	console.log(idUser);
	// recup des données du profil pour les afficher
	const myProfile = JSON.parse(localStorage.getItem("profile"));
	// récupérer le token pour l'authentification car toutes les requêtes necessite une authentification
	const token = localStorage.getItem("token");
	// requête delete pour pouvoir supprimer son profil
	const handleDeleteUser = () => {
		const header = (axios.defaults.headers.common["Authorization"] = token);
		axios
			.delete("http://localhost:3000/api/users/delete")
			.then(response => {
				localStorage.clear();
				alert("Votre compte a été supprimé");
				console.log(response);
				window.location = "/";
			})
			.catch(err => console.log({ err }));
	};

	const handleModification = () => {
		const header = (axios.defaults.headers.common["Authorization"] = token);
		axios
			.put("http://localhost:3000/api/users/update")
			.then(response => {
				console.log(response);
			})
			.catch(err => console.log({ err }));
	};

	return (
		<div className="container-fluid">
			<Sidebar />
			<div className={styles.profile}>
				<div>
					<h1>My profile</h1>
				</div>
				<div>
					<h2>Welcome {myProfile.username}</h2>
				</div>
				<div className="introduction">
					<p>
						You are in your private space , here will be displayed some
						information about you , only those you enter during your
						inscription. In your private space , you could do some stuff like :
						modify some information (only your username and your role), and
						delete your account. You can also see , your old posts. * We will
						not keep information about you without your consentment.
					</p>
				</div>
				<div>
					<h3>Your informations:</h3>
					<ul>
						<li>Email:{myProfile.email}</li>
						<li>Username:{myProfile.username} </li>
						<li>Your role in our company :{myProfile.role} </li>
						<li>Advantage administrator : {myProfile.isAdmin}</li>
					</ul>
				</div>
				<div className="button">
					<button
						type="button"
						onClick={handleModification}
						className="btn btn-warning"
					>
						Modify informations about me
					</button>
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

export default withRouter(Account);
