const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
	const result = await Blog.find({});
	response.json(result);
});

blogRouter.post('/', async (request, response) => {
	const blog = new Blog(request.body);

	const result = await blog.save();
	response.status(201).json(result);
});

blogRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id);

	if (blog) response.json(blog);
	else response.status(404).end();
});

blogRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id);

	response.status(204).end();
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
