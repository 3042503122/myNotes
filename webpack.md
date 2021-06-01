# api

[https://webpack.docschina.org/guides/installation/#前提条件](https://webpack.docschina.org/guides/installation/#前提条件)



# 创始人

facebook

# why webpack?

1. vue-cli、 react-starter、 angular-cli 都使用webpack作为构建工具
2. 代码分割
3. 天生的模块化
4. ......

# 文章基于webpack 3.10+

![](E:\self\mahongluRecord\notes\images\webpack_1.png)

# 模块化

## js模块化

**webpack支持 AMD(requirejs) 、 ES6 module(推荐)、 commonjs**



​	

> 命名空间

库名.类别名.方法名

```
var NameSpace = {};
NameSpace.type = NameSpace.type || {};
NameSpace.type.method = function() {};
```



>  commonjs(node端)

​    一个文件为一个模块

​    模块内部的变量、方法是不能直接访问的，通过   module.exports暴露模块接口；

​    通过require引入模块（**同步执行**）

​	

```
var mixin = require('merge-descriptors');
var req = require('./request');

exports = module.exports = {
    
}
```



> AMD|CMD|UMD (浏览器端)

   1. AMD <Async Module Definition>：比较著名的库 Requirejs

      使用define定义模块；使用require加载模块;（和commonjs类似）

      **依赖前置，提前执行**：

      ```
      define(
      	//模块名
      	"alpha",
      	//依赖
      	["require", "exports", "beta"],
      	//模块输出
      	funtion (require, exports, beta) {
              exports.verb = function() {
                  return beta.verb();
                  Create missiong node module: 'beta'
                  return require("beta").verb();
              }
      	}
      )
      ```

        2. CMD <Common Module Definition>：比较著名的库 seajs

       一个文件一个模块

       使用define定义模块，使用require加载模块;

       尽可能懒执行

       ```
       define(function(require, exports, module) {
           //通过require引入模块
           var $ = require('jquery');
           var Spinning = require('./spinning);
           
           //通过exports 对外提供接口
           exports.doSomething = ...
           
           //或者通过 module.exports提供整个接口
           module.exports = ...
       })
       ```

        3. UMD <Universal Module Definition>通用解决方案

      | step1 | 判断是否支持 AMD        |
      | ----- | ----------------------- |
      | step2 | 判断是否支持 Commonjs   |
      | step3 | 如果都没有 使用全局变量 |

       ```
       (function(){
           if (typeof define === 'function' && define.amd) {//判断是否支持 AMD
               deine([], factory);
           } else if (typeof exports === 'Object') {//判断是否支持 Commonjs
               module.exports = factory();
           } else {//如果都没有 使用全局变量
               root.returnExports = factory();
           }
       }(this, function(){
           return {}
       }))
       ```

       

> ES6 module  (浏览器端)

​    一个文件一个模块

​    export / import

​	

```
import theDefault, { named1, named2 } from 'src/mylib';
import theDefault from 'src/mylib';
import { named1, named2 } from 'src/mylib';

import { named1 as name_1, named2 } from 'src/mylib';

import * as mylib from 'src/mylib';

//只引入进来，不用里面暴露的任何接口
import 'src/mylib';
```



```
export var myVar1 = '

export function myFn() {}

export function* myFn() {}

export Class MyClass {}

export default 123;

export default function(x) {
    return x
}

export default class {
    
}

export {foo, bar}
```





## css模块化

oocss 、SMACSS  、Atomic CSS(原子css)、  MCSS、  AMCSS、  BEM、  css modules

> oocss 

​    设计和结构分离，内容和容器分离

> BEM <block element modifier>

​	

   1. block 

      header container menu checkbox input

   2. element

      menu item

      list item

      checkbox caption

   3. Modifier修饰

      disabled 

      highlighted

      checked

      fixed

      size big

      color yellow







# webpack核心概述

## entry

> <entry > 代码的入口、打包的入口、单个或多个入口

​     **入口起点(entry point)**指示 webpack 应该使用哪个模块，来作为构建其内部*依赖图*的开始

​     默认：./src/index.js

```
moudle.exports = {
	//文件名或者路径
    entry: 'index.js'
}

moudle.exports = {
	//文件名或者路径--数组
    entry: ['index.js', 'vendor.js']
}

//推荐
moudle.exports = {
	//文件名或者路径--map
    entry: {
        index: 'index.js'
    }
}

//推荐
moudle.exports = {
	//文件名或者路径--map
    entry: {
        index: ['index.js', 'app.js'],
        vendor: 'vendor.js'
    }
}
```



## output

> <output  >

​     告诉 webpack 在哪里输出它所创建的 *bundles*

​     默认： 主输出文件默认为 `./dist/main.js`，其他生成文件的默认输出目录是 `./dist`



```
//我们通过 output.filename 和 output.path 属性，来告诉 webpack bundle 的名称，以及我们想要 bundle 生成(emit)到哪

module.exports = {
  entry: 'index.js',
  output: {
    //name: 上面entry的name
    //hash: 
    filename: '[name].min.[hash:5].js'
  }
};
```





## loaders

> <loaders > 处理文件，将文件转化成js可以认识的模块

单个loader： 写法1----字符串

```
//js中运行css是匪夷所思的，通过webpack中的css-loader将css变成js的模块，可以在js中直接引入进来
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: 'css-loader'
            }
        ]
    }
}
```



单个loader： 写法2 ----对象

```
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: {
                    loader: 'css-loader'
                }
            }
        ]
    }
}
```



单个loader： 写法3----数组

```
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    }
}
```

单个loader： 写法4

```
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ‘!style-loader!css-loader!sass-loader’
            }
        ]
    }
}
```





**常用loader:**

1. 编译相关：babel-loader、ts-loader
2. 样式相关： style-loader、css-loader、less-loader、postcss-loader
3. 文件相关： file-loader、url-loader



## plugins

> <plugins >参与打包整个过程，打包优化和压缩，配置编译时的变量

```
const webpack = require('webpack');
module.exports = {
    plugins: [
        new webpack.optimize.uglifyJsPlugin()
    ]
}
```

**常用plugins**

1. 优化相关：commonChunkPlugin、uglifyjsWebpackPlugin
2. 功能相关：ExtractTextWebpackPlugin、htmlWebpackPlugin、hotModuleReplacementPlugin、copyWebpackPlugin



## resolve

教webpack怎么去查询文件

### alias

```
// 使用时 import Element from "@/"的前提
// webpack.config.js
resolve: {
  alias: {
     '@': path.resolve(__dirname, '../src')
  }
}

```



## devtool

> <devtool>

否生成、以及如何生成 source map

> <source map>

由于线上代码被打包压缩了，线上有问题调试时，如何知道改源代码的哪行。



## devServer

开启服务，本地静态文件不再使用files://协议，而是使用http

```
//webpack.config.js
module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
 }
```

https://webpack.docschina.org/configuration/dev-server/

https://webpack.docschina.org/guides/development/#使用-webpack-dev-server

安装webpack-dev-server



## 常用名称

> <chunk >代码块

> <bundle >被打包之后的

> <module >模块



# 安装webapck

## 本地

```
npm install webpack webpack-cli --save-dev
```

## 全局安装

```
npm install -g webapck
```



# 使用webpack

```
//查看webpack命令 
webpack -h

//webpack安装版本
webpack -v
```



## webpack命令

1. 打包

   webpack <entry> [<entry>] <output>

   ```
   //将app.js打包成 bundle.js
   //-o
   //--mode production
   webpack app.js -o app.bundle.js --mode production
   ```

   



## webpack配置

//将app.js打包成 bundle.min.js

//指定webpack配置文件，默认为webpack.config.js

webpack --config webpack.conf.dev.js

webpack.conf.js是commonjs规范

```
module.exports = {
    entry: {
        app: 'app.js'
    },
    output: {
    	//path: './dist', 没有path默认是'dist'
        filename: '[name].min.js'
    }
}
```



## 第三方脚手架

第三方脚手架默认用webpack

vue-cli、angular-cli、react-starter





# 2开发环境

> 为什么要搭建本地开发环境？

要打包的文件内容发生了变化，webpack自动重新打包并自动刷新浏览器

> 通过webpack调试本地有3种方式

1. webpack watch mode
2. webpack-dev-server
3. express + webpack-dev-middleware

## webpack watch mode

> 本地起一个服务

```
webpack -watch
|| 简写
webpack -w
```



> **不希望每次打包都要先手动删dist文件夹，再重新打包**



[api]: https://github.com/johnagan/clean-webpack-plugin

```
npm install clean-webpack-plugin --save
```

```
//webpack.config.js
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'none',

    entry: {
        app: './src/js/index.js'
    },

    output: {
        filename: '[name].bundle.js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',//默认为此，也可以带路径'html/index.html'
            template: './src/index.html',
            chunks: ['app'],
            minify: {//生成index.html压缩无空格
                collapseWhitespace: true
            }
        }),

        new CleanWebpackPlugin()
    ]
}	
```



> 打包

```
webpack -w --progress --display-reasons --color
```

上述命令后：只要要内容发生更改 ，例如改变 index.js里的内容 ，可以看gitbash就会又新打包





## webpack-dev-server ???

<webpack-dev-server>webpack官方提供的开发服务器

> 功能

1. <live reloading>帮助重新刷新浏览器
2. 打包文件？no
3. <路径重定向>
4. 支持https
5. 浏览器中显示编译错误
6. 接口代理
7. 模块热更新：不在刷新浏览器更新代码

| inline             | Boolean | true | 是否使用inline模式                                           |
| ------------------ | ------- | ---- | ------------------------------------------------------------ |
| contentBase        |         |      | 提供内容的路径                                               |
| port               |         |      | 告诉webpack监听本地localhost哪个端口                         |
| historyApiFallback |         |      |                                                              |
| https              |         |      |                                                              |
| proxy              |         |      |                                                              |
| hot                |         |      | 通过true, webpack模块支持热更新                              |
| openpage           |         |      | 指定webpack-dev-server最先打开的是哪个页面                   |
| lazy               |         |      | 只访问某些资源时候才编译打包                                 |
| overlay            |         |      | 遮罩，webpack-dev-server提供的错误提示，浏览器中就能提示打包报错 |

https://www.cnblogs.com/yupinghua/p/6308515.html



# 项目中常用配置

## src别名@

```
// 使用时 import Element from "@/"的前提
// webpack.config.js
module.exports = {

resolve: {
  alias: {
     '@': path.resolve(__dirname, '../src')
  }
}

}

```

## 全局常量

[官网](https://webpack.js.org/plugins/define-plugin/)

将`DefinePlugin`允许您创建可在配置全局常量**的编译**时间

```
// webpack.config.js
module.exports = {
  plugins: [
            new webpack.DefinePlugin({
                SWMDIRECTORYNAME: JSON.stringify(swmDirectoryName),
                ENVIRONMENT: JSON.stringify(argv.mode),
                MODE: JSON.stringify({
                  'production': 'prod',// 线上
                  'development': 'dev', // 本地
                  'none': 'dev', // 预发
                }[argv.mode])
            })
        ],
  }
```

## 每次build先删除dist！！！

```
module.exports = {

plugins: [
            new CleanWebpackPlugin('dist')
]

}
```

## publicPath

打包后index.html静态资源js、 css、图片使用绝对路径引入

```
module.exports = {
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].[hash].js',
        publicPath = `https://storage.360buyimg.com/swm-stable/${swmDirectoryName}/`
    }
}
```



# 4.1编译es6|7

------

**npm install --save-dev babel-loader**

**npm install --save babel-polyfill**

**区别**

注意 `--save` 选项而不是 `--save-dev`，因为这是一个需要在源代码之前运行的 polyfill。

------



1. 安装babel-loader 、最新的babel-core 、 babel-preset-env（语法）、babel-polyfill(env里的函数和方法)

   ```
   npm install --save-dev babel-loader @babel/core @babel/preset-env babel-plugin-transform-runtime babel-runtime
   
   npm install babel-polyfill
   ```

   > babel-preset-env:(es正式发布的所有汇总) 包括es2015 - es2017 、 latest这些。

   babel-preset-stage 0 -3：es还未正式发布的

   npm install @babel/preset-env 安装最新版 babel-preset-env

   npm install babel-preset-env 安装普通版本env

   > babel-polyfill（env里无法解析的函数和方法）

   <babel-polyfill>: 全局垫片，为应用准备的而非框架,  转换新增加的东西

   Generator

   Set

   Map

   Array.from

   Array.prototype.includes

   ```
   npm install babel-polyfill
   ```

   

   > babel-Runtime Transform 

   <babel-Runtime Transform >:局部垫片，为框架准备的

   ```
   npm install babel-plugin-transform-runtime
   npm install babel-runtime
   ```

   

2. 配置webpack.conf.js

   <use>:   1个---可以是字符串  多个---对象

   <target>: 1个 --- targets: {chrome: '52'}       多个---下例

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

   

3. 配置webpack.conf.js的babel-runtime

   配置webpack.conf.js

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
                   },
                   exclude: '/node_modules/'
               }
           ]
       }
   }
   ```

   新建.babelrc文件

   ```
   {
       "presets": [
           ["@babel/preset-env", {
               "targets": {
                   "browsers": [
                       ">1%', 'last 2"
                   ]
               }
           }]
       ],
       "plugins": ["transform-runtime]
   }
   ```

   



# 4.2编译Typescript

<Typescript>: js的超集。来源于微软

​			    官网中文：https://www.tslang.cn/

​			    官网英文：http://www.typescriptlang.org/

## step1安装

<typescript-loader>

1. 创始版

```
npm install ts-loader
```

2. 优化版（其他人），使用起来一样

```
npm install typescript awesome-typescript-loader 
```



可以两个都安装上

```
npm install ts-loader typescript awesome-typescript-loader 
```



## step2配置webpack.config.js

```
module.exports = {
    mode: 'none',
    entry: {
        'app': './src/app.ts'
    },
    output: {
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader'
                }
            }
        ]
    }
}
```



## step3配置tsconfig.json

根目录下必须新建这个文件

配置选项： https://www.tslang.cn/docs/handbook/tsconfig-json.html

​		    https://www.tslang.cn/docs/handbook/compiler-options.html

```
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "allowJs": true
    },
     "include": ["./src/*"],
     "exclude": ["./node_modules/"]
}
```



## step4有些时候需要安装例如loadsh,在app.ts中

```
npm install loadash
```



## step5声明文件

```
npm install @types/loadash
```



# 4.3-4.5处理css

1. 引入css

   <style-loader> style标签 帮助我们需要载入的页面中创建一个style标签，标签里面的内容就是我们css 中的内容

   <style-loader/useable> import 的css是否使用

   <css-loader> 既然已经有了style-loader为啥还需要style-loader, 如何让js中 import一个css，

   

2. css modules

3. 配置less / sass

4. 提取css 代码



## step1

```
npm init --force
npm install css-loader style-loader --save-dev
```



## step2

![](E:\self\mahongluRecord\notes\images\webpack_5.png)



1. app.js

   ```
   import 'base.css'
   ```

2. base.css

   ```
   html{
       background-color: #f00;
   }
   ```

3. index.html

   ```
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <meta http-equiv="X-UA-Compatible" content="ie=edge">
       <title>Document</title>
   </head>
   <body>
       <script src="./dist/app.bundle.js"></script>
   </body>
   </html>
   ```

   

## step3

webpack.config.js

**use顺序数组从后到前，所以先css-loader(先处理完js中的import css)再style-loader(再把css放到页面上)**

```
var path = require('path');

module.exports = {
    entry: {
        app: './src/app.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    }
}
```



## 现象

浏览器打开index.html，F12 会发现app.js中引入的样式以style标签形式





------

## css-loader/useable

step1: 基于上面新建base_1.css

```
html{
    background: #0f0;
}
```

step2: app.js

```
import base from './css/base.css';
import base_1 from './css/base_1.css';

base.use();
base_1.unuse();

setTimeout(function(){
    base.unuse();
    base_1.use();
}, 3000);
```

step3: webpack.config.js

```
var path = require('path');

module.exports = {
    mode: 'none',

    entry: {
        app: './src/app.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader/useable'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    }
}
```

## 现象

一开始引入的base.css样式，过了3s后切换成base_1.css样式



## webpack中style-loader配置options 

[options]: https://webpack.docschina.org/loaders/style-loader/#选项

## webpack中css-loader配置options 

[options]: https://webpack.docschina.org/loaders/css-loader/

> options

1. minimize: true 是否压缩css(压缩后无空格，属性不会折行，一个样式一行)



> css模块化

1. :local
2. :global
3. compose
4. compose ...from path 从...继承 css样式



# 4.3-4.5提取css???

## 背景

把js中所有import的css都整合打包到一个css文件里面



## 常用方法

### 方法1：extract-loader

1. step1

   ```
   npm init -f
   ```

   

   ```
   npm install webpack webpack-cli extract-loader --save-dev
   ```

2. step2配置webpack.config.js

   ```
   
   ```

   

### 方法2：ExtractTextWebpackPlugin



# 4.3编译less | sass

```
npm install less-loader less --save-dev
npm install sass-loader node-sass --save-dev
```

```
// webpack.config.js
module.exports = {
    ...
    module: {
        rules: [{
            
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader/useable'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            
        },{
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        }]
    }
};
```





# 4.4postcss

## 背景

<postcss>转化css的工具，基于postcss的生态还有一下插件（下主流插件）

## 主流插件

<autoprefixer>加前缀

<css-nano>压缩(css-loader内部其实也是用css-nano压缩的)

<postcss-cssnext>可以现在使用css未来的语法

​			新语法：css 变量 、自定义选择器、calc()动态计算

## 安装

1. step1

   ```
   npm init -f
   ```

   ```
   npm install css-loader style-loader --save-dev
   ```

   ```
   npm install postcss postcss-loader autoprefixer cssnano postcss-cssnext --save-dev
   ```

2. step2 

   同4.3-4.5处理css的step2

3. step3

   **postcss和基于postcss的插件的loader都放到 ：css预处理（less|sass）和  css处理(css-loader|style-loader)之间 **

   ```
   //webpack.config.js
   var path = require('path');
   
   module.exports = {
       mode: 'none',
   
       entry: {
           app: './src/app.js'
       },
   
       output: {
           path: path.resolve(__dirname, 'dist'),
           filename: '[name].bundle.js'
       },
   
       module: {
           rules: [
               {
                   test: /\.css$/,
                   use: [
                       {
                           loader: 'style-loader'
                       },
                       {
                           loader: 'css-loader'
                       },
                       {
                           loader: 'postcss-loader',
                           options: {
                               ident:'postcss',
                               plugins: [
                                   //require('autoprefixer')(),
                                   //postcss-cssnext中包括autoprefixer
                                   require('postcss-cssnext')()
                               ]
                           }
                       }
                   ]
               }
           ]
       }
   }
   ```

4. step4 编译打包

   ```
   webpack
   ```

   

## 效果

```
//base_1
html{
    background: #0f0;
}
.box{
    width: 200px;
    height: 200px;
    background-color: pink;
    border-radius: 10px;
    transition: transform 1s;//会被autoprefixer加前缀
}

//新语法：变量
:root{
    --mainColor: red;
}
//新语法：变量
a{
    color: var(--mainColor);
}
```

会被解析成

```
html{
    background: #0f0;
}
.box{
    width: 200px;
    height: 200px;
    background-color: pink;
    border-radius: 10px;
    transition: -webkit-transform 1s;
    -webkit-transition: -webkit-transform 1s;
    transition: transform 1s;
    transition: transform 1s, -webkit-transform 1s;
}
a{
    color: red;
}
```



## 延伸

我们一旦涉及到浏览器兼容性问题时，就一定会有一个针对性即我们要指定浏览器列表、或者大于>1%， 我们用到browerslist，autoprefixer、postcss-cssnext都是用到browserlist。有没有什么办法让所有插件都使用bowserlist都用的是统一的一个？有，请看下

1. 方法1：package.json

   ```
   //package.json
   {
     "name": "4.4",
     "version": "1.0.0",
     "description": "",
     "main": "index.js",
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1"
     },
     "keywords": [],
     "author": "",
     "license": "ISC",
     "devDependencies": {
       "autoprefixer": "^9.4.8",
       "css-loader": "^2.1.0",
       "cssnano": "^4.1.10",
       "postcss": "^7.0.14",
       "postcss-cssnext": "^3.1.0",
       "postcss-loader": "^3.0.0",
       "style-loader": "^0.23.1"
     },
     "browserslist": [">=1%", "last 2 versions"]
   }
   ```

   

2. 方法2：.browserlistrc



# 4.6 自动生成html模板文件

## html需要的js、css自动引入	

### 背景

通常我们在webpack打包出来的文件名，如果不配置死就是不固定的 有可能hash+其他组成文件名。有没有什么办法打包后，html需要的js、css自动引入



### 插件

<HtmlWebpackPlugin>https://webpack.docschina.org/plugins/html-webpack-plugin/#src/components/Sidebar/Sidebar.jsx

options: https://github.com/jantimon/html-webpack-plugin#options

| Name     | Type                | Default                                             | Description                                                  |
| -------- | ------------------- | --------------------------------------------------- | ------------------------------------------------------------ |
| template | {String}            | ``                                                  | 模板文件                                                     |
| filename |                     |                                                     |                                                              |
| minify   | {Boolean \| Object} | 如果webpack mode 是production,则为true；否则为false | 是否被压缩                                                   |
| chunks   |                     |                                                     | 指定哪几个entry chunek是你要加到html中来的；比如说你是一个多页面应用 A页面、B页面给这两都生成html, 生成B页面时就不用插入生成A页面相关的chunk代码。可以通过此配置公共chunk |
| inject   | {Boolean \|Object}  | true                                                | 是不是让htmlWebpackPlugin把你html手动引入的js<script>、css<link>以标签的形式插入html 中；配置成false 后手动引入的在打包后的html文件中将被删除 |

### 安装配置

1. step1

   ```
   npm init -f
   npm install html-webpack-plugin --save-dev
   ```

2. step2

   ```
   //app.js
   function sum (a, b) {
       return a+b;
   }
   
   console.log(sum(2,3));
   ```

   ```
   //index.html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <meta http-equiv="X-UA-Compatible" content="ie=edge">
       <title>Document</title>
   </head>
   <body>
       你好
   </body>
   </html>
   ```

   ```
   //webpack.config.js
   //webpack.config.js
   var path = require('path');
   var HtmlWebpackPlugin = require('html-webpack-plugin');
   
   module.exports = {
       mode: 'none',
   
       entry: {
           app: './src/app.js'
       },
   
       output: {
           filename: '[name].bundle.js'
       },
   
       plugins: [
           new HtmlWebpackPlugin({
               filename: 'index.html',//默认为此，也可以带路径'html/index.html'
               template: './index.html',
               chunks: ['app']，
               minify: {//生成index.html压缩无空格
                   collapseWhitespace: true
               }
           })
       ]
   }
   ```

### 打包结果（成功）

![](E:\self\mahongluRecord\notes\images\webpack_15.png)

浏览器打开：dist/index.html

![](E:\self\mahongluRecord\notes\images\webpack_16.png)



### 报错

https://blog.csdn.net/zhjm07054115/article/details/78934797

![](E:\self\mahongluRecord\notes\images\webpack_14.png)

解决办法：

```
npm link webpack
//重新打包
webpack
```



## html需要引入的图片自动引入

### loaders

<html-loader>

| attrs: | Array |      |      |
| ------ | ----- | ---- | ---- |
|        |       |      |      |
|        |       |      |      |
|        |       |      |      |





# 4.7-4.8图片处理

## 场景

1. css中引入的图片
2. 自动合成雪碧图
3. 压缩图片
4. Base64（小图片）

## loaders

<file-loader>处理css中引入的图片, **即必须先安装css-loader、style-loader处理css， 只处理的css引入的，非引入的图片不处理**

<url-loader>将css中引入小图片转成base64，**url-loader里面具有了file-loader功能，即webpack中加url-loader不需再加file-loader**

<img-loader>将 css中引入图片压缩	

<postcss-sprites>将css引入图片合成雪碧图，**即必须安装postcss-loader**；**(设计师经常为了兼容苹果手机的高清屏，会做@2的图, 通常图都是2倍图 如何用雪碧图+background-position--—-：**

**step1-webpack.config.js中配置retina: true;  **

**step2-图片命名都是  图片名@2x.png)**



## 安装配置

1. step1

   ```
   npm init --force
   ```

   ```
   npm install css-loader style-loader --save-dev
   npm install postcss postcss-loader --save-dev //postcss-sprites 雪碧图
   npm install file-loader url-loader img-loader postcss-sprites --save-dev
   ```

   

2. step2

   ![](E:\self\mahongluRecord\notes\images\webpack_9.png)



​       

```
//global.css
.main{
    width: 200px;
    height: 200px;
}

.icon_1{display:inline-block;width:30px;height:30px;background: url(../images/i_msg.png) center no-repeat;}
.icon_2{display:inline-block;width:30px;height:30px;background: url(../images/i_msg_active.png) center no-repeat;}

.bg_1{width: 200px; height: 100px;background: url(../images/recommend1.png) center no-repeat;}
.bg_2{width: 200px; height: 100px;background: url(../images/recommend2.png) center no-repeat;}
```

```
//app.js
import './css/global.css'
```

```
//index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <!-- <link rel="stylesheet" href="./src/css/global.css"> -->
    <script src="./dist/index.bundle.js"></script>

</head>
<body>
    <img class="main" src="./src/images/main.png" alt="" srcset="">
    <img src="./src/images/product.png" alt="" srcset="">
    <div class="bg_1"></div>
    <div class="bg_2"></div>

    <img src="./src/images/i_commission.png" alt="" srcset="">
    <img src="./src/images/i_coupon.png" alt="" srcset="">
    <span class="icon_1"></span>
    <span class="icon_2"></span>
</body>
</html>
```



3. step3配置

   ```
   module.exports = {
       mode: 'none',
       entry: {
           index: './src/app.js'
       },
       output: {
           filename: '[name].bundle.js'
       },
       module: {
           rules: [
               {
                   test: /\.(png|jpg)$/,
                   use: [
                       // {
                       //     loader: 'file-loader',
                       //     options: {
                       //         name: '[name].[ext]',
                       //         outputPath: 'images/'
                       //     }
                       // },
                       {//里面具有file-loader功能，虽然官方文档上没有publicPath但 file-loader的options都能用
                           loader: 'url-loader',
                           options: {
                             publicPath: '',
                             outputPath: '/images/',
                             useRelativePath: true,
                             name: '[name].[ext]',
                             limit: 1000
                           }
                       },
                       {//图片压缩 ???
                           loader: 'img-loader',
                           options: {
                               pngquant: {
                                   quality: 50
                               }
                           }
                       }
                   ]
               },
               {
                   test: /\.css$/,
                   use: [
                       {
                           loader: 'style-loader',
                       },
                       {
                           loader: 'css-loader',
                       },
                       {
                           loader: 'postcss-loader',
                           options: {
                               ident:'postcss',
                               plugins: [
                                   require('postcss-sprites')({
                                       retina: true
                                   })
                               ]
                           }
                       }
                   ]
               }
           ]
       }
   }
   ```






# 4.11处理字体文件

和处理图片文件相似

## loaders

<file-loader>

<url-loader>

## 安装

1. step1

   ```
   npm init --force
   npm init style-loader css-loader --save-dev
   npm file-loader url-loader --save-dev
   ```

2. step2

   iconfont 下载字体图标，然后引入项目

3. step3

   ```
   //webpack.config.js
   module.exports = {
       mode: 'none',
   
       entry: {
           app: './src/app.js'
       },
   
       output: {
           filename: '[name].bundle.js'
       },
   
       module: {
           rules: [
               {
                   test: /\.css$/,
                   use: [
                       'style-loader',
                       'css-loader'
                   ]
               },
               {
                   test: /\.(eot|svg|ttf|woff|woff2)$/,
                   use: [{
                       loader:'url-loader'
                   }]
               }
           ]
       }
   }
   
   ```

   ```
   webpack
   ```

## 打包结果

![](E:\self\mahongluRecord\notes\images\webpack_10.png)

![](E:\self\mahongluRecord\notes\images\webpack_11.png)





# 4.12第三方js库

## 场景

1. 第三方库在cdn上 我们引入

2. 在本地包里；比如是一个和通用的库例如jquery.js 每一个模块都用到了它，但是我们又不希望每次都import它，那我们应该怎么处理 ? 

   1)方法1： webpack.providePlugin

   2) 方法2：imports-loader

   3) window

## 场景2的方法1为例

1.  step1

   ```
   npm init --force
   npm install jquery --save
   ```

2. step2

   ![](E:\self\mahongluRecord\notes\images\webpack_12.png)

```
//index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="./dist/app.bundle.js"></script>
</head>
<body>
    
</body>
</html>
```



```
//4.12\src\app.js
$(function(){
    $('body').addClass('newCls')
})
```

```
//webpack.config.js
var webpack = require('webpack');

module.exports = {
    mode: 'none',

    entry: {
        app: './src/app.js'
    },

    output: {
        filename: '[name].bundle.js'
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery'//'jquery'模块名
        })
    ]
}
```

3. step3

   打包后结果

   ```
   webpack
   ```

   ![](E:\self\mahongluRecord\notes\images\webpack_12.png)

![](E:\self\mahongluRecord\notes\images\webpack_13.png)

------

如果jquery不是模块安装，而是本地util文件夹下jquery.js怎么配置？

<resolve>https://webpack.docschina.org/configuration/resolve/#resolve

```
npm uninstall jquery
```

```
//webpack.config.js
var webpack = require('webpack');
var path = require('path');

module.exports = {
    mode: 'none',

    entry: {
        app: './src/app.js'
    },

    output: {
        filename: '[name].bundle.js'
    },

	resolve: {
        alias: {
            jquery$: path.resolve(__dirname, 'src/util/jquery.js')
        }
	},

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery'//'jquery'模块名
        })
    ]
}
```



## 场景2的方法2为例???

1. step1

   ```
   npm init -f
   npm install imports-loader
   ```

2. step2

   目录文件内容同上

   ```
   //webpack.config.js
   //webpack.config.js
   var path = require('path');
   
   module.exports = {
       mode: 'none',
   
       entry: {
           app: './src/app.js'
       },
   
       output: {
           filename: '[name].bundle.js'
       },
   
       module: {
           rules: [
               {
                   test: path.resolve(__dirname, 'src/app.js'),//明确指出针对哪个模块
                   use: [
                       {
                           loader: 'imports-loader',
                           options: {
                               $: 'jquery'//webpack会究竟是从node_modules找到jquery模块 还是从其他地方找
                           }
                       }
                   ]
               }
           ]
       }
   }
   ```

   





# 5.1代码分割 和 懒加载???

## 背景

让用户尽可能短时间内看到想看的，用户只浏览了1个页面，没有必要代码包所有的都加载

## 提醒

代码分割 和 懒加载 虽然是webpack 的功能，但是并不是配置在webpack.config.js中，通过改变我们写代码

方法：webpackm methods中的require.ensure、 ES2015 Loader spec

< require.ensure> 被 import() 取代 https://webpack.docschina.org/api/module-methods/#import-

import() ->返回的是Promise -> import().then()

## 场景

1. 分离业务代码 和 第三方依赖
2. 分离业务代码 和 业务公共代码 和 第三方依赖
3. （优化访问速度）分离首次加载 和 访问后加载的代码





# 5.2打包公共代码（提取公共代码）???

## why提取公共代码？

1. 减少代码冗余

2. 提高加载速度

   例如：A中包含C，B中也包含C。不提取 ：A时下载了C，B时也下载了C。提取：A时下载了C，B时发现C已经下载



## 插件 CommonChunkPlugin

<CommonChunkPlugin> webpack的optimize下内置的插件，所以不需安装 只需配置

配置：

```
{
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(options)
    ]
}
```

options: https://webpack.docschina.org/plugins/commons-chunk-plugin/

```
options.name(String chunk的名称) 或者 options.names(Array 一系列chunk的名称)
options.filename: String 公用代码打包后的文件名
options.minChunks：Number(提取的公共chunk出现的次数) | Function | 特殊符号
options.chunks: 公用代码提取的范围(在哪些文件中提取)
options.children: 是不是在entry的文件中查找公共的代码
options.deepChildren:
options.async:
```



## 应用场景

1. 单页应用
2. 单页应用 + 第三方依赖
3. 单页应用 + 第三方依赖 +   webpack生成代码



## step1 

```
npm init --f
npm install webpack --save-dev//本地安装,本地安装Vs全局安装区别（全局安装是工具，本地安装可以require）
```





## step2



------

**注意：理解path.resolve(__dirname, './dist')**

​          console.log(path.resolve(__dirname, './dist'));

​	  E:\self\webpackproject\5.2\dist

​	  可以运行 node __dirname.js	

```
//dirname.js
var path = require('path');

console.log('-----------' );
console.log(__dirname + './dist');
console.log('-----------' );
console.log(path.resolve(__dirname, './dist'));
```

```
//运行
node _dirname.js
```

------





新建

![](E:\self\mahongluRecord\notes\images\webpack_3.png)

1. pageA.js

   ```
   import './subPageA'
   export default 'pageA';
   ```

   

2. subPageA.js

   ```
   import './moduleA';
   export default 'subPageA';
   ```

3. subPageB.js

   ```
   import './moduleA';
   export default 'subPageB';
   ```

   

4. moduleA.js

   ```
   export default 'moduleA'
   ```

   

## step3

配合webpack.config.js

```
var webpack = require('webpack');
var path = require('path');


module.exports = {
    entry: {
        'pageA': './src/pageA'
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2
            
        })
    ]
}
```

```
//命令
webapck
```

报错：https://blog.csdn.net/github_36487770/article/details/80228147

![](E:\self\mahongluRecord\notes\images\webpack_4.png)

原因：原来是原来的插件不能用了，这个中文指南，标的是webpack4.7.0，结果这块都没更新啊。。。于是[必应](https://www.baidu.com/s?wd=%E5%BF%85%E5%BA%94&tn=24004469_oem_dg&rsv_dl=gh_pl_sl_csd)搜了一下，第一个出来的是这个



修复后

```
var webpack = require('webpack');
var path = require('path');


module.exports = {
    mode: 'none',

    entry: {
        'pageA': './src/pageA'
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },

    plugins: [],

    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "common",
                    filename: "common",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    }

}
```







## 始终无法生成common.bundle.js无从验证配置是否成功





# 5.3 Tree-shaking

<Tree-shaking>树上的枯叶摇下来，一般分2种：JS Tree Shaking、CSS Tree Shaking

## 场景

1. 常规优化
2. 引入第三方库的某一个功能（我们只用了一个库中的1-2个方法，用户加载页面时却下载的是整个）

## JS Tree Shaking

~~webpack从2版本以后已经在打包的过程中帮我们把废弃的代码标识出来，通过这些标识，webpack就可以识别这段代码，然后借助插件webpack.optimize.uglifyJs的帮助 把废弃代码移除掉~~

webpack4开始 通过webpack.config.js中的 mode：production|development 中自带Tree shaking

### step1

![]()

![webpack_6](E:\self\mahongluRecord\notes\images\webpack_6.png)

```
//util.js
export function a() {
    return 'this is a'
}
export function b() {
    return 'this is a'
}
export function c() {
    return 'this is a'
}
```

```
//app.js
import './css/base.css';
import  {a} from './common/util';
console.log(a())
```

### step2 

```
//webpack.config.js
var path = require('path');

module.exports = {
    mode: 'none',

    entry: {
        app: './src/app.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    }
}
```

### step3

```
webpack
```



------

以上均未使用tree shaking，app.js只使用了util.js中的a()，而b() c()属于废弃代码

打包压缩后的dist/app.bundle.js中 存在废弃代码

![](E:\self\mahongluRecord\notes\images\webpack_7.png)

------



### step4

```
//webpack.config.js
var path = require('path');

module.exports = {
    mode: 'production',//或者development 在webapck4 自动带了Tree-shaking
}
```

在app.bundle.js中查找this is只有 1 处 this is a; 废弃代码已经删除





## css Tree Shaking???

### step1

```
//base.css
html{
    background: pink;
}
.box{
   width: 100px;
   height: 100px;
}
```

### step2

```
//glob-all：处理多路径，purifycss-webpack：css tree shaking
npm install purifycss-webpack：
```

### step3

```
//webpack.config.js

```







# 6.1打包结果分析

<Offical Analyse Tool>官方提供的gitbash里面的打包信息分析

<webpack-bundle-analyzer>

## offical Analyse Tool

### step1:生成打包信息json

```
webpack --profile --json > stats.json
```

### step2: 打包信息json上传官方网站

https://webpack.github.io/analyse/

查看可视化的打包分析和优化建议



## webpack-bundle-analyzer

### step1: npm安装

```
npm install webpack-bundle-analyzer --save-dev
```

```
//webpack.config.js
let BundelAnalyzerPlugin = require('webpack-bundle-analyzer').BundelAnalyzerPlugin()
```





# 实践

## 压缩js

<uglifyjs-webpack-plugin>https://webpack.docschina.org/plugins/uglifyjs-webpack-plugin/#src/components/Sidebar/Sidebar.jsx