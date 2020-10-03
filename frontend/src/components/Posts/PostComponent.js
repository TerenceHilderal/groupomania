import React, { useState, useEffect } from "react";
import Post from "./index";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

const PostComponent = ({ post, handleDeletePost, handlePostsByUserId }) => {
	return (
		<>
			<div>
				<div className="post__username">
					<p onClick={() => handlePostsByUserId(post.UserId)}>
						{post.User.username}
					</p>
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
						/>
					</div>
					<hr />
				</div>
			</div>
		</>
	);
};
export default PostComponent;
