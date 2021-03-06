# 参考

- [官网api](http://nginx.org/en/docs/)

  官网使用指南

  ![](E:\self\记录\myNotes\images\nginx_3.png)

# 其他

[在线进行配置，选择你的场景，填写好参数，系统就会自动生成配置文件](https://www.digitalocean.com/community/tools/nginx)

# 概述

nginx 是一个开源且高性能、可靠的http中间件(企业中用的最多的)、代理服务。

**为什么选择ngix?**

1. IO多路复用。多个描述符的I/O操作都能在一个线程内并发交替的顺序完成，这就叫I/O多路复用，这里的“复用”指的是复用同一个线程
2. 轻量级。
3. cpu亲和
4. senfile

# 准备工作

## 四项确认

- 确认系统网络

  ```
  ping www.baidu.com
  ```

  

- 确认yum可用

  

- 确认关闭iptables规则

- 确认停用selinux

  ```
  getenforce
  
  // 关闭
  setenforce 0
  ```

  

## 安装

- `yum -y install gcc gcc-c++ autoconf pcre pcre-devel make automake`
- `yum -y install wget httpd-tools vim`

## 初始化

`cd/opt app download logs work backup`



# 安装

http://nginx.org/

# 基本参数使用

## 安装目录

## 编译参数

| 路径                                                 | 类型     | 作用                                       |
| ---------------------------------------------------- | -------- | ------------------------------------------ |
| `config/fastcgi_params | scgi_params | uwsgi_params` | 配置文件 | cfi配置相关，fastcgi配置                   |
| `config/nginx.conf`                                  | 配置文件 | nginx主配置文件                            |
| `config/koi-utf | koi-win |win-utf `                 | 配置文件 | 编码转换映射化文件                         |
| `config/mime.types`                                  | 配置文件 | 设置http协议的content-type与扩展名对应关系 |



#  nginx基本配置语法（nginx.conf）

## 实践注意

修改nginx.conf要重新启动

```
E:/nginx-1.20.0/nginx.exe -s reload -c E:/nginx-1.20.0/conf/nginx.conf
```



- 

## nginx默认模块(nginx自带) 

### 定义

`--with-http_xxx_module`都是http模块

[官网](http://nginx.org/en/docs/)

### 概览

| 编译选项                        | 作用                                                         | 语法格式 |
| ------------------------------- | ------------------------------------------------------------ | -------- |
| --with-http_stub_status_module  | nginx的客户端状态                                            |          |
| --with-http_random_index_module | 目录中选择一个随机主页                                       |          |
| --with-http_sub_module          | nginx服务端在给客户端reponse http内容的时候，用于对response http内容替换 |          |

### location

[location [=|~|~*|^~|@] pattern { ... }](https://juejin.cn/post/6844903849166110733)

### http_log_module

- 用途：nginx服务器日志相关指令主要有两条：一条是log_format，用来设置日志格式；另外一条是access_log，用来指定日志文件的存放路径、格式和缓存大小	

- 格式：

  ```
  Syntax:	log_format name [escape=default|json|none] string ...;
  Default:	
  log_format combined "...";
  Context:	http
  ```

- string: 使用内置变量。

  nginx变量：

  - http请求变量：arg_PARAMETER、http_HEARDER、sent_http_HEADER
  - 内置变量：nginx内置的
  - 自定义变量：自己定义的

  ```
  参数                      说明                                         示例
  $remote_addr             客户端地址                                    211.28.65.253
  $remote_user             客户端用户名称                                --
  $time_local              访问时间和时区                                18/Jul/2012:17:00:01 +0800
  $request                 请求的URI和HTTP协议                           "GET /article-10000.html HTTP/1.1"
  $http_host               请求地址，即浏览器中你输入的地址（IP或域名）     www.wang.com 192.168.100.100
  $status                  HTTP请求状态                                  200
  $upstream_status         upstream状态                                  200
  $body_bytes_sent         发送给客户端文件内容大小                        1547
  $http_referer            url跳转来源                                   https://www.baidu.com/
  $http_user_agent         用户终端浏览器等信息                           "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; SV1; GTB7.0; .NET4.0C;
  $ssl_protocol            SSL协议版本                                   TLSv1
  $ssl_cipher              交换数据中的算法                               RC4-SHA
  $upstream_addr           后台upstream的地址，即真正提供服务的主机地址     10.10.10.100:80
  $request_time            整个请求的总时间                               0.205
  $upstream_response_time  请求过程中，upstream响应时间                    0.002
  ```

- 实践

### --with-http_stub_status_module

```
Syntax: stub_status
default: --
Context: server,location
```

- 实践

  ```
  location / {
    stub_status;
  }
  ```

  验证：重启，浏览器输入首页，展示stub_status的值

### --with-http_random_index_module

```
Syntax: random_index on|off;
Default: random_index off;
Context: location;
```

- 实践

  准备工作：html/1.html(背景颜色红) | 2.html(背景颜色绿) |3.html(背景颜色蓝)

  ```
  location / {
    root html;
    random_index on;
  }
  ```

  验证：浏览器输入网址显示网址显示随机（1 2 3.html）,刷新浏览器显示另外一个

### --with-http_sub_module

- 格式

  ```
  Syntax: sub_filter string repacement;
  Default: --
  Context: http, server, location
  ```

  如果我们了解http header的last_modified对下就不陌生了，用于nginx服务端来完成客户端(浏览器)进行一次请求时校验服务端内容是否发生变更

  ```
  Syntax: sub_filter_last_modified on|off;
  Default: sub_filter_last_modified off;
  Context: http, server, location
  ```

  html中匹配的第一个字符串还是匹配的所有字符串（类似'abacad'.replace(/a/, '8')只匹配第一个，'abacad'.replace(/a/g, '8')匹配所有的）

  ```
  Syntax: sub_filter_once on|off;
  Default: sub_filter_once on;
  Context: http, server, location
  ```

- 实践：将浏览器页面中immoc替换成IMMOC

  ```
  location / {
      root   html;
      index  index.html index.htm;
      sub_filter '<a>immoc' '<a>IMMOC';
      sub_filter_once off;
  }
  ```

### 连接限制

- 连接格式

  请求的限制

  ```
  Syntax: limit_zone key zone=name:size;
  Default: --
  Context: http
  ```

  连接的限制

  name - 名字

  :size - 定义的空间大小

  ```
  Syntax: limit_conn zone number;
  Default: --
  Context: http, server, location
  ```

- 实践：

  ```
  location / {
      root   html;
      index  index.html index.htm;
      # limit_req zone=req_zone burst=3 nodelay;
      # limit_req zone=req_zone burst=3;
      # limit_req zone=req_zone;
      sub_filter_once off;
  }
  ```

### http_access_module访问控制 - 基于ip的访问控制

- 格式

  - 允许哪些访问

  ```
  Syntax: allow address|CIDR|unix:|all;
  Default: --
  Context: http,server,location,limit_except
  ```

  - 不允许哪些访问

  ```
  Syntax: deny address|CIDR|unix:|all;
  Default: --
  Context: http,server,location,limit_except
  ```

  

  address: ip地址，我允许一个IP访问

  CIDR：按照网段的方式配置，比如126.168.0-24允许这个网段

  all: 所有的

- 实践

  ```
  location ~ ^/admin.html {
      root   /html/app;
      deny 222.128.189.17;
      allow all;
      index  index.html index.htm;
  }
  ```

### http_auto_basic_module - 访问控制 - 基于用户信任登录

- 定义

- 格式

  ```
  Syntax: auth_basic string|off;
  Default: auth_basic off;
  Context: http, server,location,limit_except
  ```

  string: 代表开启

- 实践

  ```
  
  ```


### http_x_forwarded_for(简称XFF)

- 格式

  ```
  Syntax: 
  Default: 
  Context: 
  ```

- 实践

  ```
  
  ```

### http_access_module

- 格式

  ```
  Syntax: 
  Default: 
  Context: 
  ```

- 实践

  ```
  
  ```


### http_access_module

- 定义：文件读取

- 格式

  ```
  Syntax: 
  Default: 
  Context: 
  ```

- 实践

  ```
  
  ```

  

###  sendfile不知道属于什么模块

- 定义：文件读取

- 格式

  ```
  Syntax: sendfile on | off;
  Default: sendfile off;
  Context: http, server,location, if in location
  ```

  引读：--with-file-aio异步文件读取

- 实践

  ```
  
  ```


### tcp_nopush不知道属于什么模块

- 定义：为了提升网络传输效率，sendfile开启的情况下，提高网络包传输效率。（举例：我有10个包裹，不是着急的一天发一个，那样要叫10次快递员，而是等等攒够10个叫一次快递员一次发出去，这样就提升了网络传输效率）

- 格式

  ```
  Syntax: tcp_nopush on | off;
  Default: tcp_nopush off;
  Context: server,location
  ```

  引读：--with-file-aio异步文件读取

- 实践

  ```
  
  ```

### tcp_nodelay不知道属于什么模块

- 定义：tcp包不等待直接发送给用户，keepalive连接下，提高网路包的传输实时性

- 格式

  ```
  Syntax: tcp_nodelay on | off;
  Default: tcp_nodelay off;
  Context: server,location
  ```

  引读：--with-file-aio异步文件读取

- 实践

  ```
  
  ```

  

### 配置语法 - 压缩

- 定义

  压缩传输

  ![](E:\self\记录\myNotes\images\nginx_2.png)

- 格式

  压缩开启

  ```
  Syntax: gzip on | off; 
  Default: gzip off;
  Context: http, server,location, if in location
  ```

  压缩配置-压缩比：并不是压缩越高越好，压缩耗服务端性能，所以做好平衡

  ```
  Syntax: gzip_comp_level level;
  Default: gzip_comp_level 1;
  Context: http, server,location
  ```

  压缩配置-使用压缩版本

  ```
  Syntax: gzip_http_version 1.0|1.1;
  Default: gzip_http_version 1.1;
  Context: http, server,location
  ```

  压缩配置-预读gzip功能：接收到浏览器请求现压缩太耗服务器性能，所以可以把一些先提前压缩放到服务器的某磁盘上，

  http_gzip_static_module预读gzip功能

  http_gunzip_module 应用支持gunzip的压缩方式，由于某些浏览器不支持gzip压缩，所以使用此

  ```
  
  ```

- 实践

  准备工作：html/app/images/1.png

  关闭压缩：浏览器输入`localhost/1.png`看到是280K

  ```
  location ~ .*\.(jpg|gif|png)$ {
              #gzip on;
              #gzip_http_version 1.1;
              #gzip_comp_level 2;
              #gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
              root html/app/images;
          }
  ```

  打开压缩：浏览器输入`localhost/1.png`看到是50k

  ```
          location ~ .*\.(jpg|gif|png)$ {
              gzip on;
              gzip_http_version 1.1;
              gzip_comp_level 2;
              gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
              root html/app/images;
          }
  ```

  压缩配置-预读gzip功能：浏览器`localhost/download/pending.json`

  准备工作：html/app cmd下：`gzip pending.json` 就有html/app/pending.json.gz

  ```
          location ~ ^/download {
              gzip_static on;
              tcp_nopush on;
              root html/app;
          }
  ```

  

### 配置语法 - 浏览器缓存

- 定义

  http协议定义的缓存机制（如 Expires; Catch-control等），有了浏览器的缓存 客户端就不会实时每次都请求服务器，给服务端造成资源消耗；客户端从本地中读 更快 响应时间更短

- 格式

  ```
  Syntax:	expires [modified] time;
  expires epoch | max | off;
  Default:	
  expires off;
  Context:	http, server, location, if in location
  ```

- 实践

  ```
  location ~ .*\.(htm|html)$ {
      expires 24h;
      root html/app;
  }
  ```

  ![](E:\self\记录\myNotes\images\nginx_4.png)



### 配置语法 - 跨域访问

- 定义：

  why浏览器禁止跨域访问？不安全，容易出现csrf攻击

  what csrf?（英语：Cross-site request forgery）跨站请求伪造

  有时候需要让浏览器允许跨域访问

- 格式 ：指令

  ```
  Syntax:	add_header name value [always];
  Default:	—
  Context:	http, server, location, if in location
  ```

- 实践

  ```
  location ~ .*\.(htm|html)$ {
      # 有的配置成*
      add_header Access-Control-Allow-Origin http://wwww.jesonc.com;
      add_header Access-Control-Allow-Methods GET,POST,DELETE,OPTIONS;
      root html/app;
  }
  ```

### 配置语法 - 防盗链

- [定义](https://www.jianshu.com/p/0a1338db6cab)

  index.html在被解析时，浏览器会识别页面源码中的img，script等标签，标签内部一般会有src属性，src属性一般是一个绝对的URL地址或者相对本域的地址。浏览器会识别各种情况，并最终得到该资源的唯一地址，加载该资源。

  准确的说，只有某些时候，这种跨站访问资源，才被称为盗链。假设B站点作为一个商业网站，有很多自主版权的图片，自身展示用于商业目的。而A站点，希望在自己的网站上面也展示这些图片，直接使用：

  ```xml
  <img src="http://b.com/photo.jpg"/>
  ```

  这样，大量的客户端在访问A站点时，实际上消耗了B站点的流量，而A站点却从中达成商业目的。从而不劳而获。这样的A站点着实令B站点不快的。如何禁止此类问题呢？

  防盗链目的：防止资源被盗用

- 格式 ：指令

  ```
  Syntax:	valid_referers none | blocked | server_names | string ...;
  Default:	—
  Context:	server, location
  ```

  获取相关值可以使用nginx变量，`$http_referer`

- 实践

  ```
  location ~ .*\.(jpg|gif|png)$ {
      gzip on;
      gzip_http_version 1.1;
      gzip_comp_level 2;
      gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
  
      # valid_referers 表示允许哪些信息被访问 
      # none 表示允许没有信息的过来
      # blocked 表示refer信息不是标准的http:// https://过来的 是允许一下非协议信息的
      # jd.com只允许域名是它的过来 这是一个正则~/jd\./
      valid_referers none blocked ~/jd\./;
      if($invalid_referer) {
        return 403;
      }
  
      root html/app/images;
  }
  ```

### 配置语法 - 代理

- 定义：

  代理：代为办理（代理理财、代理收货等等）

  ![](E:\self\记录\myNotes\images\nginx_5.png)

  <img src="E:\self\记录\myNotes\images\nginx_6.png" style="zoom:80%;" />

  正向代理、反向代理区别？代理对象不同，正向代理代理的对象是客户端，反向代理的是服务器

- 格式 ：指令

  ```
  Syntax:	proxy_pass URL;
  Default:	—
  Context:	location, if in location, limit_except
  ```

  url: 1）http`http://localhost:800/uri` 2) https`https://192.168.1.1:8000/uri/` 3)socket `http：unix:/tmp/backend.socket:/uri`

- 实践

  ```
          # proxy的常用配置
          location / {
            proxy_pass http://127.0.0.1:8080;
            proxy_redirect default;
  
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
  
            proxy connect_timeout 30;
            proxy_send_timeout 60;
            proxy read_timeout 60;
  
            proxy_buffer_size 32k;
            proxy_buffering on;
            proxy_buffers 4 128k;
            proxy_busy_buffers_size 256k;
            proxy_max_temp_fill_size 256k;
          }
  ```

### 配置语法 - 负载均衡

- 定义

  <img src="E:\self\记录\myNotes\images\nginx_7.png" style="zoom:80%;" />

- 格式

  ```
  Syntax:	server address [parameters];
  Default:	—
  Context:	upstream
  ```

- 实践

  ```
  
  ```

  




```
Syntax: 
Default: 
Context: 
```



# 最佳实践

## nginx作为静态资源web服务(作为cdn)

### 概述

<静态资源>： 非服务器动态运行生成的文件

| 类型       | 种类                 |
| ---------- | -------------------- |
| 浏览器渲染 | HTML CSS  JS         |
| 图片       | jpg jpeg gif png     |
| 视频       | FLV MPEG             |
| 文件       | TXT 等任意下载的文件 |

北京用户想请求新疆服务器上静态资源

![](E:\self\记录\myNotes\images\nginx_1.png)

## nginx作为代理服务

## 负载均衡调度器SLB

## 动态缓存

## 公司

```
upstream tomcat_brand-pc {
    server 127.0.0.1:1601  weight=10 max_fails=2 fail_timeout=30s ;

}

log_format realaddr_51977            '$remote_addr - $remote_user [$time_local] "$http_x_forwarded_for" "$http_j_forwarded_for" '
                                '"$request" $status $bytes_sent '
                                '"$http_referer" "$http_user_agent" '
                                '"$gzip_ratio" '
                                '$request_time $upstream_response_time';

server {
    listen          80;
    server_name     brand-pc.jd.com brand-pc.360buy.com brand-pc.jd.local;
    access_log      /export/servers/nginx/logs/brand-pc.jd.com/brand-pc.jd.com_access.log realaddr_51977;
    error_log       /export/servers/nginx/logs/brand-pc.jd.com/brand-pc.jd.com_error.log warn;

#    root /export/Packages/brand-pc/latest/;

    location / {
        #proxy_next_upstream     http_500 http_502 http_503 http_504 error timeout invalid_header;
        #proxy_set_header        Host  $host;
        #proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        #proxy_pass              http://tomcat_brand-pc;
include /export/servers/nginx/conf/error/error_location.conf;
        rewrite ^/(.*) http://brand-pc.jd.com/WorkFlow/index/index.html break;
include /export/servers/nginx/conf/error/error_location.conf;
    }
    
    location /WorkFlow/ {
    	proxy_pass http://storage.jd.local/swm-stable/new-brand-pc/;
    }

    location /logs/ {
        autoindex       off;
        deny all;
    }
include /export/servers/nginx/conf/error/error.conf;
}
```

