import React, { useState, useContext, useEffect } from "react";
import "../SignUp/SignUp.scss";
import { handleLogin } from "../../api/users";
import { withRouter, NavLink } from "react-router-dom";
import { UserContext } from "../Context";

const LogIn = ({ history }) => {
	const [login, setLogin] = useState({ email: "", password: "" });
	const { profile, setProfile } = useContext(UserContext);

	const submitHandler = e => {
		e.preventDefault();
		handleLogin(login)
			.then(res => {
				localStorage.setItem("token", res.data.token);
				// const profile = res.data.user;
				setProfile(res.data.user);
				history.push("/myprofile");
				// window.location = "/myprofile/";
			})
			.catch(error => {
				document.getElementById("emailHelp").innerHTML =
					"Your email or password is incorrect , please try again";
			});
	};
	// localStorage.setItem("profile", JSON.stringify(profile));

	console.log(profile);
	console.log(history);
	return (
		<div className="containerSignup">
			<form className="signUp" onSubmit={submitHandler}>
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
				</div>{" "}
				<h2 id="emailHelp" className="form-text"></h2>
				<button type="submit" className="btn btn-danger">
					Submit
				</button>
				<p>Don't already have an account?</p>
				<NavLink to="/"> Click here</NavLink>
			</form>
		</div>
	);
};

export default withRouter(LogIn);
