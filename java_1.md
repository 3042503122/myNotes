### mySql提供的工具函数

- IFNULL(列名, 默认值)
- DATEDIFF(NOW(), 日期列名)：NOW当前日期 - 日期别名



### DML

数据操作语言

#### 添加

#### 修改

#### 删除

#### 查询

子句执行顺序：from -> where  -> select  -> oderby -> limit

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

  

| 简单查询   | `SELECT ... FROM ... `                                       | `SELECT * From t_emp` 、 `SELECT empno,ename From t_emp`、<br/>`SELECT empno,ename,sal*12 AS "income" From t_emp` |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 数据分页   | `SELECT ... FROM ... LIMIT 起始位置,偏移量 `                 | `SELECT empno,ename From t_emp LIMIT 0,10`                   |
| 结果集排序 | `SELECT ... FROM ... ORDER BY 列名 [ASC|DESC],列名 [ASC|DESC],。。。 `
如果不写[ASC\|DESC]默认ASC | `SELECT empno,ename,sal From t_emp ORDER BY SAL`<br/>`SELECT empno,ename,sal From t_emp ORDER BY SAL,ename ASC` |
| 结果集去重 | `SELECT DISTINCT 列名 FROM ... LIMIT`<br/>使用distinct的select子句中只能查询一列数据，如果查询多列去重记录就会失效 | `SELECT DISTINCT job From t_emp`                             |
| 条件查询   | `SELECT ... FROM ...WHERE 条件 [AND|OR] 条件 。。。 `        | 查询10部门里工资大于2000的员工信息<br/>SELECT ename,empno,sal <br/>From t_emp<br/>WHERE deptno=10 AND sal>=2000; <br/><br/>查询10部门和20部门里工资大于2000的员工信息<br/>SELECT ename,deptno,sal <br/>From t_emp<br/>WHERE (deptno=10 OR deptno=20) AND sal>=2000; |



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

