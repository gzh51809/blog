# JavaScript中的引用类型
- 标签： `JavaScript`
- 时间： `2016-4-14`

> 本文主要探讨JavaScript中的引用类型和值类型，并假设您具有一定的面向对象编程的思维。

## 前置知识

### JavaScript中的类型

#### ECMAScript标准

根据`ECMAScript`的标准（参考《JavasCript高级程序设计》），JavaScript的类型定义如下：

- `5`种基本的数据类型：String、Number、Boolean、null、undefined
- `1`种复杂的数据类型：Object

`typeof`操作符可能会返回如下字符串：

- undefined  （`undefined`）
- boolean  (`Boolean`的实例)
- number  (`Number`的实例)
- object （`Object/Array/RegExp/Date`的实例，或者`null`）
- function    (`Function`的实例)


#### 值类型和引用类型 

- 值类型：实际上就是5种基本的数据类型：String、Number、Boolean、null、undefined
- 引用类型：Object（包含：Array、Function）

#### == 与 === 的区别

（1） 对于`String、Number`等值类型，`==`和`===`是有区别的
	1. 不同类型间比较，`==`之只比较“转化成同一类型后的值”是否相等，而`===`如果类型不同，其结果就是不等
	2. 同类型比较，直接进行值的比较，`==`和`===`的结果一样
	
```js
    // 测试1 - 值类型
    
    let str = '1994'
    let nu1 = 1994
    let nu2 = 1994
    console.log(str == nu1)  // true，说明在比较时隐式地进行了类型的转换
    console.log(str === nu1)  // false，说明首先比较了类型，类型不等，因此为false
    console.log(nu2 === nu2) // true，同类型比较，直接比较值
```

（2）对于`Array、Object`等高级类型，`==`和`===`是没有区别的，因为都是直接比较其保存的内存指针地址。

```js
    // 测试2 - 引用类型

    let o1 = {}
    // o2实际上只是复制了o1在堆内存中的地址
    let o2 = o1
    // o3是一个新的对象
    let o3 = {}

    console.log(o1 == o2)  // true
    console.log(o1 === o2) // true
    console.log(o1 == o3)  // false
    console.log(o1 === o3) // false
```

（3）基础类型与高级类型进行比较时，`==`和`===`是有区别的
	1. 对于`==`，将高级转化为基础类型，进行“值”比较
	2. 因为类型不同，`===`结果为`false`
	
```js
    let array = [1,2,3]
    let fn = function () {}
    let object = {
        name: 'Chen'
    }
    let string = '1,2,3'
    let string2 = `function () {}`
    
    console.info(array == string) // true, 天呀，比较时候给我进行了类型的转换
    console.info(fn == string2) // true
    console.info(object == '[object Object]') // true
```






由于本对于值对象类型，`===`表示两者的值相等，对于引用类型，表示两者所引用的变量所在的内存地址相同，也就是说，即使两个完全相同的对象，他们也不是`===`的关系,请看下述的例子：

```js


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

