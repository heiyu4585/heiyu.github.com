#mysql

## 相关操作
    启动MySQL服务
    sudo /usr/local/MySQL/support-files/mysql.server start

    停止MySQL服务
    sudo /usr/local/mysql/support-files/mysql.server stop

    重启MySQL服务
    sudo /usr/local/mysql/support-files/mysql.server restart

    关闭进程
    mysql无法启动 mysqld process already exists
    1.提示:A mysqld process already exists

    ps 命令用于查看当前正在运行的进程。
    grep 是搜索
    例如： ps -ef | grep mysql
    表示查看所有进程里 CMD 是 mysql的进程信息
    ps -aux | grep java
    -aux 显示所有状态
    ps
    kill 命令用于终止进程
    例如： kill -9 [PID]



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


### mac下安装mysql
    1、官网下载mysql安装包mysql-5.7.13-osx10.11-x86_64.bmg安装
    2、安装完成后终端输入：
    mysql --version
    ----显示版本号说明正常，若显示command not found，在终端输入如下，”/usr/local/mysql/bin/mysql”为mysql默认安装路径：
    $ cd /usr/local/bin/
    $ sudo ln -fs /usr/local/mysql/bin/mysql mysql
    3、关闭mysql服务：
    sudo /usr/local/mysql/support-files/mysql.server stop
    4、配置root账号的密码，默认没有配置，
    -----在终端内输入（开启安全模式启动mysql）：
    sudo /usr/local/mysql/bin/mysqld_safe --skip-grant-tables
    -----修改密码，终端输入（逐行输入，必须，“****“为设置的密码）：
    mysql -u root
    UPDATE mysql.user SET authentication_string=PASSWORD('*****') WHERE User='root';
    FLUSH PRIVILEGES;
    \q
    5、配置完成后验证，在终端输入：
    mysql -u root -p
    ----提示输入密码，进入mysql说明成功！
    mysql>
    6、mysql服务启动和关闭可以在系统偏好设置里面操作，终端命令如下：
    $ sudo /usr/local/mysql/support-files/mysql.server start
    $ sudo /usr/local/mysql/support-files/mysql.server stop

参考:[ MySQL for Mac 安装和基本操作](https://blog.csdn.net/buptgshengod/article/details/23455187)

[mac安装mysql的两种方法（含配置）](https://www.jianshu.com/p/fd3aae701db9)

### Mac下MySQL卸载方法

    在OSX中安装Mysql如果一旦出现错误，很难卸载，需要手动删除部分Mysql运行和配置文件，如下为删除相关文件的shell，可能不存在，但尽量查找并删除，避免出现一些莫名问题。


    sudo rm /usr/local/mysql
    sudo rm -rf /usr/local/mysql*
    sudo rm -rf /Library/StartupItems/MySQLCOM
    sudo rm -rf /Library/PreferencePanes/My*
    vim /etc/hostconfig  (and removed the line MYSQLCOM=-YES-)
    rm -rf ~/Library/PreferencePanes/My*
    sudo rm -rf /Library/Receipts/mysql*
    sudo rm -rf /Library/Receipts/MySQL*
    sudo rm -rf /var/db/receipts/com.mysql.*

参考：[How do you uninstall MySQL from Mac OS X?](https://stackoverflow.com/questions/1436425/how-do-you-uninstall-mysql-from-mac-os-x)



## 坑

### Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'arthas_local.logTable.id' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by

使用
```
/*按照siteid查询分类总数 按照pageID进行分类*/

pageCategoryOrderByPageIdTotal: "SELECT COUNT(categoryTable.id) as total FROM (select id from `performance_main_log` as logTable where logTable.site_id = ? and UNIX_TIMESTAMP(logTable.create_time)*1000 BETWEEN ? and ? GROUP BY sps_page_id) categoryTable",
 
 // 改为
 
SELECT COUNT(categoryTable.id) as total FROM ( select ANY_VALUE(id) as id from `performance_main_log` as logTable where logTable.site_id = ?  and UNIX_TIMESTAMP(logTable.create_time)*1000 BETWEEN ? and ?  GROUP BY sps_page_id ) categoryTable,
   
```

资料:

以下面的例子來說，如果 name 是 primary key 或是 unique NOT NULL column，GROUP 時 address 可以對映到唯一 name。反之，將造成一個 address 會找到超過一個 name ，這種情況（nonaggregated columns）是被禁止的。

```mysql> SELECT name, address, MAX(age) FROM t GROUP BY name;
> ERROR 1055 (42000): Expression #2 of SELECT list is not in GROUP
BY clause and contains nonaggregated column 'mydb.t.address' which
is not functionally dependent on columns in GROUP BY clause; this
is incompatible with sql_mode=only_full_group_by
```

#### 解法一：ANY_VALUE()

`mysql> SELECT name, ANY_VALUE(address), MAX(age) FROM t GROUP BY name;`

#### 解法二：關閉 ONLY_FULL_GROUP_BY mode
```
mysql> set global sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
mysql> set session sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
Note.
```
一對多的資料，展開後會出現多筆，但只要回傳一筆，原本的版本可以對 id 進行 GROUP。但是新版的 MYSQL 禁止這種 GROUP 0.0”

[在 MacOS 上安裝/更新 MySQL 筆記](http://v123582.github.io/blog/2016/01/26/%E5%9C%A8mac-%E6%9B%B4%E6%96%B0-mysql-%E7%AD%86%E8%A8%98/)

### Access denied for user 'XX'@'xx.xx.x.xx' (using password: YES)

把在所有数据库的所有表的所有权限赋值给位于所有IP地址的root用户。

`mysql> grant all privileges on *.* to root@'%'identified by 'password';`
如果是新用户而不是root，则要先新建用户

`mysql>create user 'username'@'%' identified by 'password';  `
此时就可以进行远程连接了。

### 遇到的问题

#### mac下安装mysql5.7.18，连接出现Access denied for user 'root'@'localhost' (using password: YES

    mac下，mysql5.7.18连接出错，错误信息为：Access denied for user 'root'@'localhost' (using password: YES)
    （）里面的为shell中输入的命令，一定要输全包括；&等符号
    第一步：苹果->系统偏好设置->最下面点mysql，关闭mysql服务
    第二步：进入终端输入（cd /usr/local/mysql/bin/）回车
    输入（sudo su）回车以获取管理员权限
    输入（./mysqld_safe --skip-grant-tables &）回车以禁止mysql验证功能，mysql会自动重启，偏好设置中的mysql状态会变成running
    第三步：输入命令（./mysql）回车
    输入命令（flush privileges;）分号别忘记输了
    输入命令（set password for 'root'@'localhost' = password('root');） password('root')中的root为新密码，自己随便设置，分号别忘记输入
    至此，密码修改成功，可以正常登入了。
[mac下安装mysql5.7.18，连接出现Access denied for user 'root'@'localhost' (using password: YES)](https://www.cnblogs.com/starof/p/4680083.html)

[MAC下MYSQL5.7.17连接不上的问题及解决办法](http://www.jb51.net/article/107028.htm)


#### Mysql:is not allowed to connect to this MySQL server

    如果你想连接你的mysql的时候发生这个错误：

    ERROR 1130: Host '192.168.1.3' is not allowed to connect to this MySQL server

    解决方法：
    1。 改表法。可能是你的帐号不允许从远程登陆，只能在localhost。这个时候只要在localhost的那台电脑，登入mysql后，更改 "mysql" 数据库里的 "user" 表里的 "host" 项，从"localhost"改称"%"

    mysql -u root -pvmware
    mysql>use mysql;
    mysql>update user set host = '%' where user = 'root';
    mysql>select host, user from user;

    2. 授权法。例如，你想myuser使用mypassword从任何主机连接到mysql服务器的话。
    GRANT ALL PRIVILEGES ON *.* TO 'myuser'@'%' IDENTIFIED BY 'mypassword' WITH GRANT OPTION;

    如果你想允许用户myuser从ip为192.168.1.3的主机连接到mysql服务器，并使用mypassword作为密码
    GRANT ALL PRIVILEGES ON *.* TO 'root'@'192.168.1.3' IDENTIFIED BY 'mypassword' WITH GRANT OPTION;

    GRANT ALL PRIVILEGES ON *.* TO 'root'@'10.10.40.54' IDENTIFIED BY '123456' WITH GRANT OPTION;

#### Disable ONLY_FULL_GROUP_BY
     mysql > SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

      mysql >SET @@GLOBAL.sql_mode="STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION";
参考： [Disable ONLY_FULL_GROUP_BY](https://stackoverflow.com/questions/23921117/disable-only-full-group-by)







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

### mysql求平均值


```
select avg(whiteTime), createTime,count(*)  from performance_main_log group by FLOOR(UNIX_TIMESTAMP(createTime)/120) order by createTime desc
```
http://blog.csdn.net/puzzel110/article/details/19110559

在项目中遇到一个客户要求用一条sql语句，查询出以1小时为间隔的平均数据。记录下来，以供参考！

```
select orgName as 企业名,proName as 工程名,refname as 冷库名,
 dateadd(ss,datepart(minute,'开始时间')*60+datepart(SECOND,'开始时间'),dateadd(hour,DATEPART(hour,intime),convert(varchar(10),intime,120))) as 时间间隔,
 AVG(data) as 平均温度,
 MAX(data) as 最大温度,
 MIN(data) as 最低温度
from View_Fdaprefhisdata_3
where inTime between '开始时间' and '结束时间' and  probetype=0
group by orgName,proName,refname,dateadd(ss,datepart(minute,'开始时间')*60+datepart(SECOND,'开始时间'),dateadd(hour,DATEPART(hour,intime),convert(varchar(10),intime,120)))
```

 
http://bbs.csdn.net/topics/390147418

[SQL语句:　按周、月统计总值 和 平均值](http://blog.csdn.net/youngqj/article/details/6453647)

```
select sum(zhi)/count(riqi)
from a
where riqi between '20000115' and '20000123'

2017-08-22 17:25:42    1503393942000
2017-08-22 17:29:08   1503394148000
2017-08-22 17:29:07   1503394147000


select whiteTime,AVG(whiteTime)

from performance_main_log

where createTime BETWEEN  "2017-08-22 17:25:42"  and "2017-08-22 17:26:07"

group by id

```
http://bbs.csdn.net/topics/320063289

http://bbs.csdn.net/topics/330023868

按小时取平均数

```
SELECT
createTime,
avg(whiteTime)
FROM
performance_main_log
WHERE
createTime >= '2017-08-22 00:00:00'
AND createTime <= '2017-08-23 23:00:00'
GROUP BY
DATE_FORMAT(createTime, '%Y%m%d'), HOUR(createTime) DIV 1
```

四分钟

```
SELECT
createTime,
avg(whiteTime)
FROM
performance_main_log
WHERE
createTime >= '2017-08-23 13:00:00'
AND createTime <= '2017-08-23 13:30:00'
GROUP BY
DATE_FORMAT(createTime, '%Y%m%d'), MINUTE(createTime) DIV 4
```


Mysql按时间段分组查询
Mysql按时间段分组查询来统计会员的个数，mysql个数


1.使用case when方法（不建议使用）

```
SELECT
COUNT(DISTINCT user_id) user_count,
CASE
WHEN create_time>1395046800 AND create_time<1395050400 THEN '17:00-18:00'
WHEN create_time>1395050400 AND create_time<1395054000 THEN '18:00-19:00'
WHEN create_time>1395054000 AND create_time<1395057600 THEN '19:00-20:00'
WHEN create_time>1395057600 AND create_time<1395061200 THEN '20:00-21:00'
ELSE 'unknown'
END AS `date` www.111cn.net
FROM
tb_user_online_log
WHERE create_time >1395046800 AND create_time<1395061200
GROUP BY
`date`
ORDER BY create_time
```
结果如下
Mysql按时间段分组查询来统计会员的个数
2.使用时间戳转换后分组

```
SELECT
COUNT(DISTINCT user_id) user_count,
FROM_UNIXTIME(
create_time,
'%Y-%m-%d %H:00:00'
) AS hours,
CONCAT(FROM_UNIXTIME(create_time, '%Y-%m-%d %H:00'),'-',FROM_UNIXTIME(create_time, '%H')+1,":00") AS `date`
FROM
tb_user_online_log
GROUP BY
hours
ORDER BY create_time
```
结果如下
Mysql按时间段分组查询来统计会员的个数

注意：case when 效率不高，在数据量大时不推荐使用，这里仅列出解决方案，仅供参
mysql 分组之后怎统计记录条数， gourp by 之后的 count
select count(*) from
(SELECT count(*) FROM 表名 WHERE 条件 GROUP BY id ) a ;

mysql 时间分组统计
SELECT date_format(FROM_UNIXTIME( `time`),'%Y-%m-%d') AS time,count(*) as count FROM `表名` WHERE 1 group by time

--------------

mysql 按时间段统计（年，季度，月，天，时）
按年汇总，统计：

`select sum(mymoney) as totalmoney, count(*) as sheets from mytable group by date_format(col, '%Y');`

按月汇总，统计：

`select sum(mymoney) as totalmoney, count(*) as sheets from mytable group by date_format(col, '%Y-%m');`

按季度汇总，统计：

`select sum(mymoney) as totalmoney,count(*) as sheets from mytable group by concat(date_format(col, '%Y'),FLOOR((date_format(col, '%m')+2)/3));`

`select sum(mymoney) as totalmoney,count(*) as sheets from mytable group by concat(date_format(col, '%Y'),FLOOR((date_format(col, '%m')+2)/3));`

按小时：

`select sum(mymoney) as totalmoney,count(*) as sheets from mytable group by date_format(col, '%Y-%m-%d %H ');`

查询 本年度的数据:

`SELECT * FROM mytable WHERE year(FROM_UNIXTIME(my_time)) = year(curdate())`

查询数据附带季度数:

`SELECT id, quarter(FROM_UNIXTIME(my_time)) FROM mytable;`

查询 本季度的数据:

`SELECT * FROM mytable WHERE quarter(FROM_UNIXTIME(my_time)) = quarter(curdate());`

本月统计:

`select * from mytable where month(my_time1) = month(curdate()) and year(my_time2) = year(curdate())`

本周统计:

`select * from mytable where month(my_time1) = month(curdate()) and week(my_time2) = week(curdate())`

N天内记录:

`WHERE TO_DAYS(NOW())-TO_DAYS(时间字段)<=N`
本篇文章来源于 Linux公社网站(www.linuxidc.com) 原文链接：http://www.linuxidc.com/Linux/2012-11/74145.htm




mysql 求时间段平均值
考虑下面的需求，在一段时间内，间隔一段时间，取一个平均值，把所有的平均值取出来，怎么办？
思路：在存储过程中，拼接sql语句。根据起始时间和结束时间，while循环每次加一段时间。

```
DROP PROCEDURE IF EXISTS `get_avg`;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `get_avg`(in iStartTime datetime, in iEndTime datetime)
BEGIN
declare vSql varchar(10240) default '';
declare vNextTime datetime;
while(iStartTime < iEndTime) do 
-- 每次加一个小时
set vNextTime = date_add(iStartTime,interval 3600 second);
-- 单引号是特殊字符，要表示单引号，使用 '' 进行转义
set vSql = concat(vSql,'union select 100, avg(`value`) from t1 where time between ''',iStartTime,''' and ''', vNextTime,''' ');
set iStartTime = vNextTime;
end while;

set vSql = substring(vSql,7);
-- 看看拼接的字符串是否正确
-- select vSql;

set @vSql = vSql;
prepare stmt from @vSql;
execute stmt;
deallocate prepare stmt;
END
;;
DELIMITER ;

```
