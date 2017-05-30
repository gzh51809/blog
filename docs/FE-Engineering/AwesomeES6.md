# ES6零碎知识点记录

## Webpack
       
	"webpack": "^2.0.0",
	"webpack-dev-server": "^2.0.0"
	
## Babel

### 使用babel必装的几个插件:

	"babel-core": "^6.24.0",
	"babel-loader": "^6.4.1",
	"babel-preset-es2015": "^6.24.0",
	"babel-preset-stage-0": "^6.3.13",
    
### React
        
	"babel-preset-react": "^6.3.13",
	
### 	Decorators

Decorators are not officially supported yet in 6.x pending a proposal update.
However, if you need to use them you can install the legacy decorators transform with:

	npm install babel-plugin-transform-decorators-legacy --save-dev

and add the following line to your .babelrc file:
```json
{
  "plugins": ["transform-decorators-legacy"]
}
```
	
## CSS 预处理器

### sass-loader

安装：
	npm install sass-loader node-sass webpack --save-dev

常规配置：

```js
{
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        }
```
	
         

	
	
	
	
    