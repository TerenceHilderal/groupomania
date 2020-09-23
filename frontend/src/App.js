import React, { Component } from "react";
import { SignUp, LogIn, Header, Footer } from "./components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

export class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Header />
					<Route exact path="/" component={SignUp} />
					<Route exact path="/login" component={LogIn} />
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
