const fs = require("fs");
const path = require("path");

function app() {
    console.clear();
    console.log('homework 1');

    const dirCreator = require('./helper/dir-creator');
    const fileCreator = require('./helper/file-creator');
    const userBuilder = require('./helper/user-builder');

    const filesDirPath = path.join(__dirname,'files');
    const girlsDirPath = path.join(filesDirPath,'girls');
    const boysDirPath = path.join(filesDirPath,'boys');

    dirCreator.createDir(girlsDirPath);
    dirCreator.createDir(boysDirPath);

    user1 = userBuilder.createUser('Mykola','male');
    user2 = userBuilder.createUser('Petro','male');
    user3 = userBuilder.createUser('Ivan','male');
    user4 = userBuilder.createUser('Olexandr','male');

    user5 = userBuilder.createUser('Galyna','female');
    user6 = userBuilder.createUser('Oksana','female');
    user7 = userBuilder.createUser('Kateryna','female');
    user8 = userBuilder.createUser('Odarka','female');

    fileCreator.createFile(girlsDirPath, user1);
    fileCreator.createFile(boysDirPath, user2);
    fileCreator.createFile(girlsDirPath, user3);
    fileCreator.createFile(boysDirPath, user4);
    fileCreator.createFile(girlsDirPath, user5);
    fileCreator.createFile(boysDirPath, user6);
    fileCreator.createFile(girlsDirPath, user7);
    fileCreator.createFile(boysDirPath, user8);

    // fs.mkdir(mkdirPath, {recursive: true},(err) => {
    //     console.log(err);
    // })


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

    // fs.readdir(mkdirPath, (err, data) => {
    //     if (err) {
    //         console.log(err);
    //         return
    //     }
    //     console.log(data);
    //
    //     data.forEach(fileName => {
    //         fs.stat(path.join(mkdirPath, fileName), ((err,stats)=>{
    //             if (err) {
    //                 return
    //             }
    //             // console.log(stats);
    //             console.log(stats.isFile());
    //         }))
    //     })
    // });

    // fs.rmdir()...;
}

module.exports = {
    app
}