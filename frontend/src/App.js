import React, { Component } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Post from "./components/Posts";
import axios from "axios";
import { BrowserRouter as Router, Route, useParams } from "react-router-dom";

import "./App.css";
const token = localStorage.getItem("token");
const header = (axios.defaults.headers.common["Authorization"] = token);
// const profile = localStorage.getItem("profile");
// const id = profile.id;

// const id = useParams(userId);

export class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Header />
					<Route exact path="/" component={SignUp} />
					<Route exact path="/login" component={LogIn} />
					<Route exact path="/myprofile/" component={Profile} />
					<Route exact path="/wall" component={Post} />
					<Route exact path="/wall/:UserId" component={Post} />
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
