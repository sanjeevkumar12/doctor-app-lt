const GeneralError = require('./throwable');

const handleErrors = (err, req, res, next) => {
    console.log(err.constructor)
    if (err.name === 'GeneralError') {
        res.status(err.getCode()).json(err.getResponseData());
    }else {
        let status = err.status && err.status == 404 ? err.status : 500;
        res.status(status).json({
            status: 'error',
            message: err.message
        });
    }
    next();
}

module.exports = handleErrors;