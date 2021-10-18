const jwt = require('jsonwebtoken');

const {
    config: {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET},
    messages,
    statusCodes,
    tokenTypes: {ACCESS_TOKEN}
} = require('../configs');
const {ErrorHandler} = require('../errors');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = ACCESS_TOKEN) => {
        try {
            const secret = tokenType === ACCESS_TOKEN ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;
            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(messages.INVALID_TOKEN, statusCodes.UNAUTHORIZED_401);
        }
    }
};
