const listHelper = require('../utils/list_helper');

const oneBlog = [
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0,
	},
];

const multipleBlogs = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0,
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0,
	},
	{
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
		__v: 0,
	},
	{
		_id: '5a422b891b54a676234d17fa',
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 10,
		__v: 0,
	},
	{
		_id: '5a422ba71b54a676234d17fb',
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0,
		__v: 0,
	},
	{
		_id: '5a422bc61b54a676234d17fc',
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
		__v: 0,
	},
];

const multipleBlogsManyTopBloggers = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 0,
		__v: 0,
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 1,
		__v: 0,
	},
	{
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 1,
		__v: 0,
	},
	{
		_id: '5a422b3a1b54a676234d17f1',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 1,
		__v: 0,
	},
	{
		_id: '5a422b891b54a676234d17fa',
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 1,
		__v: 0,
	},
	{
		_id: '5a422ba71b54a676234d17fb',
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 1,
		__v: 0,
	},
	{
		_id: '5a422bc61b54a676234d17fc',
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 1,
		__v: 0,
	},
];

test('dummy returns one', () => {
	expect(listHelper.dummy([])).toBe(1);
});

describe('total likes', () => {
	test('empty list, equals to 0', () => {
		expect(listHelper.totalLikes([])).toBe(0);
	});

	test('when list has only one blog, equals the likes of that', () => {
		expect(listHelper.totalLikes(oneBlog)).toBe(5);
	});

	test('when list has multiple blogs, equals the likes of that', () => {
		expect(listHelper.totalLikes(multipleBlogs)).toBe(36);
	});
});

describe('favourite', () => {
	test('multiple blogs, equals to favourite', () => {
		expect(listHelper.favoriteBlog(multipleBlogs)).toEqual({
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			likes: 12,
		});
	});
});

describe('author most blogs', () => {
	test('multiple blogs, equals to author with most blogs', () => {
		expect(listHelper.mostBlogs(multipleBlogs)).toEqual({
			author: 'Robert C. Martin',
			blogs: 3,
		});
	});

	test('multiple blogs with many top bloggers, equals to first of authors with most blogs', () => {
		expect(listHelper.mostBlogs(multipleBlogsManyTopBloggers)).toEqual({
			author: 'Edsger W. Dijkstra',
			blogs: 3,
		});
	});
});

describe('author most likes', () => {
	test('multiple blogs, equals to author with most likes', () => {
		expect(listHelper.mostLikes(multipleBlogs)).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 17,
		});
	});

	test('multiple blogs with many liked authors, equals to first of authors with most likes', () => {
		expect(listHelper.mostLikes(multipleBlogsManyTopBloggers)).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 3,
		});
	});
});
