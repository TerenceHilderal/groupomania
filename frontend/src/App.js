import React, { Component } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Post from "./components/Posts";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import UserContext from "./components/Context/Context";

const token = localStorage.getItem("token");
const profile = JSON.parse(localStorage.getItem("profile"));
axios.defaults.headers.common["Authorization"] = token;

console.log(UserContext);

export class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Header />
					<Route exact path="/" component={SignUp} />
					<Route exact path="/login" component={LogIn} />
					<UserContext.Provider value={profile}>
						<Route exact path="/myprofile/" component={Profile} />
						<Route exact path="/wall" component={Post} />
						<Route exact path="/wall/:UserId" component={Post} />
					</UserContext.Provider>
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
