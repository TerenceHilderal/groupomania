import React from "react";
import styles from "./Account.module.scss";

import Sidebar from "../Sidebar/Sidebar";

// requête get pour recupérer les informations du profile

// requête put pour pouvoir modifier les informations

// requête delete pour pouvoir supprimer son profil

// requête get pour pouvoir récuperer tout ses posts

// récupérer le token pour l'authentification car toutes les requêtes necessite une authentification

function Account() {
	return (
		<div className={styles.container}>
			<Sidebar />

			<div className={styles.profile}>
				<div>
					<h1>My profile</h1>
				</div>
				<div>
					<h2>Welcome Username</h2>
				</div>
				<div className={styles.introduction}>
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
						<li>Email: user.email</li>
						<li>Username: user.username</li>
						<li>Your role in our company : user.role</li>
						<li>Advantage administrator : user.isAdmin</li>
					</ul>
				</div>
				<div>
					<button type="button" class="btn btn-warning">
						Modify informations about me
					</button>
					<button type="button" class="btn btn-danger">
						Delete my account
					</button>
				</div>
			</div>
		</div>
	);
}

export default Account;
