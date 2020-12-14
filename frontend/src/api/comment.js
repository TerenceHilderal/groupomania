import axios from "axios";

const url = "http://localhost:3000/api/posts";

export const handleNewCom = (post, newComment) =>
	axios.post(`http://localhost:3000/api/posts/${post.id}/comment`, newComment, {
		headers: {
			Authorization: localStorage.getItem("token")
		}
	});

export const handleComs = post =>
	axios.get(`${url}/${post.id}/comments`, {
		headers: {
			Authorization: localStorage.getItem("token")
		}
	});
