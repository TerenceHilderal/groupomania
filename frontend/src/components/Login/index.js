import React, { useState, useContext, useEffect } from "react";
import "../SignUp/SignUp.scss";
import { handleLogin } from "../../api/users";
import { NavLink, Redirect, Link } from "react-router-dom";
import { UserContext } from "../Context";

const LogIn = () => {
	const [login, setLogin] = useState({ email: "", password: "" });
	const { profile, setProfile } = useContext(UserContext);
	const [redirect, setRedirect] = useState(false);

	const submitHandler = e => {
		e.preventDefault();
		handleLogin(login)
			.then(res => {
				localStorage.setItem("token", res.data.token);
				setProfile(res.data.user);
				setRedirect(true);
			})
			.catch(error => {
				document.getElementById("emailHelp").innerHTML =
					"Your email or password is incorrect , please try again";
			});
	};

	// useEffect(() => {
	// 	if (profile !== null) {
	// 		console.log("maintenant redirect a true");
	// 		setRedirect(true);
	// 		console.log(redirect);
	// 	} else {
	// 		console.log("je suis passé par ici");
	// 	}
	// }, [profile, redirect]);

	// if (profile) {
	// 	console.log("maintenant redirect a true");
	// }

	return (
		<>
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
						LogIn
					</button>
					<p>Don't already have an account?</p>
					<NavLink to="/"> Click here</NavLink>
				</form>
			</div>
			{redirect && <Redirect to="/myprofile" />}
		</>
	);
};

export default LogIn;
