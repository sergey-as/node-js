const fs = require('fs');
const path = require('path');

const createFile = (dirPath, fileData) => {
    const fileName = fileData.name.toLowerCase() + '.txt';
    fs.writeFile(path.join(dirPath, fileName), JSON.stringify(fileData), (err) => {
        if (err) {
            console.log(err);
        }
    });
};

module.exports = {
    createFile
};