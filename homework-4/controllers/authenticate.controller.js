const userUtil = require('../util/user.util');

module.exports = {
    authenticateController: (req, res) => {
        try {
            const user = req.user;
            req.user = userUtil.userNormalizer(user);

            res.json(req.user);
        } catch (e) {
            res.json(e);
        }
    }
};
