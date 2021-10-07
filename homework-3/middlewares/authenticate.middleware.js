const User = require('../dataBase/User');

module.exports = {
    authenticateMiddleware: async (req, res, next) => {
        try {
            const userByEmail = await User.findOne({email: req.body.email});

            if (!userByEmail) {
                throw new Error('User not found!');
            }

            if (req.body.password !== userByEmail.password) {
                throw new Error('User not found!');
            }

            req.user = userByEmail;
            next();
        } catch (e) {
            res.json(e.message);
        }
    },
};
