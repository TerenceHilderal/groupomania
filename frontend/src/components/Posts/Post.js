import React, { Component } from "react";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import styles from "./Post.module.scss";
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
		// const { posts } = this.state;
		console.log(posts);
		return (
			<div className={styles.post}>
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
