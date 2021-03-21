const Blog = require('../models/blog');

const initialBlogs = [
	{
		title: 'Blog 1',
		author: 'John Doe',
		url: 'https://www.fullstackopen.com',
		likes: 2,
	},
	{
		title: 'Blog 2',
		author: 'John Doe',
		url: 'https://www.fullstackopen.com',
		likes: 2,
	},
];

const nonExistingId = async () => {
	const blog = new Blog({
		title: 'willremove',
		author: 'John Doe',
		url: 'https://www.fullstackopen.com',
		likes: 2,
	});
	await blog.save();
	await blog.remove();

	return blog._id.toString();
};

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((b) => b.toJSON());
};

module.exports = {
	initialBlogs,
	nonExistingId,
	blogsInDb,
};
