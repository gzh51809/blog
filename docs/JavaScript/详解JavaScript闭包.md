# 详解JavaScript闭包

## 前言
this、prototype和闭包，可能是JS成人礼的基础，这里，来总结一下闭包的概念。

闭包（`closure`）的形成得益于`JavScript`的链式作用域（`scope chain`）, 什么是链式作用域，我们来看一下：

```js
var a = 1;
// Scope A

function fa() {
	var b = 2;	
	// Scope B
	function fb() {
		// Scope C
	    b = b * b;
	    return b;
	}
	return fb()
}
```

上述代码就形成了一个作用域链：`Scope A -> Scope B -> Scope C`。显而易见，在` Scope B`中可以访问` Scope A`中的变量，在 `Scope C` 中可以访问 `Scope A` 和 `Scope B` 中的变量。反过来则不行。

最后一行的`return fb()`很关键，如果我们在外部运行`fa()`，如：

```js
var ins = fa();
```

那么实际上`ins`就持有了`fb`的引用了，于是，`ins`也就持有了`fa`中局部变量的引用————这就是闭包！！！

其实上述的代码，我们完全可以直接`return b*b;`, 那么采用闭包的好处到底在哪里？

1. 希望一个变量长期驻扎在内存中
2. 避免全局变量的污染
3. 私有成员的存在

我们通常会遇到一种场景，做一个计时器，函数每运行一次计数器加1，我们可能会这样写:

```js
var count = 0;
function add() {
	return ++count;
}

add()  // 1
add()  // 2
```

看似很好地实现了需求，但是定义了一个全局变量`count`——造成了全局污染！！！好的，那么写成局部变量：

```js
function add() {
	var count = 0;
	return ++count;
}

add()  // 1
add()  // 1
add()  // 1
```

无论如何都是1，为什么？很显然，这是由于 `Javascript` 的垃圾回收原理:

1. 在javascript中，如果一个对象不再被引用，那么这个对象就会被GC回收；
1. 如果两个对象互相引用，而不再被第3者所引用，那么这两个互相引用的对象也会被回收。

因此，我们就可以采用闭包来很好地解决这个问题——既定义局部变量，又能达到状态的保存，实现累加。

```js
function add() {
	var count = 0;
	return function () {
		return ++count;
	}
}

var countAdd = add();
countAdd(); // 1
countAdd(); // 2
```

这，就是闭包的神奇之处了！！！

好了