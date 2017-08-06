'use strict';

/**
 * Basic Task - Parse docs to a simple tree
 * @param {Object} gulp
 * @param {Array} docs
 * @returns {*}
 */
module.exports = function (gulp, docs) {

    const fs = require('fs-extra')
    const gutil = require('gulp-util')
    const runSequence = require('run-sequence')
    const config = require('../config/config.json')
    const util = require('./utils')

    // ***************************************************
    // Copy file from worksapce to docs
    // ***************************************************
    gulp.task('prepare', done => {
        fs.remove(util.resolve(config.docs.targetPath))
            .then(() => {
                return gulp.src(config.docs.sourcePath + '/**/!(*__.md)', { base: './' + config.docs.sourcePath })
                    .pipe(gulp.dest(config.docs.targetPath))
                    .on('end', () => {
                        fs.writeFileSync(config.docs.targetPath + '/.nojekyll', '', 'utf-8')
                        done()
                    }) // gulp.dest is an async operation ...
            })
    })

    // ***************************************************
    // Get File list - Level 1
    // ***************************************************
    gulp.task('getListLevel1', () => {
        return util.getFileList(util.resolve(config.docs.targetPath))
            .then(list => {
                // Cannot change the pointer of docs !!!
                // docs = list.filter(item => !util.isIgnoreInLevel1(item.name))
                docs.push.apply(docs, list.filter(item => !util.isIgnoreInLevel1(item.name)))
            })
    })


    // ***************************************************
    // Add type in level 1
    // ***************************************************
    gulp.task('addType', (done) => {
        docs.map(item => {
            var stat = fs.lstatSync(item.absolutePath);

            if (stat.isDirectory()) {
                item.isDirectory = true
            }
        })
        done()
    })

    // ***************************************************
    // Get File list - Level 2
    // Set propery {'specFiles', 'category', 'children'}
    // ***************************************************
    gulp.task('getListLevel2', (done) => {
        return Promise.all(
            docs.filter(item => item.isDirectory)
                .map(DIR => {
                    return util.getFileList(DIR.absolutePath).then(list => {
                            DIR.children = list
                            DIR.category = util.getCategory(DIR)
                            DIR.articleCount = DIR.children
                                .filter(child => !child.isDirectory)
                                .filter(child => !util.isIgnoreInLevel2(child.name)).length
                        }
                    )
                }))
            .catch(err => {
                throw new gutil.PluginError('getListLevel2', err);
            })
    })

    // ***************************************************
    // Save docs as JSON
    // ***************************************************
    gulp.task('cacheDocsList', done => {
        return fs.outputFile(util.resolve(config.cache.path), JSON.stringify(docs, null, 2))
    })

    // ***************************************************
    // Main
    // ***************************************************
    gulp.task('basic', done => {
        runSequence('prepare', 'getListLevel1', 'addType', 'getListLevel2', 'cacheDocsList', done);
    })

    return docs
}
