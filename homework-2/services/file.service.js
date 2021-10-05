const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const fileName = path.join(__dirname, '../', 'dataBase', 'users.json');

async function readFile() {
    const readFilePromise = promisify(fs.readFile);
    const fileData = await readFilePromise(fileName);

    return JSON.parse(fileData.toString());
}

async function writeFile(db) {
    const writeFilePromise = promisify(fs.writeFile);

    const fileData = JSON.stringify(db);

    await writeFilePromise(fileName, fileData);
}

module.exports = {
    readFile,
    writeFile
};