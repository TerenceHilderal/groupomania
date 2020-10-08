import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentComponent from "./CommentComponent";
import "./comments.scss";

function Comment(comment, post) {
	const date = new Date(comment.comment.createdAt).toLocaleString();
	const myProfile = JSON.parse(localStorage.getItem("profile"));
	const profileId = myProfile.user_id;
	const idUserComment = comment.comment.UserId;
	console.log(myProfile);
	console.log(idUserComment);
	// reqûete pour creer un commentaire
	const handleAddComments = () => {
		axios
			.post("http://localhost:3000/api/posts/:id/comment")
			.then(response => {
				console.log(response.data);
			})
			.catch(error => console.log({ error }));
	};
	console.log(post);
	// reqûete pour supprimer un commentaire
	const handleDeleteComment = id => {
		axios
			.delete(
				`http://localhost:3000/api/posts/${post.id}/comment/${comment.comment.id}`
			)
			.then(res => {
				console.log(res);
			})
			.catch(err => console.log(err));
	};
	console.log(comment);
	return (
		<div class="comment">
			<div className="comment-header">
				<p>By :{comment.comment.User.username}</p>
				<span>{date}</span>
			</div>
			<div class="comment-body">
				<p>{comment.comment.comments}</p>{" "}
			</div>
			{idUserComment === profileId ? (
				<button
					type="button"
					className="close"
					aria-label="Close"
					onClick={() => handleDeleteComment(comment.comment.id)}
				>
					<span aria-hidden="true">&times;</span>
				</button>
			) : (
				<p></p>
			)}
		</div>
	);
}
export default Comment;
