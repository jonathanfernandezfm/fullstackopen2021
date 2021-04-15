import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';

const Menu = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => {
		return state.user;
	});

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<div>
			{user && (
				<Nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
					<div>
						<Link className="px-3 text-white" to="/blogs">
							Blogs
						</Link>
						<Link className="px-3 text-white" to="/users">
							Users
						</Link>
					</div>

					<span className="text-white">
						{user.name} logged in{' '}
						<button className="btn btn-danger" onClick={handleLogout}>
							log out
						</button>
					</span>
				</Nav>
			)}
		</div>
	);
};

export default Menu;
