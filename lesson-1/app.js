const fs = require("fs");
const path = require("path");

function app() {
    // console.clear();
    console.log('lesson 1');

    // console.log('222');

    //
    // const builder = require('./helper/user-builder');
    //
    // let user = builder.createUser('Victor', 25);
    // console.log(user);
    //
    // builder.xxx();

    const appendFilePath = path.join(__dirname, 'files', '//////', '///', 'append.txt');
    const mkdirPath = path.join(__dirname, 'files', 'user', '22', 'photos');
    const writeFilePath = path.join(__dirname, 'files', 'write.txt');
    const newFilePath = path.join(mkdirPath, 'newFile.txt');

    // console.log(__dirname);
    // console.log(__filename);

    // fs.readFile(`${__dirname}/files/test.txt`, ((err, data) => {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     console.log(data.toString());
    // }));

    // fs.readFile(`${__dirname}/helper/user-builder.js`, ((err, data) => {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     console.log(data.toString());
    // }));

    // fs.writeFile(`${__dirname}/files/write.txt`, 'Hello world22', (err)=> {
    //     console.log(err);
    // });

    // fs.appendFile(`${__dirname}/files/append.txt`, 'Hello world22', (err)=> {
    //     console.log(err);
    // });
    // fs.appendFile(`${__dirname}/files/append.txt`, 'Hello world22', (err)=> {
    //     console.log(err);
    // });

    // console.log(appendFilePath);
    // fs.writeFile(appendFilePath, 'Hello world22\n', (err) => {
    //     console.log(err);
    // });
    // fs.appendFile(appendFilePath, 'Hello world22\n', (err) => {
    //     console.log(err);
    // });


    // fs.mkdir(mkdirPath, {recursive: true},(err) => {
    //     console.log(err);
    // })

    // fs.unlink(appendFilePath, err => {
    //     console.log(err);
    // });

    // fs.rename(
    //     writeFilePath,
    //     // path.join(mkdirPath, 'newFile.txt'),
    //     newFilePath,
    //     err => {
    //         console.log(err);
    //     }
    // );

    // fs.stat(newFilePath, ((err, stats) => {
    //     if (err) {
    //         return
    //     }
    //     console.log(stats);
    // }));

    fs.readdir(mkdirPath, (err, data) => {
        if (err) {
            console.log(err);
            return
        }
        console.log(data);

        data.forEach(fileName => {
            fs.stat(path.join(mkdirPath, fileName), ((err,stats)=>{
                if (err) {
                    return
                }
                // console.log(stats);
                console.log(stats.isFile());
            }))
        })
    });

    // fs.rmdir()...;
}

module.exports = {
    app
}