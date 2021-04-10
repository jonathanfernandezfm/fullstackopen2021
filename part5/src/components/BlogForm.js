import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

	const handleCreate = async (event) => {
		event.preventDefault();

		const blog = {
			title: title,
			author: author,
			url: url,
		};

		setTitle('');
		setAuthor('');
		setUrl('');

		createBlog(blog);
	};

	return (
		<>
			<h2>Create a new blog</h2>
			<form className="form" onSubmit={handleCreate}>
				<div>
					title:
					<input
						id="title"
						type="text"
						value={title}
						name="Title"
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author:
					<input
						id="author"
						type="text"
						value={author}
						name="Author"
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url:
					<input
						id="url"
						type="text"
						value={url}
						name="URL"
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button type="submit">create</button>
			</form>
		</>
	);
};

export default BlogForm;
