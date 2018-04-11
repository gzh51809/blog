'use strict';

function write(itemName, item) {
	sessionStorage.setItem(itemName, JSON.stringify(item))
}

function read(itemName) {
	let item;
	try {
		item = JSON.parse(sessionStorage.getItem(itemName))
	} catch (err) {
		item = null;
	}
	return item;
}

function clear(itemName) {
	sessionStorage.removeItem(itemName)
}

module.exports = {
	write,
	read,
	clear
}
