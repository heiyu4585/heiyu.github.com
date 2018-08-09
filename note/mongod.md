# mongod
## 入门
[入门](http://www.runoob.com/nodejs/nodejs-mongodb.html)


## mongoose

### [中文api](https://mongoosedoc.top/docs/documents.html)
#### 在项目中安装mongoose

`cnpm install mongoose`

做个简单项目的项目结构,对数据的增删改查,都是简单的操作,主要是引入mongoose的链接操作,复杂的增删改查在MongoDB的基础知识中学习
MongoDB数据库框架mongoose

```
db.js 		连接数据库
 
Model.js 	构建模型骨架,构建Model
 
insert.js 	插入数据 	(增)
 
delete.js 	删除数据	(删)
 
update.js 	修改数据	(改)
 
find.js 	查询数据	(查)
 
MongoDB可视化工具robo 3t
```

##### 连接数据库,创建db.js文件

```
// 引入mongoose
var mongoose = require("mongoose");
 
// 连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/eleven");
 
// 连接失败
mongoose.connection.on("error", function(err){
    console.error("数据库链接失败:"+ err);
});
 
// 连接成功
mongoose.connection.on("open", function(){
    console.log("数据库链接成功");
});
 
// 断开数据库
mongoose.connection.on("disconnected", function(){
    console.log("数据库断开");
})
 
// 将mongoose推出
 
module.exports = mongoose;
```

####  构建模型骨架Schame,构建Model, 创建文件 Model.js

```
var mongoose = require('./db.js');
 
 
// 模型骨架
var Schema = new mongoose.Schema({
    username: {type: String},
    password: {type: Number, default: 123456},
    time: {type: Date}
});
 
// 由schema构造生成Model
var Model = mongoose.model('user',Schema);
 
module.exports = Model;
```

#### 增加数据库, 创建文件 insert.js

```
var Model = require("./Model.js");
 
// 插入数据
/***/
Model.create([
    {
        username: 'jason1',
        password: 123456
    },
    {
        username: 'zhaoerya1',
        password: 654321
    }
],function(err,doc){
    if(err){
        console.error(err);
    } else {
        console.log(["SUCCESS"]);
        console.log(doc);
    }
})
```

####删除数据, 创建文件 delete.js
```
var Model = require('./Model.js');
 
// 删除数据
Model.remove({username: 'jason'},function(err,res){
	if(err){
		console.error(err);
	} else {
		console.log(res);
	}
})
```

####修改数据, 创建文件 update.js
```
var Model = require("./Model.js");
 
// 更新数据
 
Model.update({username: 'jsrenyu'},{password: 4545454},function(err,res){
	if(err){
		console.error("Error: "+err);
	} else {
		console.log("Res: "+res);
	}
})
```

7. 查询数据, 创建文件 find.js

```
var Model = require("./Model.js");
 
// 查询数据
Model.find({username: 'jsrenyu'},function(err,res){
	if(err){
		console.log(err);
	} else {
		console.log(res);
	}
})
```

#### MongoDB的可视化工具

 robo 3t MongoDB的可视化工具 robo 3t:
 windows64版本直接下载链接: http://download.csdn.net/download/jason_renyu/10246478
mac版本直接下载链接: http://download.csdn.net/download/jason_renyu/10246540
 其他版本下载: https://robomongo.org/download Robo 3T的界面为:

#### mongoose资料参考: 
mongoose中文文档 https://mongoose.shujuwajue.com/

mongoose入门介绍 http://www.cnblogs.com/zhongweiv/p/mongoose.html

mongoose简单案例增删改查和mongoose中文文档
mongoose简单的案例,要了解mongoose需要有MongoDB的基础知识,
MongoDB以及js操作MongoDB的学习博客(免费视频教程,前提也要有node的基础知识): 
 挑战全栈 MongoDB基础视频教程 http://jspang.com/2017/12/16/mongdb/
MongoDB索引视频教程 http://jspang.com/2018/01/28/mongodb_index/
MongoDB管理视频教程http://jspang.com/2018/02/06/mongodb/

## 命令行插入

```
//查询mongod位置
`$ which mongod`
// 进入mongod命令行
`/usr/local/Cellar/mongodb/bin/mongod`
`$ cd /usr/local/Cellar/mongodb/bin/`
`$./mongo`
//使用数据表格
$ use bug
switched to db bug
//查询
$db.accounts.insert({
...    "salt": "6de1a85f69db9bf65b016fc3bf6d6cecc3b64cc2e6741ea332afb6e115d1b53d",
...    "hash": "447e6dcedb8ab3a0c1c16536b3eff8907745d38b5fc0a22db4fd19042dc8a7ae9d2e3d97ef984400ee1aa381ad08f62137273f178abfa5983b5d810dbd934c5ae2da38c8a8a4f40f699e91b9f16d1a80471f479aae59f373b09dcb25dcc2f88319246951d68c10d2dc8e505554ba11cdbed53ebf6a247bb81fd9f5da334c7ddf9133f23a5946c5331a933198ff393fc50bc464e4c8adf68bee44006fb7f23361ec345a65c2dbe0dbd9dbe83c257957f2cd65f7c4f4710d1e4398a579ea635b1c840961cf088a38c651fdf40bfd4d6b4e8aa667ba9e30403285fc2c8d8ad038d1e2cc78021759a104bf6565adfcc08c2a8703c1d6f2b837e3bb1fe6b34e75c2eed88ef6bdfb3d3cd859e85aac146baa7339fb5cf8f90f3613b11b6eb4fbafe47e6f65db718b98ec0a5594b8ca457501d96d7858474fbc26b689f5ae9e7352026e125c2a52029505e6dbbc42ca2b3bf9df168af6d9e2415728a7551829527dbbc840f08591af4f265dcfeba4c24984db7e5fd6aaa97a926f5069d971b457dc1df45070f1599121958115f20e8c17a1188fa87bb60301e7ec9085d8a12714ae5a2c46937b7a0d8122331d2914454d3276be5b31b8398c257498ebc018c5c8f1bd7863242ceebd028a99a7307312cda608b1f71280e62a2545db77959fb585090ab6e19389077ed6f5a1aaa1f100b414bc5b1f7cfb20a1272966076b53899661ce20",
...    "username": "admin",
...    "ip": "127.0.0.1",
...    "create_time": 1465206116175,
...    "type": 1
... })
WriteResult({ "nInserted" : 1 })
$ db.settings.insert({
...    "id": 1,
...    "expired_time": 86400,
...    "edit_user": "admin",
...    "edit_time": 1465206116175
... })
WriteResult({ "nInserted" : 1 })

```


## 遇到的问题
### Network is unreachable.
权限问题   使用  
`sudo  mongod`

### `(node:2528) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.`



### 档中多了‘'__v‘'字段 (待解决)

```
var mySchema = new mongoose.Schema({
    username:  'string'
}, {versionKey: false}
```

[mongoose操作mongodb数据库发现文档中多了‘'__v‘'字段](https://blog.csdn.net/qq_36370731/article/details/79057732)

### Mongoose动态创建collection

```
 const mongoose = this.app.mongoose;
        const Schema = mongoose.Schema;
        function getModel(token) {
            var ErrorSchema = new Schema({
                userAgent: {type: String},
                currentUrl: {type: String},
                host: {type: String},
                timestamp: {type: Number},
                projectType: {type: String},
                flashVer: {type: String},
                title: {type: String},
                screenSize: {vw: {type: Number}, vh: {type: Number}},
                referer: {type: String},
                colNum: {type: Number},
                rowNum: {type: Number},
                msg: {type: String},
                level: {type: Number},
                targetUrl: {type: String},
                ext: {userData: {type: String}},//todo 格式可能有问题
                appVersion: {type: String},
                reportVersion: {type: String},
                token: {type: Number}
            });

            return mongoose.model("ErrorSchema"+ Date.now(), ErrorSchema, "error_mintor_"+token, {cache: true});
        }

        // console.log(num)
        // let errorSchema = new Schema(schemaOptions, {collection: "error_montior_"+num,strict: false});
        //
        // let errorModel = mongoose.model('ErrorSchema', errorSchema);

        // console.log(params.token);

        getModel(params.token).create([
            {
                userAgent: params.userAgent,
                currentUrl: params.currentUrl,
                host: params.host,
                timestamp: params.timestamp,
                projectType: params.projectType,
                flashVer: params.flashVer,
                title: params.title,
                screenSize: {vw: params.screenSize.vw, vh: params.screenSize.vh},
                referer: params.referer,
                colNum: params.colNum,
                rowNum: params.rowNum,
                msg: params.msg,
                level: params.level,
                targetUrl: params.targetUrl,
                // ext:{userData:params.ext.userData},
                appVersion: params.appVersion,
                reportVersion: params.reportVersion,
                token: params.token,
            }
        ], function (err, doc) {
            if (err) {
                console.error(err);
            } else {
                console.log(["SUCCESS"]);
                console.log(doc);
                return doc;
            }
        })
    }

```

### 更改collection的名字：

```
1.xxschema = new Schema({
…
}, {collection: “your collection name”});

2.mongoose.model(‘User’, UserSchema, “your collection name”);
```

[https://cnodejs.org/topic/4f71363f8a04d82a3d1e4aea](https://cnodejs.org/topic/4f71363f8a04d82a3d1e4aea)

