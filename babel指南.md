# docs

https://babel.docschina.org/docs/en/

# 配置

1. 放到webapck.config.js中

   ```
   let path = require('path')
   module.exports = {
       mode: 'production',
       entry: {
           app: path.resolve('./app.js')
       },
       output: {
           path: path.resolve(__dirname, 'src'),
           filename: '[name].min.js'
       },
       module: {
           rules: [
               {
                   test: /\.js$/,
                   use: {
                       loader: 'babel-loader',
                       options: {
                           presets: [
                               ['@babel/preset-env', {
                                   //告诉哪些编译
                                   targets: {
                                   	//编译成全球浏览器占有市场1%的浏览器都支持，且浏览器的最后2个版本
                                   	//数据来源github上 browserslist
                                   	//https://github.com/browserslist/browserslist
                                       browsers: [
                                           '>1%', 'last 2 versions'
                                       ]
                                   }
                               }]
                           ] 
                       }
                   },
                   exclude: '/node_modules/'
               }
           ]
       }
   }
   ```

   

2. 放到.babelrc中

   1). webpack中不配置options

   2). babelrc中配置

   ```
   				{
                           presets: [
                               ['@babel/preset-env', {
                                   //告诉哪些编译
                                   targets: {
                                   	//编译成全球浏览器占有市场1%的浏览器都支持，且浏览器的最后2个版本
                                   	//数据来源github上 browserslist
                                   	//https://github.com/browserslist/browserslist
                                       browsers: [
                                           '>1%', 'last 2 versions'
                                       ]
                                   }
                               }]
                           ] 
                       }
                   }
   ```



# .babelrc配置

```
{
    presets: [],
    plugins: []
}
```

