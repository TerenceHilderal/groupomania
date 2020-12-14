import React, { useContext } from "react";
import axios from "axios";
import "./comments.scss";
import { UserContext } from "../Context";

const Comment = comment => {
	const date = new Date(comment.comment.createdAt).toLocaleString();
	const { profile, handleAlert } = useContext(UserContext);

	return (
		<>
			{profile ? (
				<div
					aria-live="polite"
					aria-atomic="true"
					class="d-flex justify-content-center align-items-center w-100 mt-4"
				>
					{console.log(comment)}
					<div class="toast">
						<div class="m-1  d-flex justify-content-between border-bottom">
							<p>{comment.comment.User.username}</p>
							<span>{date}</span>
						</div>
						<div class="toast-body">{comment.comment.comments}</div>
					</div>
				</div>
			) : null}
		</>
	);
};
export default Comment;
