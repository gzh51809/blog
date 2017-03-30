# JS面试题集锦（二）

!> 以下这些面试题，是本人给自己出的面试题，大部分为比较开放的论述题。

## AngularJS的双向绑定是如何实现的？

大致原理：保存数据的新旧值，每当有一些DOM或者网络、定时器之类的事件产生，用这个事件之后的数据去跟之前保存的数据进行比对，如果相同，就不触发界面刷新，否则就刷新。

## Vue的双向绑定是如何实现的？
观察者模式

## 移动端touch事件和click事件的区别

以下是四种touch事件

- touchstart:     //手指放到屏幕上时触发
- touchmove:      //手指在屏幕上滑动式触发
- touchend:    //手指离开屏幕时触发
- touchcancel:     //系统取消touch事件的时候触发，这个好像比较少用

每个触摸事件被触发后，会生成一个event对象

在移动端，手指点击一个元素，会经过：`touchstart --> touchmove -> touchend --> click`。
所以手机端的`click`事件会延时`300ms`

- 解决方案：`fastclick.js`

## CommonJS实现的大致原理

## Commonjs和ES6的模块机制有什么区别？

## React Virtual DOM 算法原理

## 聊聊前端工程化、组件化、模块化的开发模式

## 说出前端发出一条请求到接收到响应整个 lifecycle

## 聊聊前端安全性，如 XSS、CSRF

## 聊聊跨域

## 聊聊HTML语义化

## 聊聊SEO

## Weex基本工作原理，和 React Native 的区别，和 Cordova 的区别

## 聊聊 JQuery 的事件委托

## HTML、CSS

- HTML 的语义化理解
- CSS 动画性能比较问题
- 简单的浏览器兼容问题解决方式
- 如何实现一个性能优化后的 slider
- 如何实现一个搜索高亮的文件树


## CSS

- 盒模型
- 浮动
- 居中
- 背景
- 字号字体
- 行内元素和块级元素
- 常用的IE Hack
- 常见的屏幕分辨率
- 响应式设计和自适应设计
- 栅格系统
- rem工作原理
- flex
- transform
- transition
- 缓动曲线（贝塞尔曲线）
- animate（帧动画，补间动画）
- setTimeout
- 浮动清除
- 怪异盒模型
- 文字基线
- 精灵图和iconfont
- 阴影和边框


## DOM

掌握原生的DOM操作

- 增删查改
- 熟悉node和element对象

## 事件
   
关于事件的机制
   
- 冒泡和捕获
- 事件委托
- 自定义事件
- Event对象


## 面向对象

了解面向对象的思想，能够以面向对象的思想构建应用。比如封装一个日历组件，设计对象所需的属性值和方法。

- new方法
- 继承，派生
- 原型和原型链

## 函数

- 熟悉Array，String等的方法
- call和apply方法的使用
- 链式调用
- this


## 熟练使用AJAX

- $.ajax方法
- HTTP协议方法
- 跨域
- restful API
- JSONP原理

## 熟练使用JQuery

jquery最重要的是简化DOM操作，以及适配浏览器兼容

- 增删查改
- 修改属性和样式
- 编写JQuery插件
- 事件队列

## bootstrap

作为最为知名的前端样式框架，无论是在应用上，还是学习中，都能给我们带来很多的价值。

- 栅格系统
- less/sass
- 页面组件划分
- 索引行考察组件的使用，要求手写代码

## 掌握swiper

- 通读过swiper的API
- 索引行考察API的使用，要求手写代码

## 掌握underscore

- 通读过underscore的API
- 理解链式调用背后的原理
- 最好阅读过underscore的源码
- 可以手写实现underscore的方法

## 通用

- MVC
- 双向数据绑定
- 单项数据流
- 组件化
- 生命期
- 路由

## 前端模板

- 横向对比，所用模板的优点
- 至少使用过两种以上的前端模板

## 掌握gulp
   
- 索引行考察手写gulp任务

## 掌握模块化

- CMD标准
- commonjs
- ES6模块
- babel如何使用
- webpack打包方案
- 异步加载
- 打包多个文件

## 掌握webpack

- 阅读webpack文档
- 理解配置文件结构
- 合并，注入生效代码部分
- 热更新

## CSS

- 命名策略
- 嵌套
- 变量
- 函数

## 了解nodeJS
- 是否上传过npm包
- 断点调试法
- express
- 插件
- 中间件
- 路由原理
- HTTP协议
- 数据库查询
- HTML模板（ejs，pug）

## 了解ES6

- promise
- Generator
- 花括号作用域
- class
- 数组遍历（ES5）
- 严格模式（ES5）
- 模块系统

## 开发工具

Sublime,Atom,Webstorm,Hbuilder等

- 日常使用什么插件
- 使用什么快捷键
- 应用哪些snippet