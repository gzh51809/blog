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



## React 生命周期

### Mount阶段
a|b
---|---
getDefaultProps()|d
getInitialState()|d
componentWillMount()|d
render()|d
componentDidMount|d








