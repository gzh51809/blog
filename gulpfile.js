'use strict';

// ***************************************************
// Gulp task for build blog
// ***************************************************
const runSequence = require('run-sequence')
const gulp = require('gulp')
const watch = require('gulp-watch')
const docsify = require('docsify-cli/lib')

require('./gulp.tasks')(gulp)

// ***************************************************
// Default
// ***************************************************
gulp.task('default', function (done) {
    runSequence('basic', 'compile', done);
})

// ***************************************************
// lint
// ***************************************************
gulp.task('lint', function (done) {
    runSequence('basic', 'singleLint', done);
})

// ***************************************************
// For Dev
// ***************************************************
gulp.task('docsify', done => {
    return docsify.serve('./docs', true, 3000)
})

gulp.task('watch', function () {
    return watch('workSpace/**', function () {
        gulp.run('default')
    })
});

gulp.task('dev', done => {
    runSequence(['watch', 'docsify'], done);
})

// ***************************************************
// Clean all special files
// ***************************************************
gulp.task('delSepc', function (done) {
    runSequence('basic', 'cleanAllSpecialFiles', done);
})

module.exports = runSequence.use(gulp)


