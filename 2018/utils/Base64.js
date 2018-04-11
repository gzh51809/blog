'use strict';

function encode(input) {
	if (typeof window !== 'undefined') {
		return window.btoa(input)
	} else {
		return Buffer(input).toString('base64')
	}
}

function decode(input) {
	if (typeof window !== 'undefined') {
		return window.atob(input)
	} else {
		return Buffer(input, 'base64').toString('ascii')
	}
}

module.exports = {
	encode,
	decode
}

