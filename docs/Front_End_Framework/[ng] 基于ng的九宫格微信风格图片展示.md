# 基于 angularjs 的自定义微信风格图片展示 

- 标签： `AngularJS` `CSS` 
- 时间： `2016-12-25`

---

# 1 需求

实现微信朋友圈的css代码编写。我们知道，微信朋友圈的图片显示风格基本为 `九宫格`，但也有特例，比如单独一张图时，会大一点儿，四张图时，虽然仍然按九宫格展示，但是第二张图后面有换行符。

接下来，我们采用 Angular 的 `ng-class` 指令结合 `css` 一步一步完成它。

# 2 方案

开始我考虑过两种方案： `flexbox` 和 `普通布局法`，由于前者的可控性和兼容性不够好，后者的间距控制太复杂，css书写量过大且不好维护。最终都选择了不予考虑。

最终，我采用如下的布局思路：

> 图例：

![image_1b3en2cnjbgi1rr21upl1toe11se9.png-523.3kB][1]

> 基础HTML：

```html
  <div class="photo-container clear-float">
    <div class="photo-item">
    </div>
  </div>
```

> 说明：

- photo-container （后简称“图片容器”）的宽度为 100%，且其 `box-sizing`为`border-box`，这是因为我们希望为其设置`padding`而不影响容器的实际大小 （关于box-sizing[点击这里][2]），在本例中，图片容器的宽度就是屏幕的宽度。

- 灰色部分为图片容器的内边距。

- photo-item （后简称“图片项目”）的 `box-sizing`为`content-box`，这是因为我们希望为其设置`margin`，而又不影响其`innerWidth`。此外，图片项目均设置为`float: left`,此外，图片的间距通过右下间距来调节，可以极大的减少css的代码量和计算连，唯一的缺陷就是整个容器的右下空白会多一点儿（但也没有什么大影响~）

- `clear-float`的作用是清除浮动。

- 正方形的绘制采用一下思路：
`padding-bottom = width = 固定百分比(30%)，height = 0`

---
# 3 代码

HTML:
```html
  <div class="photo-container clear-float"><
    <div class="photo-item"
         ng-class=" 'photo-item-' + imgArray.length "
         ng-repeat="item in data track by $index"
         ng-style="{'background-image': 'url(' + item + ')'}"
    >
    </div>
  </div>
```

> ng-class这样写是不是很酷，此外，我还总结出多种写法：

```
  //一个时间内新增的css类只能为0个或1个
  <div ng-class="{值1: css类1, 值2: css类2 ...}[变量]"></div>
  
  //一个时间内新增的css类可以为0个或多个
  <div ng-class="{变量1: css类1, 变量2: css类2 ...}"></div>
  
  //利用单行表达式（用括号括起来）返回css类，进行二次逻辑判断
  <div ng-class="{值1: 表达式1, 值2: 表达式2 ...}[变量]"></div>
```


CSS:
```css
.photo-container{
  margin-left:16%; width: 80%;
  padding: 2%;
  box-sizing: border-box;
}

.photo-item{
  float: left;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

/* 1张图片 */
.photo-item-1{
  width: 50%;
  height: 0;
  padding-bottom: 50%;
  box-sizing: content-box;
  margin: 0 1.5% 1.5% 0;
}

/* 2张图片 */
.photo-item-2{
  width: 31%;
  height: 0;
  padding-bottom: 31%;
  box-sizing: content-box;
  margin: 0 1.5% 1.5% 0;
}

/* 3张图片 */
.photo-item-3{
  width: 31%;
  height: 0;
  padding-bottom: 31%;
  box-sizing: content-box;
  margin: 0 1.5% 1.5% 0;
}

/* 4张图片 */
.photo-item-4{
  width: 31%;
  height: 0;
  padding-bottom: 31%;
  box-sizing: content-box;
  margin: 0 1.5% 1.5% 0;
}

.photo-item-4:nth-child(2){
  margin-right: 10%;
}


/* 5张图片 */
.photo-item-5{
  width: 31%;
  height: 0;
  padding-bottom: 31%;
  box-sizing: content-box;
  margin: 0 1.5% 1.5% 0;
}

/* 6张图片 */
.photo-item-6{
  width: 31%;
  height: 0;
  padding-bottom: 31%;
  box-sizing: content-box;
  margin: 0 1.5% 1.5% 0;
}

/* 7张图片 */
.photo-item-7{
  width: 31%;
  height: 0;
  padding-bottom: 31%;
  box-sizing: content-box;
  margin: 0 1.5% 1.5% 0;
}

/* 8张图片 */
.photo-item-8{
  width: 31%;
  height: 0;
  padding-bottom: 31%;
  box-sizing: content-box;
  margin: 0 1.5% 1.5% 0;
}


/* 9张图片 */
.photo-item-9{
  width: 31%;
  height: 0;
  padding-bottom: 31%;
  box-sizing: content-box;
  margin: 0 1.5% 1.5% 0;
}
```

> css看起来可能比较多，重复的也很多（这样好啊，我直接copy，不用改margin值）。写成这样是因为有两个特殊情况：

- 1张图片显示最独特，会略大一点。
- 4张图片摆放时，一行不出现三个。而是每行两个

# 总结

还可以再画个头像和内容放在顶部，直接变成朋友圈风格，像这样：

![image_1b3eq8gslti2cq97v71rat1ep9m.png-210kB][3]

是不是一模一样？兴奋了吧，快来自己画吧。


  [1]: http://static.zybuluo.com/a472590061/5hpyp0h7jxl5wlb2rkzy55do/image_1b3en2cnjbgi1rr21upl1toe11se9.png
  [2]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing
  [3]: http://static.zybuluo.com/a472590061/e3j9yap67ulesv2nxnq6piqs/image_1b3eq8gslti2cq97v71rat1ep9m.png