const User = require('../dataBase/User');
const userUtil = require('../util/user.util');

module.exports = {
    getUsers: (req, res) => {
        try {
            const users = req.users;
            req.users = users.map(user => userUtil.userNormalizer(user));

            res.json(req.users);
        } catch (e) {
            res.json(e);
        }
    },

    getUserByEmail: (req, res) => {
        try {
            const user = req.user;
            req.user = userUtil.userNormalizer(user);

            res.json(req.user);
        } catch (e) {
            res.json(e);
        }
    },

    createUser: (req, res) => {
        try {
            const user = req.user;
            req.user = userUtil.userNormalizer(user);

            res.json(req.user).status(201);
        } catch (e) {
            res.json(e);
        }
    },

    updateUser: async (req, res) => {
        try {
            const {email} = req.user;
            const updatedUser = await User.findOneAndUpdate({email}, req.body, {new: true}).lean();
            req.user = userUtil.userNormalizer(updatedUser);

            res.json(req.user);
        } catch (e) {
            res.json(e);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {email} = req.user;

            await User.deleteOne(req.user);

            res.json(`USER WAS DELETED (with email ${email})`);
        } catch (e) {
            res.json(e);
        }
    }
};
