# JavaScript 原型 超详细讲解

- 标签： `JavaScript`
- 时间： `2016-12-20`
- 更新： `2017-3-12 | 2018-2-26`


## 前言

`ES6`的第一个版本发布于 `15` 年 `6` 月，本文创作于 `16` 年，那也是笔者从事前端的早期。在那个时候，`ES6` 的众多特性扔处于 `stage` 阶段，也远没有现在这么普及，为了更轻松地写`JavaScript`，笔者花费了整整一天，好好理解了一下原型——这个对于一个成熟的`JavaScript`开发者必须要跨越的大山。

`ES6`带来了太多的语法糖，其中箭头函数掩盖了 `this` 的神妙，而 `class` 也掩盖了本文要长篇谈论的 `原型`。

通过本文，你将可以学到：

- 如何用 `ES5` 模拟类；
- 理解 `prototype` 和 `__proto__`；
- 理解原型继承；
- 如何用 `ES5` 实现模拟类的继承；
- 更深入地了解 `JavaScript` 这门语言。


## 1 引入：普通对象与函数对象

在 `JavaScript` 中，一直有这么一种说法，万物皆对象。在此前，我对这句话总是半知半解，直到，我写完这篇文章。

事实上，在 `JavaScript` 中，对象也是有区别的，分为`普通对象`和`函数对象`。`Object`和`Function`便是`JavaScript`自带的两个典型的函数对象。

事实上，后面我们会了解到，所谓的 `函数对象`，便是使用 `JavaScript` 在 `模拟类`。

请看下方的例子：

首先，我们定了三个`Object`对象的实例：

```js
var ob1 = {};
var ob2 = new Object();
var ob3 = new f1();
```

接着，我们定了三个`Function`对象的实例：

```js
 function fn1(){}
 var fn2 = function(){}
 var fn3 = new Function('language', 'console.log(language)');
```

打印以下结果，可以得到：

```js
    console.log(typeof Object); // function
    console.log(typeof Function); // function
    console.log(typeof ob1); // object
    console.log(typeof ob2); // object
    console.log(typeof ob3); // object
    console.log(typeof fn1); // function
    console.log(typeof fn2); // function
    console.log(typeof fn3); // function
```

在上述的例子中，ob1、ob2、ob3为普通对象（通过`new Object()`得到），而fn1、fn2、fn3是通过 `new Function()` 创建，为函数对象。

如何区分呢？其实记住这句话就行了：

> 凡是通过`new Function()`创建的对象都是函数对象。其他的都是普通对象。

而 Function 和 Object 归根结底也是通过 **new Function()** 创建的，请看下图：

![image_1b4867lll1fqfiqt14o17gccjb1m.png-58.3kB][2]

从图中可以看出，对象本身的实现还是要依靠**构造函数**。那原型链到底是用来干嘛的呢？

众所周知，作为一门面向对象（Object Oriented）的语言，必定具有以下特征：
 
- 对象唯一性
- 抽象性
- 继承性
- 多态性
 
> 原型链最大的目的, 是为了实现`继承`。


## 2 进阶：原型链与原型对象

原型链是如何实现继承的呢？先看一张表：

> 表1

对象类型 |`prototype`| `__proto__`
--- | --- | ----
普通对象(NO) | × | √
函数对象(FO) | √ | √

> 首先记住一点，只有函数对象具有 prototype。

接下来讨论 **prototype**和 **__proto__** 。关于**prototype** 你应该早有耳闻，意为原型，那 **proto** 到底是什么呢？这两个都是`JavaScript`在定义一个函数或对象时自动创建的预定义属性。那么两者又有什么区别呢？

首先，我们分析以下打印结果：

```js
function fn1() {}
console.log(fn1)  // function
console.log(fn1.__proto__); // function
console.log(fn1.prototype); // object
```

也就是说，`JavaScript` 在创建 `fn1` 的时候，预定义属性 `fn1.prototype` 和 `fn1.__proto__` 会被自动地创建：

根据输出结果，我们可以看出：

> 1. `fn1`是一个函数对象，实际上，它的`__proto__`属性似乎指向`Function.prototype`
> 2. `fn1.prototype`是一个普通对象，实际上，它的`__proto__`属性似乎指向`Object.prototype`

为了验证我们`似乎`的的正确性，特做以下验证：

```js
console.log(fn1.__proto__ == Function.prototype); // true
console.log(fn1.prototype.__proto__ == Object.prototype) //true
```
验证通过，那么我们可以得出什么结论呢？我将结论总结在了表2：

> 表2

对象类型 | 作用 | 
--- | ---
`prototype` | 被实例（new）对象的`__proto__`所指向（被动）
`__proto__` | 指向构造函数对象的`prototype`（主动）

用代码来表达，也就是：

```js
// 实际代码
function fn1() {}

// 自动执行
fn1.protptype = {
    constructor: fn1,
    __proto__: Object.prototype
}
fn1.__proto__ = Function.prototype
```

如此一来，本节开篇提到的`普通对象没有 prototype 属性`的这个论点就很好证明了，因为普通对象就是通过函数对象实例化（`new`）得到的对象。不可能再进行实例化（new）让另一个普通对象的`__proto__`指向它。从上述的分析也可以看出，`fn1.protptype`是一个普通对象，它也不存在`protptype`属性。

一般来说，对象的原型对象通常是普通对象，也就是说一个对象的 `__proto__` 属性指向`Object.prototype`,然而，也会有一个例外：

```js
 console.log(typeof Function.prototype)             // function
 console.log(typeof Object.prototype)               // object
 console.log(typeof Function.prototype.prototype)   // undefined，Function.prototype 不是一个函数对象
```

分析一下，我们会得到这样一个结论：

- 具有`prototype`属性的对象一定是一个`函数对象`（Object、Function、Array等本身都是构造函数），其 `prototype` 的类型取决于其实例化后的对象类型。

通常情况下，在 `JavaScript` 中，我们更习惯把具有 `prototype` 属性的对象叫做**函数对象**, 而`prototype`对象本身称作**原型对象**。

> 而原型对象就是为了构造原型链而存在的。

后面我们会提到，原型链的实现不仅仅依靠原型对象。


## 3 重点：原型链

先上一段代码：

```js
    const Person = function(name, age) {
        this.name = name
        this.age = age
    } /* 1 */

    Person.prototype.getName = function() {
        return this.name
    } /* 2 */

    Person.prototype.getAge = function() {
        return this.age
    } /* 3 */

    const ulivz = new Person('ulivz', 24); /* 4 */
    
    console.log(ulivz) /* 5 */
    console.log(ulivz.getName(), ulivz.getAge()) /* 6 */
    
```

简单解释一下，执行`1`，创建了一个构造函数 `Person`，要注意，前面已经提到，此时`Person.prototype`已经被自动创建，是一个 `Person` 的实例对象，它只具有 `2` 个属性（ `constructor` 和 `__proto__` ）

执行`2`，给对象 `Person.prototype` 增加了一个方法 `getName()`；
执行`3`，给对象 `Person.prototype` 增加了一个方法 `getAge()`；

执行`4`, 实例化了构造函数`Person`，值得注意的是，实例一个构造函数时，一定会自动执行该构造函数。

因此，`5` 的输出，即`ulivz`应该是：

```js
{
     name: 'ulivz',
     age: 24
     __proto__: Object // 实际上就是 `Person.prototype`
}

```
可以验证：

```js
    console.log(ulivz.__proto__ == Person.prototype)  // true
```

执行`6`的时候，在 `ulivz` 中找不到 `getName()` 和 `getAge()` 这两个方法，就会朝着原型链向上查找，也就是通过 `__proto__` 向上查找，于是，很快在`ulviz.__proto__`中，即 `Person.prototype` 中找到了这两个方法，于是停止查找并执行得到结果。

这便是 `JavaScript` 的原型继承。准确的说:

- JavaScript的原型继承是通过 `__proto__` 并借助 `prototype` 来实现的。

然后，这并不是原型链的全部，我们继续分析, 首先提个问题：

- `Person.__proto__`和`Person.prototype.__proto__`分别指向何处？

前面已经提到，在 `JavaScript` 中万物皆对象。`Person`很明显是由`new Function()`实例化得到，因此，`Person.__proto__`指向`Function.prototype`
```js
console.log(Person.__proto__ == Function.prototype)  // true
```

因为 `Person.prototype` 是一个普通对象，因此 `Person.prototype.__proto__` 指向`Object.prototype`

```js
console.log(Person.prototype.__proto__ == Object.prototype)  // true
```

为了验证 `Person.__proto__` 所在的原型链中没有 `Object`，以及 `Person.prototype.__proto__` 所在的原型链中没有 `Function`, 结合以下语句验证：

```js
console.log(Person.__proto__ === Object.prototype) //false
console.log(Person.prototype.__proto__ == Function.prototype) //false
```

于是，我们可以作如下总结：


> 1. 函数对象的 `__proto__` 指向 `Function.prototype`,
> 2. 函数对象的 `prototype` 指向 `instance.__proto__`，
> 3. 普通对象的 `__proto__` 指向 `Object.__proto__`，
> 4. 普通对象没有 `prototype` 属性，
> 5. `Object` 是由 `Function` 构造的，所以 `Object.__proto__`为`Function.prototype`。

    注：`instance`是由函数对象实例化得到的普通对象实例。

为了检验你对上述总结的理解，请看下题：

```js
console.log(ulivz.__proto__ === Function.prototype)
```

<details>
<summary>答案</summary>
false。
</details>


## 4 终极：原型链图

再回过头来看看前面的那段函数：

```js
    const Person = function(name, age) {
        this.name = name
        this.age = age
    } /* 1 */

    Person.prototype.getName = function() {
        return this.name
    } /* 2 */

    Person.prototype.getAge = function() {
        return this.age
    } /* 3 */

    const ulivz = new Person('ulivz', 24); /* 4 */
    
    console.log(ulivz) /* 5 */
    console.log(ulivz.getName(), ulivz.getAge()) /* 6 */
    
```

我们来画一个原型链图，或者说，原型链在内存中是如何表现的呢？请看下图：

![原型链.png-41.2kB][4]

画完这张图，基本上所有之前的疑问都可以解答了。

与其说万物皆对象, **万物皆空**似乎更形象。（^ ^）

---

## 5 调料：constructor

前面已经有所提及，但只有原型对象才具有`constructor`这个属性，`constructor`用来指向引用它的函数对象。

```js
Person.prototype.constructor === Person //true
console.log(Person.prototype.constructor.prototype.constructor === Person) //true
```

这是一种循环引用。当然你也可以在上一节的原型链图中画上去，这里就不赘述了。



## 6 补充： JavaScript中的6大内置（函数）对象的原型继承

通过前文的论述，结合相应的代码验证，整理出以下结论：

![image_1b496ie7el7m1rvltoi17he1b459.png-52.6kB][5]

由此可见，我们更加强化了这两个观点：


>1. 任何内置函数对象本身的 `__proto__` 都指向 `Function` 的原型对象；
>2. 除了 `Oject` 的原型对象的 `__proto__` 指向 `null`，其他所有内置函数对象的原型对象的 `__proto__` 都指向 `object`。


为了减少读者敲代码的时间，特给出验证代码，希望能够促进你的理解。

> Array:

```js
    console.log(arr.__proto__)
    console.log(arr.__proto__ == Array.prototype)   // true 
    console.log(Array.prototype.__proto__== Object.prototype)  // true 
    console.log(Object.prototype.__proto__== null)  // true 
```

> RegExp:

```js
    var reg = new RegExp;
    console.log(reg.__proto__)
    console.log(reg.__proto__ == RegExp.prototype)  // true 
    console.log(RegExp.prototype.__proto__== Object.prototype)  // true 
```

> Date:

```js
    var date = new Date;
    console.log(date.__proto__)
    console.log(date.__proto__ == Date.prototype)  // true 
    console.log(Date.prototype.__proto__== Object.prototype)  // true 
```

> Boolean:

```js
    var boo = new Boolean;
    console.log(boo.__proto__)
    console.log(boo.__proto__ == Boolean.prototype) // true 
    console.log(Boolean.prototype.__proto__== Object.prototype) // true 
```

> Number:

```js
    var num = new Number;
    console.log(num.__proto__)
    console.log(num.__proto__ == Number.prototype)  // true 
    console.log(Number.prototype.__proto__== Object.prototype)  // true 
```

> String:

```js
    var str = new String;
    console.log(str.__proto__)
    console.log(str.__proto__ == String.prototype)  // true 
    console.log(String.prototype.__proto__== Object.prototype)  // true 
```


## 7 总结

最后，来几句短句做总结：

1. 若A通过new创建了B,则 `B.__proto__ = A.prototype`。
2. `__proto__`是原型链查找的起点。
2. 执行B.a，若在B中找不到a，则会在`B.__proto__`中，也就是`A.prototype`中查找，若`A.prototype`中仍然没有，则会继续向上查找，最终，一定会找到`Object.prototype`,倘若还找不到，因为`Object.prototype.__proto__`指向`null`，因此会报`Type Error`；
3. 为什么万物皆对象，还是那句话，原型链的顶端，一定有`Object.prototype ——> null`。






> 结束语

```markdown
我
想找到你
在寂静而又漫长的深夜里
在每一个十字路口的抉择里
我都会格外犹豫
但是
不管你在哪里
我都想找到你
寒风刮不走我的心意
黑夜吐不掉我的足迹
虽不知何时能够找到你
不知何时能够遇见你
我只想拥抱你

否则
我就只能说
Type Error...
全文终~~~)
逃)
```


> 本文属于个人总结，部分表达难免会有疏漏之处，如果你对本文观点有所看法，请提`issue`


  [1]: http://static.zybuluo.com/a472590061/ktgirz4nkd2xuf4wu48t7rm9/QQ%E6%88%AA%E5%9B%BE20161218231142.png
  [2]: http://static.zybuluo.com/a472590061/l37km8tuqc8taxb6gzmeg324/image_1b4867lll1fqfiqt14o17gccjb1m.png
  [3]: http://static.zybuluo.com/a472590061/0ys6e03xvfsuf48rpfnc2qyn/image_1b49af42d1c571be16eu1kn114rf9.png
  [4]: http://static.zybuluo.com/a472590061/2t4dae8ubvmslbwce858y6du/%E5%8E%9F%E5%9E%8B%E9%93%BE.png
  [5]: http://static.zybuluo.com/a472590061/wk5od98r3j42w1u22igoy9p6/image_1b496ie7el7m1rvltoi17he1b459.png