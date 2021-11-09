const {emailActions} = require('../configs');

module.exports = {
    [emailActions.AUTHORIZED]: {
        templateName: 'authorized',
        subject: 'Hello! You are authorized!'
    },

    [emailActions.NOT_VISITED]: {
        templateName: 'notvisited',
        subject: 'Hello! You have not visited for a long time!'
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

    [emailActions.UPLOADED]: {
        templateName: 'uploaded',
        subject: 'Your avatar was uploaded.'
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
