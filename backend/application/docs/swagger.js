const parse = require('joi-to-json')


function swagger(app) {
    this.swaggerSpec = null;
    this.app = app;    
    this.getOpenAPI = () => {
        if (!this.swaggerSpec) {
            let swaggerJSDoc = require('swagger-jsdoc')
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
                components: {
                    securitySchemes: securityDefinitions

                }
            };
            const options = {
                swaggerDefinition,
                explorer: true,
                apis: ["./api/routes/router.js"],
            };
            this.swaggerSpec = swaggerJSDoc(options)
        }
        return this.swaggerSpec;
    },
    this.addJoiSchema = (schema, object_label) => {
        const jsonSchema = parse(schema,'open-api')
        this.addSchemaDefinition(object_label, jsonSchema)
    }

    this.addSchemaDefinition = (key, schema) => {
        let schemas = this.getOpenAPI()['components']['schemas'] ? this.getOpenAPI()['components']['schemas'] : {}
        schemas[key] = schema
        this.swaggerSpec['components']['schemas'] = schemas
    }

    this.serve = (app) => {
        const swaggerUi = require('swagger-ui-express');
        this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(this.getOpenAPI(), { explorer: true }))
    }
}
module.exports = swagger