const cron = require('node-cron');

const removeOldTokens = require('./old.token.remove.job');
const sendMailNotActiveUsers = require('./send.mail.not.active.users.job');

module.exports = () => {
    cron.schedule('0 0 2 * * *', () => {
        // console.log('Cron removeOldTokens started at', new Date().toISOString());
        removeOldTokens();
    });
    cron.schedule('*/10 * * * * *', () => {
        // console.log('Cron sendMailNotActiveUsers started at', new Date().toISOString());
        sendMailNotActiveUsers();
    });
};
