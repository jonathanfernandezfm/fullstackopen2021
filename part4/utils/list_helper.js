const dummy = () => {
	return 1;
};

const totalLikes = (blogs) => {
	const reducer = (sum, item) => {
		return sum + item.likes;
	};

	return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
	const max = Math.max.apply(
		Math,
		blogs.map((b) => b.likes)
	);
	const blog = blogs.find((b) => b.likes === max);
	return {
		title: blog.title,
		author: blog.author,
		likes: blog.likes,
	};
};

const mostBlogs = (blogs) => {
	const reducer = (sum, item) => {
		if (!sum[item.author]) sum[item.author] = 1;
		else sum[item.author]++;
		return sum;
	};

	const authors = blogs.reduce(reducer, []);
	const max = Math.max.apply(
		Math,
		Object.keys(authors).map((b) => authors[b])
	);

	const mostBlogsAuthor = Object.keys(authors).find((a) => authors[a] === max);

	return {
		author: mostBlogsAuthor,
		blogs: max,
	};
};

const mostLikes = (blogs) => {
	const reducer = (sum, item) => {
		if (!sum[item.author]) sum[item.author] = item.likes;
		else sum[item.author] += item.likes;
		return sum;
	};

	const authors = blogs.reduce(reducer, []);
	const max = Math.max.apply(
		Math,
		Object.keys(authors).map((b) => authors[b])
	);

	const mostBlogsAuthor = Object.keys(authors).find((a) => authors[a] === max);

	return {
		author: mostBlogsAuthor,
		likes: max,
	};
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
};
