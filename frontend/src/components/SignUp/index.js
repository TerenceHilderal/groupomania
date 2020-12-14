import React, { useState, useContext, useEffect } from "react";
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

		handleSignUp(signUp)
			.then(res => {
				localStorage.setItem("token", res.data.token);
				const user = {
					id: res.data.user_id,
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
				handleAlert("danger", error.response.data.error);
			});
	};
	const [emailValid, setEmailValid] = useState(false);
	const [passwordValid, setPasswordValid] = useState(false);
	const [usernameValid, setUsernameValid] = useState(false);
	const [roleValid, setRoleValid] = useState(false);

	const handleChange = e => {
		e.preventDefault();
		const { name, value } = e.target;
		if (e) {
			setSignUp({ ...signUp, [name]: value });
		}

		switch (name) {
			case "email":
				email_regex.test(value) ? setEmailValid(true) : setEmailValid(false);
				break;
			case "password":
				password_regex.test(value)
					? setPasswordValid(true)
					: setPasswordValid(false);
				break;
			case "username":
				username_regex.test(value) && value.length <= 20
					? setUsernameValid(true)
					: setUsernameValid(false);
				break;
			case "role":
				username_regex.test(value) && value.length <= 20
					? setRoleValid(true)
					: setRoleValid(false);
				break;
			default:
				handleAlert("danger", "Something gone wrong , please try again later");
		}
	};

	return (
		<>
			<div className="containerSignup">
				<form className="signUp" onSubmit={submitHandler}>
					<div className="form-group">
						<label htmlFor="email">Email address</label>
						<input
							type="email"
							className={`form-control ${emailValid ? "valid" : "error"} `}
							name="email"
							id="email"
							value={signUp.email}
							onChange={handleChange}
							aria-describedby="emailHelp"
							placeholder="Enter email"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							className={`form-control ${passwordValid ? "valid" : "error"} `}
							name="password"
							id="password"
							value={signUp.password}
							onChange={handleChange}
							placeholder="Password"
						/>

						<small id="smallPassword">
							-At least 8 characters long - Include at least 1 lowercase letter
							- 1 capital letter - 1 number - 1 special character = !@#$%^&*
						</small>
					</div>

					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							className={`form-control ${usernameValid ? "valid" : "error"} `}
							name="username"
							id="username"
							value={signUp.username}
							onChange={handleChange}
							placeholder="username"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="role">Your role</label>
						<input
							type="textt"
							className={`form-control ${roleValid ? "valid" : "error"} `}
							name="role"
							id="role"
							value={signUp.role}
							onChange={handleChange}
							placeholder="CEO,Developer..."
						/>
						<small></small>
					</div>
					{emailValid && passwordValid && usernameValid && roleValid ? (
						<button type="submit" className="btn btn-danger">
							Sign-up
						</button>
					) : (
						<button type="submit" className="btn btn-danger" disabled>
							Sign-up
						</button>
					)}

					<p>Already have an account?</p>
					<NavLink to="/login"> Click here</NavLink>
				</form>
			</div>
			{redirect && <Redirect to="/myprofile" />}
		</>
	);
}

export default withRouter(SignUp);
