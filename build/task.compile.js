'use strict';

/**
 * Compile Task
 * @param {Object} gulp
 * @param {Array} docs
 * @returns {*}
 */
module.exports = function (gulp, docs) {

    const fs = require('fs-extra')
    const path = require('path')
    const gutil = require('gulp-util')
    const runSequence = require('run-sequence')
    const config = require('../config/config.json')
    const util = require('./utils')

    // ***************************************************
    // Add indent for Chiniese
    // ***************************************************
    gulp.task('addIndentForChinese', done => {
        let tasks = [];
        docs.filter(util.isDirectory).forEach(DIR => {
            DIR.children.filter(item => !item.isDirectory).forEach(file => {
                // gutil.log(`${gutil.colors.cyan('Created: ')}${DIR.name}/${file.name}`)
                let content = fs.readFileSync(file.absolutePath, 'utf-8')
                content = content.replace(/^([\u4e00-\u9fa5\w…“])/gm, '&emsp;&emsp;$1')
                tasks.push(fs.outputFile(file.absolutePath, content))
            })
        })

        return Promise.all(tasks).catch(err => {
            throw new gutil.PluginError('generateSpecialFiles', err);
        })
    })

    // Generate special files
    gulp.task('generateSpecialFiles', (done) => {

        let tasks = [];

        docs.filter(util.isDirectory).forEach(DIR => {
            DIR.specFiles.forEach(file => {
                // gutil.log(`${gutil.colors.cyan('Created: ')}${DIR.name}/${file.name}`)
                tasks.push(fs.outputFile(file.absolutePath, util.getSpecFileContent(DIR, file)))
            })
        })

        return Promise.all(tasks).catch(err => {
            throw new gutil.PluginError('generateSpecialFiles', err);
        })
    })

    // ***************************************************
    // Clean all special files
    // ***************************************************
    // gulp.task('cleanAllSpecialFiles', (done) => {
    //     let tasks = [];
    //     docs.filter(item => item.isDirectory)
    //         .forEach(DIR => {
    //             DIR.specFiles.forEach(file => {
    //                 // gutil.log(`${gutil.colors.cyan('Remove: ')}${DIR.name}/${file.name}`)
    //                 tasks.push(fs.remove(file.absolutePath))
    //             })
    //             // Should also
    //             delete DIR.specFiles
    //         })
    //
    //     return Promise.all(tasks).catch(err => {
    //         throw new gutil.PluginError('cleanAllSpecialFiles', err);
    //     })
    // })

    // update README
    gulp.task('updateREADME', () => {

        let outputPath = path.resolve(config.docs.targetPath, config.project.README.path);
        let content = fs.readFileSync(outputPath, 'utf-8');
        let category = '';

        docs.filter(util.isDirectory).forEach(DIR => {
            category += util.getItem(DIR.name, DIR.articleCount)
        })

        content = content.replace('{{content}}', category)
        return fs.outputFile(outputPath, content)
    })

    // ***************************************************
    // Main
    // ***************************************************
    gulp.task('compile', done => {
        runSequence('updateREADME', 'generateSpecialFiles', done);
    })

    return docs
}
