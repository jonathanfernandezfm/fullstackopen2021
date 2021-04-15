import blogService from '../services/blogs';
import { setNotification } from '../reducers/notificationReducer';

const reducer = (state = [], action) => {
	switch (action.type) {
		case 'CREATE_BLOG':
			return [...state, action.data.blog];
		case 'UPDATE_BLOG':
			return state.map((blog) => (blog.id !== action.data.blog.id ? blog : action.data.blog));
		case 'DELETE_BLOG':
			return state.filter((blog) => blog.id !== action.data.blog.id);
		case 'ADD_COMMENT':
			return state.map((blog) => (blog.id !== action.data.blog.id ? blog : action.data.blog));
		case 'GET_BLOGS':
			return action.data.blogs;
		case 'CLEAR_BLOGS':
			return [];
		default:
			return state;
	}
};

export const getBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll();

		dispatch({
			type: 'GET_BLOGS',
			data: { blogs: sort(blogs) },
		});
	};
};

export const clearBlogs = () => {
	return async (dispatch) => {
		dispatch({
			type: 'CLEAR_BLOGS',
		});
	};
};

export const createBlog = (blog) => {
	return async (dispatch) => {
		try {
			const createdBlog = await blogService.create(blog);

			dispatch({
				type: 'CREATE_BLOG',
				data: { blog: createdBlog },
			});

			dispatch(setNotification(`Blog created: ${createdBlog.title} by ${createdBlog.author}`, 'notification', 5));
		} catch ({ response }) {
			dispatch(setNotification('Error creating blog', 'error', 5));
		}
	};
};

export const deleteBlog = (blog) => {
	return async (dispatch) => {
		try {
			await blogService.deleteBlog(blog.id);

			dispatch({
				type: 'DELETE_BLOG',
				data: { blog },
			});
			dispatch(setNotification(`Blog deleted: ${blog.title} by ${blog.author}`, 'notification', 5));
		} catch ({ response }) {
			dispatch(setNotification('Error deleting blog', 'error', 5));
		}
	};
};

export const addComment = (blog, text) => {
	return async (dispatch) => {
		const comment = await blogService.addComment(blog.id, text);

		blog.comments.push({ id: comment.id, text: comment.text });

		dispatch({
			type: 'ADD_COMMENT',
			data: { blog },
		});
	};
};

export const likeBlog = (blog) => {
	return async (dispatch) => {
		blog.likes++;
		await blogService.update(blog);

		dispatch({
			type: 'UPDATE_BLOG',
			data: { blog: blog },
		});
	};
};

const sort = (blogs) => {
	blogs.sort((a, b) => {
		if (a.likes < b.likes) return 1;
		else if (a.likes > b.likes) return -1;
		else return 0;
	});

	return blogs;
};

export default reducer;
