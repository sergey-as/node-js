const Joi = require('joi');

const {
    order,
    userFields,
} = require('../configs');
const commonValidators = require('./common.validators');

const createUserValidator = Joi.object({
    name: commonValidators.nameValidator.required(),
    email: commonValidators.emailValidator,
    password: commonValidators.passwordValidator,
    role: commonValidators.roleValidator
});

const emailUserValidator = Joi.object({
    email: commonValidators.emailValidator
});

const getUsersValidator = Joi.object({
    name: commonValidators.nameFilterValidator,
    role: commonValidators.roleValidator,
    perPage: Joi
        .number(),
    page: Joi
        .number(),
    sortBy: Joi
        .string()
        .valid(...Object.values(userFields)),
    order: Joi
        .string()
        .valid(...Object.values(order))
});

const passwordUserValidator = Joi.object({
    password: commonValidators.passwordValidator
});

const updateUserValidator = Joi.object({
    name: commonValidators.nameValidator,
    email: Joi.forbidden(),
    password: Joi.forbidden(),
    role: commonValidators.roleValidator,
});

module.exports = {
    createUserValidator,
    emailUserValidator,
    getUsersValidator,
    passwordUserValidator,
    updateUserValidator
};
