import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import { setUser } from './reducers/authReducer';
import UsersInfo from './components/UsersInfo';
import User from './components/User';
import Menu from './components/Menu';

const App = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => {
		return state.user;
	});

	useEffect(() => {
		const user = window.localStorage.getItem('loggedUser');
		if (user) {
			const userObject = JSON.parse(user);
			dispatch(setUser(userObject));
		}
	}, []);

	return (
		<div className="container">
			<Menu />
			<h1 className="text-center my-4">Blogs</h1>

			<Notification />

			<Switch>
				<Route path="/login">{user ? <Redirect to="/blogs" /> : <LoginForm />}</Route>
				<Route path="/users/:id">{user ? <User /> : <Redirect to="/login" />}</Route>
				<Route path="/users">{user ? <UsersInfo /> : <Redirect to="/login" />}</Route>
				<Route path="/blogs/:id">{user ? <Blog /> : <Redirect to="/login" />}</Route>
				<Route path="/blogs">{user ? <Blogs /> : <Redirect to="/login" />}</Route>
				<Route path="/create">{user ? <BlogForm /> : <Redirect to="/login" />}</Route>
			</Switch>
		</div>
	);
};

export default App;
