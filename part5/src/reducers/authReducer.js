import loginService from '../services/login';
import blogService from '../services/blogs';
import { getBlogs, clearBlogs } from './blogsReducer';
import { setNotification } from './notificationReducer';
import { getUsers } from './usersReducer';

const reducer = (state = null, action) => {
	switch (action.type) {
		case 'SET_USER':
			return action.data.user;
		case 'LOGOUT':
			return null;
		case 'LOGIN':
			return action.data.user;
		default:
			return state;
	}
};

export const setUser = (user) => {
	return async (dispatch) => {
		blogService.setToken(user.token);

		dispatch({
			type: 'SET_USER',
			data: {
				user,
			},
		});

		dispatch(getBlogs());
		dispatch(getUsers());
	};
};

export const login = (user) => {
	return async (dispatch) => {
		try {
			const userLogged = await loginService.login(user);
			window.localStorage.setItem('loggedUser', JSON.stringify(userLogged));
			blogService.setToken(userLogged.token);

			dispatch({
				type: 'LOGIN',
				data: {
					user: userLogged,
				},
			});

			dispatch(getBlogs());
			dispatch(getUsers());
		} catch (err) {
			dispatch(setNotification('Wrong username or password', 'error', 5));
		}
	};
};

export const logout = () => {
	return async (dispatch) => {
		window.localStorage.removeItem('loggedUser');

		dispatch({
			type: 'LOGOUT',
		});

		dispatch(clearBlogs());
	};
};

export default reducer;
