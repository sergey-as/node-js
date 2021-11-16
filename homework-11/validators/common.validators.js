const Joi = require('joi');

const {constants, userRoles} = require('../configs');

module.exports = {
    nameValidator: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim(),
    nameFilterValidator: Joi
        .string()
        .regex(constants.NAME_FILTER_REGEXP)
        .min(1)
        .max(30)
        .trim(),
    emailValidator: Joi
        .string()
        .regex(constants.EMAIL_REGEXP)
        .trim()
        .required(),
    passwordValidator: Joi
        .string()
        .regex(constants.PASSWORD_REGEXP)
        .required(),
    roleValidator: Joi
        .string()
        .valid(...Object.values(userRoles)),
};
