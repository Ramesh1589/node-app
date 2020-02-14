const Joi = require('@hapi/joi');

let schema = {}
schema.registerEmployee = Joi.object().keys({
    first_name   :    Joi.string().trim().required(),
    emp_code    :    Joi.string().trim().required(),
    mobile     :    Joi.string().trim().required(),
    position   :    Joi.string().trim().required(),
});

schema.updateEmployee = Joi.object().keys({
    first_name   :    Joi.string().trim().optional(),
    emp_code    :    Joi.string().trim().optional(),
    mobile     :    Joi.string().trim().optional(),
    position   :    Joi.string().trim().optional(),
});


module.exports = schema