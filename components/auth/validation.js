const Joi = require('@hapi/joi');

let schema = {}
schema.userLogin = Joi.object().keys({
    username          :    Joi.string().trim().required(),
    password        :    Joi.string().trim().required(),
});


module.exports = schema