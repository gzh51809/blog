# CSS 动画

## 关键属性

## animation-name
  
- type: `string`
- required: `true`

由`keyframes`定义的动画名，如：

```css
@keyframes slidein {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

.block {
  width: 100%;
  height: 10px;
  margin-bottom: 10px;
  background-color: #333;
  animation-duration: 2s;
  animation-name: slidein;
}
```

## animation-duration

- type: `time`
- required: `true`

规定动画持续的时间。

## animation-timing-function

- type: `keyword | function | multiple-values | global-values`
- required: `false`

定义动画在每一个动画周期中执行的节奏。

可选的`keyword`：

- ease
- ease-in
- ease-out
- ease-in-out
- linear
- step-start
- step-end

可选的`function`：

- cubic-bezier(0.1, 0.7, 1.0, 0.1)
- steps(4, end)
- frames(10)

可选的`global-values`:

- inherit
- initial
- unset

`multiple-values`的示例：

```css
.block {
    animation-timing-function: ease, step-start, cubic-bezier(0.1, 0.7, 1.0, 0.1);
}
```

## animation-delay

- type: `time`
- required: `true`

规定动画何时开始。由于 css3 动画没有时间轴，`animation-delay`最常见的是用于将动画与其他动画的执行时机错开，将动画落到不同的时间点，从而构造出动画时间轴。

为正值时，将延后执行，
为0时，将正常执行，
为负值时，部分动画会被砍掉。

## animation-iteration-count

- type: `number | keyword | multiple-values`
- required: `true`
- default: 1

定义动画在结束前运行的次数 可以是1次，也可以是无限循环（`infinite`）。

## animation-direction

- type: `keyword | multiple-values`
- required: `true`
- default: `normal`

指示动画是否反向播放。

keyword有：
  
  - normal: 每个周期内动画从前向后。
  - reverse: 每个周期内动画从后向前。
  - alternate: 奇数周期内从前向后，偶数周期从后向前。
  - alternate-reverse：偶数周期从前向后，奇数周期内从后向前。

## animation-fill-mode

- type: `keyword | multiple-values`
- required: `true`
- default: `normal`

keyword有：
  
  - none: 动画执行前不改变任何样式
  - forwards: 目标保持动画最后一帧的样式
  - backwards: 目标保持动画最后一帧的样式
  - both：会执行 forwards 和 backwards 执行的动作

## animation-play-state

- type: `keyword | multiple-values`
- required: `true`
- default: `running`

规定一个动画是否运行或者暂停。

keyword有：

  - running
  - paused


## IE兼容性

- IE: 10+


# 参考文献

- [MDN CSS Animations](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Animations/Detecting_CSS_animation_support)
- [css3 animation 属性众妙](https://aotu.io/notes/2016/11/28/css3-animation-properties/index.html)
- [CSS动画简介](http://www.ruanyifeng.com/blog/2014/02/css_transition_and_animation.html)
- [CSS动画之animation再次触发与防止多次触发](https://www.jianshu.com/p/48f3b8344174)
- [Detect which AnimationEnd has fired via animationName](https://stackoverflow.com/questions/11619341/detect-which-animationend-has-fired-via-animationname)
