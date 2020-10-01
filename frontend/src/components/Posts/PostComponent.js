import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./index";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

const PostComponent = ({ post, handleDeletePost }) => {
	// const [posts, setPosts] = useState(null);

	// const getPosts = () => {
	// 	axios
	// 		.get("http://localhost:3000/api/posts/getPosts")
	// 		.then(response => {
	// 			console.log(response.data.map(post => post.UserId));
	// 			setPosts(response.data);
	// 		})
	// 		.catch(error => console.log({ error }));
	// };
	// useEffect(() => {
	// 	if (!posts) {
	// 		getPosts();
	// 	} else {
	// 		console.log(posts);
	// 		console.log(posts.map(post => post.id));
	// 	}
	// });han

	return (
		<>
			<div>
				<div className="post__username">
					<p>{post.User.username}</p>
				</div>
				<hr />
				<div className="post__body">
					<div className="post__header">
						<div className="post__headerText">
							<p>{post.title}</p>
						</div>
						<div className="post__headerDescription">
							<p>{post.content}</p>
						</div>
					</div>
					<img src={post.attachment} width="25%" alt="image" />
					<div className="post__footer">
						<span>Date:{post.createdAt}</span>
						<ChatBubbleOutlineIcon
							font-size="large"
							color="secondary"
							fontSize="small"
							onClick={() => alert("clic")}
						/>
						<button
							type="button"
							className="close"
							aria-label="Close"
							onClick={() => handleDeletePost(post.id)}
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<hr />
				</div>
			</div>
		</>
	);
};
export default PostComponent;
