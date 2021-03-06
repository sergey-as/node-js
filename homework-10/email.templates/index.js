const {emailActions} = require('../configs');

module.exports = {
    [emailActions.AUTHORIZED]: {
        templateName: 'authorized',
        subject: 'Hello! You are authorized!'
    },

    [emailActions.REGISTERED]: {
        templateName: 'registered',
        subject: 'Congratulations! You are registered!'
    },

    [emailActions.REMOVED]: {
        templateName: 'removed',
        subject: 'You are removed.'
    },

    [emailActions.UPDATED]: {
        templateName: 'updated',
        subject: 'Your settings was updated.'
    },

    [emailActions.CHANGE_PASSWORD]: {
        templateName: 'changePassword',
        subject: 'Your password was changed.'
    },

    [emailActions.FORGOT_PASSWORD]: {
        templateName: 'forgotPassword',
        subject: 'Forgot password'
    }
};
