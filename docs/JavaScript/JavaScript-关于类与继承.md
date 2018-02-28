# JavaScript：关于类与继承

`ES6`的`class`语法糖你是否已经用得是否炉火纯青呢？那如果回归到`ES5`呢？本文，将继续上一篇 [《万物皆空之 JavaScript 原型》](https://juejin.im/post/5a944f485188257a804aba6d) 篇尾提出的疑问来展开阐述：

> 如何用 `JavaScript` 实现类的继承呢？

## 类

我们来回顾一下`ES6 / TS / ES5`类的写法以作对比。首先，我们创建一个`GithubUser`类，它拥有一个`login`方法和一个静态方法`getPublicServices`, 用于获取公开的服务列表：

```js
class GithubUser {
    static getPublicServices() {
        return ['login']
    }
    constructor(username, password) {
        this.username = username
        this.password = password
    }
    login() {
        console.log(this.username + '要登录Github，密码是' + this.password)
    }
}
```

实际上，`ES6`这个类的写法有一个弊病，实际上，密码`password`应该是`Github`用户一个私有变量，接下来，我们用`TypeScript`重写一下：

```typescript
class GithubUser {
    static getPublicServices() {
        return ['login']
    }
    public username: string
    private password: string
    constructor(username, password) {
        this.username = username
        this.password = password
    }
    public login(): void {
        console.log(this.username + '要登录Github，密码是' + this.password)
    }
}
```

如此一来，`password`就只能在类的内部访问了。好了，问题来了，如果结合原型讲解那一文的知识，来用`ES5`实现这个类呢？`just show you my code`:

```js
function GithubUser(username, password) {
    // private属性
    let _password = password 
    // public属性
    this.username = username 
    // public方法
    GithubUser.prototype.login = function () {
        console.log(this.username + '要登录Github，密码是' + _password)
    }
}
// 静态方法
GithubUser.getPublicServices = function () {
    return ['login']
}
```

> 值得注意的是，我们一般都会把`共有方法`放在类的原型上，而不会采用`this.login = function() {}`这种写法。因为只有这样，才能让多个实例引用同一个共有方法，从而避免重复创建方法的浪费。

是不是很直观！留下`2`个疑问:

1. 如何实现`private方法`呢?
2. 能否实现`protected属性/方法`呢?

## 继承

用掘金的用户都应该知道，我们可以选择直接使用 `Github` 登录，那么，结合上一节，我们如果创建了一个 `JuejinUser` 来继承 `GithubUser`，那么 `JuejinUser` 及其实例就可以调用 `Github` 的 `login` 方法了。首先，先写出这个简单 `JuejinUser` 类：

```js
function JuejinUser(username, password) {
    // TODO need implementation
    this.articles = 3 // 文章数量
    JuejinUser.prototype.readArticle = function () {
        console.log('Read article')
    }
}
```

由于`ES6/TS`的继承太过直观，本节将忽略。首先概述一下本文将要讲解的几种继承方法：

- 类式继承
- 构造函数式继承
- 组合式继承
- 原型继承
- 寄生式继承
- 寄生组合式继承

看起来很多，我们一一论述。

### 类式继承

因为我们已经得知：

> 若通过`new Parent()`创建了`Child`,则 `Child.__proto__ = Parent.prototype`，而原型链则是顺着`__proto__`依次向上查找。因为，可以通过修改子类的原型为父类的实例来实现继承。

第一直觉的实现如下：

```js
function GithubUser(username, password) {
    let _password = password 
    this.username = username 
    GithubUser.prototype.login = function () {
        console.log(this.username + '要登录Github，密码是' + _password)
    }
}

function JuejinUser(username, password) {
    this.articles = 3 // 文章数量
    JuejinUser.prototype = new GithubUser(username, password)
    JuejinUser.prototype.readArticle = function () {
        console.log('Read article')
    }
}

const juejinUser1 = new JuejinUser('ulivz', 'xxx', 3)
console.log(juejinUser1)
```

在浏览器中查看原型链：

![](https://user-gold-cdn.xitu.io/2018/3/1/161dd7f0b8279b9e?w=1100&h=258&f=png&s=51351)

诶，不对啊，很明显 `juejinUser1.__proto__` 并不是 `GithubUser` 的一个实例。

实际上，这是因为之前我们为了能够在类的方法中读取私有变量，将`JuejinUser.prototype`的重新赋值放在了构造函数中，而此时实例已经创建，其`__proto__`还还指向老的`JuejinUser.prototype`。所以，重新赋值一下实例的`__proto__`就可以解决这个问题：

```js
function GithubUser(username, password) {
    let _password = password 
    this.username = username 
    GithubUser.prototype.login = function () {
        console.log(this.username + '要登录Github，密码是' + _password)
    }
}

function JuejinUser(username, password) {
    this.articles = 3 // 文章数量
    const prototype = new GithubUser(username, password)
    // JuejinUser.prototype = prototype // 这一行已经没有意义了
    prototype.readArticle = function () {
        console.log('Read article')
    }
    this.__proto__ = prototype
}

const juejinUser1 = new JuejinUser('ulivz', 'xxx', 3)
console.log(juejinUser1)

```

接着查看原型链：

![](https://user-gold-cdn.xitu.io/2018/3/1/161dd8ce301cbc63?w=1112&h=448&f=png&s=83044)

Perfect！原型链已经出来，问题“好像”得到了完美解决！但实际上还是有明显的问题：

1. 在原型链上创建了属性（一般来说，这不是一种好的实践）
2. 私自篡改`__proto__`，导致 `juejinUser1.__proto__ === JuejinUser.prototype` 不成立！从而导致 `juejinUser1 instanceof JuejinUser` 也不成立😂。这不应该发生！

细心的同学会发现，造成这种问题的根本原因在于我们在实例化的时候动态修改了原型，那有没有一种方法可以在实例化之前就固定好类的原型的指针呢？

事实上，我们可以考虑把类的原型的赋值挪出来：

```js
function JuejinUser(username, password) {
    this.articles = 3 // 文章数量
}

// 此时构造函数还未运行，无法访问 username 和 password !!
JuejinUser.prototype =  new GithubUser() 

prototype.readArticle = function () {
    console.log('Read article')
}
```

但是这样做又有更明显的缺点：

1. 父类过早地被创建，导致无法接受子类的动态参数；
2. 仍然在原型上创建了属性，此时，多个子类的实例将共享同一个父类的属性，完蛋, 会互相影响!

举例说明缺点`2`：

```js
function GithubUser(username) {
    this.username = 'Unknown' 
}

function JuejinUser(username, password) {

}

JuejinUser.prototype =  new GithubUser() 
const juejinUser1 = new JuejinUser('ulivz', 'xxx', 3)
const juejinUser2 = new JuejinUser('egoist', 'xxx', 0)

//  这就是把属性定义在原型链上的致命缺点，你可以直接访问，但修改就是一件难事了！
console.log(juejinUser1.username) // 'Unknown'
juejinUser1.__proto__.username = 'U' 
console.log(juejinUser1.username) // 'U'

// 卧槽，无情地影响了另一个实例!!!
console.log(juejinUser2.username) // 'U'
```

由此可见，`类式继承`的两种方式缺陷太多！

### 构造函数式继承

通过 `call()` 来实现继承 (相应的, 你也可以用`apply`)。

```js
function GithubUser(username, password) {
    let _password = password 
    this.username = username 
    GithubUser.prototype.login = function () {
        console.log(this.username + '要登录Github，密码是' + _password)
    }
}

function JuejinUser(username, password) {
    GithubUser.call(this, username, password)
    this.articles = 3 // 文章数量
}

const juejinUser1 = new JuejinUser('ulivz', 'xxx')
console.log(juejinUser1.username) // ulivz
console.log(juejinUser1.username) // xxx
console.log(juejinUser1.login()) // TypeError: juejinUser1.login is not a function
```

当然，如果继承真地如此简单，那么本文就没有存在的必要了，本继承方法也存在明显的缺陷——     `构造函数式继承`并没有继承父类原型上的方法。


### 组合式继承

既然上述两种方法各有缺点，但是又各有所长，那么我们是否可以将其结合起来使用呢？没错，这种继承方式就叫做——`组合式继承`:

```js
function GithubUser(username, password) {
    let _password = password 
    this.username = username 
    GithubUser.prototype.login = function () {
        console.log(this.username + '要登录Github，密码是' + _password)
    }
}

function JuejinUser(username, password) {
    GithubUser.call(this, username, password) // 第二次执行 GithubUser 的构造函数
    this.articles = 3 // 文章数量
}

JuejinUser.prototype = new GithubUser(); // 第二次执行 GithubUser 的构造函数
const juejinUser1 = new JuejinUser('ulivz', 'xxx')
```

虽然这种方式弥补了上述两种方式的一些缺陷，但有些问题仍然存在：

1. 子类仍旧无法传递动态参数给父类！
2. 父类的构造函数被调用了两次。

本方法很明显执行了两次父类的构造函数，因此，这也不是我们最终想要的继承方式。


### 原型继承

原型继承实际上是对类似继承的一种封装，只不过其独特之处在于，定义了一个干净的中间类，如下：

```js
function prototypeInherit(o) {
    function _F() {

    }
    _F.prototype = o.prototype;
    return new _F();
}
```

有人可能会注意到这个很像`Object.create`, 特此声明，[Object.create](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create) 的`polyfill`长这样：

```js
if (typeof Object.create !== "function") {
    Object.create = function (proto, propertiesObject) {
        // 省略部分code...
        function F() {}
        F.prototype = proto; // 看请求
        return new F();
    };
}
```

使用方式：

```

```




### 寄生继承

依托于一个对象而生的一种继承方式，谓之寄生。

```js
var computer = {
    cpu: 'i7 7700U',
    ram: '32G'
}

function CreateComputer(obj) {
    var o = protoInherit(obj);
     o.getCpu = function () {
        return this.cpu;
    }
    return o;
}

var myComputer = new CreateComputer(computer);
```

### 寄生组合

```js
// 原型继承
function protoInherit(object) {
    function p() {}
    p.prototype = object;
    return new p();
}
function inherit(child, parent) {
    // 继承父类的原型
    var p = protoInherit(parent.prototype);
    // 重写子类的原型
    child.prototype = p;
    // 重写被污染的子类的constructor
    p.constructor = child;
}
```

!> 寄生组合式继承仍然需要结合构造函数式继承。


## ES6的继承

ES6 class 可以继承静态方法和属性。


## TS的继承


### 寄生组合

```js
// 原型继承
function protoInherit(object) {
    function p() {}
    p.prototype = object;
    return new p();
}
function inherit(child, parent) {
    // 继承父类的原型
    var p = protoInherit(parent.prototype);
    // 重写子类的原型
    child.prototype = p;
    // 重写被污染的子类的constructor
    p.constructor = child;
}
```

!> 寄生组合式继承仍然需要结合构造函数式继承。


## ES6的继承

ES6 class 可以继承静态方法和属性。


## TS的继承
