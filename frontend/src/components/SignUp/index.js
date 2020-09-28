import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import styles from "./SignUp.scss";

function SignUp() {
	const [signUp, setSignUp] = useState({
		email: "",
		password: "",
		username: "",
		role: ""
	});
	const submitHandler = e => {
		e.preventDefault();
		axios
			.post("http://localhost:3000/api/users/signup", signUp)
			.then(res => {
				console.log(res);
			})
			.catch(error => {
				console.log(error);
			});
	};
	if (signUp.username === null) {
		console.log("connexion impossible");
	}

	return (
		<div className={styles.containerSignup}>
			<form onSubmit={submitHandler}>
				<div className="form-group">
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						className="form-control"
						name="email"
						id="email"
						value={signUp.email}
						onChange={e => setSignUp({ ...signUp, email: e.target.value })}
						aria-describedby="emailHelp"
						placeholder="Enter email"
					/>
					<small id="emailHelp" className="form-text text-muted">
						We'll never share your email with anyone else.
					</small>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						className="form-control"
						name="password"
						id="password"
						value={signUp.password}
						onChange={e => setSignUp({ ...signUp, password: e.target.value })}
						placeholder="Password"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						className="form-control"
						name="username"
						id="username"
						value={signUp.username}
						onChange={e => setSignUp({ ...signUp, username: e.target.value })}
						placeholder="username"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="role">Your role</label>
					<input
						type="textt"
						className="form-control"
						name="role"
						id="role"
						value={signUp.role}
						onChange={e => setSignUp({ ...signUp, role: e.target.value })}
						placeholder="CEO,Developer..."
					/>
				</div>
				<button type="submit" className="btn btn-danger">
					Sign-up
				</button>
				<p>Already have an account?</p>
				<NavLink to="/login"> Click here</NavLink>
			</form>
		</div>
	);
}

export default SignUp;
