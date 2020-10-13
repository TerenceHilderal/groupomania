import React, { useState, useEffect } from "react";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import PanToolIcon from "@material-ui/icons/PanTool";
import Comment from "../Comment";
import axios from "axios";
import Alert from "../Alert";
import { TextareaAutosize } from "@material-ui/core";

const PostComponent = ({
	post,
	handleDeletePost,
	handlePostsByUserId,
	moderatePost
}) => {
	const date = new Date(post.createdAt).toLocaleString();
	const [seeComment, setCommentNow] = useState(false);
	const [comments, setComments] = useState(null);
	const [newComment, setNewComment] = useState({ comments: " " });
	// const [success, setSuccess] = useState(true);
	const myProfile = JSON.parse(localStorage.getItem("profile"));
	const profileAdmin = myProfile.isAdmin;
	const profileId = myProfile.user_id;
	const postProfileId = post.UserId;

	// creer un commentaire
	const handleNewComment = e => {
		axios
			.post(`http://localhost:3000/api/posts/${post.id}/comment`, newComment)
			.then(response => {
				setNewComment(response.data);
				handleComments();
			})
			.catch(error => console.log(error));
	};
	const handleComment = e => {
		setNewComment({ ...newComment, [e.target.name]: e.target.value });
	};
	//  récupérer tous les commentaires d'un post
	const handleComments = () => {
		axios
			.get(`http://localhost:3000/api/posts/${post.id}/comments`)
			.then(response => {
				setComments(response.data.message);
			})
			.catch(error => console.log({ error }));
	};

	return (
		<div className="container posted">
			<div className="post__username">
				<p onClick={() => handlePostsByUserId(post.UserId)}>
					Posted by:<b>{post.User.username}</b>
				</p>
				<span>at {date} </span>
				{profileAdmin ? (
					<PanToolIcon
						color="danger"
						fontSize="large"
						onClick={() => moderatePost(post.id)}
					/>
				) : (
					<p></p>
				)}
				{profileAdmin || profileId === postProfileId ? (
					<button
						type="button"
						className="close"
						aria-label="Close"
						onClick={() => handleDeletePost(post.id)}
					>
						<span aria-hidden="true">&times;</span>
					</button>
				) : (
					<p></p>
				)}
			</div>
			<div className="container post__body">
				<div className="post__header">
					<h2>{post.title}</h2>

					<div className="post__headerDescription">
						<p>{post.content}</p>
					</div>
				</div>
				<img src={post.attachment} width="45%" alt="image" />
				<div className="post__footer">
					{!post.isModerate ? (
						<ChatBubbleOutlineIcon
							className="icon"
							color="secondary"
							fontSize="large"
							onClick={() =>
								seeComment
									? setCommentNow(false)
									: setCommentNow(true) + handleComments(post.id)
							}
						/>
					) : (
						<p>Moderated post , you couldn't comment</p>
					)}
					{seeComment && comments ? (
						<>
							<div class="input-group mb-3">
								<input
									type="text"
									class="form-control"
									placeholder="Comments..."
									aria-label="comments"
									aria-describedby="basic-addon2"
									name="comments"
									onChange={e => handleComment(e)}
								/>
								<div class="comment-button">
									<button
										class="btn btn-outline-secondary"
										type="submit"
										onClick={e => handleNewComment(e)}
									>
										Send-it
									</button>
								</div>
							</div>
							{comments.map(comment => (
								<Comment
									post={post}
									comment={comment}
									comments={comments}
									handleComments={handleComments}
								/>
							))}
						</>
					) : (
						<i>See comments</i>
					)}
				</div>
				<hr />
			</div>
		</div>
	);
};
export default PostComponent;
