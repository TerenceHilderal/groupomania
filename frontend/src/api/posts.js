import axios from "axios";

const url = "http://localhost:3000/api/posts";

export const getPosts = () =>
	axios.get(`${url}/getPosts`, {
		headers: {
			Authorization: localStorage.getItem("token")
		}
	});

export const getPost = UserId =>
	axios.get(`${url}/user/${UserId}`, {
		headers: {
			Authorization: localStorage.getItem("token")
		}
	});

export const addPost = formData =>
	axios.post(`${url}/new`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: localStorage.getItem("token")
		}
	});

export const moderate = id =>
	axios.put(`${url}/${id}/moderate`, {
		headers: {
			Authorization: localStorage.getItem("token")
		}
	});

export const deletePost = id =>
	axios.delete(`${url}/${id}`, {
		headers: {
			Authorization: localStorage.getItem("token")
		}
	});
