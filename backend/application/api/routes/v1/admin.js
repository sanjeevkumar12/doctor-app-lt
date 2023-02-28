const express = require('express');
const logger = require('../../../core/logger');
const auth_router = express.Router();
const {register_schema, forgot_password_schema , login_schema , reset_password, change_password} = require('./requests/validators');
const {user_auth_middleware} = require('../../../core/middlewares/auth.middleware');
const auth_service  = require('../../../auth/service');

module.exports = (app) => {
    app.swagger.addRouteForScan(__filename)
    auth_router.get('', (req, res, next)=>{
        res.send({
            'API' : req.baseUrl + req.path
        })
    })
}