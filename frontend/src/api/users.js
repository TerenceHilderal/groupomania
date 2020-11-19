import axios from "axios";

const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = token;

const url_users = "http://localhost:3000/api/users";
export const handleLogin = login => axios.post(`${url_users}/login`, login);
export const handleDelete = () => axios.delete(`${url_users}/delete`);
export const handleSignUp = signUp => axios.post(`${url_users}/signup`, signUp);