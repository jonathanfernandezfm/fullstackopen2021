import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Blogs from './components/Blogs';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [notification, setNotification] = useState({});
	const [loginVisible, setLoginVisible] = useState(false);
	const [newBlogVisible, setNewBlogVisible] = useState(false);

	useEffect(() => {
		const getBlogs = async () => {
			const blogs = await blogService.getAll();
			setBlogs(sort(blogs));
		};

		const loggedUser = window.localStorage.getItem('loggedUser');
		if (loggedUser) {
			const user = JSON.parse(loggedUser);
			setUser(user);
			blogService.setToken(user.token);
			getBlogs();
		}
	}, []);

	const sort = (blogs) => {
		blogs.sort((a, b) => {
			if (a.likes < b.likes) return 1;
			else if (a.likes > b.likes) return -1;
			else return 0;
		});

		return blogs;
	};

	const login = async (user) => {
		try {
			const userLogged = await loginService.login(user);

			window.localStorage.setItem('loggedUser', JSON.stringify(userLogged));
			setUser(userLogged);
			setLoginVisible(false);
			blogService.setToken(userLogged.token);
			const blogs = await blogService.getAll();
			setBlogs(sort(blogs));
		} catch ({ response }) {
			setNotification({ message: 'Wrong username or password', type: 'error' });
			setTimeout(() => {
				setNotification(null);
			}, 5000);
		}
	};

	const createBlog = async (blog) => {
		try {
			const createdBlog = await blogService.create(blog);

			setBlogs(sort([...blogs, createdBlog]));
			setNewBlogVisible(false);
			setNotification({
				message: `Blog created: ${createdBlog.title} by ${createdBlog.author}`,
				type: 'notification',
			});
			setTimeout(() => {
				setNotification(null);
			}, 5000);
		} catch ({ response }) {
			setNotification({ message: 'Error creating blog', type: 'error' });
			setTimeout(() => {
				setNotification(null);
			}, 5000);
		}
	};

	const deleteBlog = async (blog) => {
		try {
			await blogService.deleteBlog(blog.id);

			setBlogs(
				sort(
					blogs.filter((b) => {
						console.log(b, blog);
						return b.id !== blog.id;
					})
				)
			);

			setNotification({
				message: `Blog deleted: ${blog.title} by ${blog.author}`,
				type: 'notification',
			});
			setTimeout(() => {
				setNotification(null);
			}, 5000);
		} catch ({ response }) {
			setNotification({ message: 'Error deleting blog', type: 'error' });
			setTimeout(() => {
				setNotification(null);
			}, 5000);
		}
	};

	const handleLike = async (blog) => {
		blog.likes++;
		const newBlog = await blogService.update(blog);
		const blogsUpdated = blogs.map((b) => (b.id === blogs.id ? newBlog : b));

		setBlogs(sort(blogsUpdated));
	};

	const handleLogout = () => {
		setUser(null);
		setLoginVisible(false);
		setBlogs([]);
		window.localStorage.removeItem('loggedUser');
	};

	return (
		<div>
			<Notification notification={notification} />
			{!loginVisible && !user && <button onClick={() => setLoginVisible(true)}>log in</button>}
			{!loginVisible && user && (
				<div>
					<p>
						{user.name} logged in <button onClick={handleLogout}>log out</button>
					</p>
				</div>
			)}
			{loginVisible && !user && (
				<div>
					<LoginForm login={login} />
					<button onClick={() => setLoginVisible(false)}>cancel</button>
				</div>
			)}
			{!newBlogVisible && user && (
				<div>
					<button onClick={() => setNewBlogVisible(true)}>create new blog</button>
				</div>
			)}
			{user && !loginVisible && newBlogVisible && (
				<div>
					<BlogForm createBlog={createBlog} />
					<button onClick={() => setNewBlogVisible(false)}>cancel</button>
				</div>
			)}
			<Blogs blogs={blogs} deleteBlog={deleteBlog} like={handleLike} />
		</div>
	);
};

export default App;
