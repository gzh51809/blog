## 除去IOS移动设备的解决方案

```css
body.noscroll {
    overflow: hidden;
    position: relative;
}
```

```js
function fixedBody() {
	$('body').toggleClass('noscroll', true)
}

function looseBody() {
	$('body').toggleClass('noscroll', false)
}
```

## 兼容IOS移动设备的解决方案

```css
body.noscroll {
    position: fixed;
    left: 0;
    right: 0;
}
```

```js
let lastWindowScrollTop

function fixedBody() {
  lastWindowScrollTop = $(window).scrollTop()
  $('body').addClass('noscroll')
  $('body').css('top', `-${lastWindowScrollTop}px`)
}

function looseBody() {
    $('body').removeClass('noscroll')
    $('body').css('top', '')
    window.scrollTo(0, lastWindowScrollTop)
}
```