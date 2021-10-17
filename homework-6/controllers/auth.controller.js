const {User} = require('../dataBase');
const {userUtil} = require('../util');

module.exports = {
    login: (req, res, next) => {
        try {
            const {user} = req;
            const userNormalized = userUtil.userNormalizer(user);

            res.json(userNormalized);
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const users = await User.find().lean();
            const usersNormalized = users.map(user => userUtil.userNormalizer(user));

            res.json(usersNormalized);
        } catch (e) {
            next(e);
        }
    },
};
