# JavaScript中Object的静态方法详解

书写本文的初衷在于，`Object`类上有很多可以简化我们**操作原型**、**遍历属性**的方法。接下来，我们一一探讨。

!> 本文假设你已经能够很熟悉用`JS`来书写类，以及各种继承方法。

## 继承

首先，我们回顾一下常规的寄生组合式继承。

```js
function inheritProto(ob) {
	let f = function(){}
	f.prototype = ob.prototype
	return new f()
}

function ClassA(name) {
	this.name = name
	this.A = 'A' + name
}
ClassA.prototype.getA = function() {
	return this.A
}

function B(name) {
	A.call(this, name)
	this.name = name
	this.B = 'B' + name
}

B.prototype.getB = function() {
	return this.B
}

var b = new B()
console.log(b)
```

## instanceof

## Object.create()

##
