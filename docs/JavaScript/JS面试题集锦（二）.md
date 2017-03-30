# JS面试题集锦（二）

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

## commonJS实现的大致原理

## commonjs和ES6的模块机制有什么区别？

## React Virtual DOM 算法原理

## 

