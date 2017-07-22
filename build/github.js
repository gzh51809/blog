'use strict';

const shell = require('shelljs')
const gulp = require('gulp')
const argv = require('yargs').argv
const gutil = require('gulp-util')

gulp.task('release:github', function () {
    if (!argv.commit) {
        gutil.log(gutil.colors.red('release') + ' Must give commit msg!')
        process.exit(1)
    } else if(argv.commit.length < 10) {
        gutil.log(gutil.colors.red('release') + ' Commit msg length must be greater than ' + gutil.colors.red(10))
        process.exit(1)
    }
    shell.exec('git add .')
    shell.exec('git commit -m "' + argv.commit + '"')
    shell.exec('git push')
})