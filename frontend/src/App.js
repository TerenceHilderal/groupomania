import React, { Component } from "react";
// import { SignUp, Sidebar, Account, Wall, Post } from "./components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";
import Account from "./components/Account";
import Wall from "./components/Wall";
// import Post from "./components/Posts";
// import Sidebar from "./components/Sidebar";

import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

export class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Header />
					{/* {<Sidebar />} */}
					<Route exact path="/" component={SignUp} />
					<Route exact path="/login" component={LogIn} />
					<Route exact path="/myprofile" component={Account} />
					<Route exact path="/wall" component={Wall} />
					{/* <Route exact path="/post" component={Post} /> */}

					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
