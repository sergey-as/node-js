const {dataValidate, messages, statusCodes} = require('../configs');
const {User} = require('../dataBase');
const {passwordService} = require('../service');
const {authValidator, userValidator} = require('../validators');

module.exports = {
    getUsersMiddleware: async (req, res, next) => {
        try {
            req.users = await User.find()
                .lean();
            next();
        } catch (e) {
            next(e);
        }
    },

    createUserMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                return next({
                    message: messages.USER_ALREADY_EXISTS,
                    status: statusCodes.CODE_403
                });
            }

            const hashedPassword = await passwordService.hash(password);
            const createdUser = await User.create({...req.body, password: hashedPassword});

            req.user = createdUser.toObject();
            next();
        } catch (e) {
            next(e);
        }
    },

    getUserByEmailMiddleware: async (req, res, next) => {
        try {
            const {user_email: email} = req.params;
            const userByEmail = await User.findOne({email})
                .lean();

            if (!userByEmail) {
                return next({
                    message: messages.USER_NOT_FOUND,
                    status: statusCodes.CODE_404
                });
            }

            req.user = userByEmail;
            next();
        } catch (e) {
            next(e);
        }
    },

    isDataValid: (whichData) => (req, res, next) => {
        try {
            let error;
            let value;

            if (whichData === dataValidate.EMAIL_PARAMS) {
                const {user_email: email} = req.params;

                error = userValidator.emailUserValidator.validate({email}).error;
                value = userValidator.emailUserValidator.validate({email}).value;

            } else if (whichData === dataValidate.CREATE_USER_BODY) {
                error = userValidator.createUserValidator.validate(req.body).error;
                value = userValidator.createUserValidator.validate(req.body).value;

            } else if (whichData === dataValidate.UPDATE_USER_BODY) {
                error = userValidator.updateUserValidator.validate(req.body).error;
                value = userValidator.updateUserValidator.validate(req.body).value;

            } else if (whichData === dataValidate.AUTH_BODY) {
                error = authValidator.authValidator.validate(req.body).error;
                value = authValidator.authValidator.validate(req.body).value;
            }

            if (error) {
                let msg;

                if (whichData === dataValidate.AUTH_BODY) {
                    msg = messages.WRONG_EMAIL_OR_PASSWORD;
                } else {
                    msg = error.details[0].message;
                }

                return next({
                    message: msg,
                    status: statusCodes.CODE_404
                });
            }

            if (whichData === dataValidate.EMAIL_PARAMS) {
                req.params.user_email = value.email;
            } else {
                req.body = value;
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const {email} = req.body;
            const userByEmail = await User.findOne({email})
                .lean();

            if (!userByEmail) {
                return next({
                    message: messages.WRONG_EMAIL_OR_PASSWORD,
                    status: statusCodes.CODE_404
                });
            }

            req.user = userByEmail;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (roleArr = []) => (req, res, next) => {
        try {
            const {role} = req.user;

            if (!roleArr.includes(role)) {
                return next({
                    message: messages.ACCESS_DENIED,
                    status: statusCodes.CODE_404
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
