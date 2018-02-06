# Typescript

- 时间：2017-3-13

## 命名空间

!> 借用 [Typescript官网](https://www.tslang.cn/docs/handbook/namespaces.html)的一句话来开个头：`内部模块`现在称做`命名空间 `。 `外部模块`现在则简称为`模块`。

### 测试

来看一段测试代码：
```js
namespace Check {
    export function checkName(name) { 
        // checkName
    }
    export function checkPassword(name) { 
        // checkPassword
    }
}
```
然后我们再来看编译后的代码：
```js
var Check;
(function (Check) {
    function checkName(name) {
        // checkName
    }
    Check.checkName = checkName;
    function checkPassword(name) {
        // checkPassword
    }
    Check.checkPassword = checkPassword;
})(Check || (Check = {}));
Check.checkName('chenhaoli');
```

我们可以发现，命名空间实际上就是一个定义了一个普通的`JS对象`

!> 倘若在一个文件中只有一个命名空间`namespace`，那么这个命名空间可以在多个文件中使用，不需要导入。这看起来就是全局的。所以并不推荐滥用命名空间。

?> 有一种情况下, 倘若你有一堆`interface`需要供全局使用，但是又不想分散成多个文件，这种情况下就非常适合使用`namespace`了。


### 应用 - 分离文件

略 [参照官网](https://www.tslang.cn/docs/handbook/namespaces.html)

!> 需要注意的是，在使用另一个文件的命名空间时，需要在文件的最顶端用`/// <reference path="..." />`声明文件的依赖。


## 泛型

### 应用 - 保持变量类型信息

有一个函数，它会返回任何传入它的值：

```js
function identity(arg: number): number {
    return arg;
}
```

或者用 `any` 类型来声明：

```js
function identity(arg: any): any {
    return arg;
}
```

虽然用 `any` 是没有问题的，但是这里却丢失了一条重要的信息：`传入的类型与返回的类型应该是相同的`, 如果采用泛型，则可以这样写：

```js
function identity<T>(arg: T): T {
    return arg;
}
```


### 应用 - 类型断言

- 这个就不多说了...

细节请参阅 [泛型](https://www.tslang.cn/docs/handbook/generics.html)


