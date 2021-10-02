const fs = require("fs");
const path = require("path");
const fileCreator = require("./helper/file-creator");
const userBuilder = require("./helper/user-builder");
const processDirectory = require("./helper/processDirectory");

const filesDirPath = path.join(__dirname, 'files');
const girlsDirPath = path.join(filesDirPath, 'girls');
const boysDirPath = path.join(filesDirPath, 'boys');

console.clear();
console.log('homework 1');

fs.mkdirSync(girlsDirPath, {recursive: true});
fs.mkdirSync(boysDirPath, {recursive: true});

fileCreator.createFile(girlsDirPath, userBuilder.createUser('Mykola', 'male'));
fileCreator.createFile(girlsDirPath, userBuilder.createUser('Ivan', 'male'));
fileCreator.createFile(girlsDirPath, userBuilder.createUser('Galyna', 'female'));
fileCreator.createFile(girlsDirPath, userBuilder.createUser('Kateryna', 'female'));

fileCreator.createFile(boysDirPath, userBuilder.createUser('Petro', 'male'));
fileCreator.createFile(boysDirPath, userBuilder.createUser('Olexandr', 'male'));
fileCreator.createFile(boysDirPath, userBuilder.createUser('Oksana', 'female'));
fileCreator.createFile(boysDirPath, userBuilder.createUser('Odarka', 'female'));

processDirectory.processDir(girlsDirPath, boysDirPath, 'female');
processDirectory.processDir(boysDirPath, girlsDirPath, 'male');

console.log('homework 1 done');