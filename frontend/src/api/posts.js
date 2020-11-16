import axios from "axios";

const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = token;

const url = "http://localhost:3000/api/posts";

export const getPosts = () => axios.get(`${url}/getPosts`);
export const getPost = UserId => axios.get(`${url}/user/${UserId}`);
export const addPost = formData =>
	axios.post(`${url}/new`, formData, {
		headers: { "Content-Type": "multipart/form-data" }
	});
export const moderate = id => axios.put(`${url}/${id}/moderate`);
export const handleNewCom = (post, newComment) =>
	axios.post(`http://localhost:3000/api/posts/${post.id}/comment`, newComment);

export const handleCom = post => axios.get(`${url}/${post.id}/comments`);
