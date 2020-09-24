import axios from "axios";
import React, { Component } from "react";
import styles from "./SignUp.module.scss";
import { NavLink } from "react-router-dom";

export class LogIn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: ""
		};
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	submitHandler = e => {
		e.preventDefault();
		axios
			.post("http://localhost:3000/api/users/login", this.state)
			.then(res => {
				console.log(res);

				sessionStorage.setItem("token", res.data.token);

				const profile = {
					user_id: res.data.user_id,
					username: res.data.username,
					role: res.data.role,
					email: res.data.email
				};
				console.log(profile);
				sessionStorage.setItem("profile", JSON.stringify(profile));

				const header = (axios.defaults.headers.common["Authorization"] =
					"Bearer " + res.data.token);
				console.log(header);
			})
			.catch(error => {
				console.log({ error });
			});
	};
	render() {
		const { email, password } = this.state;
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
							value={password}
							onChange={this.changeHandler}
							placeholder="Password"
						/>
					</div>
					<NavLink to="/myprofile">
						<button type="submit" class="btn btn-danger">
							Submit
						</button>
					</NavLink>
					<p>Don't already have an account?</p>
					<NavLink to="/"> Click here</NavLink>
				</form>
			</div>
		);
	}
}

export default LogIn;
