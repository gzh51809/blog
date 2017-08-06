"use strict";

// ***************************************************
// Create a mirror for current project
// ***************************************************
module.exports = function (gulp) {

    const fs = require('fs-extra')
    const path = require('path')
    const gutil = require('gulp-util')
    const util = require('./utils')
    const argv = require('yargs').argv
    const config = require('../config/template.json')
    const es = require('event-stream');

    const TEMPORARY_PATH = path.resolve(__dirname, '../.cache/TEMP/')
    let TARGET_PATH;

    gulp.task('mirror-work', done => {

        if (argv._.length === 0) {
            gutil.log(gutil.colors.red('Missing output path'))
            process.exit(1)
        }

        const TEMPORARY_PATH = path.resolve(__dirname, '../.cache/TEMP/')

        let targetPath = path.resolve(process.cwd(), argv._[0])

        if (fs.existsSync(targetPath) && fs.readdirSync(targetPath).length !== 0) {
            gutil.log(gutil.colors.red('Not an empty directory'))
            process.exit(2)
        }

        return es.merge(config.files.map(file => {
            return gulp.src(file, { base: '.' })
                .pipe(gulp.dest(TEMPORARY_PATH))
        }))

        // return fs.copy(path.resolve(__dirname, '../'), TEMPORARY_PATH)
        //     .then(()=>{
        //         console.log('TEMP finished! ')
        //     })

    })

    gulp.task('mirror-output', done => {
        return fs.copy(TEMPORARY_PATH, TARGET_PATH)
    })
}

