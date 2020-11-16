import React, { useState } from "react";
import "../SignUp/SignUp.scss";
import { handleLogin } from "../../api/users";
import { withRouter, NavLink } from "react-router-dom";

const LogIn = ({ history }) => {
	const [login, setLogin] = useState({ email: "", password: "" });

	const submitHandler = e => {
		e.preventDefault();

		handleLogin(login)
			.then(res => {
				localStorage.setItem("token", res.data.token);
				const profile = res.data.user;
				localStorage.setItem("profile", JSON.stringify(profile));
				window.location = "/myprofile/";
				// history.push("/myprofile/");
			})
			.catch(error => {
				// document.getElementById("emailHelp").innerHTML =
				// 	"Your email or password is incorrect , please try again";
			});
	};
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
				{/* <NavLink to="/myprofile"> */}
				<button type="submit" className="btn btn-danger">
					Submit
				</button>
				{/* </NavLink> */}
				<p>Don't already have an account?</p>
				<NavLink to="/"> Click here</NavLink>
			</form>
		</div>
	);
};

export default withRouter(LogIn);
