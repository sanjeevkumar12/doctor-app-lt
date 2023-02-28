const express = require('express');
const logger = require('../../../core/logger');
const doc_router = express.Router();
const {doctor_register, doctor_add_office, doctor_profile_request} = require('./requests/validators');
const {user_auth_middleware, doc_auth_middleware} = require('../../../core/middlewares/auth.middleware');
const doctor_service = require('../../../doctors/service');



module.exports = (app) => {
    app.swagger.addRouteForScan(__filename)
    doc_router.post('', doctor_register, async (req, res, next) => {
        try {
            return res.status(201).json({
                doctor: await doctor_service.create_doc(req), success: true,
                message: 'Your profile created successfully. Please verify your email to start using.'
            })
    
        } catch (error) {
            next(error)
        }
    });
    

     /**
	 * @openapi
	 *
	 * /v1/doctors:
	 *   get:
	 *     summary: Doctor Profile request  
     *     operationId : doctors-profile-request
     *     produces:
     *        - application/json
	 *     tags:
	 *       - Doctors
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/DoctorProfileRequest'
	 *     responses:
	 *       '200':
	 *         description: Doctor Profile request creation success
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/RegisterSuccess"
     *       '422':
     *         description: Doctor Profile creation failed with errors
	 */

    doc_router.get('', async (req, res, next) => {
        try {
            return res.status(200).json({...await doctor_service.list(req)})
        } catch (error) {
            next(error)
        }
    });
    /**
	 * @openapi
	 *
	 * /v1/doctors/profile/request:
	 *   post:
	 *     summary: Doctor Profile request  
     *     operationId : doctors-profile-request
     *     produces:
     *        - application/json
	 *     tags:
	 *       - Doctors
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/DoctorProfileRequest'
	 *     responses:
	 *       '200':
	 *         description: Doctor Profile request creation success
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/RegisterSuccess"
     *       '422':
     *         description: Doctor Profile creation failed with errors
	 */
    doc_router.post('/profile/request', doctor_profile_request, async (req, res, next) => {
        try {
            return res.status(200).json(await doctor_service.create_profile_request(req))
        } catch (error) {
            console.log(error)
            next(error)
        }
    });

    /**
	 * @openapi
	 *
	 * /v1/doctors/profile/request:
	 *   get:
	 *     summary: Doctor Profile list  
     *     operationId : doctors-profile-request-list
     *     parameters:
     *       - in : query
     *         name : page
     *         schema:
     *           type: integer 
     *       - in : query
     *         name : item_per_page
     *         description : Item per page
     *         schema:
     *           type: integer 
     *       - in : query
     *         name : search
     *         description : Search string
     *         schema:
     *           type: string 
     *       - in : query
     *         name : sort
     *         description : sort by
     *         schema:
     *           type: string 
     *       - in : query
     *         name : sort_dir
     *         description : sorting direction
     *         schema:
     *           type: string 
     *     produces:
     *        - application/json
	 *     tags:
	 *       - Doctors
	 *     responses:
	 *       '200':
	 *         description: Doctor Profile request creation success
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/DoctorProfileRequest"
	 */
    doc_router.get('/profile/request', async (req, res, next) => {
        try {
            return res.status(200).json(await doctor_service.profile_requests(req))
        } catch (error) {
            console.log(error)
            next(error)
        }
    });
    
    
    doc_router.get('/profile', doc_auth_middleware, async (req, res, next) => {
        try {
            return res.status(200).json(req.doctor)
        } catch (error) {
            next(error)
        }
    });
    
    doc_router.post('/:doctor/add-office', doc_auth_middleware, doctor_add_office, async (req, res, next) => {
        try {
            return res.status(201).json({success: true, doctor: await doctor_service.add_office_to_doctor(req, req.doctor)})
        } catch (error) {
            next(error)
        }
    });
    
    doc_router.get('/verify/:verify_token/:random_hash', async (req, res, next) => {
        try {
            let is_verified = await doctor_service.verify_email_address(req.params['verify_token'])
            res.json(
                {success: !!is_verified}
            )
        } catch (err) {
            next(err)
        }
    })
    return doc_router
}
