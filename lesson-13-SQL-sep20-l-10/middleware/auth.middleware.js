const jwt = require('jsonwebtoken');

const O_Auth = require('../dataBase/models/O_Auth');
const { JWT_ACCESS_SECRET } = require('../configs/config');
const { constants } = require('../constant');

module.exports = {
    checkAccessTokenMiddleware: async (req, res, next) => {
        try {
            const access_token = req.get(constants.AUTHORIZATION);

            if (!access_token) {
                throw new Error('Token is required');
            }

            jwt.verify(access_token, JWT_ACCESS_SECRET, (err) => {
                if (err) {
                    throw new Error('Not valid token VERIFY');
                }
            });

            const tokens = await O_Auth.findOne({ access_token }).populate('_user_id');

            if (!tokens) {
                throw new Error('Not valid token');
            }

            console.log(access_token);

            req.user = tokens._user_id;

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
