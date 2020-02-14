const Joi = require('@hapi/joi');

let schema = {}
schema.registerEmployee = Joi.object().keys({
    fullName   :    Joi.string().trim().required(),
    empCode    :    Joi.string().trim().required(),
    mobile     :    Joi.string().trim().required(),
    position   :    Joi.string().trim().required(),
});

schema.updateEmployee = Joi.object().keys({
    employeeID         :    Joi.number().required(),
    fullName   :    Joi.string().trim().optional(),
    empCode    :    Joi.string().trim().optional(),
    mobile     :    Joi.string().trim().optional(),
    position   :    Joi.string().trim().optional(),
});


module.exports = schema