import React, { useState, useEffect } from "react";
import "./Post.scss";
// import PostComponent from "./PostComponent";
import axios from "axios";
import Comment from "../Comment";
import PostComponent from "./PostComponent";

function Post() {
	// recupérer les posts
	const handlePosts = () => {
		axios
			.get("http://localhost:3000/api/posts/getPosts")
			.then(response => {
				setPosts(response.data);
			})
			.catch(error => console.log({ error }));
	};

	const [posts, setPosts] = useState(null);

	useEffect(() => {
		if (!posts) {
			handlePosts();
		}
	}, [posts]);
	console.log(posts);

	// récupérer un post par id
	const handlePostsByUserId = () => {
		axios
			.get("http://localhost:3000/api/posts/user/:id")
			.then(response => {
				setPosts(response.data);
			})
			.catch(error => console.log({ error }));
	};

	// créer un post
	const submitHandler = e => {
		e.preventDefault();

		axios
			.post("http://localhost:3000/api/posts/new", newPost, {
				headers: { "Content-Type": "multipart/form-data" }
			})
			.then(res => {
				console.log(res);
			})
			.catch(error => console.log(error));
	};

	const [newPost, setNewPost] = useState({
		title: "",
		content: "",
		attachment: ""
	});

	// supprimer un post
	const handleDeletePost = id => {
		axios
			.delete(`http://localhost:3000/api/posts/${id}`)
			.then(res => {
				console.log(res);
				const data = posts.filter(post => post.id !== id);
				setNewPost(data);
				console.log(posts);
			})
			.catch(error => console.log(error));
	};

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
							onChange={e => setNewPost({ ...newPost, title: e.target.value })}
							id="title"
							name="title"
						/>
					</div>
					<input
						className="tweetBox__imageInput"
						placeholder="content"
						value={newPost.content}
						onChange={e => setNewPost({ ...newPost, content: e.target.value })}
						id="content"
						name="content"
						type="text"
					/>
					<input
						className="tweetBox__imageInput"
						placeholder="attachment"
						value={newPost.attachment}
						onChange={e =>
							setNewPost({ ...newPost, attachment: e.target.value })
						}
						id="attachment"
						name="attachment"
						type="file"
					/>
					<button type="submit">bonjour</button>
					<hr />
				</form>
			</div>
			{/* {console.log(posts)} */}
			{posts && (
				<>
					{posts.map(post => (
						<PostComponent post={post} handleDeletePost={handleDeletePost} />
					))}
				</>
			)}

			{/* <div key={}> */}
		</div>
		// </div>
	);
}
export default Post;
