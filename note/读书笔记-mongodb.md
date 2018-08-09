# 读书笔记-mongodb

### 概念解析
数据库名可以是满足以下条件的任意UTF-8字符串。

1. 不能是空字符串
2. 不得含有 `''`  `.` `$` `/` `\` `\0`
3. 全部小写
4. 最多64个字节

#### 保留的数据库名字
1. admin 权限角度讲,这是'root'数据库,要是将一个用户添加到这个数据库,这个用户自动竭诚所有数据库权限,一些特定的服务端命令也只能从这个数据库运行,比如列出所有的数据库或者关闭服务.
2. local 这个数据永远不会被复制,可以用来存储本地单台服务器的任意集合**(??? 啥意思)**
3. config 当mongo用于分片设置时,config数据库在内部使用,用于保存分片的相关信息**(分片是什么意思)**

#### 文档
文档是一对键值组(key-value)对(即bson),mongoDB的文档不需要设置相同的字段,并且相同的字段不需要相同的数据类型,这与关系型数据库有很大的区别,也是mongodb非常突出的特点

#### 集合
集合就是mongodb的文档组,类似于RDBMS中的表格.
集合存在于数据库中,集合没有固定的结构,这意味着你在对集合可以插入不同格式和类型的数据,但通常情况下我们插入集合的数据都会有一定的关联性.
##### 合法的集合名
1. 不能为空字符串
2. 不能含有\0字符,这个字符表示集合名的结尾
3. 集合名不能以"system."开头,这是为系统集合保留的前缀
4. 用户创建的集合名字不能含有保留字符,有些驱动程序的确支持在集合里面包含,这是因为某些系统生成的集合中包含该字符,除非你要访问这种系统创建你的集合,负责千万不要在名字里面出现$
 
`db.col.findOne()`

#### capped collections
固定大小的collection
有很高的性能以及队列过期的特性,有点和"RRD"概念类似.
capped collection是高性能自动的维护对象的插入顺序,它非常适合类似记录日志的功能和标准的collection不同,你必须要显示的创建一个 capped collection,指定一个collection的大小,单位是字节,collection的数据存储空间值提前分配的.
要注意的是指定的村春大小包含了数据可的头信息

`db.createCollection('mycoll',{capped:true,size:100000})`

1. 在capped collection中,你能添加新对象
2. 能进行更新,然而,对象不会增加存储空间,如果增加,更新就会失败.
3. 数据库不允许进行删除,使用drop()方法删除collection所有的行
4. 注意:删除之后,你必须显式的重新创建这个collection
5. 在32bit机器中,capped collection最大存储为1e9个字节

###元数据
数据库的信息是存储在集合中.它们使用过了系统的命名空间
`dbname.system.*`

| 集合命名空间 |描述|
|---|---|
|dbname.system.namespaces	|列出所有名字空间|
|dbname.system.indexes	|列出所有名字空间|
|dbname.system.profile	|包含数据库概要信息|
|dbname.system.users	|列出所有可访问数据的用户|
|dbname.system. sources	|包含复制对端（slave）的服务器信息和状态。| 



###  MongoDB - 连接

`mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]`
### MongoDB 创建数据库

`>use DATABASE_NAME`
`>use runoob`
`>db`
`>show dbs`
` db.runoob.insert({"name":"菜鸟教程"})`
### MongoDB 删除数据库
1. 删除数据库`db.dropDatabase()`
2. 

## 问题:"
### [objectId 什么意思]  (http://www.runoob.com/mongodb/mongodb-databases-documents-collections.html)
var newObject = ObjectId()

```
> var newObject = ObjectId()
> newObject.getTimestamp()
ISODate("2017-11-25T07:21:10Z")
```


