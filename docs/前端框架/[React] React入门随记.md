# React入门随记

## 为什么要用React？

传统的开发方式中，例如`JQuery + BootStrap`的这种直接操作DOM的方式，代码的复用性非常差。是否还会想起`html in js`的的恐惧？

博主本人是学`ng1`出身，前后大抵用了半年，虽然我爱`ng1`, 但深刻地体会到`ng1`在组件上的封装过于繁琐的这件事实，在移动端（尤其是`Android`端）的性能略（hen）差。

而`React`的优势在于:

- 组件化
- 只负责`View`层
- 轻量
- `virtual-dom`(大大地提高了渲染速度)
- 单向绑定(非`MVVM`框架)

## 适用场景

- 复杂场景下的高性能（还有`react native`这种好东西）


## 必备基础

- JS、CSS基础
- Sass、Compass
- Yeoman、Grunt、Webpack
- CommonJS、Node.js
- Git、Github

## JSX是什么？

- 就是一种`语法糖`
- JSX = JavaScript XML
- TS、CS等等和都类似，最终还是被解析成`JS`


## React 必备库

- ajax： `axios`, `fetch folyfill`、`superagent`
- cli: `create-react-app`


## React 生命周期

### Mount阶段

钩子函数|注释
---|---
`getDefaultProps()`|作用于组件类，只调用一次，返回对象用于设置默认的props，对于引用值，会在实例中共享。
`getInitialState()`|作用于组件的实例，在实例创建时调用一次，用于初始化每个实例的state，此时可以访问this.props。
`componentWillMount()`|在完成首次渲染之前调用，此时仍可以修改组件的state。
`render()`|必选的方法，创建虚拟DOM
`componentDidMount()`|真实的DOM被渲染出来后调用，在该方法中可通过this.getDOMNode()访问到真实的DOM元素。此时已可以使用其他类库来操作这个DOM。在服务端中，该方法不会被调用。

### updating阶段
钩子函数|注释
---|---
`componentWillReceiveProps()`|组件接收到新的`props`时调用，并将其作为参数`nextProps`使用，此时可以更改组件`props`及`state`。
`shouldComponentUpdate()`|组件是否应当渲染新的`props`或`state`，返回`false`表示跳过后续的生命周期方法，通常不需要使用以避免出现bug。在出现应用的瓶颈时，可通过该方法进行适当的优化。在首次渲染期间或者调用了`forceUpdate`方法后，该方法不会被调用
`componentWillUpdate()`|接收到新的`props`或者`state`后，进行渲染之前调用，此时不允许更新`props`或`state`。
`render()`|
`componentDidUpdate()`|完成渲染新的props或者state后调用，此时可以访问到新的DOM元素。

!> 请注意，我在`componentWillUpdate()`写了一个不允许自己写代码去更新`state`或`props`，为什么呢？因为这里手动更新了，又要触发`shouldComponentUpdate` , `componentWillUpdate`等等生命周期函数, 如此便会在`componentWillUpdate`这里陷入死循环。

### Unmountin阶段
钩子函数|注释
---|---
`componentWillUnmount()`|组件被移除之前被调用，可以用于做一些清理工作，在componentDidMount方法中添加的所有任务都需要在该方法中撤销，比如创建的定时器或添加的事件监听器。


## React 事件

事件|注释
---|---
onClick|点击
onKeydown|按下按键
onCopy|复制
onSubmit|提交表单


## Less的安装

```bash
npm install --save-dev less-loader less
```

webpack配置：

```javascript
module: {
        rules: [{
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        }]
    }
```
