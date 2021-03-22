const config = require('./utils/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('express-async-errors');
const cors = require('cors');
const morgan = require('morgan');
const blogRouter = require('./controllers/blog');
const usersRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

// DATABASE CONNECTION
const mongoUrl = config.MONGODB_URI;

mongoose
	.connect(mongoUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => logger.info('Database connected'))
	.catch((error) => logger.error('error connecting to MongoDB:', error.message));

// EXPRESS CONFIG
morgan.token('body', function (req) {
	return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body '));
app.use(cors());
app.use(express.json());

// TOKEN EXTRACTOR
app.use(middleware.tokenExtractor);

// ROUTES
app.use('/api/blogs', blogRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

// MIDDLEWARE
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
