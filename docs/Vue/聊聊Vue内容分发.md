# 聊聊Vue内容分发.md

## 什么是内容分发？

简单来说，假如父组件需要在子组件内放一些DOM，那么这些`DOM`哪些显示、不显示，在何处显示、如何显示，就是通过`slot`分发实现。

## 默认情况

默认情况下，父组件在子组件内套的内容，是不显示的。[jsbin在线](http://jsbin.com/xacarey/edit?html,js,output)

```html
<div id="app">  
    <children>
        <!--然而你想要显示得子组件允许你显示才行，所以在子组件无任何设置前提下，这里不会显示-->
        <span>我想要在子组件中显示</span>  
    </children>  
</div> 
```

```js
 var vm = new Vue({  
        el: '#app',
        components: {  
            children: {  
                template: "<button>Children Template</button>"  
            }  
        }  
    });  
```