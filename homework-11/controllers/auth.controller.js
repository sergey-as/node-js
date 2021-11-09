const {
    actionTokenTypes,
    config: {FRONTEND_URL},
    constants: {AUTHORIZATION},
    emailActions,
    tokenTypes,
} = require('../configs');
const {ActionToken, O_Auth, User} = require('../dataBase');
const {emailService, jwtService, passwordService} = require('../service');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {body: {password}} = req;
            let {user} = req;

            await user.isPasswordsMatched(password);

            const tokenPair = jwtService.generateTokenPair();

            await O_Auth.create({
                ...tokenPair,
                user_id: user._id
            });

            const justNow = new Date().toISOString();
            user = await User.findByIdAndUpdate(user._id, {lastActivityAt: justNow}, {new: true});

            const userNormalized = user.normalize();

            const {email, name: userName} = userNormalized;
            await emailService.sendMail(email, emailActions.AUTHORIZED, {userName});

            res.json({user: userNormalized, ...tokenPair});
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);
            let {user} = req;

            await O_Auth.deleteOne({[tokenTypes.REFRESH_TOKEN]: token});

            const tokenPair = jwtService.generateTokenPair();

            await O_Auth.create({
                ...tokenPair,
                user_id: user._id
            });

            const justNow = new Date().toISOString();
            user = await User.findByIdAndUpdate(user._id, {lastActivityAt: justNow}, {new: true});

            const userNormalized = user.normalize();

            res.json({user: userNormalized, ...tokenPair});
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);
            const userNormalized = req.user.normalize();

            await O_Auth.deleteOne({[tokenTypes.ACCESS_TOKEN]: token});

            res.json({user: userNormalized});
        } catch (e) {
            next(e);
        }
    },

    sendMailForgotPassword: async (req, res, next) => {
        try {
            const {user} = req;

            const actionToken = jwtService.generateActionToken(actionTokenTypes.FORGOT_PASSWORD);

            await ActionToken.create({
                token: actionToken,
                token_type: actionTokenTypes.FORGOT_PASSWORD,
                user_id: user._id
            });

            const userNormalized = user.normalize();
            const {email, name: userName} = userNormalized;

            await emailService.sendMail(
                email,
                emailActions.FORGOT_PASSWORD,
                {forgotPasswordUrl: `${FRONTEND_URL}/passwordForgot?token=${actionToken}`, userName});

            res.json('Sent');
        } catch (e) {
            next(e);
        }
    },

    setNewPasswordAfterForgot: async (req, res, next) => {
        try {
            const actionToken = req.get(AUTHORIZATION);
            const {body: {password}, user} = req;

            const hashedPassword = await passwordService.hash(password);
            await User.findOneAndUpdate({_id: user._id}, {password: hashedPassword}, {new: true});

            await ActionToken.deleteOne({[actionTokenTypes.FORGOT_PASSWORD]: actionToken});

            await O_Auth.deleteMany({user_id: user._id});

            const {email, name: userName} = user;
            await emailService.sendMail(email, emailActions.CHANGE_PASSWORD, {userName, userEmail: email});

            res.json('Changed');
        } catch (e) {
            next(e);
        }
    },

    setNewPassword: async (req, res, next) => {
        try {
            const {body: {password}, user} = req;

            const hashedPassword = await passwordService.hash(password);
            await User.findOneAndUpdate({_id: user._id}, {password: hashedPassword}, {new: true});

            await O_Auth.deleteMany({user_id: user._id});

            const {email, name: userName} = user;
            await emailService.sendMail(email, emailActions.CHANGE_PASSWORD, {userName, userEmail: email});

            res.json('Changed');
        } catch (e) {
            next(e);
        }
    },

};
