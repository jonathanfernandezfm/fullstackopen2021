import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Blogs = () => {
	const blogs = useSelector((state) => state.blogs);

	return (
		<div>
			{blogs.map((blog) => (
				<Link key={blog.id} to={`/blogs/${blog.id}`}>
					<div className="p-3 bg-light mb-3">{blog.title}</div>
				</Link>
			))}
			<Link className="btn btn-primary" to={'/create'}>
				Add new blog
			</Link>
		</div>
	);
};

export default Blogs;
