import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import ChatBubbleOutlineIconRounded from "@material-ui/icons/ChatBubbleOutlineRounded";
import PanToolIcon from "@material-ui/icons/PanTool";
import Comment from "../Comment";
import { UserContext } from "../Context";
import { handleNewCom, handleCom } from "../../api/posts";
import Loading from "../utils/loading";
import Avatar from "@material-ui/core/Avatar";

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
	const { profile, handleAlert } = useContext(UserContext);

	const handleNewComment = e => {
		handleNewCom(post, newComment)
			.then(response => {
				setNewComment("");
				handleComments();
				handleAlert("success", "Your comment has been sent");
			})
			.catch(error =>
				handleAlert("danger", "Something gone wrong ,please try again later")
			);
	};
	const handleComment = e => {
		setNewComment({ comments: e.target.value });
	};

	const handleComments = () => {
		handleCom(post)
			.then(response => {
				setComments(response.data.message);
			})
			.catch(error =>
				handleAlert("danger", "Sorry,something gone wrong try again later")
			);
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
								<Avatar>{post.User.username.charAt(0)}</Avatar>
								<b>{post.User.username}</b>
							</p>
						) : (
							<p>
								<Avatar>{post.User.username.charAt(0)}</Avatar>
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
						<h4>{post.content}</h4>
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
									Moderated post , you can not comment
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
