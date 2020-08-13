const Joi = require('@hapi/joi');

let schema = {}
schema.userLogin = Joi.object().keys({
    id          :    Joi.number().required(),
    username    :    Joi.string().min(5).max(10).trim().required(),
    password    :    Joi.string().min(5).max(10).trim().required(),
});


module.exports = schema