[表情选择](https://www.process.st/emoji-in-business-documents/)

[create-react-app 一些常用的自定义配置](https://www.jianshu.com/p/36efe1dc2f5e)

# 前言



# ✨技术栈

**前端： **react hooks、ts、

**后端:** **

# 🔗 链接



# 🔨搭建项目

## 快速开始

### 创建项目

```
    用npx就不需要安装脚手架了，优点总是安装最新的
    // 创建项目 - 非TypeScript
$ npx create-react-app my-app
// 创建项目 - TypeScript
$ npx create-react-app my-app --template typescript
// 安装依赖
cnpm install
```

### 启动项目

```
npm run start
```

## 个性化项目

### 精简项目



### 区分环境

开发环境，测试环境，预生产环境，生产环境，很多配置项（比如打包publicPath静态资源路径、接口地址）都是不同的，这时候我们需要根据环境来决定配置项。
 create-react-app 默认支持`development`，`test`，`production`，这里的 `test` 是用来做代码测试的，并不是构建测试环境的，我们需要多种打包环境。
 这里我们先区分三个环境：

- 开发环境 dev
- 测试环境 beta (或者alpha)
- 生产环境 prod

要配置publicPath(swm地址)、配置全局变量但是由于新的脚手架为了让开发者只需关心src，不需关心配置将配置放到的node_modules/react-script里，但是我们由于配置前述2个的需求怎么办，需要把react-script的配置拉回来  [关于](https://juejin.cn/post/6844903951893004296#heading-7)

```
// 不可逆操作
npm run eject
// 停止不动了 ===》FAQ
```

- publicPath

  预发打包后，index.html里引入的js css  图片等静态资源（绝对路径）

  ```
   npm i cross-env --save-dev
  ```

  ![](E:\self\记录\myNotes\images\react_ts_1.png)

  ![](E:\self\记录\myNotes\images\react_ts_2.png)

- 定义全局变量 - 接口地址

  如果前端和后端不是同一个域名需要配置接口地址

  ```
  
  ```

- 定义全局变量 - 最近更新时间

  ```
  // webpack.config.js
  const moment = require('moment');
  
        new webpack.DefinePlugin({
          ...env.stringified,
          SITE: JSON.stringify('hahaha'),
          UPDATE_TIME: JSON.stringify(moment().format('YYYY-MM-DD HH:mm:ss'))
        }),
  ```

  ```
  // react-app-env.d.ts
  declare const UPDATE_TIME: string;
  ```

  ```
  // App.tsx
  <div>最近更新时间：{UPDATE_TIME}</div>
  ```

  

- 定义全局变量 - 点击header-logo跳转首页

  ```
  // webpack.config.js
  const moment = require('moment');
  
        new webpack.DefinePlugin({
          ...env.stringified,
          SITE: JSON.stringify('hahaha')
        }),
  ```
```
  // react-app-env.d.ts
  declare const SITE: string;
```



### 路由router.config.js

#### 普通路由

config.js

```

```

#### 权限路由

### 登录

### 主题

### 



# 🐱添加业务界面

## 新建路由

router.config.js

```

```

## 菜单设置

src/locales/zh-CN\menu.js

```

```

## 新建页面



## 新建services



## 新建models

src/services/settle.js

```

```



# 🌚 FAQ

## npm run eject 后停止不动了

解决：

1. `ctrl+c`停止
2. 删除node_modules，重新安装`cnpm install`

## Cannot find name 'SITE'.  TS2304

webpack.DefinePlugin中定义全局变量SITE，在APP.jsx中使用报错

解决：

1. 全局变量声明位置

   ```
   //webpack.config.js
         new webpack.DefinePlugin({
           ...env.stringified,
           SITE: JSON.stringify('hahaha')
         }),
   ```

2. ts全局声明

   ```
   // react-app-env.d.ts
   declare const SITE: string;
   ```

   

# 🚀代码片段

