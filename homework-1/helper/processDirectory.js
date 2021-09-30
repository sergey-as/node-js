const fs = require('fs');
const path = require('path');

const processDir = (dir1, dir2, gender) => {
    fs.readdir(dir1, (err, files) => {
        if (err) {
            console.log(err);
            return
        }
        files.forEach(fileName => {
            fs.stat(path.join(dir1, fileName), ((err, stats) => {
                if (err) {
                    console.log(err);
                    return
                }

                if (stats.isFile()) {
                    fs.readFile(path.join(dir1, fileName), ((err, data) => {
                        if (err) {
                            console.log(err);
                            return;
                        }

                        const user = JSON.parse(data);
                        if (user.gender && (user.gender != gender)) {
                            fs.rename(
                                path.join(dir1, fileName),
                                path.join(dir2, fileName),
                                err => {
                                    if (err) {
                                        console.log(err);
                                    }
                                }
                            );
                        }
                    }));
                }
            }))
        })
    });

}

module.exports = {
    processDir
}