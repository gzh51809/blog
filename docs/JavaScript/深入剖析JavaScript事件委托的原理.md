# 深入剖析JavaScript事件委托的原理

一直对这项技术有所耳闻，但没有真正研究过，今天来剖析剖析。

## 原理

使用事件委托技术能让你避免对特定的每个节点添加事件监听器；相反，事件监听器是被添加到它们的父元素上。事件监听器会分析从子元素冒泡上来的事件，找到是哪个子元素的事件。

## 案例

假定我们有一个UL元素，它有几个子元素：

```html
<ul id="parent-list">
	<li id="post-1">Item 1</li>
	<li id="post-2">Item 2</li>
	<li id="post-3">Item 3</li>
	<li id="post-4">Item 4</li>
	<li id="post-5">Item 5</li>
	<li id="post-6">Item 6</li>
</ul>
```

我们还假设，当每个子元素被点击时，将会有各自不同的事件发生。你可以给每个独立的li元素添加事件监听器，但有时这些li元素可能会被删除，可能会有新增，监听它们的新增或删除事件将会是一场噩梦，尤其是当你的监听事件的代码放在应用的另一个地方时。但是，如果你将监听器安放到它们的父元素上呢？你如何能知道是那个子元素被点击了？

简单：当子元素的事件冒泡到父`ul`元素时，你可以检查事件对象的`target`属性，捕获真正被点击的节点元素的引用。下面是一段很简单的`JavaScript`代码，演示了事件委托的过程：

```
// 找到父元素，添加监听器...
document.getElementById("parent-list").addEventListener("click",function(e) {
	// e.target是被点击的元素!
	// 如果被点击的是li元素
	if(e.target && e.target.nodeName == "LI") {
		// 找到目标，输出ID!
		console.log("List item ",e.target.id.replace("post-")," was clicked!");
	}
});
```

第一步是给父元素添加事件监听器。当有事件触发监听器时，检查事件的来源，排除非li子元素事件。如果是一个li元素，我们就找到了目标！如果不是一个li元素，事件将被忽略。

这个例子非常简单，UL和li是标准的父子搭配。让我们试验一些差异比较大的元素搭配。假设我们有一个父元素div，里面有很多子元素，但我们关心的是里面的一个带有`classA` CSS类的A标记：

```js
// 获得父元素DIV, 添加监听器...
document.getElementById("myDiv").addEventListener("click",function(e) {
	// e.target是被点击的元素
	if(e.target && e.target.nodeName == "A") {
		// 获得CSS类名
		var classes = e.target.className.split(" ");
		// 搜索匹配!
		if(classes) {
			// For every CSS class the element has...
			for(var x = 0; x < classes.length; x++) {
				// If it has the CSS class we want...
				if(classes[x] == "classA") {
					// Bingo!
					console.log("Anchor element clicked!");

					// Now do something here....

				}
			}
		}

	}
});
```
上面这个例子中不仅比较了标签名，而且比较了CSS类名。虽然稍微复杂了一点，但还是很具代表性的。比如，如果某个A标记里有一个span标记，则这个span将会成为target元素。这个时候，我们需要上溯DOM树结构，找到里面是否有一个 A.classA 的元素。

因为大部分程序员都会使用jQuery等工具库来处理DOM元素和事件，我建议大家都使用里面的事件委托方法，因为这里工具库里都提供了高级的委托方法和元素甄别方法。

## JQuery的事件委托

- `.bind`: 只能给调用它的时候已经存在的元素绑定事件，不能给未来新增的元素绑定事件（类似于新来的员工收不到快递）
- `.live`: 解决了.bind的问题，将事件绑定到document对象，能够处理后续添加元素的单击事件