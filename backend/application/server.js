const express = require('express');
const path = require('path');
const compression = require('compression');
const cors = require('cors');
const createError = require('http-errors');
const logger = require('./core/logger')
const connectDB = require('./core/db');
const api_router  = require('./routes');
const handleErrors = require('../application/errors/handlers');
const config = require('./config');
const Swagger = require('./docs/swagger');

const create_server = () => {
    const app = express();
    app.config = config;
    app.logger = logger;
    connectDB(app);
    app.swagger = new Swagger(app);
    app.use(cors())
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(compression())
    app.use('/api', api_router(app))
    app.swagger.serve();
    app.use(express.static(path.join(__dirname, 'public')));
    app.get('', function (req, res) {
        res.json({
            status: 'API Its Working',
            message: 'Welcome to User Management APP crafted with love!'
        });
    });
    
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        next(createError(404));
    });



    // error handler
    app.use(handleErrors);
    
    
    logger.info(config)
    logger.info(`
        ################################################
            🏁  Server listening on port ${config.APP_PORT}🏁 
        ################################################`);
    return app
}


module.exports = create_server;
