import React from 'react';
import Blog from './Blog';

const Blogs = ({ blogs, user, deleteBlog, like }) => {
	return (
		<div>
			<h2>Blogs</h2>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} user={user} like={like} />
			))}
		</div>
	);
};

export default Blogs;
