import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentComponent from "./CommentComponent";
// import PostComponent from "../Posts";

function Comment() {
	// reqûete pour récupérer tous les commentaires
	const [comment, setComment] = useState({ comment: "" });

	const handleComments = () => {
		axios
			.get("http://localhost:3000/api/posts/:id/comments")
			.then(response => {
				console.log(response.data);
			})
			.catch(error => console.log({ error }));
	};
	useEffect(() => {
		// if (!comment) {
		// handleComments();
		// }
	});

	// reqûete pour creer un commentaire
	const handleAddComments = () => {
		axios
			.post("http://localhost:3000/api/posts/:id/comment")
			.then(response => {
				console.log(response.data);
			})
			.catch(error => console.log({ error }));
	};

	// reqûete pour supprimer un commentaire
	const handleDeleteComments = () => {
		axios
			.delete("http://localhost:3000/api/posts/:id/comment/:id")
			.then(response => {
				console.log(response.data);
			})
			.catch(error => console.log({ error }));
	};

	return (
		<div>
			{/* <PostComponent /> */}
			<div class="input-group mb-3">
				<input
					type="text"
					class="form-control"
					placeholder="Recipient's username"
					aria-label="Recipient's username"
					aria-describedby="basic-addon2"
				/>
				<div class="input-group-append">
					<button class="btn btn-outline-secondary" type="button">
						Button
					</button>
				</div>
			</div>
		</div>
	);
}
export default Comment;
