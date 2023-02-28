const { bool } = require('joi');
const parse = require('joi-to-json')
const file = require('../api/routes/v1/auth')

function swagger(app) {
    this.swaggerSpec = {
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
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    name: 'Bearer Authentication',
                    scheme: 'bearer',
                    bearerFormat: "JWT",
                    in: 'header',
                    description: "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer <jwt-token>\""
                },
            },
            schemas: {

            },
            "responses": {
                "InvalidApiRequest": {
                  "description": "Invalid Request",
                  "content": {
                    "application/json": {
                      "schema": {
                        "type": "object",
                        "properties": {
                          "errors": {
                            "type": "string",
                            "example": "Missing Authorization Token"
                          },
                          "success": {
                            "type" : "boolean",
                            example: false
                          }
                        }
                      }
                    }
                  }
                },
                "Unauthorized": {
                  "description": "Unauthorized",
                  "content": {
                    "application/json": {
                      "schema": {
                        "type": "object",
                        "properties": {
                          "errors": {
                            "type": "string",
                            "example": "Expired token. Use the refresh token to get a new one"
                          },
                          "success": {
                            "type" : "boolean",
                            example: false
                          }
                        }
                      }
                    }
                  }
                },
                "Forbidden": {
                  "description": "Forbidden",
                  "content": {
                    "application/json": {
                      "schema": {
                        "type": "object",
                        "properties": {
                          "errors": {
                            "type": "string",
                            "example": "You are no longer an active user here"
                          },
                          "success": {
                            "type" : "boolean",
                            example: false
                          }
                        }
                      }
                    }
                  }
                }
              }

        },
        security : {
            bearerAuth : []
        }
    };
    this.swaggerDefinition = {};
    this.app = app;
    this.apis = [];


    this.getOpenAPI = () => {
        return this.swaggerSpec;
    };
    this.addJoiSchema = (schema, object_label) => {
        const jsonSchema = parse(schema, 'open-api')
        this.addSchemaDefinition(object_label, jsonSchema)
    }

    this.addSchemaDefinition = (key, schema) => {
        let schemas = this.getOpenAPI()['components']['schemas'] ? this.getOpenAPI()['components']['schemas'] : {}
        schemas[key] = schema
        this.swaggerSpec['components']['schemas'] = schemas
    }

    this.addRouteForScan = (routeFile) => {
        this.apis.push(routeFile)
    }

    this.serve = (app) => {
        const swaggerUi = require('swagger-ui-express');
        let swaggerJSDoc = require('swagger-jsdoc');
        const options = {
            definition :  this.getOpenAPI(),
            explorer: true,
            apis: this.apis,
        };
        console.log(this.apis)
        this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options), { explorer: true }))
    }
}
module.exports = swagger