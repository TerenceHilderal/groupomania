import React, { useContext, useEffect } from "react";
import axios from "axios";
import "./comments.scss";
import { UserContext } from "../Context";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";

const Comment = comment => {
	const date = new Date(comment.comment.createdAt).toLocaleString();
	const { profile, handleAlert } = useContext(UserContext);
	const profileId = profile.id;
	const idUserComment = comment.comment.UserId;

	// reqûete pour supprimer un commentaire
	const handleDeleteComment = id => {
		axios
			.delete(
				`http://localhost:3000/api/posts/${id}/comment/${comment.comment.id}`,
				{
					headers: {
						Authorization: localStorage.getItem("token")
					}
				}
			)
			.then(response => {
				handleAlert("success", "Your comment has been deleted");
			})
			.catch(error => handleAlert("danger", error.response.data.error));
	};

	return (
		<>
			{profile ? (
				<div class="comment">
					<div className="comment-header">
						<p>
							<Avatar className="avatarCom">
								{comment.comment.User.username.charAt(0)}
							</Avatar>
							{comment.comment.User.username}
						</p>
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
							<DeleteIcon />
						</button>
					) : null}
				</div>
			) : null}
		</>
	);
};
export default Comment;
