# JavaScript中的引用

- 标签： `JavaScript`
- 时间： `2016-4-14`

## 问题的引入

在刚刚接触`JavaScript`的开发过程中，我们有时可能会遇到一些困惑，有的时候我们无意修改了某个值，这个值的变化直接导致了另外一个值的变化。


```js
let YYX = {
	name: {
		firstName: 'You',
		lastName: 'Evan'
	},
	age: 29,
	actions: {
		speak: function() {
			console.log('Speak')
		},
		walk: function() {
			console.log('Walk')
		}
	}
}
```

 