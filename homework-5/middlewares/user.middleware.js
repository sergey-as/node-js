const {messages, statusCodes, validatorsName: {AUTH}} = require('../configs');
const {User} = require('../dataBase');
const {passwordService} = require('../service');

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
                    status: statusCodes.FORBIDDEN
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
            const {email} = req.params;
            const userByEmail = await User.findOne({email})
                .lean();

            if (!userByEmail) {
                return next({
                    message: messages.USER_NOT_FOUND,
                    status: statusCodes.NOT_FOUND
                });
            }

            req.user = userByEmail;
            next();
        } catch (e) {
            next(e);
        }
    },

    isDataValid: (validator, validatorName, validationData) => (req, res, next) => {
        try {
            const {error, value} = validator[validatorName].validate(req[validationData]);

            if (error) {
                return next({
                    message: validatorName === AUTH ? messages.WRONG_EMAIL_OR_PASSWORD : error.details[0].message,
                    status: statusCodes.NOT_FOUND
                });
            }

            req[validationData] = value;
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
                    status: statusCodes.NOT_FOUND
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
                    status: statusCodes.NOT_FOUND
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
