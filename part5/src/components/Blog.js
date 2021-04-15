import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { addComment } from '../reducers/blogsReducer';
import { Button, Form, ListGroup } from 'react-bootstrap';

const Blog = () => {
	const [text, setText] = useState('');

	const dispatch = useDispatch();
	const blogs = useSelector((state) => state.blogs);

	const match = useRouteMatch('/blogs/:id');
	const blog = match ? blogs.find((b) => b.id === match.params.id) : null;

	const handleNewComment = (event) => {
		console.log('asd');
		event.preventDefault();
		dispatch(addComment(blog, text));
		setText('');
	};

	if (!blog) {
		return null;
	}

	return (
		<div className="blog">
			<h2>{blog.title}</h2>
			<a href={blog.url}>{blog.url}</a>
			<div className="mt-3 mb-2">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256">
					<rect width="256" height="256" fill="none"></rect>
					<path
						d="M128,216S28,160,28,92A52.00881,52.00881,0,0,1,128.00008,71.965l-.00019.00008A52.00881,52.00881,0,0,1,228,92C228,160,128,216,128,216Z"
						fill="none"
						stroke="#000000"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="16"
					></path>
				</svg>
				{blog.likes}
			</div>
			<div>added by {blog.user.name}</div>
			<h3 className="mt-5">Comments</h3>

			<Form onSubmit={handleNewComment}>
				<Form.Label htmlFor="comment" className="form-label">
					Add a comment
				</Form.Label>
				<Form.Control
					id="comment"
					className="mt-2"
					type="text"
					value={text}
					onChange={(e) => {
						setText(e.target.value);
					}}
				/>
				<Button type="submit" className="mt-3">
					Send
				</Button>
			</Form>

			<ListGroup className="my-3">
				{blog.comments.map((comment) => (
					<ListGroup.Item key={comment.id}>{comment.text}</ListGroup.Item>
				))}
			</ListGroup>
		</div>
	);
};

export default Blog;
