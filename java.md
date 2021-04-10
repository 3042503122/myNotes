

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

### 优点

- 丰富的模板支持

  如输入【sout+回车】自动生成打印

- 丰富的快捷键

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

### 运行调试

### 打包

-  声明打包

  遗留问题：第三方包是否需要打到自己jar包里？？？

  ![](E:\self\记录\myNotes\images\java_36.png)

- 打包：最后out>...>weather.jar就是可以运行的jar

  ![](E:\self\记录\myNotes\images\java_37.png)

- 使用打包成功的jar,测试打好的包是否能运行

  ![](E:\self\记录\myNotes\images\java_38.png)

### 模板

#### 自带模板

【ctrl + shift + a =>输入 live template】

| 常用模板       | 描述 |
| -------------- | ---- |
| sout           |      |
| serr           |      |
| fori           |      |
| itar           |      |
| itli           |      |
| psvm 或者 main |      |
|                |      |

<img src="E:\self\记录\myNotes\images\mysql_17.png"  />

![](E:\self\记录\myNotes\images\mysql_18.png)

#### 自定义模板

<img src="E:\self\记录\myNotes\images\mysql_19.png" style="zoom:80%;" />

### 快捷键

| 快捷键                          | 描述                             |
| ------------------------------- | -------------------------------- |
| 【ctrl + alt + s】              | setting面板                      |
| 【ctrl + shift + F\|R】         | 全局查找 \| 替换                 |
| 【ctrl + shift + N】            | 文件查找                         |
| 【ctrl + shift + A】*****       | 查找action                       |
| 【alt + insert】                | 快速生成面板                     |
| 【ctrl + ←→】 配合 【ctrl + w】 | 光标按单词左移右移 配合 选中单词 |
| 【ctrl + alt + shift + j】      | 列操作                           |
| 【shift + F6】                  | 重命名                           |
| 【ctrl + shift + enter】        | 自动输入结尾分号；               |
| 【alt + enter】*                | 智能提示                         |
|                                 |                                  |



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

## 数据类型

![](E:\self\记录\myNotes\images\java_30.jpg)

![](E:\self\记录\myNotes\images\java_31.jpg)

## ArrayList类

- 是java内置的数据集合(ava.util.*)，用于存储多个数据结构

- 是数组替代品，提供更多的数据操作方法

- 方法

  <img src="E:\self\记录\myNotes\images\java_29.png" style="zoom:80%;" />

## 使用第三方提供的服务

使用[阿里云天气预发](https://market.aliyun.com/data?spm=5176.8060107.1387859.3.5c302854MNUw3p)，[阿里云天气预报接口](https://market.console.aliyun.com/imageconsole/index.htm?spm=5176.6660585.774526198.1.7c4b6bf8PzzIcw#/bizlist?_k=ko637o)

👁️‍🗨️![](E:\self\记录\myNotes\images\java_31.png)

**步骤：**

1. 获取第三方接口AppKey、AppCode

2. 下载jar包

   ![](E:\self\记录\myNotes\images\java_32.png)

3.  将jar包导入到本地项目

   新建目录：lib

   <img src="E:\self\记录\myNotes\images\java_33.png" style="zoom: 80%;" />

   导入jar包

   ![](E:\self\记录\myNotes\images\java_34.png)

​       学习jar原代码

​        <img src="E:\self\记录\myNotes\images\java_35.png" style="zoom:67%;" />

# Maven

## 周内容

### Maven构建工具

### 工厂模式

### 反射机制

### Lambda表达式

## Maven构建工具

| 内容          | 说明                 | 重要程度 |
| ------------- | -------------------- | -------- |
| Maven核心特性 | 介绍Maven特性        |          |
| Maven依赖管理 | 依赖包管理及处理过程 |          |
| Maven工程打包 | 常用命令以及打包     |          |

### 定义

项目管理工具，对软件项目提供构建和依赖管理。

Maven是Apache下的java开源项目

Maven为java项目提供了统一的管理方式，已成为业界标准

### 背景

1）工程结构不统一；软件开发有很多ide, eclipse、sun自己开发的ide等等每一种ide创建项目彼此之间没有约定都是不同的 文件夹路径都不同，eclipse开发的项目放到idea中无法加载

2）包查找下载困难；集中管理下载jar包的地方

3）工程打包复杂；java项目打包：.jar(标准java项目)、 .war(发布在web服务器上)

基于上述Maven应运而生

### 安装及配置

准备工作：1）已经安装好jdk 2)系统环境变量配置JAVA_HOME `D:\java\jdk1.8.0_181` 

安装工作：1）[下载](http://maven.apache.org/download.cgi) - Binary zip archive  2）加压缩  3）配置path `D:\apache-maven-3.6.0\bin`  

小tip: 配置了 path可以在全局cmd使用 `nvm -v`（因为D:\apache-maven-3.6.0\bin\mvn.cmd） 

## 新建java工程

groupId: 机构或者团体的英文名称，采用逆向域名形式书写 例如com.jd

ArtifactId: 项目名称，说明其用途，例如： cms、oa...

Version: 版本号，一般采用“版本+单词”形式，例如1.0.0.RELEASE

项目目录结构:

![](E:\self\记录\myNotes\images\java_40.png)

## Maven依赖管理

![](E:\self\记录\myNotes\images\java_45.png)

- 利用dependency(依赖)自动下载、管理第三方Jar

- 在pom.xml文件中配置项目依赖的第三方组件

- 自动将依赖从远程仓库下载至本地仓库，并在工程中引用

- 使用

  ```
      <dependencies>
          <dependency>
              <groupId>junit</groupId>
              <artifactId>junit</artifactId>
              <version>4.11</version>
              <scope>test</scope>
          </dependency>
          ...
       <dependencies>
  
  
  ```

  pom.xml增加此并保持后，自动从[远程仓库](https://search.maven.org/)下载，下载后从下截图位置可见

  ![](E:\self\记录\myNotes\images\java_41.png)

  如果junit本身依赖10个其他包，都会自动下载，但是dependency中无体现

- 本地仓库 VS 中央仓库

  【maven】启动本地maven项目===> 对【pom.xml】加载，分析里边有什么dependency依赖 ===》 在【本地仓库：.m2\repository】查找这些依赖是否存在，查找某个dependency的jar包不存在 ===》【中央仓库：repo.maven.apache.org】下载到【本地仓库：.m2\repository】

  **总是在apache外国官网下载依赖包，太慢了怎么解决？**中央仓库国内也有代理最有名的是[阿里](https://maven.aliyun.com/mvn/guide)的（类似淘宝npm镜像），怎么才能让项目从代理下载

  - 找到代理url

    ![](E:\self\记录\myNotes\images\java_43.png)

  

  - 项目和代理 url关联

    ```
    // pom.xml
    <repositories>
            <!--   创建私服的地址     -->
            <repository>
                <id>aliyun</id>
                <name>aliyun</name>
                <url>https://maven.aliyun.com/repository/public</url>
            </repository>
            ...
        </repositories>
    ```

    

## 项目的运行编译打包

都在这个面板下

| 命令    | 描述           |
| ------- | -------------- |
| clean   | 清除产生的项目 |
| install | 安装至本地     |
| package | 项目打包       |
| compile | 编译源代码     |
| test    | 执行测试用例   |
|         |                |

<img src="E:\self\记录\myNotes\images\java_46.png" style="zoom:80%;" />

## 项目打包

maven通过**maven-assembly-plugin**(plugin插件)将java项目打包为jar、war包

**本讲**

```
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-assembly-plugin</artifactId>
                <version>2.5.5</version>
                <configuration>
                    <!--指定包的入口类-->
                    <archive>
                        <manifest>
                             <mainClass>com.imooc.maven.PinyinTestor</mainClass>
                        </manifest>
                    </archive>
                    <!-- 打包使用的额外参数-->
                    <descriptorRefs>
                        <!-- all in one, 在打包时会将所有引用的jar合并到输出的jar文件中-->
                        <descriptorRef>jar-with-dependencies</descriptorRef>
                    </descriptorRefs>
                </configuration>
            </plugin>

        </plugins>
    </build>
```

![java_44](E:\self\记录\myNotes\images\java_44.png)

**打包后可以运行`jar -jar *.jar`**运行jar包

**最佳实践swm项目**

```

    <!--打包输出的包格式jar|war包:war包-->
    <packaging>war</packaging>
     
    <!--构建-->
    <build>
        <!--打包输出的包名-->
        <finalName>swm</finalName>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.7.0</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.apache.tomcat.maven</groupId>
                <artifactId>tomcat7-maven-plugin</artifactId>
                <version>2.2</version>
                <configuration>
                    <url>http://local.jd.com</url>
                    <port>8073</port>
                    <path>/</path>
                    <contextReloadable>true</contextReloadable>
                </configuration>
            </plugin>
        </plugins>
    </build>

```

## 新建web工程

准备工作：新建 tomcat7

![](E:\self\记录\myNotes\images\java_49.png)