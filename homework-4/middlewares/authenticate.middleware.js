const User = require('../dataBase/User');
const authValidator = require('../validators/auth.validator');
const passwordService = require('../service/password.service');

module.exports = {
    authenticateMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const userByEmail = await User.findOne({email}).lean();
            if (!userByEmail) {
                throw new Error('Wrong email or password');
            }

            const hashPassword = userByEmail.password;

            const isPasswordMatched = await passwordService.compare(password, hashPassword);

            if (!isPasswordMatched) {
                throw new Error('Wrong email or password');
            }

            req.user = userByEmail;
            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isAuthBodyValid: (req, res, next) => {
        try {
            const {error, value} = authValidator.authValidator.validate(req.body);

            if (error) {
                throw new Error('Wrong email or password');
            }

            req.body = value;
            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
