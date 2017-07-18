'use strict';

const getFileList = require('../src/util').getFileList
const resolve = require('../src/util').resolve
const config = require('../config/config.json')
const fs = require('fs-extra')
const gulp = require('gulp');
const gutil = require('gulp-util');
const util = require('./gulp.utils')

var docs;

// Get File list - Level 1
gulp.task('getListLevel1', () => {
    return getFileList(resolve(config.docs.path))
        .then(list => {
            docs = list.filter(item => !util.isIgnore_Level_1(item.name))
        })
})

// Check type
gulp.task('checkItemType', (done) => {
    docs.map(item => {
        var stat = fs.lstatSync(item.absolutePath);

        if (stat.isDirectory()) {
            item.isDirectory = true
        }
    })
    done()
})

// Save docs as JSON
gulp.task('cacheDocsList', (done) => {
    return fs.outputFile(resolve(config.cache.path), JSON.stringify(docs, null, 2))
})

// Get File list - Level 2
// Set propery {'specFiles', 'category', 'children'}
gulp.task('getListLevel2', (done) => {
    return Promise.all(
        docs.filter(item => item.isDirectory)
            .map(item => {
                return getFileList(item.absolutePath).then(list => {
                        item.children = list
                        item.category = util.getCategory(item)
                    }
                )
            }))
        .catch(err => {
            throw new gutil.PluginError('getListLevel2', err);
        })
})

// Generate special files
gulp.task('generateSpecialFiles', (done) => {

    let tasks = [];

    docs.filter(item => item.isDirectory)
        .forEach(DIR => {
            DIR.specFiles.forEach(file => {
                gutil.log(`${gutil.colors.cyan('Created: ')}${DIR.name}/${file.name}`)
                tasks.push(fs.outputFile(file.absolutePath, util.getSpecFileContent(DIR, file)))
            })
        })

    return Promise.all(tasks).catch(err => {
        throw new gutil.PluginError('generateSpecialFiles', err);
    })
})

// Clean all special files
gulp.task('cleanAllSpecialFiles', (done) => {

    let tasks = [];

    docs.filter(item => item.isDirectory)
        .forEach(DIR => {
            DIR.specFiles.forEach(file => {
                gutil.log(`${gutil.colors.cyan('Remove: ')}${DIR.name}/${file.name}`)
                tasks.push(fs.remove(file.absolutePath))
            })
            // Should also
            delete DIR.specFiles
        })

    return Promise.all(tasks).catch(err => {
        throw new gutil.PluginError('cleanAllSpecialFiles', err);
    })

})

