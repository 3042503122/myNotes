

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

# 数据库

## MySQL数据库安装与初始化

### 下载

[下载**Windows (x86, 32-bit), MSI Installer** ](https://dev.mysql.com/downloads/windows/installer/8.0.html)

![](E:\self\记录\myNotes\images\mysql_1.png)

### 安装

![](E:\self\记录\myNotes\images\mysql_2.png)

![](E:\self\记录\myNotes\images\mysql_3.png)

后边都是【finish】 => 【next】

那么安装到什么位置了呢？？？`C:\Program Files\MySQL\MySQL Server 8.0`

### 系统环境变量=》全局命令

`C:\Program Files\MySQL\MySQL Server 8.0\bin`里边打开看一下？？？里边都是管理mySql指令，可以执行的命令

<img src="E:\self\记录\myNotes\images\mysql_4.png" style="zoom:67%;" />

验证：

<img src="E:\self\记录\myNotes\images\mysql_5.png" style="zoom: 80%;" />

### mysql客户端

安装mysql时，我们不安装mysql shell(mysql客户端) 因为实在不好用，我们安装**HeidiSQL**

- 调出来操作面板

  【新建查询】

  <img src="E:\self\记录\myNotes\images\mysql_6.png" style="zoom:80%;" />

## 数据类型

![](E:\self\记录\myNotes\images\mysql_9.png)

![](E:\self\记录\myNotes\images\mysql_8.png)

## mySql提供的工具函数

- IFNULL(列名, 默认值)
- DATEDIFF(NOW(), 日期列名)：NOW当前日期 - 日期别名

## SQL语言



### SQL语句注意事项

- SQL语句不区分大小写，但是字符串区分大小写

  ```
  SELECT "HelloWorld";
  ```

- SQL语句必须以分号结尾

- SQL语句中的空白和换行没有限制，但是不能破坏语法

- SQL语句的注释

  ```
  # 这是单行注释
  /*多行注释*/
  ```

  

### DML

数据操作语言

#### 添加

#### 修改

#### 删除

#### 查询

子句执行顺序：from -> where  -> select  -> oderby -> limit

| 简单查询   | `SELECT ... FROM ... `                                       | `SELECT * From t_emp` 、 `SELECT empno,ename From t_emp`、<br/>`SELECT empno,ename,sal*12 AS "income" From t_emp` |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 数据分页   | `SELECT ... FROM ... LIMIT 起始位置,偏移量 `                 | `SELECT empno,ename From t_emp LIMIT 0,10`                   |
| 结果集排序 | `SELECT ... FROM ... ORDER BY 列名 [ASC|DESC],列名 [ASC|DESC],。。。 `不写[ASC\|DESC]默认ASC | `SELECT empno,ename,sal From t_emp ORDER BY SAL`<br/>`SELECT empno,ename,sal From t_emp ORDER BY SAL,ename ASC` |
| 结果集去重 | `SELECT DISTINCT 列名 FROM ... LIMIT`<br/>使用distinct的select子句中只能查询一列数据，如果查询多列去重记录就会失效 | `SELECT DISTINCT job From t_emp`                             |
| 条件查询   | `SELECT ... FROM ...WHERE 条件 [AND|OR] 条件 。。。 `        | 查询10部门里工资大于2000的员工信息<br/>SELECT ename,empno,sal <br/>From t_emp<br/>WHERE deptno=10 AND sal>=2000; <br/><br/>查询10部门和20部门里工资大于2000的员工信息<br/>SELECT ename,deptno,sal <br/>From t_emp<br/>WHERE (deptno=10 OR deptno=20) AND sal>=2000; |



- 简单查询(select from)

  无条件查询记录，字段的计算和字段的别名

  ![](E:\self\记录\myNotes\images\mysql_11.png)

- 高级查询(limit orderby  distinct)

  - 分页

    如果排序列是①数字类型，数据库就按照数字大小排序；②日期类型就按照日期大小排序；③字符串就按照首字符集序号排序

  - 结果集排序

  - 结果集去重

    背景：数据库第二范式：唯一性 要求没张表都要有主键字段，所以数据库不可能有完全相同的记录的。但是结果集就不一样了

    <img src="E:\self\记录\myNotes\images\mysql_12.png" style="zoom:80%;" />

- 条件查询(where)

  **背景：**很多时候，用户感兴趣的并不是逻辑表里的全部记录，而只是它们当中能够满足某一种条件或某几种条件的记录。这类条件要用到where字句来实现数据筛选

  **注意：**

  1)where字句中，条件执行的顺序是从左到右的。所以我们应该把索引条件或者筛选记录最多的条件写在最左边

  **注意：**无论什么值和null运算都是NULL，怎么办用`IFNULL函数`

  ```
  // 如果值为NULL时，则设置值为0
  IFNULL(列名, 0)
  ```

  ![](E:\self\记录\myNotes\images\mysql_13.png)

  条件表达式( () )、

  数学运算符(+ - * / %)、

  比较运算符(IN包含 > >= < <= = !=)、

  | 表达式       | 用法       | 例子                         |
  | ------------ | ---------- | ---------------------------- |
  | IS NULL      | 为空       | `comm IS NULL`               |
  | IS NOT NULL  | 不为空     | `comm IS NOT NULL`           |
  | BETEWEEN AND | 范围       | `sal BETEWEEN 2000 AND 3000` |
  | LIKE         | 模糊查询   | `ename LIKE “A%”`            |
  | REGEXP       | 正则表达式 | `ename REGEXP "[a-zA-Z]{4}"` |

  

  逻辑运算符

  | 表达式 | 用法                                                         | 例子                          |
  | ------ | ------------------------------------------------------------ | ----------------------------- |
  | AND    | 与                                                           | `age > 18 AND sex = "男"`     |
  | OR     | 或                                                           | `empno = 8000 OR deptno = 20` |
  | NOT    | 非                                                           | `NOT deptno = 20`             |
  | XOR    | 异或(只要运算符左右两边任意一个为真，另一个为假，则结果为真) | `age > 18 XOR sex = "男"`     |

  按位运算符(二进制)：& | ~ ^ << >>

准备工作导入表(不用自己新建表和数据)

step1: 新建数据库

step2: 导入

<img src="E:\self\记录\myNotes\images\mysql_10.png" style="zoom:80%;" />

### DCL

数据控制语言

- 用户
- 权限
- 事务

### DDL

数据定义语言，没操作数据库

```
use 数据库名

ALTER TABLE 表名称
```



#### 逻辑库

| 创建数据库     | `CREATE DATABASE 数据库名称` |
| -------------- | ---------------------------- |
| 显示所有数据库 | `SHOW DATABASES`             |
| 删除数据库     | `DROP DATABASE 数据库`       |

<img src="E:\self\记录\myNotes\images\mysql_7.png" style="zoom:80%;" />

#### 数据表

| 创建                                             | CREATE TABLE 数据表名 () []  |
| ------------------------------------------------ | ---------------------------- |
| 显示某数据库下边所有表                           | `SHOW TABLES`                |
| 显示创建某一表时的sql语句                        | `SHOW CREATE TABLE 数据表名` |
| 显示某一表的表头信息(即：创建表时的列信息可视化) | `DESC 数据表名`              |
| 删除数据表                                       | `DROP TABLE 数据表名`        |
| 增加列                                           | ADD                          |
| 修改列                                           | MODIFY                       |
| 修改列key名+列                                   | CHANGE                       |
| 删除列                                           | DROP                         |

```
// 要加上使用哪个数据库
use 数据库名;

// []可选项，即可写可不写
CREATE TABLE 数据表 (
  列名1 数据类型 [约束] [COMMENT 注释],
  列名1 数据类型 [约束] [COMMENT 注释],
  ......
) [COMMENT = 注释]

// 举个栗子

CREATE TABLE table1 (
	id INT NOT NULL PRIMARY KEY,
	num DECIMAL(10,2) NULL DEFAULT NULL
)
```

```
// 修改表结构
ALTER TABLE 表名称

ADD 列名1 数据结构 [约束] [COMMENT 注释],
ADD 列名2 数据结构 [约束] [COMMENT 注释],
......;

// 举个栗子
ALTER table table1
ADD address VARCHAR(200) NOT NULL,
ADD home_tel VARCHAR(200) NOT NULL;
```

```
// 修改表结构
ALTER TABLE 表名称

MODIFY 列名1 数据结构 [约束] [COMMENT 注释],
MODIFY 列名2 数据结构 [约束] [COMMENT 注释],
......;

// 举个栗子
ALTER table table1
MODIFY address VARCHAR(100) NOT NULL,
MODIFY home_tel VARCHAR(11) NOT NULL;
```

```
// 修改表结构
ALTER TABLE 表名称

CHANGE 列名1 数据结构 [约束] [COMMENT 注释],
CHANGE 列名2 数据结构 [约束] [COMMENT 注释],
......;

// 举个栗子
ALTER table table1
CHANGE address home_address VARCHAR(200) NOT NULL,
CHANGE home_tel moblie VARCHAR(11) NOT NULL;
```

```
// 修改表结构
ALTER TABLE 表名称

DROP 列名1,
DROP 列名2,
......;

// 举个栗子
ALTER table table1
DROP home_address,
DROP moblie;
```



- 视图

- 索引



## 约束

### 数据库范式

- 构造数据库必须遵循一定的规则，这种规则就是范式
- 目前关系数据库有6种范式，一般情况下，只满足第三范式即可
  - 第一范式：原子性。此是数据库的基本要求，不满足这一点就不是关系数据库
  - 第二范式：唯一性。数据库中的每条记录必须是唯一的，为了实现区分，通常要为表加上一个列用来存储唯一标识，这个唯一属性被称作主键列
  - 第三范式：关联性。每列都与主键有直接关系，不存在传递依赖

### 4种约束

| 主键约束 | PRIMARY KEY | 字段值唯一，且不能为NULL。<br/>一定要使用数字，因为数字的检索速度会非常快。<br/>可以设置自动增长`AUTO_INCREMENT` | `id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT ` |
| -------- | ----------- | ------------------------------------------------------------ | --------------------------------------------- |
| 非空约束 | NOT NULL    | 字段值不能为NULL。<br/>NULL意思是没有值，而不是“”空字符串。<br/>希望NULL时自动补上默认值 `DEFAULT 默认值` | `birthday DATE NOT NULL `                     |
| 唯一约束 | UNIQUE      | 字段值唯一，且可以为NULL                                     |                                               |
| 外键约束 | FOREIGE KEY | 保持关联数据的逻辑性                                         |                                               |

- `UNSIGNED`(无符号，只能是正，例如20)和`SIGN`(默认，有符号，例如20、-20)用来修饰整型

## 索引运行机制和使用原则

- 排序为什么可以提高数据检索速度？一旦数据排序之后，查找速度就会翻倍，现实世界跟程序世界都是如此

  如你查找一个op开头单词，第一步肯定锁定到o开头，之后查找op范围，若是乱序肯定不好查找相当于全表查找

- 怎么创建、删除、修改索引

  | 新建表时：创建索引 | `INDEX time_index time`                          |
  | ------------------ | ------------------------------------------------ |
  | 表已存在：创建索引 | `CREATE INDEX time_index ON t_table(time)`       |
  | 表已存在：删除索引 | `DROP INDEX time_index ON t_table`               |
  | 表已存在：修改索引 | `ALERT TABLE t_table ADD INDEX time_index(time)` |
  | 打印表索引         | `SHOW INDEX From t_table`                        |

  新建表时创建

  ```
  CREATE TABLE 表名称(
    ...
    INDEX [索引名称] (字段), // 对某字段名称
    ...
  )
  
  // 举个栗子
  CREATE TABLE t_message(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    content VARCHAR(200) NOT NULL,
    type ENUM("公告","通报","个人通知") NOT NULL,
    time TIMESTAMP NOT NULL,
    INDEX type_index(type)
  )
  ```

  表已经存在

  ```
  DROP INDEX type_index on t_message;
  
  CREATE INDEX type_inex on t_message(type);
  
  ALTER TABLE t_message ADD INDEX idx_type(type);
  ```

  

- 什么条件下使用索引

  - 数据量很大 & 经常被查询
  - 索引只添加在经常被用做索引条件的字段上（如前端的查询条件）
  - 不要在大字段上创建索引（例如超过50个字符）

