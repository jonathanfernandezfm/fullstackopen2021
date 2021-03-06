const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const { userExtractor } = require('../utils/middleware');

blogRouter.get('/', async (request, response) => {
	const result = await Blog.find({})
		.populate('user', { id: 1, username: 1, name: 1 })
		.populate('comments', { id: 1, text: 1 });
	response.json(result);
});

blogRouter.post('/', userExtractor, async (request, response) => {
	const user = request.user;
	const blog = new Blog({ ...request.body, user: user.id });
	user.blogs = user.blogs.concat(blog);

	const result = await (await blog.save()).execPopulate('user', { id: 1, username: 1, name: 1 });
	await user.save();
	response.status(201).json(result);
});

blogRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id).populate('user');

	if (blog) response.json(blog);
	else response.status(404).end();
});

blogRouter.post('/:id/comments', async (request, response) => {
	const comment = new Comment({ ...request.body, blog: request.params.id });
	const blog = await Blog.findById(request.params.id);

	blog.comments = blog.comments.concat(comment);

	const result = await comment.save();
	await blog.save();
	response.status(201).json(result);
});

blogRouter.delete('/:id', userExtractor, async (request, response) => {
	const user = request.user;
	const blog = await Blog.findById(request.params.id);
	if (!blog) return response.status(404).end();

	if (user.id === blog.user.toString()) {
		await Blog.findByIdAndRemove(request.params.id);
		response.status(204).end();
	} else {
		response.status(401).json({ error: 'unauthorized' });
	}
});

blogRouter.put('/:id', async (request, response) => {
	const body = request.body;

	const blog = {
		likes: body.likes,
		title: body.title,
		author: body.author,
		url: body.url,
	};

	const updated = await Blog.findByIdAndUpdate(request.params.id, blog, {
		runValidators: true,
		new: true,
		context: 'query',
	});
	response.json(updated);
});

module.exports = blogRouter;
