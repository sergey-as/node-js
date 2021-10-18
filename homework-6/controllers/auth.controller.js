const {auth, constants, tokenTypes} = require('../configs');
const {O_Auth} = require('../dataBase');
const {jwtService} = require('../service');
const {userUtil} = require('../util');

module.exports = {
    loginRefreshLogout: (authType) => async (req, res, next) => {
        try {
            if (authType !== auth.LOGIN) {
                const token = req.get(constants.AUTHORIZATION);
                const tokenType = authType === auth.REFRESH ? tokenTypes.REFRESH_TOKEN : tokenTypes.ACCESS_TOKEN;

                await O_Auth.deleteOne({[tokenType]: token});
            }

            const {user} = req;
            const userNormalized = userUtil.userNormalizer(user);

            let resp = {user: userNormalized};

            if (authType !== auth.LOGOUT) {
                const tokenPair = jwtService.generateTokenPair();

                await O_Auth.create({
                    ...tokenPair,
                    user_id: userNormalized._id
                });

                resp = {...resp, ...tokenPair};
            }

            res.json(resp);
        } catch (e) {
            next(e);
        }
    },
};
