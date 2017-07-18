'use strict';

// ***************************************************
// Gulp task for build blog
// ***************************************************
const requireDir = require('require-dir')
const runSequence = require('run-sequence')
const gulp = require('gulp')

requireDir('./build', {recurse: true})

// Default
gulp.task('default', function (done) {
    runSequence(
        'prepare',
        'getListLevel1',
        'checkItemType',
        'getListLevel2',
        'cacheDocsList',
        'generateSpecialFiles',
        'updateREADME'
        , done);
})

gulp.task('github', function (done) {
    runSequence(
        'default',
        'release:github'
        , done);
})

// Clean spec files
gulp.task('delSepc', function (done) {
    runSequence('getListLevel1', 'checkItemType', 'getListLevel2', 'cleanAllSpecialFiles', done);
})


