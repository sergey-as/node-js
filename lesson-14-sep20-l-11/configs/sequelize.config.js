const {DB_USER, DB_PASSWORD} = require('./config');

module.exports = {
    development: {
        username: DB_USER,
        password: DB_PASSWORD,
        database: 'dec-2020',
        host: '127.0.0.1',
        dialect: 'mysql'
    }
};
