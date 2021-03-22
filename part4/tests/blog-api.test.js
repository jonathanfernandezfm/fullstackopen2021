const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcrypt');

describe('blogs', () => {
	beforeEach(async () => {
		await Blog.deleteMany({});
		await Blog.insertMany(helper.initialBlogs);

		await User.deleteMany({});

		const passwordHash = await bcrypt.hash('sekret', 10);
		const user = new User({ username: 'root', passwordHash });

		await user.save();
	});

	describe('getting blogs', () => {
		test('blogs are returned as json', async () => {
			await api
				.get('/api/blogs')
				.expect(200)
				.expect('Content-Type', /application\/json/);
		});

		test('all blogs are returned', async () => {
			const response = await api.get('/api/blogs');

			expect(response.body).toHaveLength(helper.initialBlogs.length);
		});

		test('unique identifier named id', async () => {
			const response = await api.get('/api/blogs');

			response.body.forEach((b) => {
				expect(b.id).toBeDefined();
			});

			expect(response.body).toHaveLength(helper.initialBlogs.length);
		});
	});

	describe('getting specific blog', () => {
		test('success with a valid id', async () => {
			const blogs = await helper.blogsInDb();
			const blogToGet = blogs[0];

			await api.get(`/api/blogs/${blogToGet.id}`).expect(200);
		});

		test('expect 404 for not found id', async () => {
			const id = await helper.nonExistingId();
			await api.get(`/api/blogs/${id}`).expect(404);
		});

		test('expect 400 for invalid id', async () => {
			const invalidId = '5a3d5da5907008112312a82a3445';
			await api.get(`/api/blogs/${invalidId}`).expect(400);
		});
	});

	describe('creating blogs', () => {
		test('a valid blog can be added', async () => {
			const newBlog = {
				title: 'New Blog',
				author: 'John Doe',
				url: 'https://www.fullstackopen.com',
				likes: 2,
			};

			const loginData = {
				username: 'root',
				password: 'sekret',
			};

			const res = await api
				.post('/api/login')
				.send(loginData)
				.expect(200)
				.expect('Content-Type', /application\/json/);

			const token = res.body.token;

			await api
				.post('/api/blogs')
				.send(newBlog)
				.set({ Authorization: `Bearer ${token}` })
				.expect(201)
				.expect('Content-Type', /application\/json/);

			const response = await api.get('/api/blogs');
			const contents = response.body.map((r) => r.title);

			expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
			expect(contents).toContain('New Blog');
		});

		test('no authentication throws 401', async () => {
			const newBlog = {
				title: 'New Blog',
				author: 'John Doe',
				url: 'https://www.fullstackopen.com',
				likes: 2,
			};

			await api
				.post('/api/blogs')
				.send(newBlog)
				.expect(401)
				.expect('Content-Type', /application\/json/);
		});

		test('expect default value of likes 0', async () => {
			const newBlog = {
				title: 'New Blog',
				author: 'John Doe',
				url: 'https://www.fullstackopen.com',
			};

			const loginData = {
				username: 'root',
				password: 'sekret',
			};

			const res = await api
				.post('/api/login')
				.send(loginData)
				.expect(200)
				.expect('Content-Type', /application\/json/);

			const token = res.body.token;

			const response = await api
				.post('/api/blogs')
				.send(newBlog)
				.set({ Authorization: `Bearer ${token}` })
				.expect(201)
				.expect('Content-Type', /application\/json/);

			expect(response.body.likes).toBe(0);
		});

		test('expect 400 if missing title/url', async () => {
			const newBlog = {
				author: 'John Doe',
			};

			const loginData = {
				username: 'root',
				password: 'sekret',
			};

			const res = await api
				.post('/api/login')
				.send(loginData)
				.expect(200)
				.expect('Content-Type', /application\/json/);

			const token = res.body.token;

			await api
				.post('/api/blogs')
				.send(newBlog)
				.set({ Authorization: `Bearer ${token}` })
				.expect(400);
		});
	});

	describe('removing blogs', () => {
		test('success with a valid id', async () => {
			const blogs = await helper.blogsInDb();
			const blogToGet = blogs[0];

			await api.delete(`/api/blogs/${blogToGet.id}`).expect(204);
		});
	});

	describe('updating blogs', () => {
		test('success with a valid id', async () => {
			const newBlog = {
				title: 'New Blog',
				author: 'John Doe',
				url: 'https://www.fullstackopen.com',
				likes: 2,
			};

			const blogs = await helper.blogsInDb();
			const existingBlog = blogs[0];

			await api
				.put(`/api/blogs/${existingBlog.id}`)
				.send(newBlog)
				.expect(200)
				.expect('Content-Type', /application\/json/);
		});
	});
});

describe('users', () => {
	beforeEach(async () => {
		await User.deleteMany({});
		await User.insertMany(helper.initialUsers);
	});

	describe('getting users', () => {
		test('get all users', async () => {
			await api
				.get('/api/users')
				.expect(200)
				.expect('Content-Type', /application\/json/);
		});
	});

	describe('creating users', () => {
		test('invalid users are not added', async () => {
			const user = {
				password: 'test',
			};
			await api.post('/api/users').send(user).expect(400);
		});

		test('invalid users are not added', async () => {
			const user = {
				name: 'something',
				password: 'test',
				username: 'name1',
			};
			await api.post('/api/users').send(user).expect(400);
		});
	});
});

afterAll(() => {
	mongoose.connection.close();
});
