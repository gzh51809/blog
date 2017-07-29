# Node.js util

## util.inherits

这个实际上就是我们传统的js对继承原型的实现, 以下是非常简单的实现：

```js
function fn1() {
    this.a = 1;
    this.b = 2;
}

function fn2() {
    fn1.call(this)
}

function inherits(constructor, superConstructor) {
    let p = function() {};
    p.prototype = constructor;
    
    let q = new p();
    superConstructor.prototype = q;
    q.constructor = superConstructor;
}
```