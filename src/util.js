var fs = require('fs')
var path = require('path')
var chalk = require('chalk')

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

module.exports = {
    getFileList,
    resolve
}