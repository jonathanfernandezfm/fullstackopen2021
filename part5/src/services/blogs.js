import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
	token = `bearer ${newToken}`;
};

const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

const create = async (newObject) => {
	const config = {
		headers: { Authorization: token },
	};

	const response = await axios.post(baseUrl, newObject, config);
	return response.data;
};

const update = async (updateObject) => {
	const config = {
		headers: { Authorization: token },
	};

	const response = await axios.put(`${baseUrl}/${updateObject.id}`, updateObject, config);
	console.log(response);
	return response.data;
};

const deleteBlog = async (blogId) => {
	const config = {
		headers: { Authorization: token },
	};

	const response = await axios.delete(`${baseUrl}/${blogId}`, config);
	return response;
};

const addComment = async (blogId, text) => {
	const response = await axios.post(`${baseUrl}/${blogId}/comments`, { text });
	return response.data;
};

export default { setToken, getAll, create, update, deleteBlog, addComment };
