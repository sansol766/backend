const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const swagger = require('swagger-express-router');
const swaggerDocument = require('../swagger/EmpDetails.json');
const xxx = require('../swagger/EmpDesignation.json');

const useBasePath = true; //whether to use the basePath from the swagger document when setting up the routes (defaults to false)
const middlewareObj = {
    'empdetails': require('../controller/Employee/EmpDetails.controller.js'),
    'empdesignationdetails' : require('../controller/Employee/EmpDesignation.controller.js')
};
console.log("🚀 ~ file: index.js ~ line 12 ~ middlewareObj", middlewareObj)

swagger.setUpRoutes(middlewareObj, app, xxx, useBasePath);
    
