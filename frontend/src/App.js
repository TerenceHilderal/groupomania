import React, { Component } from "react";
import {
	SignUp,
	LogIn,
	Header,
	Footer,
	Sidebar,
	Account,
	Wall
} from "./components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

export class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Header />
					{/* <Sidebar /> */}
					<Route exact path="/" component={SignUp} />
					<Route exact path="/login" component={LogIn} />
					<Route exact path="/myprofile" component={Account} />
					<Route exact path="/wall" component={Wall} />
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
