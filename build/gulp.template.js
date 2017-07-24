"use strict";

// const getFileList = require('./gulp.utils').getFileList
// const resolve = require('./gulp.utils').resolve
// const config = require('../config/config.json')
const fs = require('fs-extra')
const path = require('path')
const gulp = require('gulp')
const gutil = require('gulp-util')
const util = require('./gulp.utils')
const argv = require('yargs').argv
const config = require('../config/template.json')
const es = require('event-stream');

const TEMPORARY_PATH = path.resolve(__dirname, '../.cache/TEMP/')
let TARGET_PATH;

// ***************************************************
// TEMP file
// ***************************************************
gulp.task('temp-file', done => {

    if (argv._.length === 0) {
        gutil.log(gutil.colors.red('Missing output path'))
    }

    TARGET_PATH = path.resolve(process.cwd(), argv._[0])

    if (fs.existsSync(TARGET_PATH) && fs.readdirSync(TARGET_PATH).length !== 0) {
        gutil.log(gutil.colors.red('Not an empty directory'))
        process.exit(1)
    }

    return es.merge(config.files.map(file => {
        // Keep the output path followed by the original path
        return gulp.src(file, {base: '.'})
            .pipe(gulp.dest(TEMPORARY_PATH))
    }))

})

// ***************************************************
// OUTPUT file
// ***************************************************

gulp.task('output-file', done => {
    return fs.copy(TEMPORARY_PATH, TARGET_PATH)
})
