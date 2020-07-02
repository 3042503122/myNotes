# 新手入门

## 首页

**进入**

登录后的页面 或者 点击左侧小猫

![](E:\self\mahongluRecord\notes\images\github_3.png)

**首页 - 仓库**

![](E:\self\mahongluRecord\notes\images\github_4.png)







## 仓库

文件列表第一行信息为：最新提交人、提交备注及commit id。



![](E:\self\mahongluRecord\notes\images\github_1.jpg)



### 提交历史

1. 进入仓库**Code**页，点击仓库描述及标签下方的**commits或提交**按钮。

   ![](E:\self\mahongluRecord\notes\images\github_5.png)

2. 即可查看整个仓库的提交历史。在提交历史页，您可以切换分支来查看不同分支的提交历史。 ![img](E:\self\mahongluRecord\notes\images\github_6.png)

3. 同时，针对某一提交历史，您还可复制commit-id，点击commit-id进入提交历史文件对比页。 ![img](E:\self\mahongluRecord\notes\images\github_7.png)

4. 除此之外，你还可点击右侧的**< >**按钮，进入对应的commit-id的文件列表页。 ![img](E:\self\mahongluRecord\notes\images\github_8.png)



### 分支列表

1. 进入仓库**Code**页，点击仓库描述及标签下方的**branches或分支**按钮。 ![img](E:\self\mahongluRecord\notes\images\github_9.png)
2. 即可查看整个仓库的分支列表。概述中包括仓库的默认分支、活跃分支及陈旧分支。 ![img](E:\self\mahongluRecord\notes\images\github_10.png)
3. 点击**活跃分支**，即可查看三个月内有过提交的所有活跃分支。 ![img](E:\self\mahongluRecord\notes\images\github_11.png)
4. 点击**陈旧分支**，即可查看三个月内没有提交的所有活跃分支。 ![img](E:\self\mahongluRecord\notes\images\github_12.png)



### 标签列表

1. 进入仓库**Code**页，点击仓库描述及标签下方的**tags或标签**按钮。 ![img](E:\self\mahongluRecord\notes\images\github_13.png)
2. 即可查看整个仓库的标签列表。 ![img](E:\self\mahongluRecord\notes\images\github_14.png)
3. 除此之外，点击某一标签的commit-id，即可查看对应的文件对比页。点击下载按钮还可下载源码。 ![](E:\self\mahongluRecord\notes\images\github_15.png)



## 合并请求	



## 高级搜索





# github上设置添加SSH

https://www.cnblogs.com/chuyanfenfei/p/8035067.html

> 当输入ssh -T git@github.com验证与github连接是否成功时，出现Permission denied (publickey)

```
这种情况一般是因为生成秘钥文件时对文件进行了重命名，然而你自定义的这个名字并没有和ssh内部规定的名字保持一致，所以使用ssh -T git@github.com报错Permission denied (publickey).。解决方法如下：

先执行：ssh-agent bash （一定要先执行这一步！）
再执行：ssh-add ~/.ssh/xxx （xxx为你想要用的文件名）

```

~~https://blog.csdn.net/wang975380547/article/details/78116070~~



# github上新增项目并用SSH 操作

1. ”github上设置添加SSH“   上面步骤
2. github上新建空项目
3. git clone到本地
4. 将本地项目内容剪切到克隆的项目里



# 删除github上项目（repository）

1. 点击settings

   ![](E:\self\记录\myNotes\images\github_1.png)

2. delete

   ![](E:\self\记录\myNotes\images\github_2.png)

# 新建仓库将项目

### 推送现有空的存储库

建好空的仓库：https://coding.jd.com/mahonglu/cshop4B.git

在项目文件夹里面执行下列命令

git init 
git remote add origin https://coding.jd.com/mahonglu/cshop4B.git 
git add . 
git commit -m "Initial commit" 
git push -u origin master 