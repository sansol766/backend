const express = require('express');
var app = express.Router();
const brookbonds = require('./brookbonds/brookbonds.js');
const employee = require('./Employee/employee');
app.use('/',brookbonds,employee)
module.exports = app

