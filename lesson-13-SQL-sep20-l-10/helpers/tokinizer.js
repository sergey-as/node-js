const jwt = require('jsonwebtoken');
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require('../configs/config');

module.exports = () => {
    const access_token = jwt.sign({}, JWT_ACCESS_SECRET, { expiresIn: '10m' });
    const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return {
        access_token,
        refresh_token
    };
};
