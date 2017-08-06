# M-Work项目自动化构建（使用手册）

- 标签： `AnguarJS`
- 时间： `2016-11-11`

!> 利益相关，`M-Work`为该APP的代名。

---
# 1 需求
&nbsp;&nbsp;&nbsp;&nbsp; `M-Work`本身是一个基于`Angular`/`Ionic`/`Cordova`开发的项目。下面那张图，是我们需要使用`gulp`来完成对该项目进行自动化构建的目录变更需求说明图。

&nbsp;&nbsp;&nbsp;&nbsp;实际上，在早期的项目开发中，我们摒弃了`Ionic`官方给出的项目结构（下图右），而选择了依据业务来构建目录、`one dir one module`模式的项目结构（下图左）。在这样的结构背景下，直到APP面临上线不久，我们突然才意识到代码的压缩合并，以及生产环境的部署的变更将会尤为繁琐。

&nbsp;&nbsp;&nbsp;&nbsp;暂且不论我们选择的开发环境结构有何优势，不管怎样，在生产环境中，我们需要回到最原始的目录结构（下图右）。

&nbsp;&nbsp;&nbsp;&nbsp;于是，所谓的需求，由此而生。

![image_1b0ppmme5ogicber1u1ila1ta0m.png-1138.2kB][1]

---
## 1.1 面临的问题
&nbsp;&nbsp;&nbsp;&nbsp;第一点，也是最基础的，我们需要解决`Angular`代码压缩的问题，如果你尝试过用压缩`js`的方法去压缩`Angular`,你就会发现，`Angular is Boom`。

&nbsp;&nbsp;&nbsp;&nbsp;第二，如何动态修改`index.html`和`routes.js`的内容？

&nbsp;&nbsp;&nbsp;&nbsp;第三，由于`html`不压缩，考虑到`templates`中有大量的相对路径需要修改，如何遍历文件并自动修改？

---

## 1.2 解决办法

&nbsp;&nbsp;&nbsp;&nbsp;在这里，我先写出上述问题的解决方案，后面再讨论如何使用：

 - `gulp-ng-annotate` 
 - `node.js(fs)`
 - `o((≧▽≦))o`

---
# 2 构建思路


&nbsp;&nbsp;&nbsp;&nbsp;首先，我们必须安装 `Node.js` 和 `Gulp` 。
&nbsp;&nbsp;&nbsp;&nbsp;由于前者在构建本项目前已经准备好,
&nbsp;&nbsp;&nbsp;&nbsp;因此，本项目的重点便是`Gulp`，
&nbsp;&nbsp;&nbsp;&nbsp;请参见`附录 - 软件清单`

---
## 2.1 两种构建思路

### 2.1.1 互换法（Change）

![image_1b0pr3rc115d61educpt1paftjom.png-305.9kB][2]

&nbsp;&nbsp;&nbsp;&nbsp;这个方法的思路，来源于下面这段简单的C程序：
```c++
    int a = 10, b = 20, c;
    c = a;
    a = b;
    b = c;
    printf("%d, %d",a ,b)
```
&nbsp;&nbsp;&nbsp;&nbsp;也就是说，`backup`目录和变量`c`的作用一样，除了备份开发环境的源码，更大的作用在于，它能够实现切换开发环境和生产环境。

&nbsp;&nbsp;&nbsp;&nbsp;这种方式优点是，在开发过程中不用考虑生产环境，直到项目发布时，再执行`gulp`操作。

&nbsp;&nbsp;&nbsp;&nbsp;当然，缺点也很明显，一旦在代码的集成过程中出现意想不到的问题，最直接的，`APP Booms`，因此，采用这种方式，在发包时，可能会忙的措手不及。

### 2.1.2 监听法（watch）

![image_1b0pvrk5opbrlhm1qou1688u4d20.png-307kB][3]

&nbsp;&nbsp;&nbsp;&nbsp;为了保持和方法一的一致性，方法二采用了相同的目录，这可以让你在两种方式之间进行灵活切换。

&nbsp;&nbsp;&nbsp;&nbsp;方法二，首先，和方法一的区别在于将开发环境和生产环境的位置互换，并采用了`gulp.watch`来对开发环境监听，一旦检测到文件的变化，可以实时更新到生产环境中。

&nbsp;&nbsp;&nbsp;&nbsp;当然，这种方式也有其缺陷，首先，要考虑监听周期，如果是实时，完全没有必要。第二，采用这种模式开发，一旦出现问题，开发人员将会非常揪心，到底是自己的代码错了，还是构建的逻辑有缺陷呢（毕竟采用这种方式，你测试的是一个`min.js`~~）。因此，你只能不断填坑。

&nbsp;&nbsp;&nbsp;&nbsp; **最后**，我必须要强调，第二种基于`gulp.watch`的思路是由`gulp`官方的`API`衍生而来的，尽管如此，它也逃避不了因为需求中`开发环境`和`生产环境`的目录不对应，所以`boom easily`的弊病，尽管我们可以通过算法来完成（实际上已经基本实现），但需要后期优化的工作仍有很多。

### 2.1.3 选型
&nbsp;&nbsp;&nbsp;&nbsp;在选型上，首先对我们的构建需求进行分析，总结为以下几点：

 1. 能够合并及压缩代码
 2. 需要改变项目目录
 3. 需要修改相对路径
 4. 平时开发是基于**DE**，上线前才转成**PE**

&nbsp;&nbsp;&nbsp;&nbsp;综上，我们对实时性（监听）的要求不高，因为我们无需实时发布。但是对项目的转化和自动集成的要求比较高，同时，大量的路径修改也是重点之一。因为，我们选择了**互换法（Change）**
 
## 2.2 偷懒的思路

&nbsp;&nbsp;&nbsp;&nbsp;实际上，有一种非常简单的构建思路，可以基本上不会出现问题（通过自测）。这里简单叙述一下。

&nbsp;&nbsp;&nbsp;&nbsp;这种思路的思维就是，保持项目目录结构不变，js和css仍要压缩合并，并替换`index.html`中的文件注入。

&nbsp;&nbsp;&nbsp;&nbsp;这种方式不仅大大简化了构建代码的编写，同时也减少了测试的工作量。但是，它有两个缺点，让我们无法眷顾于此。第一，它不合规范，第二，即使做完了，也无法入`gulp`的门。


---
# 3 构建流程

## 3.1 整体构建流程
&nbsp;&nbsp;&nbsp;&nbsp;忽略具体实现逻辑，采用**互换法**的整体构建思路如下：

![image_1b1bkdsncsut19sgvu014ko1tn29.png-103.8kB][4]

## 3.2 gulp的使用样例

&nbsp;&nbsp;&nbsp;&nbsp;在这里，我将你想象成已经看过并熟悉官网API的程序猿，同时，下文的内容需要你能够熟练使用**正则表达式**。

### 3.2.1 文件读写
&nbsp;&nbsp;&nbsp;&nbsp;本项目在一开始全部采用**异步（Async）**的`node.js---fs`方法进行文件的处理，由此导致的问题在项目顺序执行时逐一暴露，最主要的问题来源于**回调金字塔**导致的gulp无法正确得知任务的准确完成时间。从而出现任务可以独立运行，但连续运行频频出现故障的BUG，因此，本项目的文件读写均采用了`fs`的同步方法：
&nbsp;&nbsp;&nbsp;&nbsp;注意，以下是一个JS模块（Module），要想使用，必须实例化。

```js
var gulp = require( 'gulp' );
var fs = require( 'fs' );

/**
 * file process module
 * @returns {{onlyRead: onlyRead, writeAfterRead: writeAfterRead}}
 */
var FSModule = function () {

  /**
   * only read files
   * @param {String} path
   * @param {Function} cb
   */
  function onlyRead( path ) {

    var text = fs.readFileSync(path, 'utf8')
    return text;

  }

  /**
   * write after read (module)
   * @param {String} filePath
   * @param {String} DEST
   * @param {Function} treat
   * @param {Function} cb
   */
  function writeAfterRead( path, DEST, treat, callback ) {

    var text = fs.readFileSync(path, 'utf8');
    text = treat(text);
    fs.writeFileSync(DEST, text)
    callback && callback();

  }

  return {
    onlyRead: onlyRead,
    writeAfterRead: writeAfterRead
  };
}

/**
 * create a example of FSModule
 */
  var fileModule = FSModule();

```


### 3.2.2 文件（夹）的复制与删除

以**LIB**的复制为例介绍文件的复制，代码如下：
```js
/**
 * copy SOURCE to BACKUP (public/backup)
 */
gulp.task('copySOURCE',function () {
  return gulp.src( SOURCE + '**' ).
  pipe( gulp.dest(BACKUP) );
});
```
以**DEST**的删除为例介绍文件的删除，代码如下：
```js
/**
 * del DEST in www
 */
gulp.task('delwwwNew', function () {
  return del([SOURCE])
    // this is another plan：
    // return gulp.src([SOURCE]).pipe( vinylPaths(del) );
});
```
### 3.2.3 修改单个文件
以修改`index.html`为例：
```js
/**
 * convert the relative path of index.html
 */
gulp.task('convertIndex', function () {

  //this a reference template of LIB in index.html
  var strWaitedForReplace = fileModule.onlyRead(indexRawFile);

  //inject above template to the index.html ( </title> ... </head> )
  (function (file) {
    fileModule.writeAfterRead( file, file, function (str) {
      return str.replace(/<\/title>(.|\n)*<\/head>/g,strWaitedForReplace)
    })
  })(indexHtmlDest)

  log.y('convert index.html successfully ...')

})
```
### 3.2.4 遍历多个文件
以批量修改`templates`下的html文件为例：
```js
var gulp = require( 'gulp' );
var rd = require( 'rd' );
var fs = require( 'fs' );

/**
 * test file and folders, and remove dir from this array
 */
function removeFolders( array ) {
  var a = [];
  var regxp = /\\.*\.\w+/;
  array.forEach(function (content, index, self) {
    if( regxp.test(content) ){
        a.push(content)
    }
  })
  console.log( array.length + ' all.' + a.length + ' files， ' + (array.length - a.length) + ' folders.' )
  return a;
}

/**
 * convert the relative path of HTML
 */
gulp.task('convertHTML', function ( callback ) {

  var files = rd.readSync(DEST + 'templates');  //get the folders and files
  files = removeFolders(files);

  files.forEach(function (content, index, array) {
    fileModule.writeAfterRead( content, content, function ( fileStr ) {
      fileStr = fileStr.replace(/\.\.\/img[/a-zA-Z_]*\//g,'img/');       //path of img
      return fileStr.replace(/\.\.\/.*templates/g,'templates');          //path of ng-include
    })
  });

  log.y('Convert html files successfully ...')

  //this is what lets gulp knows this task is complete!
  callback();
})
```
### 3.2.5 任务的串行执行

在gulp中，任务默认是默认采用最大的并发数异步运行的，也就是说，gulp不会做任何等待，而将所有的任务同时开起来。

其实，想实现串行执行也是可以的的，gulp官网推荐了一种**任务依赖法**，参见下述的链接：
http://www.gulpjs.com.cn/docs/recipes/running-tasks-in-series/

但是，如果你有大量的串行任务，上述的方式就会显得尤为乏力了，我需要不断的建立任务依赖，从而大大增加各个任务之间的耦合性。

因此，在这里，我们采用了一款gulp插件——`run-sequence`，请自行查看API：https://www.npmjs.com/package/run-sequence

**请确保可以并行的采用并行方式运行，确保串行任务严格串行。**

---
# 4 API

## 4.1 gulp public 

option:

参数　| 类型　|　默认值　|　说明
--- | ---| ---| ---
auto | string | `'true'` | `是否自动执行gulp build`,默认为自动执行,　为`false`则只执行`gulp public`
process | string | `'false'` |　`是否保存JS过程文件,即分类产生的文件`，默认不保存，为`true`则保留

## 4.2 其他

`gulp build`和`gulp res` 暂时没有提供相关API;
`gulp help(gulp)`可以打印帮助信息。


---
# 附录

> ## gulp安装清单

Name |  Version
---|---
node.js | 基于Chrome V8引擎的Chrome运行环境
gulp | 自动化构建核心
gulp-ng-annotate | 自动转换Angular代码
gulp-util | 一个大杂烩
bower | 前端包管理器
gulp-uglify | 压缩js文件
gulp-concat | 文件合并
gulp-minify-css | 压缩CSS
gulp-rename | 重命名文件
gulp-ngmin | 预缩小AngularJS应用程序
gulp-strip-debug |删除js中的console, alert, and debugger语句
gulp-inject | 自动插入HTML的引用
gulp-imagemin | 图片压缩
gulp-rev | 给文件名加MD5后缀
imagemin | 图片压缩
gulp-replace | 文本替换插件
gulp-watch | 文件监视器
gulp-useref | 解析HTML文件中的构建块，以替换对非优化脚本和css的引用。
gulp-filter | Enables you to work on a subset（子集） of the original files by filtering them using globbing（通配符）. When you're done and want all the original files back you just use the restore（恢复） stream（流）.
gulp-clean| Removes files and folders.
yargs | 用于获得启动参数
lodash | 用于操作数组
path | 用于写路径
vinyl-paths | 获取 stream 中每个文件的路径
gulp-flatten | 删除或替换的文件相对路径
gulp-angular-templatecache | 在$ templateCache中连接并注册AngularJS模板。
fs  | 加载File System读写模块  
iconv-lite  | 加载编码转换模块  
gulp-run-sequence | 按顺序运行一系列gulp任务，避免了gulp默认尽可能同步执行指令的问题，同时，采用依赖也会显得尤其麻烦。
require-dir | 分离任务到多个文件中
colors|                   console.log的颜色控制
async|                  异步控制
rd| 遍历文件夹和文件
merge-stream|   合并流
rimraf| 删除文件夹


---
> ## 不采用正则表达式的文件全局替换法

```js
/* 复制route.js */
var routeFile = backupPosition + 'Main/js/routes.js'
gulp.task('copyRoutes', function () {
  return gulp.src(routeFile)
    .pipe(gulp.dest(destPosition + 'js'))
})

/* 定义修改route.js */
var readFile = function (file) {

    fs.readFile(file, function (err, data) {
      if ( err )
           console.log("读取文件fail " + err);

      else {
        var str = iconv.decode(data, 'utf8');       // 读取成功时,得到字节数组,并把数组转换为utf-8中文
        var i = 0
        var pos = 0;
        var start;
        var end;

        while (start != 1 && end != -1) {

          start = str.indexOf('../', pos);
          end = str.indexOf('templates', pos);

          if ( start < end ) {                        //需要替换
               var strCut = str.substring(start, end)
               str = str.replace(strCut, '')
               pos = end + 1;
          }

          else if ( start > end) {                    //不用替换
                    i++;
                    pos = start;
          }
        }

        var arr = iconv.encode(str, 'utf8');          //转化成字节数组
        var destPath = destPosition + 'js';           //存储路径

        //需要注意，倘若目标存储路径的目录不存在，需要首先创建该目录
        fs.writeFile( destPath + '/routes.js',        //写入路径
                      arr,                            //字节数组
                      function ( err ) {
                                 if ( err )
                                      Slog("fail " + err)
                                 else Slog("写入route.js成功");
        });
      }
    });
}

/* 执行修改route.js */
gulp.task('transformRoutes', function () {
  readFile(routeFile);
})
```
```js
/* 定义转换index.html*/
function changeIndex() {
  var indexFile = destPosition + 'index.html';
  var indexRawFile = 'indexRaw.html';
  var indexRaw = '';
  fs.readFile(indexRawFile, function (err, data) {
    if ( err )
         Slog("读取文件fail " + err);
    else {
      indexRaw = iconv.decode(data, 'utf8');       // 读取成功时,得到字节数组,并把数组转换为utf-8中文
      fs.readFile(indexFile, function (err, data) {
        if ( err )
             console.log("读取文件fail " + err);

        else {
            var str = iconv.decode(data, 'utf8');       // 读取成功时,得到字节数组,并把数组转换为utf-8中文
            var start = '</title>';
            var end = '</head>'
            var startId = str.indexOf(start) + start.length;
            var endId = str.indexOf(end);
            var strCut = str.substring(startId, endId)
            str = str.replace(strCut, '\n' + indexRaw)
            var arr = iconv.encode(str, 'utf8');
            fs.writeFile(indexFile, arr, function (err) {
              if ( err )
                   Slog("fail" + err);
              else Slog("写入index.html成功");
            });
        }
      })
    }
  })
}

/* 执行转换index.html*/
gulp.task('transformIndex', function () {
  changeIndex();
})
```
```js
/* 定义修改route.js */
var readFile = function (file) {

    fs.readFile(file, function (err, data) {
      if ( err )
           console.log("读取文件fail " + err);
      else {
        var str = iconv.decode(data, 'utf8');       // 读取成功时,得到字节数组,并把数组转换为utf-8中文
        str = str.replace(/\.\.\/.*templates/g,'templates');
        console.log(str);
        var arr = iconv.encode(str, 'utf8');          //转化成字节数组
        var destPath = destPosition + 'js';           //存储路径
        //需要注意，倘若目标存储路径的目录不存在，需要首先创建该目录
        fs.writeFile( destPath + '/routes.js',        //写入路径
                      arr,                            //字节数组
                      function ( err ) {
                                 if ( err )
                                      Slog("fail " + err)
                                 else Slog("写入route.js成功");
        });
      }
    });
}
```

```js
/* 定义转换index.html*/
function changeIndex() {
  var indexFile = destPath + 'index.html';
  var indexRawFile = 'indexRaw.html';
  var indexRaw = '';
  fs.readFile(indexRawFile, function (err, data) {
    if ( err )
         Slog("读取文件fail " + err);
    else {
      indexRaw = iconv.decode(data, 'utf8');       // 读取成功时,得到字节数组,并把数组转换为utf-8中文
      fs.readFile(indexFile, function (err, data) {
        if ( err )
             console.log("读取文件fail " + err);

        else {
            var str = iconv.decode(data, 'utf8');       // 读取成功时,得到字节数组,并把数组转换为utf-8中文
            var start = '</title>';
            var end = '</head>'
            var startId = str.indexOf(start) + start.length;
            var endId = str.indexOf(end);
            var strCut = str.substring(startId, endId)
            str = str.replace(strCut, '\n' + indexRaw)
            var arr = iconv.encode(str, 'utf8');
            fs.writeFile(indexFile, arr, function (err) {
              if ( err )
                   Slog("fail" + err);
              else Slog("写入index.html成功");
            });
        }
      })
    }
  })
}

```


> ## 基础的文件注入
```js
/* 在index.html中加入JS和CSS引用 */
gulp.task('injectAll', function () {
  var sourcesCss = gulp.src([destPosition + 'js/*.js'], {read: false});
  var sourcesJs = gulp.src([destPosition + 'css/*.css'], {read: false});
  gulp.src(destPosition + 'index.html')
    .pipe(inject(sourcesCss))
    .pipe(inject(sourcesJs))
    .pipe(gulp.dest(destPosition))
})

```


> ## 核心执行逻辑
```js


/* Core
 * Step.1 删除 public/dest 中的文件、
 *
 * Step.2 同时执行:
 *        (1) 备份 www 到 public/backup
 *        (2) 压缩 css,存储到 public/dest/css/
 *        (3) 复制 lib,存储到 public/dest/lib/
 *        (4) 复制 html,存储到 public/dest/templates/
 *
 * Step.3 执行控制 index.html 的任务，执行顺序是：
 *        (1) 复制 index.html ，到 public/dest/
 *        (2) 转换 index.html （去除无用的引用，保留lib引用），保存到原位置
 *
 * Step.4 执行控制 js 文件的任务，执行顺序是：
 *        (1) 复制 routes.js , 到 public/dest/js
 *        (2) 转换 routes.js ，保存到原位置
 *        (3) 压缩 js ( 除 routes.js ) ，命名为 M-Work.min.js 保存到 public/dest/js
 *
 * Step.5 执行 js 和 css 注入 , 注入的文件包括：
 *        (1) public/dest/js/routes.js
 *        (2) public/dest/css/M-Work.min.js
 *        (3) public/dest/css/M-Work.min.css
 *
 */
```
> ## 采用正则表达式替换路径

经过长时间的总结，根据最终的项目目录来看，得出以下几点总结：

１.图片路径：全部替换成`img/xxx.png`　
(注意：img后不能有子目录)


    ng-src="{{item.gender == 1? '../img/women_inside.png' : '../img/man_inside.png'}}"
    ../img/a/b/c/d/e.png
    ../img/a/b/c/d.png
    ../img/a.png
    ../a/img/b/c/d.png
    ../a/b/img/c/d.png

正则表达式：　

`\.\.\/([a-zA-Z]|\/)*img([a-zA-Z]|\/)*\/`

新版本：
`\.\.\/([a-zA-Z_/.])*img([a-zA-Z_/.])*\/`    

２.templates路径：全部替换成`templates/xxx.html` (注意：templates后不能有子目录)

```
<div ng-include="'../templates/b.html'"></div>
<div ng-include="'../a/templates/b.html'"></div>
<div ng-include="'../a/templates/b/c.html'"></div>
<div ng-include="'../a/b/templates/b/c/d.html'"></div>
templateUrl: '../a/templates/b.html',
templateUrl: '../a/b/templates/c/d.html',
templateUrl: '../a/b/c/templates/d/e/f.html',
```
正则表达式：　

新版本：
`\.\.\/([a-zA-Z_/.])*templates([a-zA-Z_/.])*\/`
    
    
２.CSS background-image

```js
background-image:url(../../img/Knowledge/eye.png)background-image:url(../../img/Knowledge/eye.png) background-image:url(../../img/Knowledge/eye.png)
background-image:url(../../img/Knowledge/comment.png)
background-image:url(../../img/Knowledge/input.png)
background-image:url(../../img/Knowledge/placeimg.png)
```
`\.\.\/([a-zA-Z_/.])*img([a-zA-Z_/.])*\/` 
    

    

  [1]: http://static.zybuluo.com/a472590061/reyhuzao43u1q3utlspflx44/image_1b0ppmme5ogicber1u1ila1ta0m.png
  [2]: http://static.zybuluo.com/a472590061/9wiuhqpm2h3xbja6hgq5157p/image_1b0pr3rc115d61educpt1paftjom.png
  [3]: http://static.zybuluo.com/a472590061/ahc9u4kkyzgjn7zizc15vv0z/image_1b0pvrk5opbrlhm1qou1688u4d20.png
  [4]: http://static.zybuluo.com/a472590061/07ad9lhn4qdbtgbpn7nhlfml/image_1b1bkdsncsut19sgvu014ko1tn29.png
  [5]: http://static.zybuluo.com/a472590061/9hyqhjd7vfbfensj1kcnjk69/image_1b1bpv1bk19tcsl7oih112ojqa9.png
  [6]: http://static.zybuluo.com/a472590061/7wf6z79qx2kzachrz7fg2g0i/image_1b1bq0ehprmkdg1u0t1kaq1l7d16.png
  [7]: http://static.zybuluo.com/a472590061/02ajaj2z79ngjlye6avsocro/image_1b1bq60et1iuo1e95aj71msvaja1j.png
  [8]: http://static.zybuluo.com/a472590061/oj22uydyyondgmtj8a80stvw/image_1b1bq90044v71t0917e41qu8se520.png
  [9]: http://static.zybuluo.com/a472590061/015j8ipmud6678d34yef2dj1/image_1b1bqldhe1681n931nm719m62iu2d.png