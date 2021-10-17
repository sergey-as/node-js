const bcrypt = require('bcrypt');

const {messages, statusCodes} = require('../configs');
const {ErrorHandler} = require('../errors');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hashPassword) => {
        const isPasswordMatched = await bcrypt.compare(password, hashPassword);

        if (!isPasswordMatched) {
            throw new ErrorHandler(messages.WRONG_EMAIL_OR_PASSWORD, statusCodes.NOT_FOUND);
        }
    }
};
