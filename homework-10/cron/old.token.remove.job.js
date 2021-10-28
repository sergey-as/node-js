const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayJs.extend(utc);

const {ActionToken, O_Auth} = require('../dataBase');

module.exports = async () => {
    const previousMonth = dayJs.utc()
        .subtract(1, 'month');
    const previousDay = dayJs.utc()
        .subtract(1, 'day');

    await ActionToken.deleteMany({createdAt: {$lt: previousDay}});
    await O_Auth.deleteMany({createdAt: {$lt: previousMonth}});
};
