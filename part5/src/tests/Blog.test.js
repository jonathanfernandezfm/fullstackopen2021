import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from '../components/Blog';
import BlogForm from '../components/BlogForm';

describe('blog render', () => {
	test('5.13 > renders author and content by default. not url or likes', () => {
		const blog = {
			author: 'John Doe',
			id: '6058fc26397b6900f0a6b80f',
			likes: 101,
			title: 'New Blog 2',
			url: 'https://fullstackopen.com',
		};

		const component = render(<Blog blog={blog} deleteBlog={() => {}} user={null} like={() => {}} />);

		expect(component.container).toHaveTextContent(blog.title);
		expect(component.container).toHaveTextContent(blog.author);
		expect(component.container).not.toHaveTextContent(blog.likes);
		expect(component.container).not.toHaveTextContent(blog.url);
	});

	test('5.14 > renders likes and urls after button click', () => {
		const blog = {
			author: 'John Doe',
			id: '6058fc26397b6900f0a6b80f',
			likes: 101,
			title: 'New Blog 2',
			url: 'https://fullstackopen.com',
		};

		const component = render(<Blog blog={blog} deleteBlog={() => {}} user={null} like={() => {}} />);

		const button = component.getByText('view');
		fireEvent.click(button);

		expect(component.container).toHaveTextContent(blog.url);
		expect(component.container).toHaveTextContent(blog.likes);
	});

	test('5.15 > handleLike called 2 times after 2 clicks', () => {
		const blog = {
			author: 'John Doe',
			id: '6058fc26397b6900f0a6b80f',
			likes: 101,
			title: 'New Blog 2',
			url: 'https://fullstackopen.com',
		};

		const likeHandler = jest.fn();

		const component = render(<Blog blog={blog} deleteBlog={() => {}} user={null} like={likeHandler} />);

		const button = component.getByText('view');
		fireEvent.click(button);

		const buttonLike = component.getByText('like');
		fireEvent.click(buttonLike);
		fireEvent.click(buttonLike);

		expect(likeHandler.mock.calls).toHaveLength(2);
	});
	test('5.16 > new blog form right details', () => {
		const createBlog = jest.fn();

		const component = render(<BlogForm createBlog={createBlog} />);

		const title = component.container.querySelector('#title');
		const author = component.container.querySelector('#author');
		const url = component.container.querySelector('#url');
		const form = component.container.querySelector('form');

		fireEvent.change(title, {
			target: { value: 'New Blog 2' },
		});
		fireEvent.change(author, {
			target: { value: 'John Doe' },
		});
		fireEvent.change(url, {
			target: { value: 'https://fullstackopen.com' },
		});

		fireEvent.submit(form);

		expect(createBlog.mock.calls).toHaveLength(1);
		expect(createBlog.mock.calls[0][0].title).toBe('New Blog 2');
		expect(createBlog.mock.calls[0][0].author).toBe('John Doe');
		expect(createBlog.mock.calls[0][0].url).toBe('https://fullstackopen.com');
	});
});
