const express = require('express');
const app = express();
const logger = require('./app/lib/logger.js');
const db = require('./app/models/index.js');
const routes = require('./app/routes/routes');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./app/swagger/EmpDetails.json');
const empDesignationSwaggerDocument = require('./app/swagger/EmpDesignation.json');


db.mongoose.connect(db.url).then(() => {
  logger.warn("Connected to the database!");  
}).catch(err => { 
  logger.info("Cannot connect to the database!", err);
  process.exit();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes); 
app.use(express.json());
var options = {
  customCss: '.swagger-ui .topbar { display: none }',
  swaggerOptions: {
      explorer: true,
    validatorUrl: null
  }
};
app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(empDesignationSwaggerDocument,options)
);
app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument,options)
);
var msg = "Hello, world!";  
app.get('/', (req, res) => {  
res.json(msg);
})


const PORT =  8888;
var HOST = 'localhost';
app.listen(PORT, () => {
  logger.warn(`Server started and running on http://${HOST}:${PORT}`);
})
