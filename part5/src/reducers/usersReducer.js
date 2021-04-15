import usersService from '../services/users';

const reducer = (state = [], action) => {
	switch (action.type) {
		case 'GET_USERS':
			return action.data.users;
		case 'CLEAR_USERS':
			return [];
		default:
			return state;
	}
};

export const getUsers = () => {
	return async (dispatch) => {
		const users = await usersService.getAll();

		dispatch({
			type: 'GET_USERS',
			data: { users },
		});
	};
};

export const clearUsers = () => {
	return async (dispatch) => {
		dispatch({
			type: 'CLEAR_USERS',
		});
	};
};

export default reducer;
