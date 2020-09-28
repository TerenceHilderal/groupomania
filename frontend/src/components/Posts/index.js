import React, { Component } from "react";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import "./Post.scss";
import axios from "axios";

export class Post extends Component {
	constructor(props) {
		super(props);

		this.state = {
			posts: []
		};
	}
	componentDidMount() {
		axios
			.get("http://localhost:3000/api/posts/getPosts")
			.then(response => {
				console.log(response.data);
				this.setState({ posts: response.data });
			})
			.catch(error => console.log({ error }));
	}

	deletePost() {
		axios
			.delete("http://localhost:3000/api/posts/" + this.state.id)
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
			});
	}
	render() {
		const { posts } = this.state;
		console.log(posts);
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
						<button>Tweet</button>

						<hr />
					</form>
				</div>
				{posts.map(post => (
					<div key={post.id}>
						<div className="post__username">
							<p>@{post.User.username}</p>
						</div>
						<hr />
						<div className="post__body">
							<div className="post__header">
								<div className="post__headerText">
									<p>{post.title}</p>
								</div>
								<div className="post__headerDescription">
									<p>{post.content}</p>
								</div>
							</div>
							<img src={post.attachment} width="25%" alt="image" />
							<div className="post__footer">
								<span>Date:{post.createdAt}</span>
								<ChatBubbleOutlineIcon
									font-size="large"
									color="secondary"
									fontSize="small"
								/>
								<button
									onClick={this.deletePost}
									type="button"
									class="close"
									aria-label="Close"
								>
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<hr />
						</div>
					</div>
				))}
			</div>
		);
	}
}

export default Post;
