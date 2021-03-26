import React from 'react';
import Blog from './Blog';

const Blogs = ({ blogs, user, deleteBlog, update }) => {
	return (
		<div>
			<h2>Blogs</h2>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} user={user} update={() => update([...blogs])} />
			))}
		</div>
	);
};

export default Blogs;
