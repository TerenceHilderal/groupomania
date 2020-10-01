import React, { useState, useEffect } from "react";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import "./Post.scss";
// import PostComponent from "./PostComponent";
import axios from "axios";
import Comment from "../Comment";

function Post() {
	// recupérer les posts
	const handlePosts = () => {
		axios
			.get("http://localhost:3000/api/posts/getPosts")
			.then(response => {
				console.log(response.data.id);
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
	const handleDeletePost = () => {
		axios
			.delete("http://localhost:3000/api/posts/:id")
			.then(res => {
				console.log(res);
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

			{/* <div key={}> */}
			<div className="post__username">{/* <p>{post.User.username}</p> */}</div>
			<hr />
			<div className="post__body">
				<div className="post__header">
					<div className="post__headerText">{/* <p>{}</p> */}</div>
					<div className="post__headerDescription">
						{/* {<p>{post.content}</p>} */}
					</div>
				</div>
				{/* <img src={post.attachment} width="25%" alt="image" /> */}
				<div className="post__footer">
					{/* <span>Date:{post.createdAt}</span> */}
					<ChatBubbleOutlineIcon
						font-size="large"
						color="secondary"
						fontSize="small"
						onClick={() => alert("clic")}
					/>
					<button type="button" className="close" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<hr />
			</div>
		</div>
		// </div>
	);
}
export default Post;
