'use strict';

const getFileList = require('./gulp.utils').getFileList
const resolve = require('./gulp.utils').resolve
const config = require('../config/config.json')
const fs = require('fs-extra')
const path = require('path')
const gulp = require('gulp')
const gutil = require('gulp-util')
const util = require('./gulp.utils')

var docs;

// file type lint
gulp.task('lint', () => {
    docs.filter(item => item.isDirectory)
        .forEach(DIR => {
            DIR.children
                .filter(child => !child.isDirectory)
                .filter(child => !util.isIgnore_Level_2(child.name))
                .forEach(child => {
                    if (!util.isMd(child.name)) {
                        throw new gutil.PluginError('markdwonlint', gutil.colors.red('Unexpected fileType') + ' ' + gutil.colors.gray(child.absolutePath));
                    }
                })
        })
    gutil.log('[OK]')
})

// Copy file from worksapce to docs
gulp.task('prepare', () => {
    return fs.remove(resolve(config.docs.targetPath))
        .then(() => {
            return fs.copy(config.docs.sourcePath, config.docs.targetPath)
        })
})

// Get File list - Level 1
gulp.task('getListLevel1', () => {
    return getFileList(resolve(config.docs.targetPath))
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
            .map(DIR => {
                return getFileList(DIR.absolutePath).then(list => {
                        DIR.children = list
                        DIR.category = util.getCategory(DIR)
                        DIR.articleCount = DIR.children
                            .filter(child => !child.isDirectory)
                            .filter(child => !util.isIgnore_Level_2(child.name)).length
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

// update README
gulp.task('updateREADME', () => {

    let outputPath = path.resolve(config.docs.targetPath, config.project.README.path);
    let content = fs.readFileSync(outputPath, 'utf-8');
    let category = '';

    docs.filter(item => item.isDirectory)
        .forEach(DIR => {
            category += util.getItem(DIR.name, DIR.articleCount)
        })

    content = content.replace('{{content}}', category)
    return fs.outputFile(outputPath, content)
})

