const {User} = require('../dataBase');
const {passwordService} = require('../service');
const {userValidator} = require('../validators');

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
                next({
                    message: 'User already exist',
                    status: 403
                });
                return;
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
                next({
                    message: 'User not found',
                    status: 404
                });
                return;
            }

            req.user = userByEmail;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserEmailValid: (req, res, next) => {
        try {
            const {user_email} = req.params;
            const {error, value} = userValidator.emailUserValidator.validate({email: user_email});

            if (error) {
                next({
                    message: error.details[0].message,
                    status: 404
                });
                return;
            }

            req.params.user_email = value.email;
            next();
        } catch (e) {
            next(e);
        }
    },

    isCreateUserBodyValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.createUserValidator.validate(req.body);

            if (error) {
                next({
                    message: error.details[0].message,
                    status: 404
                });
                return;
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUpdateUserBodyValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                next({
                    message: error.details[0].message,
                    status: 404
                });
                return;
            }

            req.body = value;
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
                next({
                    message: 'Wrong email or password',
                    status: 404
                });
                return;
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
                next({
                    message: 'Access denied',
                    status: 403
                });
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
