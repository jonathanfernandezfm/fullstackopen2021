import React, { useState } from 'react';
import blogService from '../services/blogs';
import PropTypes from 'prop-types';

const Blog = ({ blog, user, deleteBlog, update }) => {
	const [showInformation, setShowInformation] = useState(false);

	const blogStyle = {
		padding: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

	const handleLike = async (blog) => {
		blog.likes++;
		await blogService.update(blog);
		update();
	};

	const handleDelete = async (blog) => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			deleteBlog(blog);
		}
	};

	return (
		<div style={blogStyle}>
			{blog.title} {blog.author}
			<button onClick={() => setShowInformation(!showInformation)}>{showInformation ? 'hide' : 'view'}</button>
			{showInformation && (
				<div>
					<p>{blog.url}</p>
					<p>
						likes {blog.likes}{' '}
						<button
							onClick={() => {
								handleLike(blog);
							}}
						>
							like
						</button>
					</p>
					<p>{blog.author}</p>
					{blog.user && user && blog.user.id !== user.id && (
						<button
							onClick={() => {
								handleDelete(blog);
							}}
						>
							delete
						</button>
					)}
				</div>
			)}
		</div>
	);
};

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	user: PropTypes.object,
	deleteBlog: PropTypes.func.isRequired,
	update: PropTypes.func.isRequired,
};

export default Blog;
