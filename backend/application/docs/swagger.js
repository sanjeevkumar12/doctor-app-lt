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
                    type: 'apiKey',
                    name: 'Authorization',
                    scheme: 'bearer',
                    in: 'header',
                },
            },
            schemas: {

            }

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