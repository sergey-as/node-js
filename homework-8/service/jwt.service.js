const jwt = require('jsonwebtoken');

const {
    actionTokenTypes,
    config,
    messages,
    statusCodes,
    tokenTypes,
} = require('../configs');
const {ErrorHandler} = require('../errors');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, config.JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, config.JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = tokenTypes.ACCESS_TOKEN) => {
        try {
            const secret = tokenType === tokenTypes.ACCESS_TOKEN ? config.JWT_ACCESS_SECRET : config.JWT_REFRESH_SECRET;
            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(messages.INVALID_TOKEN, statusCodes.UNAUTHORIZED_401);
        }
    },

    verifyActionToken: async (token, actionTokenType) => {
        try {
            let secret;

            switch (actionTokenType) {
                case actionTokenTypes.FORGOT_PASSWORD:
                    secret = config.JWT_ACTION_SECRET_FORGOT_PASSWORD;
                    break;
                default:
                    throw new ErrorHandler(messages.WRONG_TOKEN_TYPE, statusCodes.INTERNAL_SERVER_ERROR_500);
            }

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(messages.INVALID_TOKEN, statusCodes.UNAUTHORIZED_401);
        }
    },

    generateActionToken: (actionTokenType) => {
        let secret;

        switch (actionTokenType) {
            case actionTokenTypes.FORGOT_PASSWORD:
                secret = config.JWT_ACTION_SECRET_FORGOT_PASSWORD;
                break;
            default:
                throw new ErrorHandler(messages.WRONG_TOKEN_TYPE, statusCodes.INTERNAL_SERVER_ERROR_500);
        }

        return jwt.sign({}, secret, {expiresIn: '24h'});
    },

};
