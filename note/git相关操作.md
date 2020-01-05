#git 

# git相关操作


###  提交了一个更新,如何撤销 add

`git reset XX`
### Git撤销 git commit 但是未git push的修改
找到上次git commit的 id

` git log  `

     找到你想撤销的commit_id

 `git reset --hard commit_id`

      完成撤销,同时将代码恢复到前一commit_id 对应的版本。

`git reset commit_id `

     完成Commit命令的撤销，但是不对代码修改进行撤销，可以直接通过git commit 重新提交对本地代码的修改。


### 撤销 到远端的commit
先在本地回退到相应的版本：

`git reset --hard <版本号>`
// 注意使用 --hard 参数会抛弃当前工作区的修改
// 使用 --soft 参数的话会回退到之前的版本，但是保留当前工作区的修改，可以重新提交

如果此时使用命令：

`git push origin <分支名>`

会提示本地的版本落后于远端的版本；

```
On branch master
Your branch is behind 'origin/master' by 3 commits, and can be fast-forwarded.
  (use "git pull" to update your local branch)
nothing to commit, working tree clean
bogon:testTest allin$ git push origin master
To http://192.168.1.78/wangning/testTest.git
 ! [rejected]        master -> master (non-fast-forward)
error: failed to push some refs to 'http://192.168.1.78/wangning/testTest.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.

```

为了覆盖掉远端的版本信息，使远端的仓库也回退到相应的版本，需要加上参数--force

`git push origin <分支名> --force`


2. 分支合并后,如何撤销

```
方法一，reset 到 merge 前的版本，然后再重做接下来的操作，要求每个合作者都晓得怎么将本地的 HEAD 都回滚回去：

$ git checkout 【行merge操作时所在的分支】
$ git reset --hard 【merge前的版本号】
```
https://segmentfault.com/q/1010000000140446

4. --rebase 作用



5.git status -s -s的作用是什么  有些提示 MADU




问题:
1. Gitlab强制推送提示"You are not allowed to force push code to a protected branch on this project." #11
2. 
https://github.com/LeachZhou/blog/issues/11


## 使用git克隆指定分支的代码
使用Git下载指定分支命令为：

`git clone -b 分支名仓库地址 `

使用Git下载v.2.8.1分支代码，使用命令：

`git clone -b v2.8.1 https://git.oschina.net/oschina/android-app.git`

## Linux下 保存 git账号密码
- 在~/下， touch创建文件 .git-credentials, 用vim编辑此文件，输入内容格式：

```
touch .git-credentials
vim .git-credentials
```
- 在里面按“i”然后输入：

` https://{username}:{password}@github.com`

比如 https://account:password@github.com

在终端下执行

`git config --global credential.helper store`

可以看到~/.gitconfig文件，会多了一项：(没出现呢)

```
[credential] 
helper = store
``` 
- 删除保存的密码：

1、删除保存的密码

`git credential-osxkeychain erase`

or:

`printf "protocol=https\nhost=github.com\n" | git credential-osxkeychain erase`

2、删除密码文件

`rm ~/.git-credentials`

## gitlab配置ssh密钥及简单使用


## 服务器安装 git ssh 不用每一次都输入密码  
Linux下 保存 git账号密码
在~/下， touch创建文件 .git-credentials, 用vim编辑此文件，输入内容格式：
touch .git-credentials
vim .git-credentials
在里面按“i”然后输入：
https://{username}:{password}@github.com

比如 https://account:password@github.com

在终端下执行

git config --global credential.helper store

可以看到~/.gitconfig文件，会多了一项：(没出现呢)

[credential] 
helper = store


##参考资料

[learngitbranching.js.org](http://learngitbranching.js.org/?demo)