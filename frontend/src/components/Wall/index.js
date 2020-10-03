import React from "react";
import Sidebar from "../Sidebar";
import "./wall.scss";
// import styles from "../Sidebar/Sidebar.module.scss";
// import style from "../Posts/Post.module.scss";
import Post from "../Posts";
import Comment from "../Comment";

function Wall() {
	return (
		<div className="wall">
			{<Sidebar />}
			{<Post />}
			{/* {<Comment />} */}
		</div>
	);
}
export default Wall;
