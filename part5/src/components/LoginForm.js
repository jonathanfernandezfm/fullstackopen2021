import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/authReducer';
import { Button, Form } from 'react-bootstrap';

const LoginForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	const handleLogin = async (event) => {
		event.preventDefault();

		setUsername('');
		setPassword('');

		const user = {
			username,
			password,
		};

		dispatch(login(user));
	};

	return (
		<div>
			<div>
				<h2>Login</h2>
				<Form onSubmit={handleLogin}>
					<div>
						username:
						<Form.Control
							id="username"
							type="text"
							value={username}
							name="Username"
							onChange={({ target }) => setUsername(target.value)}
						/>
					</div>
					<div>
						password:
						<Form.Control
							id="password"
							type="password"
							value={password}
							name="Password"
							onChange={({ target }) => setPassword(target.value)}
						/>
					</div>
					<Button className="mt-3" type="submit">
						login
					</Button>
				</Form>
			</div>
		</div>
	);
};

export default LoginForm;
