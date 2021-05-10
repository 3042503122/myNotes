# 参考

[最全nginx技术分析]: https://mp.weixin.qq.com/s/wecUdGnuHdZOs3t7zc16jw

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



##  nginx基本配置语法