import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Post from "./components/Posts";
import Alert from "./components/Alert";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { UserContext } from "./components/Context";
import { handleProfile } from "./api/users";
import "./App.css";

const dotenv = require("dotenv");
dotenv.config();

const token = localStorage.getItem("token");
const isMyTokenValid = () => {
	if (token) {
		const decodedToken = jwt_decode(token);
		const dateNow = new Date();
		if (decodedToken.exp > dateNow / 1000) {
			return true;
		}
	}
};

const PrivateRoute = ({ component: Component, path }) => {
	return (
		<Route
			exact
			path={path}
			render={() =>
				isMyTokenValid() ? <Component /> : <Redirect to="/login" />
			}
		></Route>
	);
};
const App = () => {
	const [profile, setProfile] = useState(null);
	const [alert, setAlert] = useState(null);

	const handleAlert = (status, text) => {
		setAlert({ status, text });
		setTimeout(() => {
			setAlert(null);
		}, 3000);
	};

	useEffect(() => {
		if (!profile && isMyTokenValid()) {
			handleProfile()
				.then(res => {
					setProfile(res.data.user);
				})
				.catch(error =>
					handleAlert("danger", "Sorry,something gone wrong" + error)
				);
		}
	}, [profile, handleProfile]);

	return (
		<Router>
			<div className="App">
				<UserContext.Provider
					value={{ profile, setProfile, handleAlert, alert }}
				>
					<Header />
					{alert && <Alert status={alert.status} text={alert.text} />}
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
