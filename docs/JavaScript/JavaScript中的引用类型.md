# JavaScript中的引用类型
- 标签： `JavaScript`
- 时间： `2016-4-14`

> 本文主要探讨JavaScript中的引用类型和值类型，并假设您具有一定的面向对象编程的思维。

## 前置知识

### JavaScript中的类型

#### ECMAScript标准

根据`ECMAScript`的标准，JavaScript的类型定义如下：

- `5`种简单的数据类型：String、Number、Boolean、null、undefined
- `1`种复杂的数据类型：Object

`typeof`操作符可能会返回如下字符串：

- undefined  （`undefined`）
- boolean  (`Boolean`的实例)
- number  (`Number`的实例)
- object （`Object/Array/RegExp/Date`的实例，或者`null`）
- function    (`Function`的实例)


#### 

- 值类型：
- 引用类型：object、array、function

由于本对于值对象类型，`===`表示两者的值相等，对于引用类型，表示两者所引用的变量所在的内存地址相同，也就是说，即使两个完全相同的对象，他们也不是`===`的关系,请看下述的例子：

```js
    let num1 = 1994
    let num2 = 1994

    console.log(num1 === num2) // true

    let ob1 = {
        name: 'toxichl'
    }

    let ob2 = {
        name: 'toxichl'
    }

    console.log(ob1 === ob2) // false
```


## 问题的引入

在刚刚接触`JavaScript`的开发过程中，我们有时可能会遇到一些困惑，有的时候我们无意修改了某个值，这个值的变化直接导致了另外一个值的变化。

接下来，我们以三个例子来引入今天的话题：

### 对象的赋值
```js
    let obj1 = {
        name: {
            firstName: 'You',
            lastName: 'Evan'
        },
        age: 29
    }

    let obj2 = obj1
	
    obj2.name.firstName = 'Chen'
	// 修改了obj2的某个属性，但obj1仍然和
    console.log(obj1 === obj2) // true

    console.log(obj1.name.firstName) // Chen
```

