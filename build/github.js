'use strict';

const shell = require('shelljs')
const gulp = require('gulp')
const argv = require('yargs').argv
const gutil = require('gulp-util')

gulp.task('release:github', function () {
    if (!argv.commit) {
        throw new gutil.PluginError('release', 'Must give commit msg!')
    } else if(argv.commit.length < 10) {
        throw new gutil.PluginError('release', 'Commit msg length must be greater than ' + gutil.colors.red(10))
    }
    shell.exec('git add .')
    shell.exec('git commit -m "' + argv.commit + '"')
    shell.exec('git push')
})