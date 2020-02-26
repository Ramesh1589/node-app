const Joi = require('@hapi/joi');

let schema = {}
schema.ceeateUser = Joi.object().keys({
    firstname   :    Joi.string().trim().required(),
    lastname    :    Joi.string().trim().required(),
    email     :    Joi.string().trim().required(),
  
});

schema.updateUser = Joi.object().keys({
    email     :    Joi.string().trim().optional(),
    firstname :    Joi.string().trim().optional(),
    lastname  :    Joi.string().trim().optional(),
    
});


module.exports = schema