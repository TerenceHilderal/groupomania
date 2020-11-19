import React, { useState, useContext } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Post from "./components/Posts";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./App.css";
import { UserContext } from "./components/Context";

// dotenv
require("dotenv").config();

const token = localStorage.getItem("token");

const PrivateRoute = ({ component: Component, path }) => {
	return (
		<Route
			exact
			path={path}
			render={() => (token ? <Component /> : <Redirect to="/login" />)}
		></Route>
	);
};

const App = () => {
	const [profile, setProfile] = useState(null);
	console.log(profile);

	return (
		<Router>
			<div className="App">
				<UserContext.Provider value={{ profile, setProfile }}>
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
};

export default App;
