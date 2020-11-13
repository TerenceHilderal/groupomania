import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import ChatBubbleOutlineIconRounded from "@material-ui/icons/ChatBubbleOutlineRounded";
import PanToolIcon from "@material-ui/icons/PanTool";
import Comment from "../Comment";
import axios from "axios";
import UserContext from "../Context";

const PostComponent = ({
	post,
	handleDeletePost,
	handlePostsByUserId,
	moderatePost,
	match
}) => {
	const date = new Date(post.createdAt).toLocaleString();
	const [seeComment, setCommentNow] = useState(false);
	const [comments, setComments] = useState(null);
	const [newComment, setNewComment] = useState({ comments: " " });
	const profile = useContext(UserContext);
	const profileAdmin = profile.isAdmin;
	const postProfileId = post.UserId;

	// create a comment
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
	useEffect(() => {
		if (match.params.UserId) {
			handlePostsByUserId(match.params.UserId);
		}
	}, [match.params.UserId]);

	return (
		<div className="container posted">
			<div className="post__username">
				{profileAdmin ? (
					<p
						onClick={() => (document.location.href = `/wall/${postProfileId}`)}
					>
						<b>{post.User.username}</b>
					</p>
				) : (
					<p>
						<b>{post.User.username}</b>
					</p>
				)}
				<span> {date} </span>
				{profileAdmin ? (
					<PanToolIcon
						color="action"
						fontSize="large"
						onClick={() => moderatePost(post.id)}
					/>
				) : null}
				{/* {profileAdmin || profileId === postProfileId ? (
					<button
						type="button"
						className="close"
						aria-label="Close"
						onClick={() => handleDeletePost(post.id)}
					>
						<span aria-hidden="true">&times;</span>
					</button>
				) : null} */}
			</div>
			<div className="container post__body">
				{/* <div className="post__header"> */}
				<h2>{post.title}</h2>
				{/* <div className="post__headerDescription"> */}
				<h3>{post.content}</h3>
				{/* </div> */}
				{/* </div> */}
				<img src={post.attachment} width="55%" alt="image1" />
				<hr />
				<div className="post__footer">
					{!post.isModerate ? (
						<ChatBubbleOutlineIconRounded
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
						<p style={{ color: "red" }}>
							Moderated post , you couldn't comment
						</p>
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
								<div class="input-group-append">
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
									key={comment.id}
									comment={comment}
									handleComments={handleComments}
								/>
							))}
						</>
					) : null}
				</div>
				{/* <hr /> */}
			</div>
		</div>
	);
};
export default withRouter(PostComponent);
