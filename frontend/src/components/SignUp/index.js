import React, { useState, useContext, useEffect } from "react";
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
	const { setProfile, handleAlert } = useContext(UserContext);
	const [redirect, setRedirect] = useState(false);

	const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const password_regex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
	const username_regex = /^[a-zA-Z]+[a-zA-Z]+$/;
	//  /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
	const submitHandler = e => {
		e.preventDefault();

		// inputTest(e, username_regex, email_regex, password_regex);

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
	const [emailNotValid, setEmailNotValid] = useState(true);
	const [passwordNotValid, setPasswordNotValid] = useState(true);
	const [usernameNotValid, setUsernameNotValid] = useState(true);
	const [roleNotValid, setRoleNotValid] = useState(true);

	const handleChange = e => {
		e.preventDefault();
		const { name, value } = e.target;
		if (e) {
			setSignUp({ ...signUp, [name]: value });
		}

		switch (name) {
			case "email":
				email_regex.test(value)
					? setEmailNotValid(false)
					: setEmailNotValid(true);
				break;
			case "password":
				password_regex.test(value)
					? setPasswordNotValid(false)
					: setPasswordNotValid(true);
				break;
			case "username":
				username_regex.test(value)
					? setUsernameNotValid(false)
					: setUsernameNotValid(true);
				break;
			case "role":
				username_regex.test(value)
					? setRoleNotValid(false)
					: setRoleNotValid(true);
			default:
				break;
		}

		// if (e.target.name === "email" && email_regex.test(e.target.value)) {
		// 	setEmailNotValid(false);
		// } else {
		// 	setEmailNotValid(true);
		// }
		// if (e.target.name === "password" && password_regex.test(e.target.value)) {
		// 	setPasswordNotValid(false);
		// } else {
		// 	setPasswordNotValid(true);
		// }
		// if (e.target.name === "username" && username_regex.test(e.target.value)) {
		// 	setUsernameNotValid(false);
		// } else {
		// 	setUsernameNotValid(true);
		// }
	};

	return (
		<>
			<div className="containerSignup">
				<form className="signUp" onSubmit={submitHandler}>
					<div className="form-group">
						<label htmlFor="email">Email address</label>
						<input
							type="email"
							className={`form-control ${emailNotValid ? "error" : "valid"} `}
							name="email"
							id="email"
							value={signUp.email}
							onChange={handleChange}
							aria-describedby="emailHelp"
							placeholder="Enter email"
						/>
						{/* {emailNotValid ? (
							<small id="emailHelp" className="form-text ">
								{" "}
								wrong email
							</small>
						) : (
							<p>Votre email est valide</p>
						)} */}
					</div>

					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							className={`form-control ${
								passwordNotValid ? "error" : "valid"
							} `}
							name="password"
							id="password"
							value={signUp.password}
							onChange={handleChange}
							placeholder="Password"
						/>
						{passwordNotValid ? (
							<small id="smallPassword">
								-At least 8 characters long - Include at least 1 lowercase
								letter - 1 capital letter - 1 number - 1 special character =
								!@#$%^&*
							</small>
						) : (
							<p>It's all good</p>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							className={`form-control ${
								usernameNotValid ? "error" : "valid"
							} `}
							name="username"
							id="username"
							value={signUp.username}
							onChange={handleChange}
							placeholder="username"
						/>
						{/* {usernameNotValid ? (
							<small>Username lenght must be 4-13</small>
						) : (
							<p>Almost finish, one last question</p>
						)} */}
					</div>

					<div className="form-group">
						<label htmlFor="role">Your role</label>
						<input
							type="textt"
							className={`form-control ${roleNotValid ? "error" : "valid"} `}
							name="role"
							id="role"
							value={signUp.role}
							onChange={handleChange}
							placeholder="CEO,Developer..."
						/>
						<small></small>
					</div>

					<button type="submit" className="btn btn-danger">
						Sign-up
					</button>

					<p>Already have an account?</p>
					<NavLink to="/login"> Click here</NavLink>
				</form>
			</div>
			{redirect && <Redirect to="/myprofile" />}
		</>
	);
}

export default withRouter(SignUp);
