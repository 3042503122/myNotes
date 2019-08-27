# 前提

node有很多版本，如何让一台电脑支持多个node版本？

安装nvm

[下载]: https://github.com/coreybutler/nvm-windows

下一步下一步安装

安装成功后：

```
//gitbash

//查看node安装版本
nvm ls

//安装node 8.9.2
nvm install 8.9.2

//使用node 8.9.2
nvm use 8.9.2
```



# vscode快速生成.vue模板

[配置]: https://www.jianshu.com/p/8610215a8a84



# 工程构建

1. 下周代码

[工程构建完成代码]: https://github.com/yjjdick/JDFinance.git

2. 按住调试

   cd  JDFinance         

   npm installl

   npm start

3. 测试验证

   是不是安装正确

   ESlint能不能代码检查

   是不是能编译Vue、Es6

   是不是能编译scss和css

   修改代码后浏览器能不能自动刷新

   css模块化是不是正确

   ```
   <template lang="html">
       <div :class="$style.home">  <!-- css模块化  -->
           <h1>Home</h1>
       </div>
   </template>
   
   <script>
   export default {
   }
   </script>
   
   <style lang="scss" module><!-- css模块化  -->
     @import '../../css/reset.scss';
     .home{
       color: red;
       font-size: 80px;
     }
   </style>
   
   ```

   

# 项目设计与原理分析

1. css模块化设计
2. js组件设计
3. 自适应
4. SPA设计
5. 构建设计
6. 上线指导

## css模块化设计（css module）

1. why使用css module

2. 设计原则

   1）可复用 能继承 要完整

   2）周期性迭代

   ​	优秀的代码是模仿出来的

   ​	优秀的代码是设计出来的

   ​	优秀的代码是重构出来的

3. 设计方法

   1）先整体 后部分 再颗粒化

   2）先抽象 再具体

   

## js组件设计

1. 设计原则

   1）高内聚低耦合

   ​     <低耦合>: 一个js组件内部不依赖任何其他组件

   2）周期性迭代

## 自适应

1. 基本概念

   1） css像素、设备像素、逻辑像素、设备像素比

   https://github.com/jawil/blog/issues/21

   2）viewport

   ```
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```

   > width

   控制viewport的大小，可以指定一个值（如600），或者特殊值（device-width）

   <device-width>为设备的宽度（单位为缩放100%时的css像素）

   

   > height

   和width相对应，指定高度

   

   > initial-scale

   初始化缩放比例，也即是当页面第一次load的时候缩放比例

   

   > maximum-scale

   允许用户缩放到的最大比例

   

   > minimum-scale

   允许用户缩放到的最小比例

   

   > user-scalabel

   用户是否可以手动缩放

   

   ------

   **viewport：** 分为3类

   ![](E:\self\mahongluRecord\notes\images\vue_2.png)

   > layout viewport（布局视口）：蓝色区

   一般移动设备的浏览器都默认设置了一个viewport 元标签，定义一个虚拟的layout viewport（布局视口），用于解决早期的页面在手机上显示的问题。iOS, Android基本都将这个视口分辨率设置为 980px，所以pc上的网页基本能在手机上呈现，只不过元素看上去很小，一般默认可以通过手动缩放网页。

   

   > visual viewport（视觉适口）和 物理像素

   visual viewport（视觉视口）备物理屏幕的可视区域，屏幕显示器的物理像素，同样尺寸的屏幕，像素密度大的设备，硬件像素会更多。例如iPhone的物理像素：

   - iPhone5 ：640 *?1136

   - iPhone6：750 *?1334

   - iPhone6 Plus：1242 *?2208

     

   > ideal viewport （理想适口）和 dip（设备逻辑像素）：白色区

   

   **总结：**width=device-width 就是 让layout viewport = ideal viewport

   

   3）rem

   ![](E:\self\mahongluRecord\notes\images\vue_1.png)

   

2. 工作原理

   1）利用viewport和设备像素比调整基准像素

   页面直接引入：

   [hotcss](https://github.com/imochen/hotcss)

   

   2）利用px2rem自动转换css单位



## spa设计

<spa>单页面应用

1. 设计意义

   1）前后端分离

   2）减轻服务器压力

   3）增加用户体验

   ​      减少了下载页面的等待

   4）prerender预渲染优化seo

2. 工作原理

   | 方法        | 优点   | 缺点           |
   | ----------- | ------ | -------------- |
   | history Api | 优雅   | 对浏览器有要求 |
   | hash        | 不优雅 | 兼容性最好     |

   

### history api

![](E:\self\mahongluRecord\notes\images\bom.jpg)

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
  <article>
    <a class="api a">a.html</a>
    <a class="api b">b.html</a>
    <script>
      document.querySelectorAll('.api').forEach((item)=>{
        item.addEventListener('click', (e)=>{
          e.preventDefault();
          let link = item.textContent;
          window.history.pushState({
            name: 'api'
          }, link, link);
        }, false)
      });

			//监听路由
      window.addEventListener('popstate', (e)=>{
        console.log({
          location: location.href,
          state: e.state
        });
      });
    </script>
  </article>
</body>
</html>
```



### hash

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
  <article>
    <a class="hash a">#a.html</a>
    <a class="hash b">#b.html</a>
    <script>
      document.querySelectorAll('.hash').forEach((item)=>{
        item.addEventListener('click', (e)=>{
          e.preventDefault();
          let link = item.textContent;
					location.hash = link
        }, false)
      });

			//监听路由
      window.addEventListener('hashchange', (e)=>{
				console.log({
					location: location.href,
					hash: location.hash
				});
      });
    </script>
  </article>
</body>
</html>
```



# 面试

# 

-----------关于项目

1. 你的项目有什么特色？

   1）自适应方案

   2）css模块化设计

2. 解决过什么问题，怎么解决的？用过什么技术方案？

3. 你对自己的项目是否满意？有改进空间吗？

   --- 将所有组件打包到一个文件，由于项目比较庞大时，vue提供分割组件，动态加载组件

4. 如果这个项目让你重新设计，你会怎么思考？



-----------关于自适应方案

1. 自适应方案应该怎么做，原理是什么？
2. rem和em
3. 前后端分离如何做的？



-----------关于vue

1. 为什么选择Vue框架？
2. Vue双向绑定如何实现的？
3. 有没有使用css module， 基本原理是什么，vue该如何做？
4. 开启css module之后如何使用第三方样式库？
5. vue的安装包邮几个版本，遇到问题如何解决？（不用官方脚手架，而是自己 webpack搭建才能回答该问题）
6. 你的项目有什么特色，解决过什么问题，用了什么技术方案
7. 前端路由是什么原理

-----------关于webpack

1. 为什么选择webpack构建工具

2. 项目是如何使用webpack的？dev-sever的原理是什么？

3. 有没有实现一个webpack的loader?

4. 如何做任务管理？（开发环境的、生产环境的、如何动态监听某个文件）

   ---npm scripts

   

# 开发知识

## this.$nexTick

[简单了解](https://img1.360buyimg.com/pop/s590x470_jfs/t1/41882/10/7105/79820/5d0b1df7Ef2eef1f8/9ff0e7d60b470c42.jpg!q90!cc_590x470.webp)

[原理](https://segmentfault.com/a/1190000012861862)

## 滚动到底部加载更多

```
<script>
  export class ScrollLoad {
  static throttle(fn, interval, timeout) {
    var _t = new Date().getTime()
    var _timeout
    return function handler() {
      var t = new Date().getTime()
      _timeout && clearTimeout(_timeout)
      if (t - _t >= timeout) {
        _t = new Date().getTime()
        fn.apply(this, arguments)
      } else {
        _timeout = setTimeout(handler.bind(this), interval)
      }
    }
  }

  constructor(options = {}) {
    this._options = Object.assign({
      // 是否开启加载更多
      enableReachBottom: true,
      // 是否开启加载更多 底部距离
      onReachBottomDistance: 50
    }, options)
    this._init()
  }

  _init() {
    // if (typeof this._options.onReachBottom === 'function') {
    //   this._options.onReachBottom()
    // }
    // if (typeof this._options.onScroll === 'function') {
    //   this._options.onScroll({rect: document.body.getBoundingClientRect()})
    // }
    this._scroll()
    this.attachScroll()
  }

  /**
   * @description: 监听触底加载更多
   * @param {function} callbackfn 回调
   */
  attachScroll() {
    window.addEventListener('scroll', this._scrollThrottle)
  }

  /**
   * @description: 卸载监听触底加载更多
   */
  detachScroll() {
    window.removeEventListener('scroll', this._scrollThrottle)
  }

  lock() {
    this.loading = true
  }

  unlock() {
    this.loading = false
  }

  _scroll() {
    let that = this
    this._scrollThrottle = ScrollLoad.throttle(function() {
      // 距离底部50时加载一次
      // 阀值
      let THRESHold = that._options.onReachBottomDistance

      let rect = document.body.getBoundingClientRect()
      let { top, height } = rect

      if (typeof that._options.onScroll === 'function') {
        that._options.onScroll({rect: rect})
      }

      let isBottom = height + top - window.innerHeight <= THRESHold
      if (isBottom && typeof that._options.onReachBottom === 'function') {
        that._options.onReachBottom()
      }
    }, 100, 300)
  }
}

//调用
      this.scrollInstance = new ScrollLoad({
        onReachBottomDistance: Math.round(window.innerHeight*0.3),
        onReachBottom: this.loadList,
        onScroll: this.reportRecommend
      })
      
// 最后一页时
this.scrollInstance.detachScroll();
</script>
```

 

## script 标签内部声明顺序

```
data > prop > components > filter > computed >  watch > 
钩子函数（钩子函数按其执行顺序）> methods
```



# vuex

[轻松掌握vuex，让你对状态管理有一个更深的理解](https://juejin.im/post/5d37a791f265da1b7153369a?utm_source=gold_browser_extension#heading-8)

