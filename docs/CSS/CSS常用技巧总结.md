# CSS常用技巧总结

- 标签： `CSS`
- 时间： `2016-1-1`

## 两栏布局

### 方法1 - float

```html
  <header>Header</header>
  <div class="main">
    <div class="nav">Aside</div>
    <div class="content">Content</div>
  </div>
  <footer></footer>
```

```css
body {
    font-size: 20px;
    color: #555;
    text-align: center;
}

header {
  height: 60px;
  background: #ddd;
  line-height: 60px;
  text-align: center;
}

.main .nav, .main .content {
  height: 300px;
  line-height: 300px;
}

.main .nav {
  width: 100px;
  float: left;
  background: #bbb;

}

.main .content{  
  background: #a99;
  overflow: auto;
}
```