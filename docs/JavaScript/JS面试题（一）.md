# JS面试题（一）
- 总结自 [`https://zhuanlan.zhihu.com/p/25855075`](https://zhuanlan.zhihu.com/p/25855075) (转载请注明原作者)

## 考察定时器

- 考察点：`异步代码`

```js
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(new Date, i);
    }, 1000);
}
console.log(new Date, i);
```

输出结果是
```markdown
5,5,5,5,5,5
```

> 为什么？

1. JS没有 `块级作用域`，只有`函数作用域`;
2. 在`for()`/`if()`中定义的变量看似是新建了作用域，实际上是全局的（呼应了第一点）。

## 考察定时器工作机制

如果我们约定，用箭头表示其前后的两次输出之间有`1s`的时间间隔，而逗号表示其前后的两次输出之间的时间间隔可以忽略，代码实际运行的结果该如何描述？

```markdown
5 -> 5,5,5,5,5
```
这里考到了js的异步非阻塞，定时器不会阻塞后续代码的运行。



## 三
- 考察点：`闭包`


如果期望代码的输出变成：5 -> 0,1,2,3,4，该怎么改造代码

```js
	
	for (var i = 0; i < 5; i++) {
		// 注：这里我还用到了变量遮蔽效应
        (function(i) {
            setTimeout(function() {
            	console.log(new Date, i);
        	}, 1000);
        })(i)
    }
    
    console.log(new Date, i);
	
```

改造得优雅一点:

```js
function output(i) {
	setTimeout(function() {
	  console.log(new Date, i)
	}, 1000)	
}

for(var i = 0, i < 5; i++){
	output(i)
}

console.log(new Date, i)
```

当然，用`ES6`的新特性`let`来构造`块级作用域`,也可以快速解决：

```js
	for (let i = 0; i < 5; i++) {
		setTimeout(function() {
	        console.log(new Date, i);
		}, 1000);
    }
    
    console.log(new Date, i);
```
