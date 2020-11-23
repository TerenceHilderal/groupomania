import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import ChatBubbleOutlineIconRounded from "@material-ui/icons/ChatBubbleOutlineRounded";
import PanToolIcon from "@material-ui/icons/PanTool";
import Comment from "../Comment";
import { UserContext } from "../Context";
import { handleNewCom, handleCom } from "../../api/posts";
import Loading from "../utils/loading";
// import { handleProfile, token } from "../../api/users";
import handleAlert from "../../App";

const PostComponent = ({
	post,
	handlePostsByUserId,
	moderatePost,
	match,
	history
}) => {
	const date = new Date(post.createdAt).toLocaleString();
	const [seeComment, setCommentNow] = useState(false);
	const [comments, setComments] = useState(null);
	const [newComment, setNewComment] = useState("");
	const postProfileId = post.UserId;
	const { profile, setProfile } = useContext(UserContext);

	// create a comment
	const handleNewComment = e => {
		handleNewCom(post, newComment)
			.then(response => {
				setNewComment("");
				handleComments();
			})
			.catch(error => console.log(error));
	};
	const handleComment = e => {
		setNewComment({ comments: e.target.value });
	};

	//  récupérer tous les commentaires d'un post
	const handleComments = () => {
		handleCom(post)
			.then(response => {
				setComments(response.data.message);
			})
			.catch(error => console.log(error));
	};
	useEffect(() => {
		if (match.params.UserId) {
			handlePostsByUserId(match.params.UserId);
		}
	}, [match.params.UserId]);

	return (
		<>
			{profile ? (
				<div className="container posted">
					<div className="post__username">
						{profile.isAdmin ? (
							<p onClick={() => history.push(`/wall/${postProfileId}`)}>
								<b>{post.User.username}</b>
							</p>
						) : (
							<p>
								<b>{post.User.username}</b>
							</p>
						)}
						<span> {date} </span>
						{profile.isAdmin ? (
							<PanToolIcon
								color="action"
								fontSize="large"
								onClick={() => moderatePost(post.id)}
							/>
						) : null}
					</div>

					<div className="container post__body">
						<h2>{post.title}</h2>
						<h3>{post.content}</h3>
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
					</div>
				</div>
			) : (
				<Loading />
			)}
		</>
	);
};
export default withRouter(PostComponent);
