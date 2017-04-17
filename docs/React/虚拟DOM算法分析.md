# 虚拟DOM算法分析

## 为什么需要需要虚拟DOM

众所周知，DOM操作会严重地影响页面的性能。如果对前端状态进行抽象的话，主要就是维护状态和更新视图，而维护状态和更新视图都需要进行DOM操作。

## 虚拟DOM

虚拟的DOM的核心思想是：对复杂的文档DOM结构，提供一种方便的工具，进行最小化地DOM操作。

```js
var VELement = function(tagName, props, children) {
	if(!this instanceof VELement){
	
	}
}

```