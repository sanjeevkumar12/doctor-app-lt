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
    /**
	 * @openapi
	 *
	 * /v1/auth/register:
	 *   post:
	 *     summary: Register User
     *     operationId : register-user
     *     produces:
     *        - application/json
	 *     tags:
	 *       - Auth
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Register'
     *           examples:
     *             User:
     *               summary: User Valid Request
     *               value:
     *                 first_name: Adam
     *                 last_name: William
     *                 password: Password@12
     *                 confirm_password: Password@12
     *                 email: test@example.com
	 *     responses:
	 *       '200':
	 *         description: User creation success
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/RegisterSuccess"
     *       '422':
     *         description: User creation failed with errors
	 */
    auth_router.post('/register', register_schema, async (req, res, next) => {
        try{
            let user_and_token = await auth_service.create_user(req)
            let message = 'Please check your email to verify your email address.'
            res.status(201).json({...user_and_token, message
                , success: true})
        }catch (error){
            logger.error(error)
            next(error)
        }
    })
    
    auth_router.post('/change-password',user_auth_middleware, change_password, async (req, res, next) => {
        try{
            let user = await auth_service.change_user_password(req)
    
            let message = 'Password change successfully.'
            res.status(200).json({user, message
                , success: true})
        }catch (error){
            next(error)
        }
    })
    /**
	 * @openapi
	 *
	 * /v1/auth/login:
	 *   post:
	 *     summary: Login User
     *     operationId : login-user
     *     produces:
     *        - application/json
	 *     tags:
	 *       - Auth
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Login'
     *           examples:
     *             User:
     *               summary: User Valid Request
     *               value:
     *                 email: test@example.com
     *                 password: Password@12
	 *     responses:
	 *       '200':
	 *         description: Login success
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/LoginSuccessSchema"
     *       '422':
     *         description: Invalid Credential error
	 */
    auth_router.post('/login', login_schema, async (req, res, next) => {
        try{
            let login_data = await auth_service.login_user(req)
            res.status(201).json({...login_data
                , success: true})
        }catch (error){
            next(error)
        }
    })
    
    /**
	 * @openapi
	 *
	 * /v1/auth/verify/{verifyToken}:
	 *   post:
	 *     summary: Verify Register User
     *     operationId : verify-register-user
     *     produces:
     *        - application/json
	 *     tags:
	 *       - Auth
     *     parameters:
     *       - in : path
     *         name: verifyToken
     *         required: true
     *         description: Token String
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               otp:
     *                 type: integer
     *             required:
     *               - otp
	 *     responses:
	 *       '200':
	 *         description: Email verification
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success: 
     *                   type: boolean
     *       '422':
     *         description: Token validation errors
	 */
    auth_router.post('/verify/:verify_token', async (req, res, next) => {
        let data = req.validate_data || req.body
        try {
            let is_verified = await auth_service.verify_email_address(req.params['verify_token'], data.otp)
            res.json(
                {success: !!is_verified}
            )
        }catch (err){
           next(err)
        }
    })
    
    auth_router.post('/forgot-password/:token_hash/reset/:random_hash', reset_password, async (req, res, next) => {
        try {
            let is_verified = await auth_service.reset_user_password(req)
            res.json(
                {success: true}
            )
        }catch (err){
            next(err)
        }
    })
    
    auth_router.post('/forgot-password', forgot_password_schema, async (req, res, next) => {
        try {
            await auth_service.send_forgot_password_link(req)
            res.json(
                {success: true,  message: 'Please check your email message for instructions to reset the password.'}
            )
        }catch (err){
            next(err)
        }
    })

    /**
	 * @openapi
	 *
	 * /v1/auth/me:
	 *   get:
	 *     summary: Login User Detail
     *     operationId : login-user-detail
     *     produces:
     *        - application/json
	 *     tags:
	 *       - Auth
     *     security:
     *       - bearerAuth : []
	 *     responses:
	 *       '200':
	 *         description: Login success
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/User"
     *       '422':
     *         description: Invalid Credential error
     *         $ref: '#/components/responses/Unauthorized'
     *       '403':
     *         $ref: '#/components/responses/Forbidden'
	 */
    auth_router.get('/me', user_auth_middleware, async (req, res, next) => {
        try {
            res.json(
                req.user
            ) 
        }catch (err){
            next(err)
        }
    })
    
    return auth_router
}