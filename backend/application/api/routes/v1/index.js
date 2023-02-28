module.exports = function (app){
    const auth_router = require('./auth')(app);
    const express = require('express');
    const doc_router = require('./doctors')(app);
    const doctor_service = require('../../../doctors/service')
    const api_router_v1 = express.Router()
    api_router_v1.get('', (req, res, next)=>{
        res.send({
            'API' : req.baseUrl + req.path
        })
    })
    api_router_v1.get('/config', async (req, res, next)=>{
        res.send({
            'doctor' : await doctor_service.configuration()
        })
    })
    api_router_v1.use('/auth', auth_router)
    api_router_v1.use('/doctors', doc_router)
    return api_router_v1
}