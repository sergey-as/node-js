const {User} = require('../dataBase');
const {userUtil} = require('../util');

module.exports = {
    getUsers: (req, res, next) => {
        try {
            const users = req.users;
            req.users = users.map(user => userUtil.userNormalizer(user));

            res.json(req.users);
        } catch (e) {
            next(e);
        }
    },

    getUserByEmail: (req, res, next) => {
        try {
            const user = req.user;
            req.user = userUtil.userNormalizer(user);

            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    createUser: (req, res, next) => {
        try {
            const user = req.user;
            req.user = userUtil.userNormalizer(user);

            res.json(req.user).status(201);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {email} = req.user;
            const updatedUser = await User.findOneAndUpdate({email}, req.body, {new: true}).lean();
            req.user = userUtil.userNormalizer(updatedUser);

            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {email} = req.user;

            await User.deleteOne(req.user);

            res.json(`USER WAS DELETED (with email ${email})`);
        } catch (e) {
            next(e);
        }
    }
};
