import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { Link } from 'react-router-dom';

const User = () => {
	const users = useSelector((state) => state.users);

	const match = useRouteMatch('/users/:id');
	const user = match ? users.find((u) => u.id === match.params.id) : null;

	if (!user) {
		return null;
	}

	return (
		<div>
			<h2>
				<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#000000" viewBox="0 0 256 256">
					<rect width="256" height="256" fill="none"></rect>
					<circle
						cx="128"
						cy="96"
						r="64"
						fill="none"
						stroke="#000000"
						strokeMiterlimit="10"
						strokeWidth="16"
					></circle>
					<path
						d="M30.989,215.99064a112.03731,112.03731,0,0,1,194.02311.002"
						fill="none"
						stroke="#000000"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="16"
					></path>
				</svg>

				{user.name}
			</h2>
			<h3 className="my-3">added blogs</h3>

			{user.blogs.map((b) => (
				<Link key={b.id} to={`/blogs/${b.id}`}>
					<div className="p-3 bg-light mb-3">{b.title}</div>
				</Link>
			))}
		</div>
	);
};

export default User;
