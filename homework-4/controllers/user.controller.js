const User = require('../dataBase/User');

module.exports = {
    getUsers: (req, res) => {
        try {
            res.json(req.users);
        } catch (e) {
            res.json(e);
        }
    },

    getUserByEmail: (req, res) => {
        try {
            res.json(req.user);
        } catch (e) {
            res.json(e);
        }
    },

    createUser: (req, res) => {
        try {
            res.json(req.user).status(201);
        } catch (e) {
            res.json(e);
        }
    },

    updateUser: (req, res) => {
        try {
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
