// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Post from "./index";

// const PostComponent = () => {
// 	const [posts, setPosts] = useState(null);

// 	const getPosts = () => {
// 		axios
// 			.get("http://localhost:3000/api/posts/getPosts")
// 			.then(response => {
// 				console.log(response.data.map(post => post.UserId));
// 				setPosts(response.data);
// 			})
// 			.catch(error => console.log({ error }));
// 	};
// 	useEffect(() => {
// 		if (!posts) {
// 			getPosts();
// 		} else {
// 			console.log(posts);
// 			console.log(posts.map(post => post.id));
// 		}
// 	});

// 	return <Post posts={posts} getPosts={getPosts} />;
// };
// export default PostComponent;
