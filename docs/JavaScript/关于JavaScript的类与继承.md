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

## 类的继承