const User = require('../dataBase/User');
const userValidator = require("../validators/user.validator");
const userUtil = require("../util/user.util");
const passwordService = require("../service/password.service");

module.exports = {
    getUsersMiddleware: async (req, res, next) => {
        try {
            const users = await User.find().lean();

            if (!users) {
                throw new Error('Users not found');
            }

            req.users = users;
            next();
        } catch (e) {
            res.json(e.message);
        }
    },
    normalizeUsersMiddleware: async (req, res, next) => {
        try {
            const users = req.users;

            if (!users) {
                throw new Error('Users not found');
            }

            req.users = await users.map(user => userUtil.userNormalizator(user));
            next();
        } catch (e) {
            res.json(e.message);
        }
    },
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            let userByEmail = await User.findOne({email});

            if (userByEmail) {
                throw new Error('User already exist');
            }

            const hashedPassword = await passwordService.hash(password);
            await User.create({...req.body, password: hashedPassword});

            userByEmail = await User.findOne({email}).lean();

            req.user = userByEmail;
            next();
        } catch (e) {
            res.json(e.message);
        }
    },
    updateUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.user;

            req.user = await User.findOneAndUpdate({email}, req.body, {new: true}).lean();
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
    normalizeUserMiddleware: (req, res, next) => {
        try {
            const user = req.user;

            if (!user) {
                throw new Error('User not found');
            }

            req.user = userUtil.userNormalizator(user);
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
