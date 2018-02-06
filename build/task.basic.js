'use strict';

/**
 * Basic Task - Parse docs to a simple tree
 * @param {Object} gulp
 * @param {Array} docs
 * @returns {*}
 */
module.exports = function (gulp, docs) {

	const fs = require('fs-extra')
	const gutil = require('gulp-util')
	const runSequence = require('run-sequence')
	const config = require('../config/config.json')
	const util = require('./utils')

	// ***************************************************
	// Get File list - Level 1
	// ***************************************************
	gulp.task('getListLevel1', () => {
		return util.getFileList(util.resolve(config.docs.path))
				.then(list => {
					// Cannot change the pointer of docs !!!
					// docs = list.filter(item => !util.isIgnoreInLevel1(item.name))
					docs.push.apply(docs, list.filter(item => !util.isIgnoreInLevel1(item.name)))
				})
	})

	// ***************************************************
	// Add type in level 1
	// ***************************************************
	gulp.task('addType', (done) => {
		docs.map(item => {
			const stat = fs.lstatSync(item.absolutePath);
			if (stat.isDirectory()) {
				item.isDirectory = true
			}
		})
		done()
	})

	// ***************************************************
	// Get File list - Level 2
	// Set propery {'specFiles', 'category', 'children'}
	// ***************************************************
	gulp.task('getListLevel2', (done) => {
		return Promise.all(
				docs.filter(item => item.isDirectory)
						.map(directory => {
							return util.getFileList(directory.absolutePath).then(list => {
										directory.children = list
										directory.category = util.getCategory(directory)
										directory.articleCount = directory.children
												.filter(child => !child.isDirectory)
												.filter(child => !util.isIgnoreInLevel2(child.name)).length
									}
							)
						}))
				.catch(err => {
					throw new gutil.PluginError('getListLevel2', err);
				})
	})

	// ***************************************************
	// Save docs as JSON
	// ***************************************************
	gulp.task('cacheDocsList', done => {
		return fs.outputFile(util.resolve(config.cache.path), JSON.stringify(docs, null, 2))
	})

	// ***************************************************
	// Main
	// ***************************************************
	gulp.task('basic', done => {
		runSequence('getListLevel1', 'addType', 'getListLevel2', 'cacheDocsList', done);
	})

	return docs
}
