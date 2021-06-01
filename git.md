# 版本管理

```
//自增小版本 1.2.0 =》1.2.1
npm run release

//重定义大版本 1.2.0 =》1.4.0、1.4.1
npm run release --release-as v1.4.0

//查看tag列表
git tag

//取消本地更改
git reset HEAD^
```



# 规范提交信息

[书写良好的 commit message](https://loveky.github.io/2018/06/04/write-good-commit-message/)

```
<type>[optional scope]: <description>
```

## type

用于表明我们这次提交的改动类型，是新增了功能？还是修改了测试代码？又或者是更新了文档？开源社区目前总结出了以下 11 种类型：

- build：主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
- ci：主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
- docs：文档更新
- feat：新增功能
- fix：bug 修复
- perf：性能优化
- refactor：重构代码(既没有新增功能，也没有修复 bug)
- style：不影响程序逻辑的代码修改(修改空白字符，补全缺失的分号等)
- test：新增测试用例或是更新现有测试
- revert：回滚某个更早之前的提交
- chore：不属于以上类型的其他类型

## optional scope 可选值

一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块。根据项目实际情况填写即可，最好在项目中规定好模块列表，保持一致性。



## description

一句话描述此次提交的主要内容，做到言简意赅。



# .gitignore

## 官网

https://git-scm.com/docs/gitignore

# 小技巧

## git查看项目地址

```
git remote -v
```



## git撤销commit，但未git push的命令

在git push的时候，有时候我们会想办法撤销git commit的内容 
1、找到之前提交的git commit的id 
git log 
找到想要撤销的id 
2、git reset –hard id 
完成撤销,同时将代码恢复到前一commit_id 对应的版本 
3、git reset id 
完成Commit命令的撤销，但是不对代码修改进行撤销，可以直接通过git commit 重新提交对本地代码的修改

## 撤销 merge

```
git merge --abort
```



- 某一文件夹或者某一文件回退到某次提交时**

  1. 例：文件夹  pages/pingoulist

     下面有

      pages/pingoulist/pingoulist.js

      pages/pingoulist/pingoulist.json

      pages/pingoulist/pingoulist.wxml

      pages/pingoulist/pingoulist.wxss

     想回退pingoulist文件夹到某次提交，没有针对文件夹操作，只针对文件，所以gitLens逐一查看

     pingoulist.js: 3个月前提交

     pingoulist.json: 3个月前提交

     pingoulist.wxml: 1个月前提交

     pingoulist.wxss: 3个月前提交

     由此得出wxml是最近的上次提交，拷贝该Commit ID (cf1135b87396ebe2607283ba5724c24ec9daca00),

     ```
     git reset cf1135b87396ebe2607283ba5724c24ec9daca00 pages/pingoulist/
     ```

     执行完后

     回退内容在：暂存区（提交）

     本地内容：在更改区（放弃本地修改）

  2. 例：文件pingoulist.wxml

     ```
     git reset cf1135b87396ebe2607283ba5724c24ec9daca00 pages/pingoulist/pingoulist.wxml
     ```

     

  ​	



- fatal: Authentication failed for

  <https://blog.csdn.net/qq_34665539/article/details/80408282>



- 场景：下载远程分支代码

  ```
git checkout -b 分支
  ```
  
  

- 场景：为什么每次提交代码都要输入用户名密码

  [参考]: https://blog.csdn.net/gdutxiaoxu/article/details/79253737

  ```
  git config --global user.name "xujun"  
  git config --global user.email “gdutxiaoxu@163.com"
git config --global credential.helper store
  ```

- 场景：我如何看到所有分支（包括远程未下载的分支）

  ```
  git branch -a
  ```

  

- 场景一：完蛋 我push了代码， 但是我没更新代码pull, 覆盖了前一次别人提交的东西**

  > step1:查看上一次的commit号(855aa9bc)

  ```
  git log
  ```

  >  step2:切换本地仓库到 commit号(855aa9bc)

  ```
  git reset --hard 855aa9bc
  ```

  >  step3：强推到线上

  ```
  git push orgin HEAD --force
  ```

  

- **场景一：我想把分支publish_1.0 merge 到分支publish_2.0**

  > step1: publish_2.0

  vscode方式

  >  step2:merge

  ```
  git merge publish_1.0
  ```

  

- **场景三： 威哥增加了commit校验，我总提交不上去**

  > step1:

  ```
  git commit -m "fix(build): 批量物流单号"  --no-verify
  ```

  

- **场景四：我正在publish_1分支上修改东西时，要切换到publish_2分支上看东西，这两个分支上的切换很频繁，难道每次我都要在publish_1分支上先commit再切换到 publish_2上吗？？？ 如果这样做我改一个问题时，commit多次，我想撤销前几次commit，合并到最后一次改完再commit, 怎么办？？？**

  上述改一个分支时，频繁切换其他分支这种情况不应该commit用stash

  > step1:  publish_1修改后，切换分支前

  ```
  git stash
  ```

  > step2:  切换到publish_2后，切换到publish_1恢复刚才修改

  ```
  git stash apply
  ```

- gitbash提交

  ```
  git pull
  git add .
  git commit -m '信息'
  git push
  ```

  git add 提交缓存的流程太过繁琐，Git 也允许你用 -a 选项跳过这一步

  ```
  git pull
  git commit -am '信息'
  git push
  ```

- 场景：**如果push上去了，已经覆盖了线上的代码，就需要先用git revert + 版本号 或者 HEAD(回到上一个push的版本)，将线上的代码回滚**
  1. vscode git graph扩展工具 -》右键 reset（本地重置）
  2. 线上重置`git push -u origin master -f`