const {
    constants: {AUTHORIZATION},
    messages,
    statusCodes,
    tokenTypes: {ACCESS_TOKEN},
} = require('../configs');
const {O_Auth} = require('../dataBase');
const {jwtService, passwordService} = require('../service');
const {userUtil} = require('../util');

module.exports = {
    isPasswordsMatched: async (req, res, next) => {
        try {
            const {password} = req.body;
            const {password: hashPassword} = req.user;

            await passwordService.compare(password, hashPassword);

            next();
        } catch (e) {
            next(e);
        }
    },

    checkToken: (tokenType = ACCESS_TOKEN) => async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            const errInvalidToken = {message: messages.INVALID_TOKEN, status: statusCodes.UNAUTHORIZED_401};

            if (!token) {
                return next(errInvalidToken);
            }

            await jwtService.verifyToken(token, tokenType);

            const tokenResponse = await O_Auth
                .findOne({[tokenType]: token})
                .populate('user_id');

            if (!tokenResponse) {
                return next(errInvalidToken);
            }

            const user = tokenResponse.user_id.toObject();

            req.user = userUtil.userNormalizer(user);
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
