const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const {config: {NO_REPLY_EMAIL_USER, NO_REPLY_EMAIL_PASS}} = require('../configs');
const allTemplates = require('../email-templates');

const templateParser = new EmailTemplates({
    views: {
        // root: path.join(process.cwd(), 'email-templates')
        root: path.join(__dirname, '..', 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    // host: 'smtp.gmail.com',
    // port: 465,
    // secure: true,
    // ---or---
    service: 'gmail',
    auth: {
        user: NO_REPLY_EMAIL_USER,
        pass: NO_REPLY_EMAIL_PASS
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const templateInfo = allTemplates[emailAction];

    if (!templateInfo) {
        throw new Error('Wrong template name');
    }

    const html = await templateParser.render(templateInfo.templateName, context);

    return transporter.sendMail({
        from: NO_REPLY_EMAIL_USER,
        to: userMail,
        subject: templateInfo.subject,
        html
    });
};

module.exports = {
    sendMail
};
