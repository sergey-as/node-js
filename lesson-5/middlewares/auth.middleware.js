const passwordService = require('../service/password.service');

module.exports = {
    isPasswordsMatched: async (req, res, next) => {
        try {
            const { password } = req.body;
            const { password: hashPassword } = req.user;

            // console.log('___________________________');
            // console.log(password);
            // console.log('___________________________');

            await passwordService.compare(password, hashPassword);

            next();
        } catch (e) {
            next(e);
        }
    }
};
