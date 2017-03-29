# 16 Generator

## 基本使用

```js
function* fx() {
	yield 'Chen';
	yield 'Haoli';
	return '2017';
}
let ins = fx();
ins.next()	 // {value: "Chen", done: false}
ins.next()   // {value: "Haoli", done: false}
ins.next()	 // {value: "2017", done: true}
ins.next()   // {value: undefined, done: true}
```

yield语句与return语句既有相似之处，也有区别。

- 相同点: 都能返回紧跟在语句后面的那个表达式的值。
- 不同点: 每次遇到yield，函数暂停执行，下一次再从该位置继续向后执行，而return语句不具备位置记忆的功能。一个函数里面，只能执行一次（或者说一个）return语句，但是可以执行多次（或者说多个）yield语句。

Generator函数可以不用yield语句，这时就变成了一个单纯的暂缓执行函数。

## for...of循环

for...of循环可以自动遍历Generator函数时生成的Iterator对象，且此时不再需要调用next方法。

```js
for(let v of fx()){
	console.log(v)
}
```


