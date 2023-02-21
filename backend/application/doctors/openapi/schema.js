const SCHEMAS = require('../requests/schemas/doctor')

module.exports = {register : (app, version)=> {
    Object.keys(SCHEMAS).forEach(key => {
        const keyText = key.endsWith('Schema') ? key.substring(0, key.length - 'Schema'.length) : key
        app.swagger.addJoiSchema( SCHEMAS[key], keyText)
    });
}}