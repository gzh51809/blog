# CSS3 实用技巧

## CSS3基本特性

> 选择器升级，如`tbody: nth-child(even), nth-child(odd)`

```css
p:nth-child(2){
    background:#ff0000;
}
```

![](CSS/img/SC.png)
![](CSS/img/hshs.png)

    1. 生效的条件是父元素的第二个子元素
    2. 是P标签

> @Font-face

[CSS3 @font-face](http://www.w3cplus.com/content/css3-font-face)
[Google Fonts](https://fonts.google.com)

- 多栏布局（column-count、column-gap、column-rule、column-width）
- @Font-face
- Word-wrap、Text-overflow
- text-Shadow、Reflect
- border-radius
- Text-decoration: 对文字的更深层次的渲染
- 渐变效果
- CSS3 的盒子模型
- Transitions
- Transforms
- Animation（@keyframes）

## CSS中级应用技巧

- 用CSS来画各种形状
- CSS基础布局
- CSS的编译机制
- 清除浮动

普通的清除浮动不必多说，麻烦的是当一些兄弟元素的中间出现了浮动元素，如何处理？

- 1px像素解决方案
- 媒体查询
- em与rem
- vertical-aligh背后的魔法
- CSS伪类

## CSS高级技巧

- CSS动画
- CSS过渡
- CSS Sticky Footer
- BFC
- Box
- Formatting context

最为经典的应用：触发BFC来生成自适应的两栏布局。

[参考文献](http://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html)




