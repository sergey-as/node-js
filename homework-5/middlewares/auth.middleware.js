const {User} = require('../dataBase');
const {passwordService} = require('../service');
const {authValidator} = require('../validators');

module.exports = {
    isPasswordsMatched: async (req, res, next) => {
        try {
            const {password} = req.body;
            const {password: hashPassword} = req.user;

            await passwordService.compare(password, hashPassword);

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const {email} = req.body;
            const userByEmail = await User.findOne({email}).lean();

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

    isAuthBodyValid: (req, res, next) => {
        try {
            const {error, value} = authValidator.authValidator.validate(req.body);

            if (error) {
                next({
                    message: 'Wrong email or password',
                    status: 404
                });
                return;
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }
};
