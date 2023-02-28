const db = require('../db')
const {ValidationError, NotFound} = require('../errors/throwable')
const auth_service = require('../auth/service')
const constants = require('./constants');
const { query } = require('../core/logger');

const create_doc = async (req) => {
    let doc_exists = await db.Doctor.findOne({license: req.validate_data.license})
    let errors = {}
    if (doc_exists) {
        errors.licence = 'This licence cannot be used please try with other licence.'
    }
    let user_exists = await auth_service.get_user_by_email(req.validate_data.email)
    if (user_exists) {
        errors.email = 'This email is not available'
    }
    if (Object.keys(errors).length > 0){
        throw new ValidationError(errors)
    }
    let user = await auth_service.create_user(req)
    let data = req.validate_data || req.body
    data.user = user._id;
    let doc = new db.Doctor(data)
    return doc.save()
}

const create_profile_request = async (req) => {
    let doc_exists = await db.Doctor.findOne({license: req.validate_data.license})
    let doc_request_exists = await db.DoctorProfileRequest.findOne({license: req.validate_data.license})
    let errors = {}
    if (doc_exists || doc_request_exists) {
        errors.licence = 'This licence cannot be used please try with other licence.'
    }
    if (Object.keys(errors).length > 0){
        throw new ValidationError(errors)
    }
    let data = req.validate_data || req.body
    let doc = new db.DoctorProfileRequest(data)
    await doc.save()
    return doc
}

const profile_requests = async (req) => {
    let query = {}
    let page = req.query.page || 1
    let limit = req.query.item_per_page || 3
    let sort_field = req.query.sort || 'createdAt'
    let direction = req.query.sort_dir  && req.query.sort_dir == 'asc'  ? 1 : -1
    let search = req.query.search || null
    if (search){
        query = { $or: [{ license: { '$regex':search , '$options' : 'i'}}, { email: { '$regex':search , '$options' : 'i'} }, { phone_number: { '$regex':search , '$options' : 'i'} }] }
    }
    console.log(direction)
    return await db.DoctorProfileRequest.paginate(query , {page , limit, lean: false , sort : {[sort_field]: direction}})
}

const verify_email_address =  async (verify_token) => {
    return auth_service.verify_email_address(verify_token)
}

const list = async (req) => {
    return db.Doctor.paginate()
}

const get_doctor_from_token = async (token) => {
    return db.Doctor.findByToken(token);
}

const add_office_to_doctor = async (req, doctor) => {
    let data = req.validate_data || req.body
    return doctor.add_office(data)
}

const configuration = async() => {
    return {
        medical_specialties: constants.MedicalSpeciality.labels,
        medical_services : constants.MedicalServices.labels
    }
}

module.exports = {
    create_doc,
    list,
    verify_email_address,
    get_doctor_from_token,
    add_office_to_doctor,
    configuration,
    create_profile_request,
    profile_requests
}



