'use strict';

const fs = require('fs-extra')
const gulp = require('gulp')
const gutil = require('gulp-util')
const util = require('./gulp.utils')
const argv = require('yargs').argv
const config = require('../config/config.json')

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

