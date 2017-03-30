# JS面试题集锦（一）
- 标签： `JavaScript`
- 时间： `2016-3-10`

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



## 考察闭包

- 考察点：`闭包`

如果期望代码的输出变成：5 -> 0,1,2,3,4，该怎么改造代码？

```js
	
	for (var i = 0; i < 5; i++) {
		// 下面是一个 IIFE
		// 注：这里还用到了变量遮蔽效应
        (function(i) {
            setTimeout(function() {
            	console.log(new Date, i);
        	}, 1000);
        })(i)
    }
    
    console.log(new Date, i);
	
```

这实际上是`ES5`的写法，我们可以改造得优雅一点:

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

!> 关于闭包的更多知识，可以看我写的这篇文章：[详解JavaScript闭包](/JavaScript/详解JavaScript闭包.md)


## 考察Promise

如果期望输出的结果为`0 -> 1 -> 2 -> 3 -> 4 -> 5`, 并且要求原有的代码块中的循环和两处 `console.log` 不变，该怎么改造代码？

虽然用`setTimeout`可以实现, 这里我们选择使用`ES6`的`promise`来实现：

!> 注: 这里和原作者的答案有些不同，原作者给出的 [答案](https://zhuanlan.zhihu.com/p/25855075) 定义了过多全局变量，我这里把全局变量`tasks`和`i`都放到了闭包里面。

```js
function output(i) {
	return new Promise((resovle) => {
		setTimeout(() => {
			console.log(new Date, i)
			resovle(i)
		}, i * 1000)
	})
}

function outputTask() {
	const tasks = [];
	for (let i = 0; i < 5; i++) {
		tasks.push(output(i))
	}
	return Promise.all(tasks)
}

outputTask().then((iCollection) => {
	let i = iCollection.pop() + 1
	setTimeout(() => {
		console.log(new Date, i)
	}, 1000)
})

```

## 考察 async

如何用 `ES7` 中的 `async await` 特性来让这段代码变的更简洁？

```js
const sleep = (timeountMS) => new Promise((resolve) => {
	// 模拟其他语言中的 sleep，实际上可以是任何异步操作
    setTimeout(resolve, timeountMS);
}); // 这个;很关键哦！！

(async ()=> {
 	for (var i = 0; i < 5; i++) {
 		await sleep(1000)
 		console.log(new Date, i);
 	}
	await sleep(1000);
 	console.log(new Date, i);
 }
)()
```

## 补充：采用 generator 完成上述任务

```js
const sleep = delay => new Promise(resolve => {
	setTimeout(resolve, delay)
});

function* output(next) {
    for (var i = 0; i< 5; i++) {
        yield sleep(1000).then(()=> {
        	    next()
        	}
        )
        console.log(new Date, i)
    }
    yield sleep(1000).then(()=> {
             next()
        }
    )
    console.log(new Date, i);
}

let task = output(()=>{ task.next() })
task.next();
```



