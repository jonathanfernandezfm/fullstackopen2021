import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../reducers/blogsReducer';
import { Button, Form } from 'react-bootstrap';

const BlogForm = () => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

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

		dispatch(createBlog(blog));
	};

	if (!user) return null;
	return (
		<>
			<div>
				<h2>Create a new blog</h2>
				<Form className="form" onSubmit={handleCreate}>
					<div>
						title:
						<Form.Control
							id="title"
							type="text"
							value={title}
							name="Title"
							onChange={({ target }) => setTitle(target.value)}
						/>
					</div>
					<div>
						author:
						<Form.Control
							id="author"
							type="text"
							value={author}
							name="Author"
							onChange={({ target }) => setAuthor(target.value)}
						/>
					</div>
					<div>
						url:
						<Form.Control
							id="url"
							type="text"
							value={url}
							name="URL"
							onChange={({ target }) => setUrl(target.value)}
						/>
					</div>
					<Button className="mt-3" type="submit">
						create
					</Button>
				</Form>
			</div>
		</>
	);
};

export default BlogForm;
