const jwt = require('jsonwebtoken');
const logger = require('./logger');
const User = require('../models/user');

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

const userExtractor = async (request, response, next) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	const user = await User.findById(decodedToken.id);
	request.user = user;
	next();
};

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		const token = authorization.substring(7);
		if (!token) return response.status(401).json({ error: 'token missing or invalid' });
		request.token = token;
	}

	next();
};

const errorHandler = (error, request, response, next) => {
	logger.error(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({
			error: 'invalid token',
		});
	}

	next(error);
};

module.exports = {
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor,
};
