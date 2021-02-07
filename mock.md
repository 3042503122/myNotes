# easy-mock

**平台：**线上<https://easy-mock.com/login>

**访问地址：**不存在跨域问题

**具体mock字段：**http://mockjs.com/examples.html

**测试：**安装ngix(可以简易搭建本地服务器)————此为绿色版

1. 下载安装<https://nginx.org/en/download.html>

   ![](E:\self\记录\myNotes\images\ngix_1.png)

2. 安装 此为绿色版：双击即可

   ![](E:\self\记录\myNotes\images\ngix_2.png)

3. 浏览器输入：127.0.0.1( 也可以用swtichH指定host) 成功，该显示的是 ngix/html/index.html

   你可以更改此index.html



# 构建完成后代码自测

### 本地验证

发布之前，可以通过 `serve` 做本地验证，

```bash
$ yarn global add serve
$ serve ./dist

Serving!

- Local:            http://localhost:5000
- On Your Network:  http://{Your IP}:5000

Copied local address to clipboard!
```

访问 http://localhost:5000，

### 部署

本地验证完，就可以部署了，这里通过 [now](http://now.sh/) 来做演示。

```bash
$ yarn global add now
$ now ./dist

> Deploying /private/tmp/sorrycc-1KVCmK/dist under chencheng
> Synced 3 files (301.93KB) [2s]
> https://dist-jtckzjjatx.now.sh [in clipboard] [1s]
> Deployment complete!
```

然后打开相应的地址就能访问到线上的地址了。