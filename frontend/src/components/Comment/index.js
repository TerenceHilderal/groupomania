import React, { useContext } from "react";
import axios from "axios";
import "./comments.scss";
import UserContext from "../Context";

function Comment(comment) {
	const date = new Date(comment.comment.createdAt).toLocaleString();
	const profile = useContext(UserContext);

	// const myProfile = JSON.parse(localStorage.getItem("profile"));
	const profileId = profile.id;
	const idUserComment = comment.comment.UserId;
	// reqûete pour supprimer un commentaire
	const handleDeleteComment = id => {
		axios
			.delete(
				`http://localhost:3000/api/posts/${id}/comment/${comment.comment.id}`
			)
			.then(res => {
				const data = comment.comments.filter(comment => comment.id !== id);
				console.log(data);
				// setUpdateComment(data);
			})
			.catch(err => console.log(err));
	};

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
			) : null}
		</div>
	);
}
export default Comment;
