# TypeScript 高级类型

## 前言

但凡是用过`TypeScript`的人, 都很熟悉以下的几种基本的声明类型的方法：

```typescript
interface Todo {
	summary: string;
	detail: string;
}

interface Property {
	[name: string]: any;
}


interface Person {
	name: string;
	age: number;
	todos: Array<Todo>;
	property: Property
}
```

但是，在真实的编程世界里，总会有有更多较为复杂的场景，需要用到交叉类型`（Intersection Types）`或者联合类型`（Union Types）`。

## 交叉类型

- Syntax：`TypeA & TypeB`

来自官方翻译的一句话：**交叉类型是将多个类型合并为一个类型**。最常见的用例，是在`merge`两个对象为一个新的对象时：

```typescript
function extend<T, U>(first: T, second: U): T & U { // 看不懂
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}

class Person {
	thinking() { }
}

class Machine {
	compute() { }
}
extend(new Person(), new Machine()) // 哇哦～合并成一个机器人了！
```


## 联合类型

看起来和`交叉类型`很相似，但实则有较大差异！

联合类型表示一个值可以是几种类型之一。用竖线`|`分隔每个类型，所以` number | string | boolean`表示一个值可以是 `number`， `string`，或 `boolean`。


## 类型别名

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}
```

别名也可以是泛型：

```typescript
type Container<T> = { value: T };
```

但是别名不能出现在声明的右侧：

```typescript
type Yikes = Array<Yikes>; // error
```

### 接口和类型别名的差别是什么？

- 接口创建了一个新的名字，可以在其它任何地方使用。 类型别名并不创建新名字
- 类型别名不能被 `extends` 和 `implements`


## 字符串字面量类型

```typescript
type Easing = "ease-in" | "ease-out" | "ease-in-out";
```

## 数字字面量类型

```typescript
function rollDie(): 1 | 2 | 3 | 4 | 5 | 6 {
    // ...
}
```

## 可辨识联合（Discriminated Unions）


```typescript
interface Square {
    kind: "square";
    size: number;
}
interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
interface Circle {
    kind: "circle";
    radius: number;
}

type Shape = Square | Rectangle | Circle;

// 看起来真地不错啊！
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}

```

### 完整性检查

当没有涵盖所有可辨识联合的变化时，我们想让编译器可以通知我们。 比如，如果我们添加了 `Triangle`到`Shape`，我们同时还需要更新 `area`:

当启用 `--strictNullChecks` 并且指定一个返回值类型时：

```typescript
type Shape = Square | Rectangle | Circle | Triangle;
function area(s: Shape): number {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
    // should error here - we didn't handle case "triangle"
}
```

因为 switch没有包涵所有情况，所以 `TypeScript` 认为这个函数有时候会返回 `undefined`。 如果你明确地指定了返回值类型为 `number`，那么你会看到一个错误，因为实际上返回值的类型为 `number | undefined`。

还有一种方法是使用 `never` 类型，编译器用它来进行完整性检查：

```typescript
function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
        default: return assertNever(s); // error here if there are missing cases
    }
}

```

## 多态的this类型

多态的this类型表示的是某个包含类或接口的 子类型。 这被称做 `F-bounded多态性`。 它能很容易的表现连贯接口间的继承：

```typescript
class BasicCalculator {
    public constructor(protected value: number = 0) { }
    public currentValue(): number {
        return this.value;
    }
    public add(operand: number): this {
        this.value += operand;
        return this;
    }
    public multiply(operand: number): this {
        this.value *= operand;
        return this;
    }
    // ... other operations go here ...
}

class ScientificCalculator extends BasicCalculator {
    public constructor(value = 0) {
        super(value);
    }
    public sin() {
        this.value = Math.sin(this.value);
        return this;
    }
    // ... other operations go here ...
}

let v = new ScientificCalculator(2)
        .multiply(5)
        .sin()
        .add(1)
        .currentValue();
```
如果没有 `this` 类型， `ScientificCalculator` 就不能够在继承 `BasicCalculator` 的同时还保持接口的连贯性。 `multiply` 将会返回 `BasicCalculator`，它并没有 `sin` 方法。 然而，使用 `this` 类型， `multiply` 会返回 `this`，在这里就是 `ScientificCalculator`。


## 索引类型（Index types）

使用索引类型，编译器就能够检查使用了动态属性名的代码。 例如，一个常见的 `JavaScript` 模式是从对象中选取属性的子集。

```javascript
function pluck(ob, names) {
    return names.map(n => ob[n]);
}
```

写成 TypeScript 便是这样：

```typescript
function pluck<T, K extends keyof T>(ob: T, names: K[]): T[K][] {
	return names.map(n => ob[n])
}
```

再来一个例子：

```javascript
function getProperty() {
	
}
```


## 参考文档

- [高级类型](https://www.tslang.cn/docs/handbook/advanced-types.html)