const Joi = require('joi');

const commonValidators = require('./common.validators');

const authValidator = Joi.object({
    email: commonValidators.emailValidator,
    password: commonValidators.passwordValidator
});

module.exports = {
    authValidator
};
