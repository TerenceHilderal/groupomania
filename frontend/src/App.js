import React, { Component } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";
import Account from "./components/Account";
import Wall from "./components/Wall";
import Comment from "./components/Comment";
import axios from "axios";
// import Comment from "./components/Comment";
// import Post from "./components/Posts";
// import Sidebar from "./components/Sidebar";

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
					{/* <Comment /> */}
					{/* {<Sidebar />} */}
					<Route exact path="/" component={SignUp} />
					<Route exact path="/login" component={LogIn} />
					<Route exact path="/myprofile/:id" component={Account} />
					<Route exact path="/wall" component={Wall} />
					{/* <Route exact path="/post" component={Post} /> */}
					<Route exact path="comment" component={Comment} />

					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
