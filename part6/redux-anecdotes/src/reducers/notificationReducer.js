const reducer = (state = '', action) => {
	switch (action.type) {
		case 'SET_NOTIFICATION':
			return action.data.notification;
		case 'REMOVE_NOTIFICATION':
			return '';
		default:
			return state;
	}
};

let timeout;

export const setNotification = (notification, time) => {
	return async (dispatch) => {
		dispatch({
			type: 'SET_NOTIFICATION',
			data: {
				notification,
			},
		});

		clearTimeout(timeout);
		timeout = setTimeout(() => {
			dispatch({
				type: 'REMOVE_NOTIFICATION',
			});
		}, time * 1000);
	};
};

export default reducer;
