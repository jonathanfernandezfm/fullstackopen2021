import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './reducers/authReducer';
import blogsReducer from './reducers/blogsReducer';
import usersReducer from './reducers/usersReducer';
import notificationReducer from './reducers/notificationReducer';

const reducer = combineReducers({
	user: authReducer,
	blogs: blogsReducer,
	users: usersReducer,
	notification: notificationReducer,
});

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
