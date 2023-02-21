const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const config = require('../config');
const j2od = require('joi-to-openapi-definition');
 
const securityDefinitions = {
  bearerAuth: {
    type: 'apiKey',
    name: 'Authorization',
    scheme: 'bearer',
    in: 'header',
  },
};

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Clinic Management',
      version: '1.0.0',
    },
    servers: [
      {
        "url": "http://localhost:3000/api/",
        "description": "Localhost dev server"
      }
    ],
    components : {
      securitySchemes : securityDefinitions

    }
  };
  
  const options = {
    swaggerDefinition,
    explorer: true,
    apis: ["./api/routes/router.js", path.join(config.BASE_DIR, 'swagger.yaml')],
  };
const specs = swaggerJsdoc(options);



const setup_api_docs = (app) => {
    app.use("/docs",  swaggerUi.serve, swaggerUi.setup(swaggerDefinition, { explorer: true}))
};

module.exports = setup_api_docs