# ES6 class 中隐藏的魔法

## 8 更新

1. 在ES6中用 class 来定义的方法，和直接用 prototype 定一个方法有什么不同？

举例：

```js
function Person(name) {
  this.name = name
}
Person.prototype.say = () => {
	console.log(`I am ${this.name}`)
}
```

和

```js
class Person {
  constructor(name) {
  	  this.name = name
  }
  say(){
  	  console.log(`I am ${this.name}`)
  }
}
```

让我们在浏览器中做个测试吧！

```js
// 测试代码

let ulivz = new Person('ulivz')
ulivz
```

prototype 类的结果：

![](img/js-04.png)

ES6 的结果：

![](img/js-05.png)

卧槽, 好像看到了什么不同！这时候，`Object.defineProperty()` 这位大兄弟又要出场了！

回顾一些语法：Object.defineProperty(obj, prop, descriptor)，还没忘记吧。。。

重点是第三个参数 ---- 属性描述符!

- configurable，为true时，该属性描述符才能被改变！
- enumerable：为true时，属性才能够出现在对象的枚举属性中，默认是false！
- value：任意的javascript值，默认值是undefined
- writable：当且仅当该属性的writable为true时，value才能被改变！
- get：不多说了
- set：同～

注意：如果一个描述符同时有(value或writable)和(get或set)关键字，将会产生一个异常。

接着，闭关多年的 `Object.getOwnPropertyDescriptor(obj, prop)` 也要出场了。

`Object.getOwnPropertyDescriptor(ulivz.__proto__, 'say')`

prototype 类的结果：

```js
{
	"writable":true,
	"enumerable":true,
	"configurable":true
	"value": () => { console.log(`I am ${this.name}`) }
}
```

ES6 的结果：

```js
{
	"writable":true,
	"enumerable":false,  // => 这就是不同点！！
	"configurable":true
	"value": () => { console.log(`I am ${this.name}`) }
}
```
