# Webpack配置汇总

## Webpack基本配置

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