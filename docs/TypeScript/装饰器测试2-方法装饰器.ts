function enumerable(value: false) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		descriptor.enumerable = value
	}
}

class People {

	name: string

	constructor(name: string) {
		this.name = name
	}

	@enumerable(false)
	speak() {
	}

	@enumerable(true)
	walk() {
	}
}

const ulivz = new People('ulivz')

for (const key in ulivz) {
	console.log(key)
}


