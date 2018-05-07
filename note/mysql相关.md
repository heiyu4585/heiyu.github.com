#mysql
## 安装
### CentOS6.5 yum安装mysql 5.6
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

[centos7 mysql数据库安装和配置](https://www.cnblogs.com/starof/p/4680083.html)

## 坑
### Access denied for user 'XX'@'xx.xx.x.xx' (using password: YES)

把在所有数据库的所有表的所有权限赋值给位于所有IP地址的root用户。

`mysql> grant all privileges on *.* to root@'%'identified by 'password';`
如果是新用户而不是root，则要先新建用户

`mysql>create user 'username'@'%' identified by 'password';  `
此时就可以进行远程连接了。

### linux的mysql数据库的由于权限问题看不到mysql库user表

```
 update user set  
  `Select_priv` = 'Y',
  `Insert_priv` = 'Y',
  `Update_priv` = 'Y',
  `Delete_priv` = 'Y',
  `Create_priv` = 'Y',
  `Drop_priv` = 'Y',
  `Reload_priv` = 'Y',
  `Shutdown_priv` = 'Y',
  `Process_priv` = 'Y',
  `File_priv` = 'Y',
  `Grant_priv` = 'Y',
  `References_priv` = 'Y',
  `Index_priv` = 'Y',
  `Alter_priv` = 'Y',
  `Show_db_priv` = 'Y',
  `Super_priv` = 'Y',
  `Create_tmp_table_priv` = 'Y',
  `Lock_tables_priv` = 'Y',
  `Execute_priv` = 'Y',
  `Repl_slave_priv` = 'Y',
  `Repl_client_priv` = 'Y',
  `Create_view_priv` = 'Y',
  `Show_view_priv` = 'Y',
  `Create_routine_priv` = 'Y',
  `Alter_routine_priv` = 'Y',
  `Create_user_priv` = 'Y',
  `Event_priv` = 'Y',
  `Trigger_priv` = 'Y'
  where user='root' and host='localhost'        //这里需注意是否有这个条件的用户
  flush privileges;
  ```
  [linux的mysql数据库的由于权限问题看不到mysql库user表
](https://blog.csdn.net/liuyifeng1920/article/details/49818851)
