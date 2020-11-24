import React, { useState, useContext } from "react";
import inputTest from "../TestInputs";
import { handleSignUp } from "../../api/users";
import { withRouter, Redirect, NavLink } from "react-router-dom";
import { UserContext } from "../Context";

function SignUp() {
	const [signUp, setSignUp] = useState({
		email: "",
		password: "",
		username: "",
		role: ""
	});
	const { profile, setProfile, handleAlert } = useContext(UserContext);
	const [redirect, setRedirect] = useState(false);

	const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const password_regex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
	const username_regex = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;

	const submitHandler = e => {
		e.preventDefault();

		inputTest(e, username_regex, email_regex, password_regex);

		handleSignUp(signUp)
			.then(res => {
				localStorage.setItem("token", res.data.token);
				const user = {
					user_id: res.data.user_id,
					username: res.data.username,
					role: res.data.role,
					email: res.data.email,
					isAdmin: res.data.isAdmin
				};
				setProfile(user);
				setRedirect(true);
				handleAlert("success", "Your account is now created");
			})
			.catch(error => {
				handleAlert(
					"danger",
					"Sorry something gone wrong,please try again later"
				);
			});
	};

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
							value={signUp.email}
							onChange={e => setSignUp({ ...signUp, email: e.target.value })}
							aria-describedby="emailHelp"
							placeholder="Enter email"
						/>
						<small id="emailHelp" className="form-text "></small>
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
						<small id="smallPassword"></small>
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
						<small></small>
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
						<small></small>
					</div>
					<button type="submit" className="btn btn-danger">
						Sign-up
					</button>
					{/* <p>Already have an account?</p>
					<NavLink to="/login"> Click here</NavLink> */}
				</form>
			</div>
			{redirect && profile ? <Redirect to="/myprofile" /> : null}
		</>
	);
}

export default withRouter(SignUp);
