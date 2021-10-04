const db = require('../dataBase/users');

module.exports = {
    getUsers: (req, res) => {
        // res.json('GET ALL users');
        res.json(db);
    },

    getUserById: (req, res) => {
        // console.log(req.params);
        const {user_id} = req.params;
        const user = db[user_id - 1];
        res.json({user});
    },

    createUser: (req, res) => {
        // console.log(req);
        db.push({...req.body, id: db.length + 1});
        res.json(db);
    },

    updateUser: (req, res) => {
        const {user_id} = req.params;
        const user = db[user_id - 1];
        console.log(user);
        res.json({user});
    },

    deleteUser: (req, res) => {
        const {user_id} = req.params;
        db.splice(0, db.length, ...db.filter(user => user.id !== +user_id));
        res.json(db);
    }
}