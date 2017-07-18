'use strict';

// ***************************************************
// Gulp task for build blog
// ***************************************************
const requireDir = require('require-dir')
const runSequence = require('run-sequence')
const gulp = require('gulp')

requireDir('./build', {recurse: true})

// ***************************************************
// Base Gulp Task - To Generate Global Variable
// ***************************************************
gulp.task('basic', done => {
    runSequence('prepare', 'getListLevel1', 'checkItemType', 'getListLevel2', 'cacheDocsList', done)
})

// ***************************************************
// Default - Dev
// ***************************************************
gulp.task('default', function (done) {
    runSequence('basic', 'generateSpecialFiles', 'updateREADME', done);
})

// ***************************************************
// Release to github
// ***************************************************
gulp.task('g', function (done) {
    runSequence('default', 'release:github', done);
})

// ***************************************************
// Markdown lint
// ***************************************************
gulp.task('mdlint', function (done) {
    runSequence('basic', 'lint', done);
})

// ***************************************************
// Clean all special files
// ***************************************************
gulp.task('delSepc', function (done) {
    runSequence('basic', 'cleanAllSpecialFiles', done);
})


