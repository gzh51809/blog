# 由一个案例简单说说 macha 的使用

- 标签： `Unit Test`
- 时间： `2017-3-13`

## 起步

在实际开发过程中，我们通常会书写一些特定的包含逻辑处理的方法，在以往的一些不太规范的开发模式中，为了开发效率，在直观的调试模式下没有出现问题后，我们往往直接将其直接投入生成环境。但是，由于`JS`的灵活性，往往有可能因为某些不可预估的因素而导致出现问题，这些多发生在：

- 1.用了正则表达式，但正则写的不够严谨
- 2.方法的入口没有对`参数类型`做检测
- 3.方法的逻辑处理部分不够严谨

为了实现更健壮更严谨的开发，我们需要引入——`单元测试`。



## 案例

在进行开源项目[`dddml`](https://github.com/wubuku/dddml-dotnet-tools)时，我写了一个名为`CamelCase`的简单类，它具有两个静态方法:

- `test()`方法用来检测一个字符串是否满足`驼峰法`, 
- `translate()`方法用来将 `驼峰法` 的字符串分割成数组。

```js
export default class CamelCase {

    // check the string whether matchs the camelCase or not
    static test(str) {
        // RegExp
        let CAMEL_CASE_TEST = /^[a-z]+([A-Z][a-z]*)+$/
        return CAMEL_CASE_TEST.test(str)
    }

    // translate camelCase string to string[]
    static translate(str) {
        if (!CamelCase.test(str)) {
            throw new Error('给定的字符串不是驼峰法命名')

        } else {
            return str.replace(/([A-Z])/g, "-$1").toLowerCase().split('-');
        }
    }

}
```



## 目录结构

一个合理的 `mocha` 测试项目，目录和文件的命名原则如下：

- 目录：`test`
- 文件：`[fileName].test.js`

对应的目录的组织形式如下：

```markdown
├─src
│  └─CamelCase.js 
├─test      
│  └─CamelCase.test.js 
├─.babelrc
└─package.json

```

!> 由于我们测试的是 `ES6` 代码，我们需要安装 `babel`：

```
$ npm install babel-core babel-preset-es2015 --save-dev
```

`.babelrc`配置文件的内容如下。
```json
{
  "presets": [ "es2015" ]
}
```

## 编写测试脚本

这里编写的脚本属于同步执行脚本：

```js
import chai from 'chai'
import CamelCase from '../src/CamelCase.js'
let expect = chai.expect

let str = 'getElementById'

describe(' 驼峰法测试1 ', function () {
    it(' "getElementById" 是驼峰法 ', function () {
        expect(CamelCase.test(str))
            .to.be.equal(ture)
    })
})
```

## 开始测试

通常来说，我们可以直接在终端中的根目录下输入 `mocha` 完成测试, 但是由于我们采用的是`ES6`代码，因此我们需要指定编译器：

```
$ mocha --compilers js:babel-core/register
```

?>，我们可以将`mocha` 放在 `test` 目录下的 `mocha.opts` 中：

```
--compilers js:babel-core/register
--reporter mochawesome
```

!> 文中的测试，所有的依赖均是安装在全局的！否则需要指定`mocha`或`babel`的路径，例如：`$ ../node_modules/mocha/bin/mocha --compilers js:babel-core/register`

# 附： package.json

```json
{
  "name": "lodash-mocha-test",
  "version": "1.0.0",
  "description": "a project tests lodash with mocha",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "devDependencies": {
    "babel-core": "~6.2.1",
    "babel-preset-es2015": "~6.1.18",
    "chai": "~3.4.1",
    "lodash": "^4.17.4",
    "mocha": "~2.3.4",
    "mochawesome": "^1.2.2"
  },
  "dependencies": {
    "node-fetch": "~1.3.3",
    "superagent": "~1.4.0"
  },
  "author": "toxichl",
  "license": "MIT"
}

```


# 补充：异步测试

由于`mocha`默认每个测试用例最多执行2000毫秒, 因此在进行异步测试时，需要指定`-t`或`--timeout`参数指来说明超时界限：

测试脚本`time.test.js`：

```js
it('测试应该在10秒后结束', function(done) {
  var x = 1;
  var f = function() {
    x = 2;
    expect(x).to.be.equal(2);
    done(); // done钩子用来通知mocha测试结束
  };
  setTimeout(f, 10000);
});
```

设定超时界限略大于异步执行时间：
```
$ mocha -t 11000 time.test.js
```


!> 关于`mocha`的更多技巧，可以参考阮老师的 [测试框架 Mocha 实例教程](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html) 
