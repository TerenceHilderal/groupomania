import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./Post.scss";
import PostComponent from "./PostComponent";
import Alert from "../Alert";
import Loading from "../utils/loading";
import { addPost, getPost, getPosts, moderate } from "../../api/posts";

const Post = ({ match }) => {
	// recupérer les posts
	const [posts, setPosts] = useState(null);
	const [active, setActive] = useState(false);
	const [success, setSuccess] = useState(false);

	// créer un post
	const [newPost, setNewPost] = useState({
		title: "",
		content: "",
		attachment: ""
	});

	const handlePosts = () => {
		getPosts()
			.then(response => {
				setPosts(response.data);
			})
			.catch(error => setSuccess(false));
	};
	useEffect(() => {
		if (!posts) {
			handlePosts();
		}
	}, [posts]);

	useEffect(() => {
		if (newPost.title !== "" && newPost.content !== "" && newPost.attachment) {
			setActive(true);
		}
	}, [newPost]);

	// récupérer un post par id
	const handlePostsByUserId = UserId => {
		getPost(UserId)
			.then(response => {
				setPosts(response.data);
			})
			.catch(error => setSuccess(false));
	};

	const submitHandler = e => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("title", newPost.title);
		formData.append("content", newPost.content);
		formData.append("attachment", newPost.attachment, newPost.attachment.name);
		addPost(formData)
			.then(response => {
				handlePosts();
				setSuccess(true);
			})
			.catch(error => setSuccess(false));
	};

	const handlePost = e => {
		if (e.target.name !== "attachment") {
			setNewPost({ ...newPost, [e.target.name]: e.target.value });
		} else {
			setNewPost({ ...newPost, attachment: e.target.files[0] });
		}
	};

	const moderatePost = id => {
		moderate(id)
			.then(response => {
				handlePosts();
				setSuccess(true);
			})
			.catch(error => setSuccess(false));
	};
	if (posts) {
		return (
			<div className="post container">
				<div className="postForm">
					<form
						onSubmit={submitHandler}
						method="post"
						encType="multipart/form-data"
						className="postForm"
					>
						<input
							className="title"
							placeholder="title"
							type="text"
							value={newPost.title}
							onChange={e => handlePost(e)}
							id="title"
							name="title"
						/>

						<textarea
							className="formInput"
							placeholder="content"
							value={newPost.content}
							onChange={e => handlePost(e)}
							id="content"
							name="content"
							type="text"
						/>

						<input
							className="attachment"
							placeholder="attachment"
							onChange={e => handlePost(e)}
							id="attachment"
							name="attachment"
							type="file"
						/>
						{active ? (
							<button className="btn btn-success " type="submit">
								Post-it!
							</button>
						) : (
							<button disabled className="btn btn-success " type="submit">
								Post-it!
							</button>
						)}
					</form>
				</div>
				{/* <hr /> */}
				<>
					{posts && (
						<>
							{success ? <Alert /> : null}
							{posts.map(post => (
								<PostComponent
									key={post.id}
									post={post}
									// handleDeletePost={handleDeletePost}
									handlePostsByUserId={handlePostsByUserId}
									moderatePost={moderatePost}
									success={success}
								/>
							))}
						</>
					)}
				</>
			</div>
		);
	} else {
		return <Loading />;
	}
};
export default withRouter(Post);
