## 相关操作
### [文件夹操作](https://my.oschina.net/junn/blog/137479)

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

* 删除整个文件

        ggVG
        稍微解释一下上面的命令

        gg 让光标移到首行，在vim才有效，vi中无效

        `V   是进入Visual(可视）模式

        G  光标移到最后一行

        选中内容以后就可以其他的操作了，比如：

        d 删除选中内容

        y  复制选中内容到0号寄存器

        "+y  复制选中内容到＋寄存器，也就是系统的剪贴板，供其他程序用

### 目录操作

* 文件移动

        当前目录所有文件移动到上一级目录  mv * ../

        例子：将目录A重命名为  B`mv A B`

        例子：将/a目录移动到/b下，并重命名为c
        mv /a /b/c


## 软件安装
### 在Linux上安装lrzsz
    yum -y install lrzsz
    rz-y
    在Ubuntu 10.10下安装rz、sz有2个方法，分述如下：
    方法1：自动安装
    1.1 在终端中，输入命令：
    sudo apt-get install lrzsz
### [解压](https://www.cnblogs.com/chinareny2k/archive/2010/01/05/1639468.html)
    zip命令可以用来将文件压缩成为常用的zip格式。unzip命令则用来解压缩zip文件。
    1. 我想把一个文件abc.txt和一个目录dir1压缩成为yasuo.zip：
    ＃ zip -r yasuo.zip abc.txt dir1
    2.我下载了一个yasuo.zip文件，想解压缩：
    # unzip yasuo.zip
    3.我当前目录下有abc1.zip，abc2.zip和abc3.zip，我想一起解压缩它们：
    ＃ unzip abc\?.zip
    注释：?表示一个字符，如果用*表示任意多个字符。
    4.我有一个很大的压缩文件large.zip，我不想解压缩，只想看看它里面有什么：
    # unzip -v large.zip
    5.我下载了一个压缩文件large.zip，想验证一下这个压缩文件是否下载完全了
    # unzip -t large.zip
    6.我用-v选项发现music.zip压缩文件里面有很多目录和子目录，并且子目录中其实都是歌曲mp3文件，我想把这些文件都下载到第一级目录，而不是一层一层建目录：
    # unzip -j music.zip
### 安装mysql
#### linux CentOS6.5 yum安装mysql 5.6
    1.新开的云服务器，需要检测系统是否自带安装mysql
    # yum list installed | grep mysql

    2.如果发现有系统自带mysql，果断这么干
    # yum -y remove mysql-libs.x86_64

    3.随便在你存放文件的目录下执行，这里解释一下，由于这个mysql的yum源服务器在国外，所以下载速度会比较慢，还好mysql5.6只有79M大，而mysql5.7就有182M了，所以这是我不想安装mysql5.7的原因
    # wget http://repo.mysql.com/mysql-community-release-el6-5.noarch.rpm

    4.接着执行这句,解释一下，这个rpm还不是mysql的安装文件，只是两个yum源文件，执行后，在/etc/yum.repos.d/ 这个目录下多出mysql-community-source.repo和mysql-community.repo
    # rpm -ivh mysql-community-release-el6-5.noarch.rpm

    5.这个时候，可以用yum repolist mysql这个命令查看一下是否已经有mysql可安装文件
    #yum repolist all | grep mysql

    6.安装mysql 服务器命令（一路yes）：
    # yum install mysql-community-server

    7.安装成功后
    # service mysqld start

    8.由于mysql刚刚安装完的时候，mysql的root用户的密码默认是空的，所以我们需要及时用mysql的root用户登录（第一次回车键，不用输入密码），并修改密码
    # mysql -u root
    # use mysql;
    # update user set password=PASSWORD("这里输入root用户密码") where User='root';

    9.授权（自动创建）一个mysql的非root的aaa用户，能访问localhost上的testdb数据库，密码是xxxx，最后刷新权限
    # grant all privileges on testdb.* to aaa@localhost identified by 'xxxx';
    # flush privileges;
    10.创建一个utf8的表(如果你有需要的话)之后退出
    # CREATE DATABASE `database` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
    # exit;

    11.查看mysql是否自启动,并且设置开启自启动命令
    # chkconfig --list | grep mysqld
    # chkconfig mysqld on

    12.mysql安全设置(系统会一路问你几个问题，看不懂复制之后翻译，基本上一路yes)：
    # mysql_secure_installation

    13.晚安
    # exit

[linux CentOS6.5 yum安装mysql 5.6](https://segmentfault.com/a/1190000007667534)

#### linux 安装nodejs

    CentOS 下安装 Node.js
    1、下载源码，你需要在https://nodejs.org/en/download/下载最新的Nodejs版本，本文以v0.10.24为例:
    cd /usr/local/src/
    wget http://nodejs.org/dist/v0.10.24/node-v0.10.24.tar.gz
    2、解压源码
    tar zxvf node-v0.10.24.tar.gz
    3、 编译安装
    cd node-v0.10.24
    ./configure --prefix=/usr/local/node/0.10.24
    make
    make install
    4、 配置NODE_HOME，进入profile编辑环境变量
    vim /etc/profile
    设置nodejs环境变量，在 export PATH USER LOGNAME MAIL HOSTNAME HISTSIZE HISTCONTROL 一行的上面添加如下内容:
    #set for nodejs
    export NODE_HOME=/usr/local/node/0.10.24
    export PATH=$NODE_HOME/bin:$PATH
    :wq保存并退出，编译/etc/profile 使配置生效
    source /etc/profile
    验证是否安装配置成功
    node -v
    输出 v0.10.24 表示配置成功
    npm模块安装路径
    /usr/local/node/0.10.24/lib/node_modules/
    注：Nodejs 官网提供了编译好的Linux二进制包，你也可以下载下来直接应用。
    [http://www.runoob.com/nodejs/nodejs-install-setup.html](http://www.runoob.com/nodejs/nodejs-install-setup.html)

    [Node.js + MongoDB 开发环境搭建](http://unicornx.github.io/2016/05/25/20160525-nodejs-mongodb-envsetup/)

坑:

`WARNING: failed to autodetect C++ compiler version (CXX=g++)  //需要安装gcc`

`sudo yum install gcc-c++   //安装gcc`

[Centos6.4编译安装Node.js(已验证）](https://www.cnblogs.com/felixzh/p/5822354.html)
