const cron = require('node-cron');

const removeOldTokens = require('./old.token.remove.job');

module.exports = () => {
    cron.schedule('0 0 1 * * *', () => {
        // console.log('Cron started at', new Date().toISOString());
        removeOldTokens();
    });
};
