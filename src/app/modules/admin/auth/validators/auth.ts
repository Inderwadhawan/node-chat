const Joi = require('joi');

export const adminAuthValidators = {
    login:Joi.object({
     password: Joi.string().required(), // id is required and must be a string
     email: Joi.string().required(),
     }),
 };