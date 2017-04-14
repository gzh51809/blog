# JavaScript中的引用

- 标签： `JavaScript`
- 时间： `2016-12-20`
- 更新： `2016-3-12`

## 问题的引入

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

 