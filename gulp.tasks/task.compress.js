'use strict';

// ***************************************************
// Lint task
// ***************************************************
module.exports = function (gulp, docs) {

    // const fs = require('fs-extra')
    // const gutil = require('gulp-util')
    // const runSequence = require('run-sequence')
    // const config = require('../config/config.json')
    // const util = require('./utils')
    // const imagemin = require('gulp-imagemin')
    // const pngquant = require('imagemin-pngquant')
    // const imageResize = require('gulp-image-resize');
    // const tiny = require('gulp-tinypng-nokey');
    // const smushit = require('gulp-smushit');
    //
    // // ***************************************************
    // // Cannot write unMd file in column directory
    // // ***************************************************
    // gulp.task('imagemin', done => {
    //
    //     const t = config.docs.targetPath + '/**/img/*.png'
    //     const p = config.cache.rootDir + '/**/img/*.png'
    //     gulp.src(t, { base: '.' })
    //         // .pipe(smushit({
    //         //     verbose: true
    //         // }))
    //         // .pipe(tiny())
    //         .pipe(imageResize({
    //             width: 800
    //         }))
    //         .pipe(imagemin([
    //             imagemin.optipng({optimizationLevel: 1}),
    //         ],{
    //             verbose: true,
    //             use: [pngquant({
    //                 quality: '10',
    //                 speed: 10,
    //                 verbose: true
    //             })]
    //         }))
    //         .pipe(gulp.dest(config.cache.rootDir))
    //         .on('end', done) // gulp.dest is an async operation ...
    // })
    //
    // // ***************************************************
    // // Main
    // // ***************************************************
    // gulp.task('compress', done => {
    //     runSequence('imagemin', done);
    // })
}
