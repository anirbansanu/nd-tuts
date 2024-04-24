'use strict';
const path = require('path');
const fs = require('fs');

const directoryPath = __dirname; // Current directory

const listDirectoriesAndFiles = (dirPath) => {
    const items = fs.readdirSync(dirPath);
    const directories = [];
    const files = [];

    items.forEach((item) => {
        const itemPath = path.join(dirPath, item);
        const stats = fs.statSync(itemPath);

        if (stats.isDirectory()) {
            directories.push(item);
        } else if (stats.isFile()) {
            files.push(item);
        }
    });

    return { directories, files };
};

const { directories, files } = listDirectoriesAndFiles(directoryPath);
console.log('Directories:', directories);
console.log('Files:', files);
