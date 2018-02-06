# 实现document.ready
- 标签： `JavaScript`
- 时间： `2016-4-18`

在Jquery里面，我们可以看到两种写法:`$(function(){})` 和`$(document).ready(function(){})`

这两个方法的效果都是一样的，都是在dom文档树加载完之后执行一个函数，注意其与js原生方法`window.onload`的区别：

事件|说明
---|---
document.ready()|在dom加载完之后执行
window.onload|dom加载完且所有文件都加载完之后执行

那么，如果来实现这个`document.ready()`呢？

如下：

```js
     document.ready = function (callback) {
            ///兼容FF,Google
            if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', function () {
                    document.removeEventListener('DOMContentLoaded', arguments.callee, false);
                    callback();
                }, false)
            }
             //兼容IE
            else if (document.attachEvent) {
                document.attachEvent('onreadystatechange', function () {
                      if (document.readyState == "complete") {
                                document.detachEvent("onreadystatechange", arguments.callee);
                                callback();
                       }
                })
            }
            else if (document.lastChild == document.body) {
                callback();
            }
        }
```