# CSS清除浮动的意义

## 问题的起因

当一个内层元素是浮动的时候，如果没有关闭浮动时，其父元素也就不会再包含这个浮动的内层元素，因为此时浮动元素已经脱离了文档流。也就是为什么外层不能被撑开了！

## 问题的引入——什么是浮动？

有以下这段DOM结构：

```html
	<div class="item-wrapper">
		<div class="item"></div>
		<div class="item"></div>
		<div class="item"></div>
	</div>
```

CSS如下：

```css
.item {
    float: left;
    width: 30%;
    height: 100px;
    background: #aaa;
    margin: 10px;
}
```

想要清楚浮动的话，做以下操作：

```css
.item-wrapper{
	zoom: 1;
}
.item-wrapper:after{
	clear: both;
	display: block;
	width: 0;
	height: 0;
	content: '';
	visibility: hidden;
}
```

## 为什么要清楚浮动？

float的子元素脱离文档流，导致没有被撑开，从而可能导致视图塌陷

## 如何清楚浮动？

在父容器的最后面加一个block，设置宽高为0，并设置 `clear: both`