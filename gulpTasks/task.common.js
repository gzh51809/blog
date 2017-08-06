"use strict";

// ***************************************************
// Common tasks
// ***************************************************
module.exports = function (gulp) {

    const fs = require('fs-extra')
    const gutil = require('gulp-util')
    const runSequence = require('run-sequence')
    const config = require('../config/config.json')
    const util = require('./utils')

    // ***************************************************
    // Copy File
    // Gulp --from X --to X
    // ***************************************************
    gulp.task('copy', () => {
        if (!argv.from) {
            throw new gutil.PluginError('copy', 'No --from !')
        }
        if (!argv.to) {
            throw new gutil.PluginError('copy', 'No --to !')
        }
        fs.ensureDirSync(argv.from)
        return fs.copy(argv.from, argv.to)
    })

    // ***************************************************
    // Empty Old Files
    // ***************************************************
    gulp.task('empetyOldFiles', () => {
        return fs.remove(config.docs.sourcePath)
    })
}



