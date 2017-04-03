# 聊聊Vue内容分发.md

## 什么是内容分发？

简单来说，假如父组件需要在子组件内放一些DOM，那么这些`DOM`哪些显示、不显示，在何处显示、如何显示，就是通过`slot`分发实现。

## 默认情况

默认情况下，父组件在子组件内套的内容，是不显示的。[jsbin在线](http://jsbin.com/xacarey/edit?html,js,output)

```html
<div id="app">  
    <children>  
        <span>12345</span>  
        <!--上面这行不会显示-->  
    </children>  
</div> 
```

```js
 var vm = new Vue({  
        el: '#app',
        components: {  
            children: {    //这个无返回值，不会继续派发  
                template: "<button>为了明确作用范围，所以使用button标签</button>"  
            }  
        }  
    });  
```