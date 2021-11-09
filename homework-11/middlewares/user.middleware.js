//Variant1
const ObjectId = require('mongoose').Types.ObjectId;
//Variant2
// const {isValidObjectId} = require('mongoose');

const {
    dataIn: {PARAMS},
    messages,
    statusCodes,
    validatorsName: {AUTH}
} = require('../configs');
const {User} = require('../dataBase');

module.exports = {
    isUserByIdPresent: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const userById = await User.findById(user_id);

            if (!userById) {
                return next({
                    message: messages.USER_NOT_FOUND,
                    status: statusCodes.NOT_FOUND_404
                });
            }

            req.user = userById;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: (body_params = PARAMS, auth = false) => async (req, res, next) => {
        try {
            const {email} = req[body_params];
            const userByEmail = await User.findOne({email});

            if (!userByEmail) {
                return next({
                    message: auth ? messages.WRONG_EMAIL_OR_PASSWORD : messages.USER_NOT_FOUND,
                    status: auth ? statusCodes.BAD_REQUEST_400 : statusCodes.NOT_FOUND_404
                });
            }

            req.user = userByEmail;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserNotPresent: async (req, res, next) => {
        try {
            const {email} = req.body;
            const userByEmail = await User.findOne({email})
                .lean();

            if (userByEmail) {
                return next({
                    message: messages.USER_ALREADY_EXISTS,
                    status: statusCodes.FORBIDDEN_403
                });
            }

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
                    status: statusCodes.BAD_REQUEST_400
                });
            }

            req[validationData] = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserIdValid: (req, res, next) => {
        try {
            const {user_id} = req.params;

            //Variant1
            if (!ObjectId.isValid(user_id)) {
                return next({
                    message: messages.NOT_VALID_USER_ID,
                    status: statusCodes.BAD_REQUEST_400
                });
            }
            //Variant2
            // if (!isValidObjectId(user_id)) {
            //     return next({
            //         message: messages.NOT_VALID_USER_ID,
            //         status: statusCodes.BAD_REQUEST_400
            //     });
            // }

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
                    status: statusCodes.FORBIDDEN_403
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
