#git 
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
