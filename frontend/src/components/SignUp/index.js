import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import inputTest from "../TestInputs";

function SignUp() {
	const [signUp, setSignUp] = useState({
		email: "",
		password: "",
		username: "",
		role: ""
	});

	const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const password_regex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
	const username_regex = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
	const submitHandler = e => {
		e.preventDefault();
		const email = e.target.email;
		const password = e.target.password;
		const role = e.target.role;
		const username = e.target.username;
		let test = {};
		const testField = (regex, value, fields, name, errorMessage) => {
			let small = fields.nextElementSibling;
			if (regex.test(value) && value !== "") {
				small.innerHTML = " valid input";
				small.classList.remove("text-danger");
				small.classList.add("text-success");
				test[name] = true;
			} else {
				small.innerHTML = errorMessage;
				small.classList.remove("text-success");
				small.classList.add("text-danger");
				test[name] = false;
			}
		};
		testField(
			username_regex,
			role.value,
			role,
			"role",
			"This field must contain only ASCII letters and digits, with hyphens, underscores and spaces as internal separators"
		);
		testField(
			username_regex,
			username.value,
			username,
			"username",
			"This field must contain only ASCII letters and digits, with hyphens, underscores and spaces as internal separators"
		);
		testField(email_regex, email.value, email, "email", "wrong email format");
		testField(
			password_regex,
			password.value,
			password,
			"password",
			"Passwords must be : -At least 8 characters long	- Include at least 1 lowercase letter - 1 capital letter - 1 number - 1 special character => !@#$%^&*"
		);

		axios
			.post("http://localhost:3000/api/users/signup", signUp)
			.then(res => {
				localStorage.setItem("token", res.data.token);
				const profile = {
					user_id: res.data.user_id,
					username: res.data.username,
					role: res.data.role,
					email: res.data.email,
					isAdmin: res.data.isAdmin
				};
				localStorage.setItem("profile", JSON.stringify(profile));
				window.location = "/myprofile/";
			})
			.catch(error => {
				console.log(error.error);
			});
	};

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
				<p>Already have an account?</p>
				<NavLink to="/login"> Click here</NavLink>
			</form>
		</div>
	);
}

export default SignUp;
