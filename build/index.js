'use strict';

const requireDir = require('require-dir')
const tasksMap = requireDir(__dirname)
const docs = []

module.exports = gulp => {
	for (let key of Object.keys(tasksMap)) {
		if (key.indexOf('task') >= 0) {
			tasksMap[key](gulp, docs)
		}
	}
}
