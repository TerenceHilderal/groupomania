import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentComponent from "./CommentComponent";
import "./comments.scss";

function Comment(comment, post) {
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
	return (
		<div class="comment">
			<button
				type="button"
				className="close"
				aria-label="Close"
				onClick={() => handleDeleteComment(comment.comment.id)}
			>
				<span aria-hidden="true">&times;</span>
			</button>
			<div className="comment-header">
				<p>Posted by :{comment.comment.UserId}</p>
				<span>{comment.comment.createdAt}</span>
			</div>
			<div class="comment-body">
				<p>{comment.comment.comments}</p>{" "}
			</div>
		</div>
	);
}
export default Comment;
