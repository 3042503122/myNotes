# yarn

和npm  类似

```
yarn install
```



yarn 执行scripts：(不用run)

```
yarn start //npm run start
yarn build //npm run build
```



# npm install

[dependencies 和 devDependencies区别](https://blog.csdn.net/csdn_yudong/article/details/83721870)



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



# 查看包的最新版本

```
 //查看babel-loader的最新版本
 npm view babel-loader version
```



# 报错：npm ERR! code EPERM npm ERR! errno -4048

![](E:\self\mahongluRecord\notes\images\npm_1.png)

## step1: 清除[npm](https://www.baidu.com/s?wd=npm&tn=24004469_oem_dg&rsv_dl=gh_pl_sl_csd)缓存

```
npm cache clean --force
```

仍然报上述错误，step2

## step2: 更新npm版本

```
npm -v  查看当前版本为5.0.1
npm view npm version  查看npm最新版本为6.0.1
npm install -g npm@6.0.1  更新最新版本
```

或者

```
npm install -g npm@latest
```

