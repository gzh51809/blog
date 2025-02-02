---
date: 2016-9-9
tags: 
  - JavaScript
author: ULIVZ
location: Foshan
---

# JavaScript中的类型

本文主要探讨 `JavaScript` 中的引用类型和值类型，并假设您具有一定的面向对象编程的经验。

## ECMAScript标准

根据 `ECMAScript` 的标准（参考《JavasCript高级程序设计》），`JavaScript`(ES5) 的类型定义如下：

- `5` 种基本的数据类型：`String`、`Number`、`Boolean`、`null`、`undefined`
- `1` 种复杂的数据类型：`Object`

`typeof`操作符可能会返回如下字符串：

- undefined  （`undefined`）
- boolean  (`Boolean` 的实例)
- number  (`Number` 的实例)
- object （`Object/Array/RegExp/Date` 的实例，或者`null`）
- function    (`Function`的实例)


## 值类型和引用类型 

- 值类型：实际上就是5种基本的数据类型：String、Number、Boolean、null、undefined
- 引用类型：Object（包含：Array、Function）

## == 与 === 的区别

（1） 对于`String、Number`等值类型，`==`和`===`是有区别的
	1. 不同类型间比较，`==`之只比较“转化成同一类型后的值”是否相等，而`===`如果类型不同，其结果就是不等
	2. 同类型比较，直接进行值的比较，`==`和`===`的结果一样
	
```js
// 测试1 - 值类型

let str = '1994'
let nu1 = 1994
let nu2 = 1994
console.log(str == nu1)  // true，说明在比较时隐式地进行了类型的转换
console.log(str === nu1)  // false，说明首先比较了类型，类型不等，因此为false
console.log(nu2 === nu2) // true，同类型比较，直接比较值
```

（2）对于`Array、Object`等高级类型，`==`和`===`是没有区别的，因为都是直接比较其保存的内存指针地址。

```js
// 测试2 - 引用类型

let o1 = {}
// o2实际上只是复制了o1在堆内存中的地址
let o2 = o1
// o3是一个新的对象
let o3 = {}

console.log(o1 == o2)  // true
console.log(o1 === o2) // true
console.log(o1 == o3)  // false
console.log(o1 === o3) // false
```

（3）基础类型与高级类型进行比较时，`==`和`===`是有区别的
	1. 对于`==`，将高级转化为基础类型，进行“值”比较
	2. 因为类型不同，`===`结果为`false`
	
```js
// 测试3 - 引用类型和值类型进行比较
let array = [1,2,3]
let fn = function () {}
let object = {
    name: 'Chen'
}
let string = '1,2,3'
let string2 = `function () {}`
    
console.info(array == string) // true, 天呀，比较的时候居然给我进行了类型的转换
console.info(fn == string2) // true
console.info(object == '[object Object]') // true
```

> 结论：`==`会在转换时强制进行类型转换，因此，当我们需要严格判断两个变量的类型和值相同时，请使用`===`

此外的一个小插曲，我们会注意到，在执行这一段代码的时候，隐式地执行了: `object.toString()`，由此，我们还可以得出经典的派生对象类型的判断：

```js
// 测试4 - 通用的派生对象类型判断方法
    
Object.prototype.toString.call([]) // "[object Array]" 实际上，可以直接用静态方法 Array.isArray 来进行判断
Object.prototype.toString.call({}) // "[object Object]"
Object.prototype.toString.call(new Date()) // "[object Date]"
Object.prototype.toString.call(new RegExp()) // "[object RegExp]"
Object.prototype.toString.call(new Map()) // "[object Map]"
Object.prototype.toString.call(new Promise(function() {})) // "[object Promise]"
Object.prototype.toString.call(Symbol()) // "[object Symbol]"
```

## 引用类型带来的问题

`JavaScript`这门语言不同于其他语言的地方也就是：我们无法直接访问对象内存中的位置，也就是说不能直接操作对象的内存空间。所谓的引用类型，存储的只是一个内存地址。那么，由此，我们会遇到很多问题：

在刚刚接触`JavaScript`的开发过程中，我们有时可能会遇到一些困惑，有的时候我们无意修改了某个值，这个值的变化直接导致了另外一个值的变化。

接下来，我们以三个例子来引入今天的话题：

首先是`Object`：

```js
// 测试5 - 对象的赋值

let obj1 = {
    name: {
        firstName: 'You',
        lastName: 'Evan'
    },
    age: 29
}

let obj2 = obj1

obj2.name.firstName = 'Chen'

console.log(obj1 === obj2) // true
// 相信这一点比较好理解
// 由于对象的赋值赋的是内存地址，因此共享这内存地址的任意一个对象的某个属性发生改变时，都会影响到其他保存该地址的对象
console.log(obj1.name.firstName) // Chen
```

然后是`Array`：

```js
// 测试6 - 数组的赋值
let arr1 = [1, 2, 3, 4, 5]
let arr2 = arr1
arr2[0] = 0
console.log(arr1) // [0, 2, 3, 4, 5]
```

最后是`Function`：

```js
// 测试7 - 函数的赋值
function Fn(name) {
    this.name = name
}
Fn.prototype.getName = function () {
    return this.name
}

let Fnn = Fn
Fnn.prototype.getName = function () {
    return `${this.name} - new`
}

console.log(Fnn === Fn) // true

var ins = new Fn('Chen')
console.log(ins.getName()) // Chen - new
```

## 浅拷贝与深拷贝的实现

### 浅拷贝

为了真正复制一个对象的方法和属性，我们首先可以想到这种方式：

```js
// 测试8 - 浅拷贝的第一种写法
function clone(object) {
    let __ob__ = new Object()
    for (let key in object) {
        __ob__[key] = object[key]
    }
    return __ob__
}
```

此外，如果你习惯了寄生继承，你也可以写出这种方式：

```js
// 测试9 - 浅拷贝的另一种写法

// 浅拷贝
function clone(object) {
    let fn = function() {}
    fn.prototype = object
    return new fn()
}
```

实际上述两种方式的实现是一样的，看似实现了深克隆，其实不然，因为在对属性遍历的过程中，仍然采用的是直接赋值，因为引用类型创建仍然是引用，如下：

```js
// 测试10 - 浅拷贝的问题

let obj1 = {
    name: {
        firstName: 'You',
        lastName: 'Evan'
    },
    age: 29
}

let obj2 = clone(obj1)

console.log(obj1 == obj2) // false，确实是重新创建了对象

obj2.age = 23
console.log(obj1.age) // 29，如果第一层的子属性是值类型，因为已经重新创建，所以不存在公用的问题

obj2.name.firstName = 'Chen'
console.log(obj1.name.firstName) // 'Chen'，如果第一层的子属性是引用类型，那么该属性仍然只是一个引用。
```


### 深拷贝

#### 深拷贝（一）

好了，问题来了，如何来实现一个深拷贝呢？有一种很粗暴的方式，就是采用`JSON.parse / JSON.stringify`, 如下：

```js
// 测试11 - 采用JSON的静态方法的深拷贝
function cloneDeep(object) {
    return JSON.parse(JSON.stringify(object))
}
```

好了，某些粗暴的方法通常都会存在一定的缺陷，我直接指出：

```js
// 测试12 - JSON方式深拷贝的缺陷
var obj3 = {
    name: 'Chen',
    speak: function () {
        console.log('I am Chen')
    }
}

function cloneDeep(object) {
    return JSON.parse(JSON.stringify(object))
}

console.log(cloneDeep(obj3)) // 天呀！speak方法居然方法丢了~~~
```

其实产生这种问题的根本在于`JSON`并不支持函数这种数据类型。（可以想一想，很明显JSON是不可能支持函数的保存的~）

#### 深拷贝（二）

以下为本人的实现：

```js
// 测试13 - 一份完整的深拷贝

let obj1 = {
    name: {
        firstName: 'You',
        lastName: 'Evan'
    },
    age: 29,
    stack: [1,2,3,4,5]
}
   
function baseClone(source, target) {
    for (let key of Object.keys(source)) {
        // 若存在对象的属性引用对象自身的，为了避免死循环，跳过
        if(source[key] === source) continue
        if (typeof source[key] === 'object') {
            target[key] = source[key].constructor === Array ? [] : {}
            baseClone(source[key], target[key])
        } else {
            target[key] = source[key]
        }
    }
}

function deepClone(source) {
    let __ob__ = new Object()
    baseClone(source, __ob__)
    return __ob__
}

let obj4 = deepClone(obj1)	
obj4.name.firstName = 'Tox'
console.log(obj1.name.firstName) // 'You'
obj4.stack[0] = 'X'
console.log(obj4.stack)  // ['x',2,3,4,5]
console.log(obj1.stack)  // [1,2,3,4,5]
```

好了，快来自己实现一下吧！

## 总结

- 值类型的赋值就是克隆，而引用类型的赋值仅仅是克隆了真正的对象在内存中的地址;
- `==`会在进行比较的时候隐式地进行类型的转换，而`===`不会;
- 实现深克隆的关键在于：对于引用类型，我们只需要将其递归遍历，拆分为基本的值类型，就可以实现深克隆了。
