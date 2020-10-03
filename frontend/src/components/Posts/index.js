import React, { useState, useEffect } from "react";
import "./Post.scss";
// import PostComponent from "./PostComponent";
import axios from "axios";
import Comment from "../Comment";
import PostComponent from "./PostComponent";

function Post() {
	// recupérer les posts
	const [posts, setPosts] = useState(null);
	const handlePosts = () => {
		axios
			.get("http://localhost:3000/api/posts/getPosts")
			.then(response => {
				setPosts(response.data);
			})
			.catch(error => console.log({ error }));
	};

	useEffect(() => {
		if (!posts) {
			handlePosts();
		}
	}, [posts]);

	// récupérer un post par id
	const handlePostsByUserId = UserId => {
		axios
			.get(`http://localhost:3000/api/posts/user/${UserId}`)
			.then(response => {
				setPosts(response.data);
			})
			.catch(error => console.log({ error }));
	};

	// créer un post
	const [newPost, setNewPost] = useState({
		title: "",
		content: "",
		attachment: ""
	});
	const token = localStorage.getItem("token");

	const submitHandler = e => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("title", newPost.title);
		formData.append("content", newPost.content);
		formData.append("attachment", newPost.attachment, newPost.attachment.name);

		// const header = (axios.defaults.headers.common["Authorization"] = token);
		axios
			.post("http://localhost:3000/api/posts/new", formData, {
				headers: { "Content-Type": "multipart/form-data" }
			})
			.then(res => {
				setNewPost(newPost);
				window.location.reload(false);
			})
			.catch(error => console.log(error));
	};
	const handlePost = e => {
		if (e.target.name !== "attachment") {
			setNewPost({ ...newPost, [e.target.name]: e.target.value });
		} else {
			setNewPost({ ...newPost, attachment: e.target.files[0] });
		}
	};

	// supprimer un post
	const handleDeletePost = id => {
		axios
			.delete(`http://localhost:3000/api/posts/${id}`)
			.then(res => {
				const data = posts.filter(post => post.id !== id);
				setPosts(data);
			})
			.catch(error => console.log(error));
	};
	console.log(posts);
	return (
		<div className="post">
			<div className="tweetBox">
				<form
					onSubmit={submitHandler}
					method="post"
					enctype="multipart/form-data"
				>
					<div className="tweetBox__input">
						<input
							placeholder="title"
							type="text"
							value={newPost.title}
							onChange={e => handlePost(e)}
							id="title"
							name="title"
						/>
					</div>
					<input
						className="tweetBox__imageInput"
						placeholder="content"
						value={newPost.content}
						onChange={e => handlePost(e)}
						id="content"
						name="content"
						type="text"
					/>
					<input
						className="tweetBox__imageInput"
						placeholder="attachment"
						onChange={e => handlePost(e)}
						id="attachment"
						name="attachment"
						type="file"
					/>
					<button type="submit">Post-it!</button>
					<hr />
				</form>
			</div>
			{console.log(posts)}
			{posts && (
				<>
					{posts.map(post => (
						<PostComponent
							post={post}
							handleDeletePost={handleDeletePost}
							handlePostsByUserId={handlePostsByUserId}
						/>
					))}
				</>
			)}

			{/* <div key={}> */}
		</div>
		// </div>
	);
}
export default Post;
