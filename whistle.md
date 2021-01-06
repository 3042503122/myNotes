# 关于 whistle

使用场景：

1. 抓包。

2. host（）。相当于SwitchHosts

3. 线上代码调试。线上h5页面没有vconsole ,注入vconsole调试

4. 跨域(cors)。

   ```
   // union-coupon.jd.com接口访问允许跨域
   union-coupon.jd.com resCors://enable
   ```

5. mock。

fiddler很强大，但是比较复杂。whistle就比较简单了。基于上 有了whistle可以把fiddler和SwitchHosts卸掉了



# 链接

- [首页](http://wproxy.org/whistle/)
- [whistle工具全程入门](https://imweb.io/topic/596480af33d7f9a94951744c)
- [一文搞定前端代理骚操作！再也不怕线上bug啦！](https://juejin.cn/post/6859305679006466055)
- [Whistle实用功能介绍](https://blog.csdn.net/luckywinty/article/details/103415060)



# 最佳实践

```
# log:// https://jingfen.jd.com/
# 11.40.98.95 jingfen.jd.com 

# api.m.jd.com beta-api.m.jd.com
# https://storage.360buyimg.com/babel/00451986/1021200/production/dev/main.js http://jingxihongbao.jd.com:3001/js/main.js

# storage.jd.com/query union-coupon.jd.com/query
# storage.jd.com/save union-coupon.jd.com/save


# h5.m.jd.com log://
# coupon-taro.jd.com:10086 log://
# https://prodev.m.jd.com log://

# coupon_sdk_h5.jd.com:8080 weinre://

# story.m.jd.com log://
# story.m.jd.com htmlPrepend://{vConsole.html}
# story.m.jd.com htmlAppend://{vConsole.html} 

# coupon-taro.jd.com:10086 htmlPrepend://{vConsole.html}

# union-click.jd.com beta-u.jd.com

# https://union-click.jd.com http://union-click.jd.com
# api.m.jd.com beta-api.m.jd.com

# wqmall.jd.com log://
# story.m.jd.com log://

# https://storage.360buyimg.com/swm-stable/union_coupon_sdk/main.js https://storage.360buyimg.com/swm-stable/beta_union_coupon_sdk/main.js
# https://storage.360buyimg.com/swm-stable/union_coupon_sdk https://storage.360buyimg.com/swm-stable/beta_union_coupon_sdk
# https://prodev.m.jd.com/chunk/ http://coupon-taro.jd.com:10086/chunk/

# prodev.m.jd.com htmlAppend://{vConsole.html}

# jingfen.jd.com log://

# coupon-wares.jd.com log://

api.m.jd.com beta-api.m.jd.com



# https://beta-api.m.jd.com/api?functionId=getCoupons file://{get.json}
# https://api.m.jd.com/api?functionId=showCoupon file://{show.json}
http://union4b.jd.com:3000/showCoupon file://{show.json}
http://union-mock.jd.com/doles/app/mock/19/getBengbadaCoupon file://{get.json}

# https://union-coupon.jd.com/ http://union-coupon.jd.com/
union-coupon.jd.com resCors://enable
# https://beta-api.m.jd.com/api?functionId=getCoupons file://{get.json}
# https://beta-api.m.jd.com/api?functionId=showCoupon file://{show.json}
api.m.jd.com resCors://enable
beta-api.m.jd.com resCors://enable
union-mock.jd.com resCors://enable
coupon-taro.jd.com 127.0.0.1
# union-coupon.jd.com 10.180.201.124
# union-click.jd.com 11.18.88.59 

https://union-coupon.jd.com/ http://union-coupon.jd.com
```

```
// host
coupon-taro.jd.com 127.0.0.1

// 请求转发，https 转发到 http
https://union-coupon.jd.com/ http://union-coupon.jd.com
// 请求转发，api.m.jd.com转发到beta-api.m.jd.com
api.m.jd.com beta-api.m.jd.com

// 允许跨域
beta-api.m.jd.com resCors://enable

// mock
# https://beta-api.m.jd.com/api?functionId=getCoupons file://{get.json}

h5.m.jd.com log://

prodev.m.jd.com htmlAppend://{vConsole.html}

coupon_sdk_h5.jd.com:8080 weinre://
```

嵌入vconsole

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>demo.html</title>
    <script src="https://cdn.bootcss.com/vConsole/3.3.0/vconsole.min.js"></script>
</head>
<body>
    <script type="text/javascript">
        var vConsole = new VConsole();
    </script>
</body>
</html>
```



# FAQ

## 浏览器switchyomega插件拦截所有网页，很烦

比如我开启要调试的，但是同时我还使用浏览器百度东西呀，都给我拦截了，还需要手动点filter->直接连接