# 关于JavaScript的类与继承

写了这么久类，来简单概括一下在`JavaScript`中的类与继承：

## 模拟类

在JS中，类是通过函数来实现，下面，定义了一个名为`Coder`的类：

!> 为什么函数能够模拟类，请参见我的另一篇文章：[JS原型超详细讲解](/JavaScript/JS原型超详细讲解.md)

```js
function Coder() {
    // 私有变量
    var __info__ = 'I am a private variable';
    // 私有方法
    function privateMethod() {

    }

    // 共有（实例）属性
    this.workingSeniority = 0;
    this.location = '';
    this.framework = '';

    // 共有（实例）方法(特权方法)
    // 既能访问其他的共有方法和共有属性，也可以访问访问私有方法和私有属性
    this.coding = function () {
		console.log('Coding')
    }

    // 定义了一个 getter
    Object.defineProperty(Coder.prototype, 'getPrivateVar', {
        get: function () {
            return privateVar;
        },
        enumerable: true,
        configurable: true
    })

}

// 静态方法（static）
Coder.work = function() {
  console.log('Working')
}
```

!> 值得注意的是，我们一般都会把共有方法放在类的原型上，因为只有这样，才能让多个实例引用同一个共有方法，从而降低性能的损耗

```js
// 将共有方法定义在类的原型上
Coder.prototype.coding = function () {
	console.log('Coding')
}
```

## 类的继承

在`JavaScript`中，如何实现类的继承呢？方法有很多，如下：

- 类式继承
- 构造函数式继承
- 组合式继承
- 原型继承
- 寄生式继承
- 寄生组合式继承

接下来一一分析：

### 类式继承

由于，若通过`new Parent()`创建了`Child`,则 `Child.__proto__ = Parent.prototype`，而原型链则是顺着`__proto__`依次向上查找。因为，可以通过修改子类的原型为父类的实例来实现继承。如下：

```js
// 定义一个父类
function Parent() {
  this.name = 'Parent'
}
// 
Parent.prototype.getName = function() {
  return this.name
}
function Child() {
  this.age = 23
}
Child.prototype = new Parent()
```

这种继承看似很好地继承了父类的属性和方法，但是，它有一个致命的缺点：

```js
var instance1 = new Child()
var instance2 = new Child()
instance1.name = 'Instance1'
console.log(instance2.name) // 'Instance1'
```

由此可见，`instance1`的一个无意修改无情地修改了`intance2`的`name`属性。这明显不是我们想要的。


### 构造函数式继承

通过`call()`来实现继承。

```js
function Parent() {
    this.books = ['js', 'php', 'dotNet']
}
function Child() {
	// 构造函数式继承的精华
    Parent.call(this)
}
```

当然，如果继承真地如此简单，那么本文就没有存在的必要了，本继承方法也存在缺陷——我们并没有继承父类原型上的方法。


### 组合式继承

既然上述两种方法各有缺点，但是又各有所长，那么我们是否可以将其结合起来使用呢？没错，这种继承方式就叫做——组合式继承

```js
function Parent(name) {
    // 值类型共有属性
    this.name = name;
    this.bokks = ['a', 'b', 'c'];
}
Parent.prototype.getName = function () {
    return this.name;
}
function Child() {
    Parent.call(this, 'ddd');  // 第一次执行父类的构造函数
}
Child.prototype = new Parent(); // 第二次执行父类的构造函数
var instance = new Child(); 
```

虽然这种方式很好地弥补了上述两种方式的缺陷，但是，本方法很明显执行了两次父类的构造函数，因此，这也不是我们最终想要的继承方式。


### 组合式继承



