const express = require('express');
const mongoose = require('mongoose');
require('express-async-errors');
const cors = require('cors');
const config = require('./utils/config');
const logger = require('./utils/logger');
const phoneBookRouter = require('./controllers/phonebook');

const app = express();
const middleware = require("./utils/middleware");

logger.info('connecting to', config.DB_URL);

mongoose.set('useFindAndModify', false);

mongoose.connect(config.DB_URL, {
	useNewUrlParser: true, useUnifiedTopology: true,
}).then((result) => {
	logger.info('result', result)
	logger.info('connected to MongoDB')
}).catch((error) => {
	logger.error('error connecting to MongoDB:', error.message)
});

app.use(express.json());
app.use(cors());
app.use(express.static('build'));
app.use(middleware.morganLogger);
app.use('/api/notes', phoneBookRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;