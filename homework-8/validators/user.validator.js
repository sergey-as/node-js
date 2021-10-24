const Joi = require('joi');

const {constants, userRoles} = require('../configs');

const createUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    email: Joi
        .string()
        .regex(constants.EMAIL_REGEXP)
        .trim()
        .required(),
    role: Joi
        .string()
        .allow(...Object.values(userRoles)),
    password: Joi
        .string()
        .regex(constants.PASSWORD_REGEXP)
        .required(),
});

const emailUserValidator = Joi.object({
    email: Joi
        .string()
        .regex(constants.EMAIL_REGEXP)
        .trim()
        .required(),
});

const passwordUserValidator = Joi.object({
    password: Joi
        .string()
        .regex(constants.PASSWORD_REGEXP)
        .required(),
});

const updateUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    role: Joi
        .string()
        .allow(...Object.values(userRoles)),
    email: Joi
        .forbidden(),
    password: Joi
        .forbidden(),
});

module.exports = {
    createUserValidator,
    emailUserValidator,
    passwordUserValidator,
    updateUserValidator
};
