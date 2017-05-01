# JQuery Source Code Analysis

## Overall Structure

The overall structure of recent JQuery version (2.1.1) is show as follows:

```javascript
;(function(global, factory) {
    factory(global);
}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
    var jQuery = function( selector, context ) {
		return new jQuery.fn.init( selector, context );
	};
	jQuery.fn = jQuery.prototype = {};
	// Core method
	// Callback
	// Asynchronous Quene (Deferred)
	// Data Cache
	// Quene Operation
	// Selector
	// Attribute Operation
	// Node Traversal
	// Document Processing
	// Style Operation
	// Event System
	// AJAX Interaction
	// Animation Engine
	return jQuery;
}));


jQuery.each( [ "get", "post" ], function( i, method ) {
    jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type     = type || callback;
			callback = data;
			data     = undefined;
		}
		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});
```

In my opinion, jQuery is divided into 5 parts: Selector、DOM Operation、Event、Ajax and Animation.

So why there are 13 modules? Because the most favorite thing that JQuery likes to do is taking out common features, and make them modular.

!> jQuery接口的设计原理（引用自 [Source](http://www.imooc.com/code/3094) ）

业务逻辑是复杂多变的，jQuery的高层API数量非常多，而且也非常的细致，这样做可以更友好的便于开发者的操作，不需要必须在一个接口上重载太多的动作。我们在深入内部看看Ajax的高层方法其实都是统一调用了一个静态的jQuery.ajax方法。

在jQuery.ajax的内部实现是非常复杂的，首先ajax要考虑异步的处理与回调的统一性，所以就引入了异步队列模块（Deferred）与回调模块（Callbacks）, 所以要把这些模块方法在ajax方法内部再次封装成、构建出一个新的jQXHR对象，针对参数的默认处理，数据传输的格式化等等。

### S.O.L.I.D Five Principles

- Single Responsibility Principle (Important)

Wait for complement...

## 立即执行表达式（IIFE）

- 写法一

```js
(function(window, factory) {
  factory(window)
}(this, function() {
	return function() {
		// JQuery 的调用
	}
}))

```

此种实现略微复杂，来看简化版：

- 写法二

```js
var factory = function() {
	return function() {
		// JQuery 的调用
	}
}

var JQuery = factory()
```

上面的代码效果和写法一是等同的，但是这个factory有点变成了简单的工厂方法模式，需要自己调用，不像是一个单例的jQuery类，所以我们需要改成“自执行”，而不是另外调用。


- 写法三

```js
function(window, undefined) {
	
	var jQuery = function() {}
	window.jQuery = window.$ = jQuery
	
}(window)
```

这种写法的优势：

- 减少了变量（window和undefined）查找所经过的作用域。
- undefined 不是关键词，而是一个传入的变量，由于没有传值，因此实际上它是实实在在的undefined，此外，在javascript中，undefined不是一个关键词，可以对其进行赋值。


## 





