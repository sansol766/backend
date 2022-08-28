const dbConfig = require('../config/db.config.js');
const mongoose = require('mongoose');

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

module.exports = db;