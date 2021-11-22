module.exports = {
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/dec-2020',
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'SECRET',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'REFRESH SECRET',
    PORT: 5000,

    ROOT_EMAIL: process.env.ROOT_EMAIL || 'testmail@gmailc.om',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || '12345',

    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'root',

};
