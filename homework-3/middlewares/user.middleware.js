const User = require('../dataBase/User');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;
            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                throw new Error('User already exist');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
    getUserByEmailMiddleware: async (req, res, next) => {
        try {
            const {user_email} = req.params;
            const userByEmail = await User.findOne({email: user_email});

            if (!userByEmail) {
                throw new Error('User not found');
            }

            req.user = userByEmail;
            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
