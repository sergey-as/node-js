const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayJs.extend(utc);

const {User} = require('../dataBase');
const {emailActions} = require('../configs');
const {emailService} = require('../service');

module.exports = async () => {
    const tenDaysAgo = dayJs.utc()
        .subtract(10, 'day');

    const users = await User.find({lastActivityAt: {$lt: tenDaysAgo}});
    const promises = users.map(async ({name, email}) => {
        await emailService.sendMail(email, emailActions.NOT_VISITED, {userName: name, userEmail: email});
    });

    await Promise.allSettled(promises);
};
