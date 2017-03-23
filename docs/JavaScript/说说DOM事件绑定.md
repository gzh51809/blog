# DOM事件

## 绑定事件

### DOM0和DOM2
在DOM的事件中，事件分为DOM0和DOM2事件，下面给出了两种不同模式的绑定方式：

```js
	var btn = document.getElementById('submit');
	// DOM0事件
	btn.onclick = onClickFn;
	// DOM2事件    
    btn.addEventListener('click', onClickFn, false);
```

直接在HTML上绑定事件也是采用的DOM0事件，那么DOM0和DOM2到底有什么区别呢？简单来说，DOM0的事件绑定方法只能给一个事件绑定一个响应函数，重复绑定会覆盖之前的绑定。而DOM2则可以给一个元素绑定多个事件处理函数。

### 兼容性

事实上，低于IE9是不支持`addEventListener`这个方法的，下面，采用外观模式（门面模式）来解决兼容性：
```js
function addEvent(el, type, fn) {
	// 对于支持DOM2事件优先用DOM2
  if(el.addEventListener){
  	el.addEventListener(type, fn, false)
  	// 对于不支持addEventListener但支持attachEvent的
  } else if(el.attachEvent){
  	el.attachEvent('on'+type, fn)
  	// 对于不支持addEventListener也不支持attachEvent的
  } else {
  	el['on'+type] = fn;
  }
}
```


## 事件传递机制








eventPhase 

- 1 捕获阶段
- 2 目标阶段
- 3 冒泡阶段

currentTarget

当前的target

target 和 currentTarget 的区别？