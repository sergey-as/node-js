const User = require('../dataBase/User');
const userValidator = require('../validators/user.validator');
const passwordService = require('../service/password.service');

module.exports = {
    getUsersMiddleware: async (req, res, next) => {
        try {
            req.users = await User.find().lean();
            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    createUserMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                throw new Error('User already exist');
            }

            const hashedPassword = await passwordService.hash(password);
            const createdUser = await User.create({...req.body, password: hashedPassword});

            req.user = createdUser.toObject();
            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    getUserByEmailMiddleware: async (req, res, next) => {
        try {
            const {user_email} = req.params;
            const userByEmail = await User.findOne({email: user_email}).lean();

            if (!userByEmail) {
                throw new Error('User not found');
            }

            req.user = userByEmail;
            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isUserEmailValid: (req, res, next) => {
        try {
            const {user_email} = req.params;
            const {error, value} = userValidator.emailUserValidator.validate({email: user_email});

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.params.user_email = value.email;
            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isCreateUserBodyValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;
            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isUpdateUserBodyValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;
            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
