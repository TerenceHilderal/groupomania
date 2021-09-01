import axios from 'axios';

// export const token = localStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

const url_users = 'https://groupomania-master.herokuapp.com/api/users';
export const handleLogin = (login) =>
	axios.post(`${url_users}/login`, login, {
		headers: {
			Authorization: localStorage.getItem('token'),
		},
	});
export const handleDelete = () =>
	axios.delete(`${url_users}/delete`, {
		headers: {
			Authorization: localStorage.getItem('token'),
		},
	});
export const handleSignUp = (signUp) =>
	axios.post(`${url_users}/signup`, signUp, {
		headers: {
			Authorization: localStorage.getItem('token'),
		},
	});
export const handleProfile = () =>
	axios.get(`${url_users}/myprofile`, {
		headers: {
			Authorization: localStorage.getItem('token'),
		},
	});
