import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

const createNew = async (content) => {
	const object = { content, votes: 0 };
	const response = await axios.post(baseUrl, object);
	return response.data;
};

const vote = async (id) => {
	const { data: anecdote } = await axios.get(`${baseUrl}/${id}`);
	const { data: anecdoteChanged } = await axios.patch(`${baseUrl}/${id}`, { votes: anecdote.votes + 1 });
	return anecdoteChanged;
};

export default { getAll, createNew, vote };
