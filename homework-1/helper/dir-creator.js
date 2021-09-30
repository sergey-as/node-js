const fs = require('fs');

const createDir = (dirPath) => {
    fs.mkdir(dirPath, {recursive: true}, (err) => {
        if (err) {
            console.log('createDir error ' + err);
        }
    })
}

module.exports = {
    createDir
}