const file = require('../services/file.service');

module.exports = {

    getUsers: async (req, res) => {

        const db = await file.readFile();
        res.json(db);

    },

    getUserById: async (req, res) => {
        const {user_id} = req.params;

        const db = await file.readFile();
        const user = db.find(user => user.id === +user_id);

        res.json(user);
    },

    createUser: async (req, res) => {
        const db = await file.readFile();
        await db.sort((a, b) => a.id - b.id);

        const last = await db[db.length - 1];

        let newId = 1;

        if (last) {
            newId = +last.id + 1;
        }

        await db.push({id: newId, ...req.body});
        await file.writeFile(db);

        res.json(db);
    },

    updateUser: async (req, res) => {
        const {user_id} = req.params;
        let db = await file.readFile();

        if (!isNaN(user_id)) {
            db = await db.map(user => (user.id !== +user_id) ? user : {...user, ...req.body});
            await file.writeFile(db);
        }

        res.json(db);
    },

    deleteUser: async (req, res) => {
        const {user_id} = req.params;
        let db = await file.readFile();

        if (!isNaN(user_id)) {
            db = await db.filter(user => user.id !== +user_id);
            await file.writeFile(db);
        }

        res.json(db);
    }
}