# 由TypeScript装饰器引发的一系列血案

## 什么是装饰器(decorator)？

我的理解是：一个被装饰器标识了的元对象（可以是`类`，`方法`，`属性`和`函数`），在访问其真实的值时，首先会经过装饰器的操作（如修改、添加或者删除某些属性），然后才能拿到值。

首先，我们要明确，在TypeScript中，装饰器就是一个纯函数。

## 类装饰器

首先，类装饰器接受的格式是：

```typescript
type ClassDecorator = (constructor: Function) => void;
```

我们来完成一个密封一个对象的装饰器`@sealed`:

```typescript
function sealed(constructor: Function) {
	Object.seal(constructor)
	Object.seal(constructor.prototype)
}

@sealed
class Entity {
	public name: string;
	constructor(name: string) {
		this.name = name
	}
	public getName() {
		return this.name
	}
}
```

首先回顾一下`Object.seal`：

> `Object.seal` 可以密封一个对象，并返回密封后的对象，密封对象将会阻止向对象添加新的属性。同时，会将所有已有属性的可配置性 `configurable` 设置成 `false`。但是可写性 `writable` 依然为可写，即值仍可以被改变。

## 准备工作

- 在 `tsconfig.json` 里启用 `experimentalDecorators`

## 介绍

- 装饰器可以应用在 类、方法、属性、函数参数上，且可同时应用多个
- 语法：`@expression()` 其中`()`可以不要，`()`也可以加参数

例如，有一个`@sealed`装饰器，我们会这样定义`sealed`函数：

```typescript
function sealed(target) {
    // do something with "target" ...
}
```

## 装饰器工厂

我们可以通过下面的方式来写一个装饰器工厂函数：

```typescript
function color(value: string) { // 这是一个装饰器工厂
    return function (target) { //  这是装饰器
        // do something with "target" and "value"...
    }
}
```


## 装饰器组合

- 书写在同一行上：

```typescript
@f @g x
```

- 书写在多行上：

```typescript
 @f
 @g
 x
```

当多个装饰器应用于一个声明上，它们求值方式与复合函数相似。

```typescript
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}

function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}

class C {
    @f()
    @g()
    method() {}
}
```

在控制台里会打印出如下结果：

```
f(): evaluated
g(): evaluated
g(): called
f(): called
```

## 类装饰器

## 方法装饰器

## 访问器装饰器

## 属性装饰器

属性装饰器不能用在声明文件中（.d.ts），或者任何外部上下文（比如 declare的类）里。

## 参考文档

- [从C#到TypeScript - 装饰器](https://www.cnblogs.com/brookshi/p/6417914.html)