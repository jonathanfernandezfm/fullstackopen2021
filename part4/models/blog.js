const mongoose = require('mongoose');
const config = require('../utils/config');
const logger = require('../utils/logger');
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

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
});

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Blog', blogSchema);
