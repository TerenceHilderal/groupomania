import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import styles from "./SignUp.module.scss";
import Sidebar from "../Sidebar/Sidebar";

export class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			username: "",
			role: ""
		};
	}
	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	submitHandler = e => {
		e.preventDefault();
		axios
			.post("http://localhost:3000/api/users/signup", this.state)
			.then(res => {
				console.log(res);
			})
			.catch(error => {
				console.log(error);
			});
	};

	render() {
		const { email, password, username, role } = this.state;
		return (
			<div className={styles.containerSignup}>
				<form onSubmit={this.submitHandler}>
					<div className="form-group">
						<label htmlFor="email">Email address</label>
						<input
							type="email"
							className="form-control"
							name="email"
							id="email"
							value={email}
							onChange={this.changeHandler}
							aria-describedby="emailHelp"
							placeholder="Enter email"
						/>
						<small id="emailHelp" clasNames="form-text text-muted">
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
							value={password}
							onChange={this.changeHandler}
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
							value={username}
							onChange={this.changeHandler}
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
							value={role}
							onChange={this.changeHandler}
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
}

export default SignUp;
