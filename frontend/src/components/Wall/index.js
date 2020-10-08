import React from "react";
import Sidebar from "../Sidebar";
import "./wall.scss";
import Post from "../Posts";

function Wall() {
	return (
		<div className="wall">
			{/* {<Sidebar />} */}
			{<Post />}
		</div>
	);
}
export default Wall;
