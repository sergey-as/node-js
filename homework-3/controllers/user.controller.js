const User = require('../dataBase/User');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();

            res.json(users);
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

    createUser: async (req, res) => {
        try {
            const newUser = await User.create(req.body);

            res.json(newUser).status(201);
        } catch (e) {
            res.json(e);
        }
    },

    updateUser: async (req, res) => {
        try {
            const {email} = req.user;

            const updatedUser = await User.findOneAndUpdate({email}, req.body, {new: true});

            res.json(updatedUser);
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
