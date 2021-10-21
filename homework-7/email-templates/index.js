const {emailActions} = require('../configs');

module.exports = {
    [emailActions.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome !!'
    },
    [emailActions.ORDER_CONFIRMED]: {
        templateName: 'order-confirmed',
        subject: 'Cool!'
    },
    [emailActions.USER_BLOCKED]: {
        templateName: 'us-b',
        subject: 'oops'
    }
};
