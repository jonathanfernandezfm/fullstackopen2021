const Blog = require('../models/blog');
const User = require('../models/user');

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

const initialUsers = [
	{
		name: 'Name 1',
		username: 'name1',
		password: 'password1',
	},
	{
		name: 'Name 2',
		username: 'name2',
		password: 'password2',
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

const usersInDb = async () => {
	const users = await User.find({});
	return users.map((u) => u.toJSON());
};

module.exports = {
	initialBlogs,
	initialUsers,
	nonExistingId,
	blogsInDb,
	usersInDb,
};
