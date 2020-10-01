import axios from "axios";
import React, { Component, useState } from "react";
import "../SignUp/SignUp.scss";
import { NavLink } from "react-router-dom";

function LogIn() {
	const submitHandler = e => {
		e.preventDefault();
		axios
			.post("http://localhost:3000/api/users/login", login)
			.then(res => {
				localStorage.setItem("token", res.data.token);

				const profile = {
					user_id: res.data.user_id,
					username: res.data.username,
					role: res.data.role,
					email: res.data.email,
					isAdmin: res.data.isAdmin
				};
				const idUser = profile.user_id;
				localStorage.setItem("profile", JSON.stringify(profile));

				const header = (axios.defaults.headers.common["Authorization"] =
					res.data.token);
				console.log(header);

				window.location = "/myprofile/" + idUser;
			})
			.catch(error => {
				console.log({ error });
			});
	};
	const [login, setLogin] = useState({ email: "", password: "" });
	return (
		<div className="containerSignup">
			<form onSubmit={submitHandler}>
				<div className="form-group">
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						className="form-control"
						name="email"
						id="email"
						value={login.email}
						onChange={e => setLogin({ ...login, email: e.target.value })}
						aria-describedby="emailHelp"
						placeholder="Enter email"
					/>
					<small id="emailHelp" className="form-text text-muted">
						We'll never share your email with anyone else.
					</small>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputPassword1">Password</label>
					<input
						type="password"
						className="form-control"
						name="password"
						id="password"
						value={login.password}
						onChange={e => setLogin({ ...login, password: e.target.value })}
						placeholder="Password"
					/>
				</div>
				{/* <NavLink to="/myprofile"> */}
				<button type="submit" class="btn btn-danger">
					Submit
				</button>
				{/* </NavLink> */}
				<p>Don't already have an account?</p>
				<NavLink to="/"> Click here</NavLink>
			</form>
		</div>
	);
}

export default LogIn;
