import React, { Component } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";
import Account from "./components/Account";
import Wall from "./components/Wall";
import axios from "axios";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
// import { Link } from "@material-ui/core";
const token = localStorage.getItem("token");

const header = (axios.defaults.headers.common["Authorization"] = token);

export class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Header />

					<Route exact path="/" component={SignUp} />
					<Route exact path="/login" component={LogIn} />
					<Route exact path="/myprofile/" component={Account} />
					<Route exact path="/wall" component={Wall} />

					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
