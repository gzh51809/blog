'use strict';

// ***************************************************
// Lint task
// ***************************************************
module.exports = function (gulp, docs) {

    const fs = require('fs-extra')
    const gutil = require('gulp-util')
    const runSequence = require('run-sequence')
    const config = require('../config/config.json')
    const util = require('./utils')

    // ***************************************************
    // Cannot write unMd file in column directory
    // ***************************************************
    gulp.task('fileTypelint', () => {
        docs.filter(item => item.isDirectory)
            .forEach(DIR => {
                DIR.children
                    .filter(child => !child.isDirectory)
                    .filter(child => !util.isIgnoreInLevel2(child.name))
                    .forEach(child => {
                        if (!util.isMd(child.name)) {
                            throw new gutil.PluginError('markdwonlint', gutil.colors.red('Unexpected fileType') + ' ' + gutil.colors.gray(child.absolutePath));
                        }
                    })
            })
        gutil.log('✅  - fileTypelint')
    })

    // ***************************************************
    // Main
    // ***************************************************
    gulp.task('singleLint', done => {
        runSequence('fileTypelint', done);
    })
}
