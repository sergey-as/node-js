
module.exports = {
    login: (req, res, next) => {
        try {
            const {user, access_token, refresh_token} = req;

            res.json({user, access_token, refresh_token});
        } catch (e) {
            next(e);
        }
    },

    refresh: (req, res, next) => {
        try {
            const {user, access_token, refresh_token} = req;

            res.json({user, access_token, refresh_token});
        } catch (e) {
            next(e);
        }
    },

    logout: (req, res, next) => {
        try {
            const {user} = req;

            res.json({user});
        } catch (e) {
            next(e);
        }
    },
};
