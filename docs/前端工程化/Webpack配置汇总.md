# Webpack配置汇总

## 基本配置

```js
module.exports = {
    entry: '',
    output: '',
    module: {
        rules: [
            {
                test: /RegExp/,
                loader: '',
                exclude: '',
                query: {}
            }
        ]
    },
	resolve: {
        extensions: ['.js', '.jsx'],
    }
}
```

### Loader

常用的loader：

	https://github.com/webpack-contrib/style-loader
	https://github.com/webpack-contrib/css-loader
	https://github.com/webpack-contrib/sass-loader
	https://github.com/webpack-contrib/file-loader
	https://github.com/webpack-contrib/url-loader
	
官方loader库：
	
	https://github.com/webpack-contrib
	