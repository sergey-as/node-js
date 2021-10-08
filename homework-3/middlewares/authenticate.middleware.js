const User = require('../dataBase/User');

module.exports = {
    authenticateMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const userByEmailAndPass = await User.findOne({email, password});

            if (!userByEmailAndPass) {
                throw new Error('User not found!');
            }

            req.user = userByEmailAndPass;
            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
