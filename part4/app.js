const express = require('express');
const app = express();
require('express-async-errors');
const cors = require('cors');
const morgan = require('morgan');
const blogRouter = require('./controllers/blog');
const middleware = require('./utils/middleware');

// EXPRESS CONFIG
morgan.token('body', function (req) {
	return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body '));
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api/blogs', blogRouter);

// MIDDLEWARE
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
