'use strict';

const config = require('../config/config.json')
const fs = require('fs-extra')
const path = require('path')

exports.isIgnore_Level_1 = isIgnore_Level_1
exports.isIgnore_Level_2 = isIgnore_Level_2
exports.isMd = isMd
exports.getLine = getLine
exports.getCategory = getCategory
exports.getSpecFileContent = getSpecFileContent
exports.getItem = getItem
exports.getFileList = getFileList
exports.resolve = resolve

function isIgnore_Level_1(fileName) {
    var ignoreFiles = config.docs.level1.ignore;
    if (ignoreFiles.indexOf(fileName) !== -1) {
        return true
    }
    return false
}

function isIgnore_Level_2(fileName) {
    var ignoreFiles = config.docs.level2.ignore;
    if (ignoreFiles.indexOf(fileName) !== -1) {
        return true
    }
    return false
}

function isMd(fileName) {
    return /\.md/.test(fileName)
}

function getLine(dirName, fileName) {
    return `- [${fileName}](${dirName}/${fileName}.md)\n`;
}

function getItem(column, count) {
    return `- [${column}（${count}）](/${column}/)\n`
}

function getCategory(DIR) {

    var category = '';

    DIR.children.forEach(child => {

        // 1. Handle special files, add into DIR.specFiles
        var specFilesMap = config.docs.level2.specialFilesMap
        var specFiles = Object.keys(specFilesMap)
        DIR.specFiles = []
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

        var stat = fs.lstatSync(child.absolutePath);

        if (stat.isDirectory()) {
            child.isDirectory = true

        } else if (!isIgnore_Level_2(child.name) && isMd(child.name)) {
            category += getLine(DIR.name, child.name.split('.')[0])

        }
    })

    return category;
}

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

function resolve(p) {
    return path.resolve(__dirname, '../', p)
}
