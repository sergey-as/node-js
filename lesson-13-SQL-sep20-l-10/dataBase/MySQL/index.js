// const mysql2 = require('mysql2');
//
// const connection = mysql2.createConnection({
//     user: 'root',
//     password: 'root',
//     database: 'dec-2020',
//     host: 'localhost',
// });
//
// module.exports = connection.promise();

const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');

module.exports = (() => {
    let instance;

    const initConnection = () => {
        const client = new Sequelize('dec-2020', 'root', 'root', {dialect: 'mysql'});

        const models = {};
        const modelsPath = path.join(process.cwd(), 'lesson-13-SQL-sep-20-l-10', 'dataBase', 'MySQL', 'models');
        console.log(modelsPath);
        const getModels = () => {
            fs.readdir(modelsPath, (err, files) => {
                files.forEach((file) => { // Student.js
                    const [model] = file.split('.'); // [Student, js]
                    const modelFile = require(path.join(modelsPath, model)); // ./DB/MySQL/models/Student

                    models[model] = modelFile(client);
                });
            });
        };

        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName]
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
