const Joi = require('@hapi/joi');
const i18n = require('i18n')
const {userSignUp} = require('./validation')

exports.signUpValidator = async(req, res, next) =>{
    const {error, value} = userSignUp.validate(req.body);
    if(error) {
        // console.log("Error::", error)
        return res.status(200).json({
            status: 400, 
            message: i18n.__(`${error.details[0].path.join('_')}.${error.details[0].type}`)
        })
    } 
    next()  
}