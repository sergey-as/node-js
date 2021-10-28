module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',

    DEFAULT_USER_NAME: process.env.DEFAULT_USER_NAME,
    DEFAULT_USER_EMAIL: process.env.DEFAULT_USER_EMAIL,
    DEFAULT_USER_PASS: process.env.DEFAULT_USER_PASS,

    LISTEN_CONNECTION_PORT: process.env.LISTEN_CONNECTION_PORT || 5000,
    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/june-2021',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'zzz',
    JWT_ACTION_SECRET_FORGOT_PASSWORD: process.env.JWT_ACTION_SECRET_FORGOT_PASSWORD || 'yyy',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'xxx',

    NO_REPLY_EMAIL_USER: process.env.NO_REPLY_EMAIL_USER,
    NO_REPLY_EMAIL_PASS: process.env.NO_REPLY_EMAIL_PASS,
};
