// const mysql2 = require('mysql2');
//
// const connection = mysql2.createConnection({
//   user: 'user',
//   password: 'user',
//   database: 'dec-2020',
//   host: 'localhost',
// });
//
// module.exports = connection.promise();

const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');

const {DB_USER, DB_PASSWORD} = require('../../configs/config');

module.exports = (() => {
    let instance;

    const initConnection = () => {
        const client = new Sequelize('dec-2020', DB_USER, DB_PASSWORD, {dialect: 'mysql'});

        const models = {};
        // const modelsPath = path.join(process.cwd(), 'lesson-14-sep20-l-11', 'dataBase', 'MySQL', 'models');
        const modelsPath = path.join(__dirname, 'models');

        const getModels = () => {
            fs.readdir(modelsPath, (err, files) => {
                files.forEach((file) => { // Student.js
                    const [model] = file.split('.'); // [Student, js]
                    if (model !== 'index') {
                        const modelFile = require(path.join(modelsPath, model)); // ./DB/MySQL/models/Student

                        models[model] = modelFile(client);
                    }
                });
            });
        };

        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName],
            transactionInstance: () => client.transaction()
        };
    };

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection();
            }

            return instance;
        }
    };
})();
