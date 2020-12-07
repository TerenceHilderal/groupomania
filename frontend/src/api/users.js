import axios from "axios";

export const token = localStorage.getItem("token");
axios.defaults.headers.common.Authorization = localStorage.getItem("token");
const url_users = "http://localhost:3000/api/users";
export const handleLogin = login => axios.post(`${url_users}/login`, login);
export const handleDelete = () => axios.delete(`${url_users}/delete`);
export const handleSignUp = signUp => axios.post(`${url_users}/signup`, signUp);
export const handleProfile = () => axios.get(`${url_users}/myprofile`);
