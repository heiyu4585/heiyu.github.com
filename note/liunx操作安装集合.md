# linux
## Linux软件安装目录

##todolist

- zsh mac  软连接配置
- Mac下使用siege做系统压力测试  先安装 安装macports,用dmg方式：


## 文件目录

/usr：系统级的目录，可以理解为C:/Windows/，/usr/lib理解为C:/Windows/System32。

/usr/local：用户级的程序目录，可以理解为C:/Progrem Files/。用户自己编译的软件默认会安装到这个目录下。

/opt：用户级的程序目录，可以理解为D:/Software，opt有可选的意思，这里可以用于放置第三方大型软件（或游戏），当你不需要时，直接rm -rf掉即可。在硬盘容量不够时，也可将/opt单独挂载到其他磁盘上使用。

源码放哪里？

/usr/src：系统级的源码目录。

/usr/local/src：用户级的源码目录。 

## 相关操作
### 查看git安装目录
`查看git安装目录`
###CentOS如何查看端口是被哪个应用/进程占用
netstat -nap #会列出所有正在使用的端口及关联的进程/应用

lsof -i :portnumber #portnumber要用具体的端口号代替，可以直接列出该端口听使用进程/应用

`netstat -lnp|grep 88 `  #88请换为你的apache需要的端口，如：80

`ps 1777 ` //查看相应进程号的程序详细路径

### 内存 cpu占用
 1.CPU占用最多的前10个进程： 

`ps auxw|head -1;ps auxw|sort -rn -k3|head -10 `

2.内存消耗最多的前10个进程 

`ps auxw|head -1;ps auxw|sort -rn -k4|head -10` 

3.虚拟内存使用最多的前10个进程 

`ps auxw|head -1;ps auxw|sort -rn -k5|head -10`

### ln

linux环境下创建和删除软链接

`ln -s /home/zhenwx/htccode-v1/    /home/zhenwx/htccode`

建立/home/zhenwx/htccode-v1 的软连接

linux下的软链接类似于windows下的快捷方式

ln -s /home/zhenwx/htccode-v1/    /home/zhenwx/htccode     中的/home/zhenwx/htccode-v1/就是源文件，/home/zhenwx/htccode      是链接文件名,其作用是当进入/home/zhenwx/htccode     目录，实际上是链接进入了/home/zhenwx/htccode-v1/目录

如上面的示例，当我们执行命令   cd /home/zhenwx/htccode/的时候  实际上是进入了 /home/zhenwx/htccode-v1/

值得注意的是执行命令的时候,应该是/home/zhenwx/htccode-v1/ 目录已经建立，不要创建目录/home/zhenwx/htccode/。

删除软链接：  
   `rm -rf  /home/zhenwx/htccode  注意不是rm -rf  /home/zhenwx/htccode/`



### 文件操作

[文件夹操作]((https://my.oschina.net/junn/blog/137479))
#### 远程推送代码
```
        //         //项目推送
        //     console.log("====== 开始:项目推送 ========");
        //     await dealCommand('rsync -avz -e ssh '+SSRPath+' root@192.168.1.172:/data/test/').then(msg=>{
        //         console.log(msg)
        //     }).catch(err=>{
        //         console.log(err)
        //     });
        //     console.log("====== 完成:项目推送 ========");
```

#### scp 跨机远程拷贝
`$scp root@10.6.159.147:/opt/soft/demo.tar /opt/soft/`
http://linuxtools-rst.readthedocs.io/zh_CN/latest/tool/scp.html

###  删除文件夹
```
var rimraf = require('rimraf');
rimraf('/some/directory', function () { console.log('done'); });
```
#### 删除文件时排除指定文件夹
`ls|grep -v 'd1\|d2'|xargs rm -r`
其他:

```
实现在 /home/user/ 目录中，除了 dir1 和 dir2 目录保留，将其它文件和目录都删除 
查过 rm 命令没有 exclude 参数，我就用了 find 来做排除删除： 

find -maxdepth 1 ! \( -path "/home/user/dir1" -o -path "/home/user/dir2" \) -exec rm -r {} \; 
```

[在删除某处文件时要排除一些目录或文件使用的命令，看看谁的命令更简洁](http://forum.ubuntu.com.cn/viewtopic.php?f=21&t=79442)

### 循环查看文件

 `tail -n 100 -f file.name`
 
 
```
 -f 循环读取

-q 不显示处理信息

-v 显示详细的处理信息

-c<数目> 显示的字节数

-n<行数> 显示行数

--pid=PID 与-f合用,表示在进程ID,PID死掉之后结束. 

-q, --quiet, --silent 从不输出给出文件名的首部 

-s, --sleep-interval=S 与-f合用,表示在每次反复的间隔休眠S秒
```

### 设置文件夹的读写权限:

`sudo chmod -R 777 /data`

权限码描述

```
sudo chmod 600 ××× （只有所有者有读和写的权限）
sudo chmod 644 ××× （所有者有读和写的权限，组用户只有读的权限）
sudo chmod 700 ××× （只有所有者有读和写以及执行的权限）
sudo chmod 666 ××× （每个人都有读和写的权限）
sudo chmod 777 ××× （每个人都有读和写以及执行的权限）

-R表示包含设置所有子目录
```

#### linux 重命名文件和文件夹

* 例子：将目录A重命名为B    `mv A B`
* 例子：将/a目录移动到/b下，并重命名为c `mv /a /b/c`

#### 删除
* ` rm -i *.php`  删除所有后缀为 php 的文档；删除前逐一询问确认
* ` rm -r abcfolder`  将 abcfolder 目录及子目录中所有文件都删除，当文件为只读时，会有提示操作是否删除
* ` rm -rf /var/access`  将会删除 /var/access 目录以及其下所有文件、文件夹，删除时不会有任何删除确认提示

#### 移动:

    * 把当前目录的一个子目录里的文件移动到另一个子目录里
               `mv  文件名/* `  另一个目录
    * 移动当前文件夹下的所有文件到上一级目录
                ` mv * ../`
### 文件编辑

* vim清空文件所有内容

        在命令模式下，首先执行  gg
        这里是跳至文件首行
        再执行：dG
        这样就清空了整个文件！
        光标所在行，dd
        光标所在行以下的N行，Ndd

[VI中的多行删除与复制](https://blog.csdn.net/wallwind/article/details/7633356)
### 目录操作

* 文件移动

        当前目录所有文件移动到上一级目录  mv * ../

        例子：将目录A重命名为  B`mv A B`

        例子：将/a目录移动到/b下，并重命名为c
        mv /a /b/c


## 软件安装
### lrzsz 文件传输
yum -y install lrzsz
rz-y
在Ubuntu 10.10下安装rz、sz有2个方法，分述如下：
方法1：自动安装
1.1 在终端中，输入命令：
sudo apt-get install lrzsz

### 压缩文件解压
 zip命令可以用来将文件压缩成为常用的zip格式。unzip命令则用来解压缩zip文件。

- 我想把一个文件abc.txt和一个目录dir1压缩成为yasuo.zip

`＃ zip -r yasuo.zip abc.txt dir1`

- 我下载了一个yasuo.zip文件，想解压缩：

`# unzip yasuo.zip`

- 我当前目录下有abc1.zip，abc2.zip和abc3.zip，我想一起解压缩它们：

`＃ unzip abc\?.zip`
注释：?表示一个字符，如果用*表示任意多个字符。

- 我有一个很大的压缩文件large.zip，我不想解压缩，只想看看它里面有什么：

`# unzip -v large.zip`

- 我下载了一个压缩文件large.zip，想验证一下这个压缩文件是否下载完全了
`# unzip -t large.zip`

- 我用-v选项发现music.zip压缩文件里面有很多目录和子目录，并且子目录中其实都是歌曲mp3文件，我想把这些文件都下载到第一级目录，而不是一层一层建目录：
`# unzip -j music.zip`

[解压](https://www.cnblogs.com/chinareny2k/archive/2010/01/05/1639468.html)

### nodejs


##### 二进制文件安装(当前选择)
linux安装nodejs有很多种方式，可以下载源码编译安装，可以下载二进制文件，也可以直接使用yum命令安装,这里简单介绍下使用二进制文件的方法
首先下载nodejs二进制文件 下载地址 我们可以选择最新或者稳定的nodejs版本右键复制链接
这里写图片描述

使用wget或curl下载二进制文件

```
wget https://nodejs.org/dist/v9.8.0/node-v9.8.0-linux-x64.tar.xz
tar -xvf node-v9.8.0-linux-x64.tar.xz
cd node-v9.8.0-linux-x64/bin
./node -v
```

在bin目录下既可以看到node的执行文件和npm执行文件的链接了.但是只有配置了环境变量才可以在全局使用node
我们可以通过修改.bashrc文件添加环境变量,在文件最后一行添加下列export，PATH为解压后node执行文件所在的bin目录

```
vim ~/.bashrc 
export PATH=/root/node-v9.8.0-linux-x64/bin:$PATH
```

此时安装已完成，关闭当前终端，再打开新的终端中就可以生效了

或者执行`source ~/.bashrc`命令即可在当前终端中生效


PS：也可以添加软连接将安装目录链接到全局

`ln -s  /usr/local/src/node-v8.11.1-linux-x64/bin/node /usr/local/bin/node`

`ln -s  /usr/local/src/node-v8.11.1-linux-x64/bin/npm /usr/local/bin/npm`


#### 源码编译安装

1、下载源码，你需要在https://nodejs.org/en/download/下载最新的Nodejs版本，本文以v0.10.24为例:

```
cd /usr/local/src/`
wget http://nodejs.org/dist/v8.11.1/node-v8.11.1.tar.gz
```

2、解压源码

` tar zxvf node-v8.11.1.tar.gz`
   
3、 编译安装

```
cd node-v0.10.24
./configure --prefix=/usr/local/node/8.11.1
make
make install
```

4、 配置NODE_HOME，进入profile编辑环境变量
   ` vim /etc/profile`
设置nodejs环境变量，在 export PATH USER LOGNAME MAIL HOSTNAME HISTSIZE HISTCONTROL 一行的上面添加如下内容:
    
```
#set for nodejs
export NODE_HOME=/usr/local/node/8.11.1
export PATH=$NODE_HOME/bin:$PATH
```
:wq保存并退出，编译/etc/profile 使配置生效
    
`source /etc/profile`
    
验证是否安装配置成功
    
`node -v`
  
输出 v0.10.24 表示配置成功
    
npm模块安装路径
    `/usr/local/node/0.10.24/lib/node_modules/`
    注：Nodejs 官网提供了编译好的Linux二进制包，你也可以下载下来直接应用。
    [http://www.runoob.com/nodejs/nodejs-install-setup.html](http://www.runoob.com/nodejs/nodejs-install-setup.html)

[Node.js + MongoDB 开发环境搭建](http://unicornx.github.io/2016/05/25/20160525-nodejs-mongodb-envsetup/)

坑:

`WARNING: failed to autodetect C++ compiler version (CXX=g++)  //需要安装gcc`

`sudo yum install gcc-c++   //安装gcc`


[Centos6.4编译安装Node.js(已验证）](https://www.cnblogs.com/felixzh/p/5822354.html)

#### 使用yum安装

安装nodejs
`yum install -y nodejs`

查看版本
`node -v`

安装node版本管理工具n
`npm install -g n`

升级node为最新稳定版
`n stable`
查看是否升级成功

```
node -v
# 显示最新版本号v8.2.1
```

## 阿里云

[阿里云ECS服务器php运行环境配置全过程](https://blog.csdn.net/panyox/article/details/52240433)

 
[阿里云ECS服务器Linux环境下配置php服务器(一)－－基础配置篇](https://blog.csdn.net/l00149133/article/details/50434004)

wordpress

WordPress备份与恢复

```
/%category%/%post_id%.html
 sudo apt update
sudo /etc/init.d/apache2 restart
service mysql start 
/var/www/html/siyuweb

```

`sudo service apache2 restart`
 


[利用301跳转设置不带www域名跳转到www域名下](http://www.ziyouwu.com/archives/306.html) 


```
	<IfModule mod_rewrite.c>
	RewriteEngine On
	RewriteBase /
	RewriteRule ^index\.php$ - [L]
	RewriteCond %{REQUEST_FILENAME} !-f
	RewriteCond %{REQUEST_FILENAME} !-d
	RewriteRule . /index.php [L]
	</IfModule>
```


### git

[如何在CentOS 6.x/7.x上安装git及最新](https://my.oschina.net/antsky/blog/514586)

	` yum info git`
	
	`yum install -y git`
	
	`git --version`

注意：如果安装完查看版本不是我们安装的最新版，请重新执行下面的操作

```
	# yum remove -y git
	# source /etc/bashrc
	# git --version
```

[node项目部署——阿里云centos部署git服务](https://www.jianshu.com/p/d7713fbd3e5d)

###  centos安装jenkins
Jenkins是开源的,使用Java编写的持续集成的工具，在Centos上可以通过yum命令行直接安装。记录下安装的过程，方便以后查找。需要先安装Java,如果已经Java可以跳过该步骤。

####安装Java
看到当前系统Java版本的命令:

`java -version`

如果显示Java版本号，说明已经正确安装，如果显示没有该命令，需要安装Java：

`sudo yum install java`

该命令如果检测到Java不存在可以直接安装Java,如果已存在则可以升级Java。

#### 安装Jenkins
首先要先添加`Jenkins`源:

```
sudo wget -O /etc/yum.repos.d/jenkins.repo http://jenkins-ci.org/redhat/... 
sudo rpm --import http://pkg.jenkins-ci.org/red...
```

添加完成之后直接使用yum命令安装Jenkins:

`yum install jenkins`

####启动Jenkins

使用命令启动`Jenkins`:

```
sudo service jenkins start
Starting Jenkins                                           [  OK  ]
```
在浏览器中输入：`http://<服务器ip>:8080/` 就可以进入Jenkins界面直接使用了 。
停止Jenkins服务的命令为：

`sudo service jenkins stop`

####相关配置
Jenkins安装目录：

 `/var/lib/jenkins/`
 
Jenkins配置文件地址：

`/etc/sysconfig/jenkins`
这就是Jenkins的配置文件，可以在这里查看Jenkins默认的配置。

`cat jenkins`

这里介绍下三个比较重要的配置：

```
JENKINS_HOME

JENKINS_USER

JENKINS_PORT

```

JENKINS_HOME是Jenkins的主目录，Jenkins工作的目录都放在这里,Jenkins储存文件的地址,Jenkins的插件，生成的文件都在这个目录下。

```
## Path:        Development/Jenkins
## Description: Jenkins Continuous Integration Server
## Type:        string
## Default:     "/var/lib/jenkins"
## ServiceRestart: jenkins
#
# Directory where Jenkins store its configuration and working
# files (checkouts, build reports, artifacts, ...).
#JENKINS_HOME="/var/lib/jenkins"

```

JENKINS_USER 是Jenkins的用户，拥有$JENKINS_HOME和/var/log/jenkins的权限。


	## Type:        string
	## Default:     "jenkins"
	## ServiceRestart: jenkins
	#
	# Unix user account that runs the Jenkins daemon
	# Be careful when you change this, as you need to update
	# permissions of $JENKINS_HOME and /var/log/jenkins.
	#JENKINS_USER="jenkins"


JENKINS_PORT 是Jenkins的端口，默认端口是8080。

```
	## Type:        integer(0:65535)  
	## Default:     8080
	## ServiceRestart: jenkins
	## Port Jenkins is listening on.
	# Set to -1 to disable
	#JENKINS_PORT="8080"
```

#### jenkins 自定义项目路径和jenkins根目录

1.自定义项目路径：

进入job-配置-高级项目选项-选择使用“自定义的工作空间”，配置后项目不用放到jenkins默认的workspace里了。
![jenkins设置工作空间](https://img-blog.csdn.net/20140327113426578?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZWxldmVuNTIx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)


### php开发环境



## 遇到的问题
#### Apache禁止访问目录，但其下的文件仍可以访问

<Files *>
 Options -Indexes
</Files>


#### ERROR: Failed to clean the workspace java.io.IOException: Unable to delete. Tried 3 times (of a maximum of 3) waiting 0.1 sec between

1.安装git,及配置git

2.打开对应目录的读写权限

3.SSH key 配置

#### Error: EACCES: permission denied, access '/usr/local/lib/node_modules' npm ERR! at Error (native)

在linux环境中安装package.json中的相关node_modules时，会报如下错误：
   ` Error: EACCES: permission denied`
意思是，当前用户没有写入权限，这是因为有些node_modules在安装时，需要创建一些目录，或者写入一些文件
 
解决方案 
 
	1.通过 sudo npm install 安装即可；
	2.可能会提示 sudo: npm: command not found 错误；
	3.解决办法是
` sudo ln -s /usr/local/bin/npm /usr/bin/npm ` 
 `sudo ln -s /usr/local/bin/node /usr/bin/node`    
 
####  sudo：抱歉，您必须拥有一个终端来执行 sudo 
 
 方案1. ssh 添加 -t 选项

方案2. 执行sudo的机器上，编辑 /etc/sudoer ,注释掉：

```
Defaults    requiretty
Defaults    requiretty
```

#### `Using unique option prefix myisam-recover instead of myisam-recover-options is deprecated and will be removed in a future release. Please use the full name instead.`

启动时日志中有这个警告的：
[`Warning] Using unique option prefix myisam-recover instead of myisam-recover-options is deprecated and will be removed in a future release. Please use the full name instead.`
根据提示，只需修改配置文件 /etc/mysql/my.cnf 中 参数名 myisam-recover  为  myisam-recover-options  即可 ，就是在后面追加 -options  ，变成全称即可。改完保存重启服务。

附：
```
# This replaces the startup script and checks MyISAM tables if needed
# the first time they are touched
myisam-recover-options         = BACKUP 

```

####  Plugin 'FEDERATED' is disabled.

```
170902 20:48:29 [Note] Plugin 'FEDERATED' is disabled.
170902 20:48:29 InnoDB: The InnoDB memory heap is disabled
170902 20:48:29 InnoDB: Mutexes and rw_locks use GCC atomic builtins
170902 20:48:29 InnoDB: Compressed tables use zlib 1.2.8
170902 20:48:29 InnoDB: Using Linux native AIO
170902 20:48:30 InnoDB: Initializing buffer pool, size = 128.0M
InnoDB: mmap(137363456 bytes) failed; errno 12
170902 20:48:30 InnoDB: Completed initialization of buffer pool
170902 20:48:30 InnoDB: Fatal error: cannot allocate memory for the buffer pool
170902 20:48:30 [ERROR] Plugin 'InnoDB' init function returned error.
170902 20:48:30 [ERROR] Plugin 'InnoDB' registration as a STORAGE ENGINE failed.
170902 20:48:30 [ERROR] Unknown/unsupported storage engine: InnoDB
170902 20:48:30 [ERROR] Aborting

170902 20:48:30 [Note] /usr/sbin/mysqld: Shutdown complete


[mysqld]
federated
```

