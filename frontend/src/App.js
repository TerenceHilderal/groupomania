import React, { Component } from "react";
import { SignUp, LogIn } from "./components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

export class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Route exact path="/" component={SignUp} />
					<Route exact path="/login" component={LogIn} />
				</div>
			</Router>
		);
	}
}

export default App;
