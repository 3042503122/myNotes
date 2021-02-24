#  yarn

[api](https://yarnpkg.com/en/docs/cli/create)

[参考](https://www.jianshu.com/p/35008b80f698)

- `npm install` === `yarn` —— install安装是默认行为
- `npm install taco --save` === `yarn add taco` —— taco包立即被保存到 `package.json` 中。
- `npm uninstall taco --save` === `yarn remove taco`
- `npm install taco --save-dev` === `yarn add taco --dev`
  - `npm update --save` === `yarn upgrade`

\-

- `npm install taco@latest --save` === `yarn add taco`
- `npm install taco --global` === `yarn global add taco` —— 一如既往，请谨慎使用 global 标记。

> 注意：使用yarn或yarn install安装全部依赖时是根据package.json里的”dependencies”字段来决定的

\-

- `npm init` === `yarn init`
- `npm init --yes/-y` === `yarn init --yes/-y`
- `npm link` === `yarn link`
- `npm outdated` === `yarn outdated`
- `npm publish` === `yarn publish`
- `npm run` === `yarn run`
- `npm cache clean` === `yarn cache clean`
- `npm login` === `yarn login`
- `npm test` === `yarn test`

## Yarn 独有的命令

- `yarn licenses ls` —— 允许你检查依赖的许可信息
- `yarn licenses generate` —— 自动创建依赖免责声明 license
- `yarn why taco` —— 检查为什么会安装 taco，详细列出依赖它的其他包
- `yarn why vuepress` —— 检查为什么会安装 vuepress，详细列出依赖它的其他包

# npm install

[dependencies 和 devDependencies区别](https://blog.csdn.net/csdn_yudong/article/details/83721870)

# package.json里scripts

```
"scripts": {
  "test": "tap test/*.js"
}

// 可以替换下，也就是说本地 node_modules .bin文件夹下有相应的
// node_modules/.bin/tap 是哪来的？当 tap 源码配置了 bin 定义时，就会被安装的时候，自动软链了过去。
"scripts": {
  "test": "node_modules/.bin/tap test/*.js"
}

//  tap 源码
{
 "name": "tap",
 "bin": {
   "tap": "./bin/tap"
 }
}

```



# 查看编辑npm配置

```
npm config edit
```

# 查看npm 的registry

```
npm config get registry
```

**查看是否有包：**

浏览器：输入（registry/包名）可以看到相应包信息

```
https://registry.npmjs.org/@jdcfe/yep-mp-com
```

```
https://registry.npm.taobao.org/@jdcfe/yep-mp-com
```

```
http://registry.m.jd.com/@jdcfe/yep-mp-com
```



# 配置仓库

// npm 

```
npm config set registry http://registry.npmjs.org
```



// cnpm

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

# 实用工具包

## 树形目录结构

[tree-cli](http://sunshiyong.com/2018/05/13/tree-win/) 快速生成指定深度的树形目录结构

```
// 安装
npm install -g tree-cli

// 展示一级所有文件 以及目录（前边带 /）
tree -f

// 展示到二级
tree -l 2
```

## 快速删除node_modules

当你的项目依赖了太多的包时，node_modules里的文件就变得特别的多，虽然不大，但是里面的文件太多，导致window删除时非常慢，现在就介绍一种相对于删除速度较快的方法

------

1. 全局安装rimraf：(已经安装)
   `npm install rimraf -g`
2. 到你的项目根目录下（即有node_modules的目录），执行命令：
   `rimraf node_modules`

# 查看想要安装包的使用方法

方法1： 

https://www.npmjs.com/ 上搜索安装的包



# 列出全局依赖的模块

```
npm ls --depth=0 -g
```

# 列出当前项目依赖的模块

```
npm ls --depth=0
```



# 查看包版本

## 查看npm服务器上所有的jquery版本信息

```
npm view jquery versions
```

## 查看jquery的最新的版本

```
 //查看babel-loader的最新版本
 npm view babel-loader version
```

## 查看本地下载的jquery版本信息

```
npm ls jquery
```

## 查看全局下载安装的jquery

```
npm ls jquery -g
```



# 报错：

## npm ERR! code EPERM npm ERR! errno -4048

![](E:\self\记录\myNotes\images\npm_1.png)

### step1: 清除[npm](https://www.baidu.com/s?wd=npm&tn=24004469_oem_dg&rsv_dl=gh_pl_sl_csd)缓存

```
npm cache clean --force
```

仍然报上述错误，step2

### step2: 更新npm版本

```
npm -v  查看当前版本为5.0.1
npm view npm version  查看npm最新版本为6.0.1
npm install -g npm@6.0.1  更新最新版本
```

或者

```
npm install -g npm@latest
```

## npm ERR! code EINTEGRITY

![](E:\self\记录\myNotes\images\npm_2.png)

## Error: listen EADDRNOTAVAIL

解决方法：dev.js中 host: '[brandpage.jd.com](http://brandpage.jd.com/)', 软件switchHosts里有 [brandpage.jd.com](http://brandpage.jd.com/) host正在应用（即严格拷贝^上3中的host 并应用）

![](E:\self\记录\myNotes\images\npm_3.png)



# 分享：jnpm发包

## 介绍

npm 是一种包管理的工具，目前的前端界已经离不开了它。它的出现让我们能通过 `npm install [name]` 的方式将别人的优秀代码模块引入到自己的项目中。这些优秀的模块能被共享的原因，离不开 npm 包管理工具和 npm 仓库

虽然目前已经有很多成熟的 npm 源可以使用，但出于**稳定性**、**私密性**、**安全性**等方面的考虑搭建自己公司的私有仓库完全有必要。

参考资料：[jnpm官网](http://npm.m.jd.com/)

## FQA

1. npm 镜像地址：https://registry.npmjs.org/，https://www.npmjs.com/package/antd这又哪，包又是在哪下载的
2. npm源是什么 安

## 常见npm镜像地址

| npm    | https://registry.npmjs.org/      |
| ------ | -------------------------------- |
| yarn   | https://registry.yarnpkg.com/    |
| cnpm   | http://r.cnpmjs.org/             |
| taobao | https://registry.npm.taobao.org/ |
| jnpm   | http://registry.m.jd.com/        |

注意：通常安装cnpm，并且cnpm改为淘宝安装镜像

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

## 查看某一镜像地址

```
npm|cnpm get registry
```



# 背后原理

## npm insall 包名 

https://blog.csdn.net/qiwoo_weekly/article/details/103839779

https://zhuanlan.zhihu.com/p/128625669