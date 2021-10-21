const {constants, tokenTypes, emailActions} = require('../configs');
const {O_Auth} = require('../dataBase');
const {jwtService, emailService} = require('../service');
const {userUtil} = require('../util');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user} = req;

            const tokenPair = jwtService.generateTokenPair();

            await O_Auth.create({
                ...tokenPair,
                user_id: user._id
            });

            const userNormalized = userUtil.userNormalizer(user);

            const {email, name: userName} = userNormalized;
            await emailService.sendMail(email, emailActions.AUTHORIZED, {userName});

            res.json({user: userNormalized, ...tokenPair});
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);
            const {user} = req;

            await O_Auth.deleteOne({[tokenTypes.REFRESH_TOKEN]: token});

            const tokenPair = jwtService.generateTokenPair();

            await O_Auth.create({
                ...tokenPair,
                user_id: user._id
            });

            const userNormalized = userUtil.userNormalizer(user);

            res.json({user: userNormalized, ...tokenPair});
        } catch (e) {
            next(e);
        }
    },
    logout: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);
            const {user} = req;
            const userNormalized = userUtil.userNormalizer(user);

            await O_Auth.deleteOne({[tokenTypes.ACCESS_TOKEN]: token});

            res.json({user: userNormalized});
        } catch (e) {
            next(e);
        }
    },
};
