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
ins.next()
ins.next()
ins.next()
```