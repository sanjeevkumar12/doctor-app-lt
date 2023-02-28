const db = require('../db')
const settings = require('../config')
const jwt = require('jsonwebtoken');
const {ValidationError, NotFound} = require('../errors/throwable')
var otpGenerator = require('../../application//core/helpers/otp');
const {send_user_verification_email, send_user_forgot_password_link } = require('../auth/emails')

exports.create_user = async (req) => {
    let data = req.validate_data || req.body
    const user_exists = await db.User.findOne({ email: data.email });
    if (user_exists) {
        throw new ValidationError({'email' : 'This email is not available'})
    }
    const today = new Date();
    const exp = new Date(today);
    const otp = otpGenerator(6)
    exp.setDate(today.getDate() + settings.JWT_SETTINGS.verifyEmailExpirationMinutes);
    
    const user = new db.User(data);
    let jwt_token = await jwt.sign({
        otp: otp,
        hash: user._id,
        type: 'verify-email',
        iat: Math.floor(Date.now() / 1000) - 30,
        exp: parseInt(exp.getTime() / 1000),
    }, settings.JWT_SETTINGS.secret);
    
    await user.save();
    await send_user_verification_email(req, user, otp)
    return {
        user,
        token : jwt_token
    }
}

exports.get_user_by_email = async (email) => {
    return db.User.findOne({ email: email });
}


exports.verify_email_address = async (verify_token, otp) => {
    return await db.User.verify_email(verify_token, otp)
}


exports.send_forgot_password_link = async (req) => {
    let data = req.validate_data || req.body
    let user = await db.User.findOne({email: data.email});
    if (user) {
        await send_user_forgot_password_link(req, user, data.client_url)
    }
    return true
}

exports.get_user_from_token = async (token) => {
   return await db.User.findByToken(token);
}

exports.reset_user_password = async (req) => {
    let data = req.validate_data || req.body
    let user = await db.User.findByToken(req.params['token_hash']);
    if (!user) {
        throw new NotFound('This is not valid link')
    }
    if (await user.comparePassword(data.new_password)) {
        throw new ValidationError([{'auth_error': 'This new password is same as your old password.'}])
    }
    else{
        user.password = data.new_password
        user.save()
    }
    return true
}

exports.change_user_password = async (req) => {
    let data = req.validate_data || req.body
    let user = req.user
    if (!user) {
        throw new NotFound('This is not valid link')
    }
    if (!await user.comparePassword(data.current_password)) {
        throw new ValidationError({'current_password': 'Your current password is wrong.'})
    }
    else if (!await user.comparePassword(data.new_password)) {
        throw new ValidationError({'new_password': 'This new password is same as your old password.'})
    }
    else{
        user.password = data.new_password
        user.save()
    }
    return true
}

exports.login_user = async (req) => {
    let data = req.validate_data || req.body
    let user = await db.User.findOne({email: data.email});
    if(user){
        if(!user.is_email_verified){
            await send_user_verification_email(req, user)
            throw new ValidationError({'auth_error' : 'The email associated with this account is not verified. Please verify your email address.'})
        }
        else if(user.is_blocked){
            throw new ValidationError({'auth_error' : 'The given account is blocked please contact administrator for it.'})
        }
        else if (!await user.comparePassword(data.password)){
            throw new ValidationError({'auth_error' : 'Entered Email and Password are not correct.'})
        }else{
            return {
                user,
                token : await user.generateJWT('login-token', req.ip)
            }
        }
    }else{
        throw new ValidationError({'auth_error' : 'Entered Email and Password are not correct.'})
    }
}
