const {config, userRoles: {ADMIN}} = require('../configs');
const {User} = require('../dataBase');

module.exports = async () => {
    const user = await User.findOne({role: ADMIN});

    if (!user) {
        await User.createUserWithHashPassword({
            name: config.DEFAULT_USER_NAME,
            email: config.DEFAULT_USER_EMAIL,
            password: config.DEFAULT_USER_PASS,
            role: ADMIN
        });
    }
};
