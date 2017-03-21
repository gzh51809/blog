# AnguarJS 1.x & Ionic 实践与技巧

- 标签： `AnguarJS`
- 时间： `2016-1-1`

---

[TOC]

---

# 1 项目的基本结构
## 1.1 不采用路由的传统项目结构

众所周知，不采用路由，也就是采用 `ng-app` 和 `ng-controller` 指令，来进行传统的页面编写，就会写成这种形式：

```
<div ng-app="myApp" ng-controller="myCtrl">

名: <input type="text" ng-model="firstName"><br>
姓: <input type="text" ng-model="lastName"><br>
<br>
姓名: {{firstName + " " + lastName}}

</div>

<script>
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});
</script>
```

当然，这不是我们讨论的重点。之所以使用ng，我们是想要实现一个单页应用，那么，我们就需要路由了。

---

## 1.2 采用UI Router

以下是`Ionic cli`生成的默认路由路由，这里路由采用的是AngularJS UI Router，而非AngularJS自带的路由。

```js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});

```
---


# 2 过滤器
## 2.1 为什么要使用过滤器？

正如其名，过滤器的作用就是接收一个input，通过某个规则进行处理，然后返回处理后的结果。而过滤器的实现，也是标准开环控制。

Angular在input和filter之间加入了一个监听器`$watch`

![image_1b6rpiikpcg415ui1dfu1k77pe19.png-25.3kB][1]

## 2.2 基础使用

首先回顾一下，过滤器的基础使用。
我们可以直接在`{{}}`中使用filter，跟在表达式后面用`|`分割，语法如下：

```html
    {{ expression | filter }}
```
也可以连用：
```html
    {{ expression | filter1 | filter2 | ... }}
```
当然，通过实际使用，还有多种用法，请继续往下看。


## 2.3 在HTML中使用

这里需要区分3种情况，第一种是在标签之间使用，以下是几种常用的内置过滤器方法

```html
// 转小写
<div>{{data | lowercase }}</div> 

// 转货币格式
<div>{{data | currency }}</div> 

// 格式化日期（这里的小时是12小时制）
<div>{{ createTime | date: 'yyyy-MM-dd hh:mm' }}</div> 

// 格式化日期（这里的小时是24小时制）
<div>{{ createTime | date: 'yyyy-MM-dd HH:mm' }}</div> 

// 排序过滤器 - orderBy
<li ng-repeat="item in data | orderBy:'id'"></li>

```

当然，过滤器也可以在HTML标签（通常是已定义的指令）的属性中使用，这一点，将在定义指令的章节提及。


## 2.4 自定义过滤器

在讲述过滤器如何在控制器中使用之前，首先，我们先聊聊如何自定义指令, 接下来写一个用来反转字符串的过滤器：
```js
angular.module("myApp",[])
.filter("reverse",function(string, uppercase){
    var output = '';
    string = string.split('').reverse().join('');
    
    // 或写为： 
    // for(var i = 0, l = string.length; l < l; i++){
    //      output = string.chatAt(i) + output;
    //}
    
    if(uppercase){
        output = output.toUppercase();
    }
    return output；
});
```
接下来，我们就可以调用这个指令了，在HTML中，这样调用：
```html
<div>{{ string | reverse }}</div>
```
若想全部转成大写，也就是给定第二个参数，则这样调用：
```html
<div>{{ string | reverse：true }}</div>
```


## 2.4 在控制器中使用

# 3 解决 ng-repeat 占位

在刚刚踏入Angular开发这条大坑的时候，曾经苦恼过，如何去解决占位的问题。也就是说，**在ajax请求还未成功时，由于repeat的数组为空，视图会塌陷，高度为0，在ajax请求成得到data后，视图突然出现，会显得尤其突兀**。

那么，如何解决占位吗？，请看下例：

最简单的一段`ng-repeat`代码：

```html
<div ng-repeat="item in data"></div>
```

解决办法是：在页面初始化时给repeat的数组赋一个初值。可以定义一个服务，来动态获取占位数组:

```js
var appMain = angular.module('app', [])
appMain.factory('myService', function(){

  /**
   * 生成 ng-repeat 占位占位初始化数组
   * @param spaceNumber
   * @return {Array}
   */
  this.createSpaceArray = function (spaceNumber) {
    var array = [];
    var count = spaceNumber || 10;
    for(var i = 0; i < count; i++){
      //push一样的只将会导致你强制使用 track by $index
      array.push(i)
    }
    return array;
  }
  return this;
})

```

然后，在控制器中的逻辑如下:

```js
appMain.controller('appCtrl', function($scope, myService){

    //初始化
    $scope.initial = function(){
    
        // 先赋个初值，确保DOM存在，只是不显示
        $scope.data = myService.createSpaceArray();
        
        // 然后执行ajax请求，这里的ajaxRequest()为语法糖
        ajaxRequest(function(data){
            //成功的回调
            $scope.data = data;
        });
        
    }
})

```


  [1]: http://static.zybuluo.com/a472590061/xd755vrvqzsglxngdzz3f6wn/image_1b6rpiikpcg415ui1dfu1k77pe19.png