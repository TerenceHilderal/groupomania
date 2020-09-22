import axios from "axios";
import React, { Component } from "react";

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
			})
			.catch(error => {
				console.log(error);
			});
	};
	render() {
		const { email, password } = this.state;
		return (
			<div>
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

					<button type="submit" class="btn btn-primary">
						Submit
					</button>
				</form>
			</div>
		);
	}
}

export default LogIn;
