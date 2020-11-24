import React, { useState, useEffect, useContext } from "react";
import "./Post.scss";
import PostComponent from "./PostComponent";
import Loading from "../utils/loading";
import { addPost, getPost, getPosts, moderate } from "../../api/posts";
import { UserContext } from "../Context";

const Post = () => {
	const [posts, setPosts] = useState(null);
	const [active, setActive] = useState(false);
	const { handleAlert } = useContext(UserContext);

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
			.catch(error => console.log(error));
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

	const handlePostsByUserId = UserId => {
		getPost(UserId)
			.then(response => {
				setPosts(response.data);
			})
			.catch(error =>
				handleAlert("danger", "Sorry,something gone wrong try again later")
			);
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
				handleAlert("success", "Your post has been sent");
			})
			.catch(error =>
				handleAlert("danger", "Sorry,something gone wrong try again later")
			);
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
				handleAlert(
					"success",
					"This post is now moderate , comments are blocked"
				);
			})
			.catch(error =>
				handleAlert("danger", "Sorry,something gone wrong try again later")
			);
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
				<div>
					{posts && (
						<>
							{posts.map(post => (
								<PostComponent
									key={post.id}
									post={post}
									handlePostsByUserId={handlePostsByUserId}
									moderatePost={moderatePost}
								/>
							))}
						</>
					)}
				</div>
			</div>
		);
	} else {
		return <Loading />;
	}
};
export default Post;
