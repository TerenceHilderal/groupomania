import React, { useState, useEffect } from "react";
import Post from "./index";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

const PostComponent = ({ post, handleDeletePost, handlePostsByUserId }) => {
	const date = new Date(post.createdAt).toLocaleString();
	console.log(date);

	return (
		<>
			<div className="container posted">
				<div className="post__username">
					<p onClick={() => handlePostsByUserId(post.UserId)}>
						Posted by:<b>{post.User.username}</b>
					</p>
					<span>at {date} </span>
					<button
						type="button"
						className="close"
						aria-label="Close"
						onClick={() => handleDeletePost(post.id)}
					>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				{/* <hr /> */}
				<div className="post__body">
					<div className="post__header">
						{/* <div className="post__headerText"> */}
						<h2>{post.title}</h2>
						{/* </div> */}
						<div className="post__headerDescription">
							<p>{post.content}</p>
						</div>
					</div>
					<img src={post.attachment} width="45%" alt="image" />
					<div className="post__footer">
						{/* <span>Date:{post.createdAt}</span> */}
						<ChatBubbleOutlineIcon
							className="icon"
							color="secondary"
							fontSize="large"
						/>
					</div>
					<hr />
				</div>
			</div>
		</>
	);
};
export default PostComponent;
