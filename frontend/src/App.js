import React, { Component } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Post from "./components/Posts";
import axios from "axios";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./App.css";
import UserContext from "./components/Context";

const token = localStorage.getItem("token");
const profile = JSON.parse(localStorage.getItem("profile"));
axios.defaults.headers.common["Authorization"] = token;

const PrivateRoute = ({ component: Component, path }) => {
	return (
		<Route
			exact
			path={path}
			render={() => (profile ? <Component /> : <Redirect to="/login" />)}
		></Route>
	);
};

export class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<UserContext.Provider value={profile}>
						<Header />
						<Route exact path="/" component={SignUp} />
						<Route exact path="/login" component={LogIn} />
						<PrivateRoute exact path="/myprofile/" component={Profile} />
						<PrivateRoute exact path="/wall" component={Post} />
						<PrivateRoute exact path="/wall/:UserId" component={Post} />
					</UserContext.Provider>
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
