import React, { useState, useEffect } from "react";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import "./Post.scss";
// import PostComponent from "./PostComponent";
import axios from "axios";
import Comment from "../Comment";
// import "./PostComponent";

// deletePost() {
// 	axios
// 		.delete("http://localhost:3000/api/posts/" + this.state.id)
// 		.then(response => {
// 			console.log(response);
// 		})
// 		.catch(error => {
// 			console.log(error);
// 		});
// }
// const getPosts = () => {
// 	axios
// 		.get("http://localhost:3000/api/posts/getPosts")
// 		.then(response => {
// 			// console.log(response.data.map(post => post));
// 			setPosts(response.data);
// 		})
// 		.catch(error => console.log({ error }));
// };
// const [posts, setPosts] = useState(null);
// // getPosts();
// useEffect(() => {
// 	if (!posts) {
// 		getPosts();
// 	}
// });
// PostComponent();
const Post = () => {
	const [posts, setPosts] = useState();
	const handlePosts = () => {
		axios
			.get("http://localhost:3000/api/posts/getPosts")
			.then(response => {
				console.log(response.data);
				setPosts(response.data);
				console.log(response.data);
			})
			.catch(error => console.log({ error }));
	};

	useEffect(() => {
		if (!posts) {
			handlePosts();
		}
	});

	return (
		<div className="post">
			<div className="tweetBox">
				<form>
					<div className="tweetBox__input">
						{/* <Avatar src="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png" /> */}
						<input
							// onChange={e => setTweetMessage(e.target.value)}
							// value={tweetMessage}
							placeholder="What's happening?"
							type="text"
						/>
					</div>
					<input
						// value={tweetImage}
						// onChange={e => setTweetImage(e.target.value)}
						className="tweetBox__imageInput"
						placeholder="Optional: Enter image URL"
						type="text"
					/>
					<button>bonjour</button>
					<hr />
				</form>
			</div>

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
					<button
						onClick={() => alert("clic")}
						type="button"
						className="close"
						aria-label="Close"
					>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<hr />
			</div>
		</div>
		// </div>
	);
};
export default Post;
