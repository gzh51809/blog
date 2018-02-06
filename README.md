# blog
[![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)]()

## 构建文档

### task.basic.js

```js
    gulp.task('basic', done => {
        runSequence('prepare', 'getListLevel1', 'addType', 'getListLevel2', 'cacheDocsList', done);
    })
```

具体的任务描述如下：

任务名 | 描述
---|---
prepare | 清空旧的`doc`目录，从`workSpace`按照一定的过滤规则复制文件到`doc`中
getListLevel1 | 获得一级文件列表，并过滤掉配置中忽略的文件，存储到变量`docs`中
addType | 给`docs`的一级文件列表添加类型描述
getListLevel2 | 遍历`docs`来获得二级文件列表，并在此时获得生成`_sidebar.md`等文件的信息，同时存储到`docs`中
cacheDocsList | 缓存`docs`变量

### task.complie.js

```js
    gulp.task('compile', done => {
        runSequence('updateREADME', 'generateSpecialFiles', done);
    })
```

具体的任务描述如下：

任务名 | 描述
---|---
addIndentForChinese | 给索所有的中文文档自动加上缩进（未开启）
generateSpecialFiles | 根据`docs`生成每个子栏目的特殊文件，包括`_sidebar`/`README`/`_navbar`
updateREADME | 更新根级`README`


## Welcome to my blog！ [www.v2js.com/blog](http://www.v2js.com/blog)

本博客遵循：[署名-非商业性使用-禁止演绎 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh)






