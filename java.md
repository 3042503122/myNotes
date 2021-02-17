

# git地址

https://coding.jd.com/app/static_website_manage.git

# 环境搭建

## 查看系统版本

https://jingyan.baidu.com/article/6525d4b1aafa98ac7c2e946c.html

## vscode to java

https://code.visualstudio.com/docs/java/java-tutorial



- 傻瓜式安装jdk等环境

- 安装扩展插件

  ![](E:\self\记录\myNotes\images\vs_java_1.png)



失败了。。。。。



## idea to java

### JDK1.8

下载安装 - 下载百度云盘

### idea安装

**Ultimate**企业版：1个月免费期，费劲找到破解码

**Community**社区版：功能基本上由，永远免费 [下载](http://eit.jd.com/)

### 导入项目+启动项目

> 首次启动后端项目：

![](E:\self\记录\myNotes\images\java.png)

> 修改后端代码重启项目

![](E:\self\记录\myNotes\images\java3.png)



> 启动前端项目 ,前端访问本地后端代码

看package.json,  `npm run server`

首次启动项目



> 以swm项目为例

浏览器：http://local.jd.com:8072/

登录名：gaofeng32

密码：没有权限，跳转登录页面上



# java入门

## jdk

包管理

### 安装



### 使用



### jre

## idea

### 安装

- ultimate: 企业版

- community: 社区版，免费，👈

  正常双击安装

  <img src="E:\self\记录\myNotes\images\java_7.png" style="zoom:67%;" />

  <img src="E:\self\记录\myNotes\images\java_8.png" style="zoom:67%;" />

### 第一次启动

<img src="E:\self\记录\myNotes\images\java_9.png" style="zoom:67%;" />

<img src="E:\self\记录\myNotes\images\java_10.png" style="zoom:67%;" />

<img src="E:\self\记录\myNotes\images\java_11.png" style="zoom:67%;" />

​                                      配置一下

<img src="E:\self\记录\myNotes\images\java_12.png" style="zoom:67%;" />

如果安装好jdk, 下图中【No SDK】选择 1.8已安装的sdk

<img src="E:\self\记录\myNotes\images\java_14.png" style="zoom:50%;" />

### 新建项目并启动

<img src="E:\self\记录\myNotes\images\java_15.png" style="zoom:50%;" />

<img src="E:\self\记录\myNotes\images\java_16.png" style="zoom:50%;" />

<img src="E:\self\记录\myNotes\images\java_17.png" style="zoom: 67%;" />

<img src="E:\self\记录\myNotes\images\java_18.png" style="zoom:50%;" />

启动项目代码上右键 Run ***

<img src="E:\self\记录\myNotes\images\java_19.png" style="zoom:50%;" />

### 移植项目并启动

'Open or Import'

## 新建 class

<img src="E:\self\记录\myNotes\images\java_20.png" style="zoom:80%;" />

<img src="E:\self\记录\myNotes\images\java_21.png" style="zoom:80%;" />

<img src="E:\self\记录\myNotes\images\java_22.png" style="zoom:80%;" />

编写代码......, 运行代码

<img src="E:\self\记录\myNotes\images\java_23.png" style="zoom: 67%;" />

## 程序调试

### 断点

- 运行断点
- 程序向断点下边执行

## 面向对象

### 概念

创建类语法

```
public class 类名 {
  // 类的内容
  // 属性
  private String owner = "姓名"
  // 方法
  private String getOwner() {
    return this.owner;
  }
}
```

```
创建类的实例对象
类名 对象名 = new 类名();
Dog lucky = new Dog();
```



### 三大特征

- 封装

  👁️‍🗨️猪 =》生成工厂(封装) =》香肠

  - 封装即隐藏功能的实现细节
  - 利用对象与方法是实现封装的直接途径
  - 良好的封装让代码更容易阅读与维护

- 继承

  - extends关键字用于类的继承
  - 子类会继承父类的default | protected | public修饰的成员变量与方法

  ![](E:\self\记录\myNotes\images\java_26.png)

- 多态：是同一个行为具有多个不同表现形式和形态的能力（即多种形态）

  👁️‍🗨️打印机可以打印黑白照片、彩色照片，通过按不同按钮；通过不同按钮，空调可以制热可以制冷；即输入不同，产生不同形态

  - 实现多态的关键是接口。<接口>interface是一个抽象的类型，只提供方法的定义
  - 实现类是一个接口的具体实现，要实现每一个接口方法的功能
  - implements： 实现。红线出现必须实现接口内的方法

  <img src="E:\self\记录\myNotes\images\java_28.png" style="zoom:150%;" />

## 包

概念：把功能相似或相关的类组织在同一个包中，包也是采用了树形目录的存储方式，通过包也可限定访问权限。

- 创建

  src目录上右键菜单 New => Package

- 包命名规则：逆命名法，用“.”分割，单词全部小写。

  **域名后缀.组织机构名称.项目名称[.模块名称].包的职能**

  举栗子：

  ```
  com.imooc.weather.ui
  com.alibaba.taobao.customer.data
  ```

  

- 包下创建类

  ```
  // 包的声明，说明下面PackageSample01的类隶属于这个包
  package com.imooc.objectproject.sample1
  
  // 
  publick class PckageSample01 {
  
  }
  ```

  

- 跨包使用类时需要导入包，同一个包下的类无需import导入

  ```
  package com.imooc.objectproject.sample1
  
  // 导入其他包中的PackageSample02类 
  import com.imooc.objectproject.sample1.PackageSample02
  
  publick class PckageSample01 {
  
  }
  ```

  导入一般不需要我们写，导入本项目(本地)包，只需要写下面一句，编辑器自动帮你导入

  ```
  // Dog lucky = new Dog();
  Dog鼠标自动有
  ```

## 修饰符

修饰类的属性和方法

| 访问修饰符 | 名称           | 说明                                                         | 本类 | 同一个包的类 | 继承类 | 其他类 |
| ---------- | -------------- | ------------------------------------------------------------ | ---- | ------------ | ------ | ------ |
| private    | 私有           | 只能在类的内部访问(例如：人的class,自己的信用卡密码 不能对外暴露)，但**private属性可以通过Getter和Setter对成员变量进行封装实现外边进行访问** | √    |              |        |        |
| (default)  | 默认(使用很少) | 相同包的其他类都可以使用                                     | √    | √            |        |        |
| protected  | 继承           | 只有继承的子类能访问到                                       | √    | √            | √      |        |
| public     | 公用           | 在任何地方都可以访问(例如：人的class,自己的姓名 需要对外暴露) | √    | √            | √      | √      |

![](E:\self\记录\myNotes\images\java_24.png)

### private属性通过 Getter和Setter对外暴露

```
package www.mahonglu.project.demo3;

public class GetterAndSetter {
    public String name;
    private String mobilePhone;

    // getter方法：用于读取private成员变量的内容
    // getter书写格式：public成员变量类型 get成员变量名(), PS:首字母大写
    public String getMobilePhone() {
        return mobilePhone;
    }

    // setter方法：用于设置private成员变量的内容
    // setter书写个数：public void set成员变量名（新的数据参数）
    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }
}
```

```
package www.mahonglu.project.demo3;

public class Instance {
    public static void main(String[] args) {
        GetterAndSetter demo = new GetterAndSetter();
        demo.name = "张三";
        demo.setMobilePhone("13112341234");
        System.out.println(demo.name);
        System.out.println(demo.getMobilePhone());
    }
}

```

快捷方法

<img src="E:\self\记录\myNotes\images\java_25.png" style="zoom:80%;" />

