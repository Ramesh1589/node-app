const Joi = require('@hapi/joi');

let schema = {}
schema.userLogin = Joi.object().keys({
    id          :    Joi.number().required(),
    number      :    Joi.number().integer().greater(0).required(),
    username    :    Joi.string().min(5).max(10).trim().required(),
    password    :    Joi.string().min(5).max(10).trim().required(),
});

schema.userSignUp = Joi.object().keys({
    first_name  :    Joi.string().trim().min(3).max(10).regex(/[a-zA-Z]/).required(),
    last_name   :    Joi.string().trim().min(5).max(10).regex(/[a-zA-Z]/).required(),
    username    :    Joi.string().min(5).max(10).trim().required(),
    password    :    Joi.string().min(5).max(10).trim().required()
});


module.exports = schema