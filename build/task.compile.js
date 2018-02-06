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
    gulp.task('add-indent-for-chinese-chars', done => {
        let tasks = [];
        docs.filter(util.isDirectory).forEach(directory => {
	        directory.children.filter(item => !item.isDirectory).forEach(file => {
                // gutil.log(`${gutil.colors.cyan('Created: ')}${DIR.name}/${file.name}`)
                let content = fs.readFileSync(file.absolutePath, 'utf-8')
                content = content.replace(/^([\u4e00-\u9fa5\w…“])/gm, '&emsp;&emsp;$1')
                tasks.push(fs.outputFile(file.absolutePath, content))
            })
        })

        return Promise.all(tasks).catch(err => {
            throw new gutil.PluginError('addIndentForChinese', err);
        })
    })

    // update README
    gulp.task('update-readme', () => {

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
        runSequence('update-readme', done);
    })

    return docs
}
