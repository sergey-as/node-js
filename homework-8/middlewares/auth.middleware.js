const {
    constants: {AUTHORIZATION},
    messages,
    statusCodes,
    tokenTypes: {ACCESS_TOKEN},
} = require('../configs');
const {O_Auth} = require('../dataBase');
const {jwtService} = require('../service');

module.exports = {

    checkToken: (tokenType = ACCESS_TOKEN) => async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            const errInvalidToken = {message: messages.INVALID_TOKEN, status: statusCodes.UNAUTHORIZED_401};

            if (!token) {
                return next(errInvalidToken);
            }

            await jwtService.verifyToken(token, tokenType);

            const tokenResponse = await O_Auth
                .findOne({[tokenType]: token});

            if (!tokenResponse) {
                return next(errInvalidToken);
            }

            req.user = tokenResponse.user_id;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessByEmail: (req, res, next) => {
        try {
            const {email: authEmail} = req.user;
            const {email: checkEmail} = req.params;

            if (authEmail !== checkEmail) {
                return next({
                    message: messages.WRONG_EMAIL_OR_PASSWORD,
                    status: statusCodes.BAD_REQUEST_400
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
