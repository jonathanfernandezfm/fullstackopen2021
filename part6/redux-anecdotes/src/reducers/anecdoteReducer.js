import anecdotesService from '../services/anecdotes';

const reducer = (state = [], action) => {
	switch (action.type) {
		case 'UPDATE_ANECDOTE':
			return state.map((anecdote) => (anecdote.id !== action.data.content.id ? anecdote : action.data.content));
		case 'NEW_ANECDOTE':
			return [...state, action.data];
		case 'INIT_ANECDOTES':
			return action.data;
		default:
			return state;
	}
};

export const vote = (id) => {
	return async (dispatch) => {
		const content = await anecdotesService.vote(id);
		dispatch({
			type: 'UPDATE_ANECDOTE',
			data: {
				content,
			},
		});
	};
};

export const create = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdotesService.createNew(content);
		dispatch({
			type: 'NEW_ANECDOTE',
			data: newAnecdote,
		});
	};
};

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdotesService.getAll();
		dispatch({
			type: 'INIT_ANECDOTES',
			data: anecdotes,
		});
	};
};

export default reducer;
