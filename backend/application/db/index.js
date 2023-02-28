const {User} = require('../auth/models')
const {Doctor, DoctorQualification, DoctorOffice, DoctorProfileRequest} = require('../doctors/models')


exports.User = User
exports.Doctor = Doctor
exports.DoctorQualification = DoctorQualification
exports.DoctorOffice = DoctorOffice
exports.DoctorProfileRequest = DoctorProfileRequest
// module.exports = db
