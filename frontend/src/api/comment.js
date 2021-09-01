import axios from 'axios';

const url = 'https://groupomania-master.herokuapp.com/api/posts';

export const handleNewCom = (post, newComment) =>
	axios.post(
		`https://groupomania-master.herokuapp.com/api/posts/${post.id}/comment`,
		newComment,
		{
			headers: {
				Authorization: localStorage.getItem('token'),
			},
		},
	);

export const handleComs = (post) =>
	axios.get(`${url}/${post.id}/comments`, {
		headers: {
			Authorization: localStorage.getItem('token'),
		},
	});
