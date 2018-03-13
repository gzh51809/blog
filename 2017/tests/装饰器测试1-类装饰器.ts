"use strict";

function sealed(constructor: Function) {
	Object.seal(constructor)
	Object.seal(constructor.prototype)
}

class People1 {
	name: string

	constructor(name: string) {
		this.name = name
	}

	speak() {
		console.log(`I am ${this.name}`)
	}
}

@sealed
class People2 {
	name: string

	constructor(name: string) {
		this.name = name
	}

	speak() {
		console.log(`I am ${this.name}`)
	}
}

const people1 = new People1('ulivz')

Object.defineProperty(people1, 'name', {
	enumerable: false,
	configurable: false,
	get() {
		return 'ulivz'
	}
})

console.log(people1)

// ✅
Object.defineProperty(People1.prototype, 'speak', {
	get() {
		return 'ulivz'
	}
})

// ✅
Object.defineProperty(People1, 'speak', {
	get() {
		return 'ulivz'
	}
})

const people2 = new People2('ulivz')

// TypeError: Cannot define property:speak, object is not extensible
Object.defineProperty(People2.prototype, 'speak', {
	get() {
		return 'ulivz'
	}
})

// TypeError: Cannot define property:speak, object is not extensible
Object.defineProperty(People2, 'speak', {
	get() {
		return 'ulivz'
	}
})

console.log(people2)








