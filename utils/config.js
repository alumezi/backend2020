/* eslint-disable no-undef */
require('dotenv').config();

const { PORT } = process.env;
let { DB_URL } = process.env;

if (process.env.NODE_ENV === 'test') {
    DB_URL = process.env.TEST_MONGODB_URI;
}

module.exports = {
    DB_URL,
    PORT
}; 