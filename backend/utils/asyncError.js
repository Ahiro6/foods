const AppError = require("./AppError");

module.exports.asyncError = (fn) => {

    return function(req, res, next) {

        const statusCode = res.statusCode ? res.statusCode : 500
        
        fn(req, res, next).catch(e => {
            console.log(e)
            res.status(statusCode).send(e)});
        
    }
}