'use strict';

const config = require('../config/config.json')
const fs = require('fs-extra')
const path = require('path')

/**
 * Check if file/dir is ignored in level 1
 * @param fileName
 * @returns {boolean}
 */
function isIgnoreInLevel1(fileName) {
    let ignoreFiles = config.docs.level1.ignore;
    return ignoreFiles.indexOf(fileName) !== -1;
}

/**
 * Check if file/dir is ignored in level 2
 * @param fileName
 * @returns {boolean}
 */
function isIgnoreInLevel2(fileName) {
    let ignoreFiles = config.docs.level2.ignore;
    return ignoreFiles.indexOf(fileName) !== -1;
}

/**
 * Check if a file is markdown
 * @param fileName
 * @returns {boolean}
 */
function isMd(fileName) {
    return /\.md/.test(fileName)
}

/**
 * Get a base item for sidebar/README in level 2
 * @param dirName
 * @param fileName
 * @returns {string}
 */
function getLine(dirName, fileName) {
    return `- [${fileName}](${dirName}/${fileName}.md)\n`;
}

/**
 * Get a base item for README in level 1
 * @param column
 * @param count
 * @returns {string}
 */
function getItem(column, count) {
    return `- [${column}（${count}）](/${column}/)\n`
}

/**
 * Gen DIR.specFiles / child.isDirectory, and get category
 * @param DIR
 * @returns {string}
 */
function getCategory(DIR) {

    let category = ''
    DIR.specFiles = []

    DIR.children.forEach(child => {

        // 1. Handle special files, add into DIR.specFiles
        let specFilesMap = config.docs.level2.specialFilesMap
        let specFiles = Object.keys(specFilesMap)
        specFiles.forEach(key => {
            DIR.specFiles.push({
                name: key.replace('.md', ''),
                fileName: key,
                content: specFilesMap[key].content,
                absolutePath: DIR.absolutePath + '/' + key,
                header: (typeof specFilesMap[key].header !== 'string' ?
                    specFilesMap[key].header.join('') :
                    specFilesMap[key].header)
            })
        })

        let stat = fs.lstatSync(child.absolutePath);

        if (stat.isDirectory()) {
            child.isDirectory = true

        } else if (!isIgnoreInLevel2(child.name) && isMd(child.name)) {
            category += getLine(DIR.name, child.name.split('.')[0])

        }
    })

    return category;
}

/**
 * Get special file's content
 * @param dir
 * @param file
 * @returns {void|string|XML|*}
 */
function getSpecFileContent(dir, file) {
    let content = file.header.replace('{{dirName}}', dir.name)
    switch (file.content) {
        case 'category':
            content += dir.category;
            break;
        default:
            ;
    }
    return content;
}

/**
 * Get file list
 * @param path
 * @returns {Promise}
 */
function getFileList(dir) {
    return new Promise(function (resolve, reject) {
        fs.readdir(dir, function (err, files) {
            if (err) {
                reject(err)
            } else {
                resolve(
                    files.map(file => {
                        return {
                            name: file,
                            absolutePath: path.resolve(dir, file)
                        }
                    })
                )
            }
        })
    })
}

/**
 * Resolve path
 * @param p
 * @returns {string}
 */
function resolve(p) {
    return path.resolve(__dirname, '../', p)
}

function isDirectory(item) {
    return item.isDirectory
}

module.exports = {
    isIgnoreInLevel1,
    isIgnoreInLevel2,
    isMd,
    getLine,
    getCategory,
    getSpecFileContent,
    getItem,
    getFileList,
    resolve,
    isDirectory
}