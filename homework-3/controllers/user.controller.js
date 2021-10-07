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

    getUserById: async (req, res) => {
        try {
            const {user_id} = req.params;
            const user = await User.findById(user_id);

            res.json({user});
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

    updateUser: (req, res) => {
        const {user_id} = req.params;

        res.json(`UPDATE USER with id ${user_id}`);
    },

    deleteUser: (req, res) => {
        const {user_id} = req.params;

        res.json(`DELETE USER with id ${user_id}`);
    }
};
