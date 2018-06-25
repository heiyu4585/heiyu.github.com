# 读书笔记-nodejs

#### 事件循环

```
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();

// 创建事件处理程序
var connectHandler = function connected() {
   console.log('连接成功。');
  
   // 触发 data_received 事件 
   eventEmitter.emit('data_received');
}

// 绑定 connection 事件处理程序
eventEmitter.on('connection', connectHandler);
 
// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function(){
   console.log('数据接收成功。');
});

// 触发 connection 事件 
eventEmitter.emit('connection');

console.log("程序执行完毕。");
```
#### EventEmitter 类的应用
 
```
var EventEmitter =require('events').EventEmitter;
var eventEmitter   = new EventEmitter();
// eventEmitter.on('some_event',function(arg1,arg2){
//     console.log("listener1",arg1,arg2)
//     // console.log("some sh事件触发")
// })
//
// eventEmitter.on('some_event',function(arg1,arg2){
//     console.log("listener2",arg1,arg2)
//     // console.log("some sh事件触发")
// })
// setTimeout(function(){
//     event.emit('some_event','arg1参数','arg2参数');
// },1000)


var listener1 =function  listener1() {
 console.log('jianting监听器1执行')
}

var listener2 = function linstener2(){
    console.log('监听器2执行')
}

eventEmitter.addListener('connection',listener1);
eventEmitter.addListener('connection',listener2);


var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');

console.log(eventListeners +"个监听事件连接");

//处理

eventEmitter.emit('connection');

eventEmitter.removeListener('connection',listener1);
console.log('listener1 不在受监听')

//触发事件

eventEmitter.emit('connection');

eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners+'个监听器连接事件')

console.log('程序执行完毕');

eventEmitter.on('error',function(err){
    console.error('Error:',err);
});

eventEmitter.emit('error');
```

#### Buffer

```
let buf = Buffer.from("runoob",'ascii');
console.log(buf.toString('hex'));
console.log(buf.toString('base64'));


buf = Buffer.alloc(256);
let len = buf.write("www.runoob.com");
console.log('xieru字符数'+len);

//从缓存区读取数据
buf  = Buffer.alloc(26);
for(var i =0;i<26;i++){
    buf[i]=i+97;
}
console.log(buf.toString('ascii'));
console.log(buf.toString('ascii',0,5));
console.log(buf.toString('utf8',0,5));
console.log(buf.toString(undefined,0,5))

//Buffer转为JSON对象
 buf = Buffer.from([0x1,0x2,0x3,0x4,0x5]);
let json = JSON.stringify(buf);

//输出 {"type":"Buffer","data":[1,2,3,4,5]}
console.log(json)

let copy = JSON.parse(json,(key,value)=>{
    console.log("key",key)
    return value && value.type =='Buffer'?
        Buffer.from(value.data):
        value;
})

//
console.log(copy)

```

#### 取数据

```
var fs = require('fs');
var data='';
var readerStream = fs.createReadStream('input.txt');

readerStream.setEncoding('UTF8');

readerStream.on('data',function(chunk){
    data+=chunk;
})

readerStream.on('end',function(){
    console.log(data);
});

readerStream.on('error',function(err){
    console.log(err.stack);
});

console.log('程序执行完毕')
```
#### 写入流

```
var fs = require("fs");
var data = '菜鸟教程官网地址：www.runoob.com 222222222222222222';

var writerStream = fs.createWriteStream("output.txt");

writerStream.write(data,'UTF8');
writerStream.end();

writerStream.on('finish',function () {
    console.log("写入完成")
})

writerStream.on('error',function(err){
    console.log(err.stack)
})

console.log("程序员执行完毕")

```

#### 管道流

```
var fs = require('fs');

var readerStream = fs.createReadStream("input.txt");
var writerStream = fs.createWriteStream("output.txt");

readerStream.pipe(writerStream);
```

#### 链式流

```
var fs = require("fs");
var zlib = require('zlib');

//压缩
fs.createReadStream('input.txt')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('input.txt.gz'));

// 解压
fs.createReadStream('input.txt.gz')
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('input.txt'));
```

#### 路由
#####index.js
```
#index.js
var server = require('./server');
var router = require('./router');

server.start(router.route)
```

##### router.js
```
#router.js
function route(pathname) {
    console.log("About to route a request for " + pathname);
}

exports.route = route;
```
##### server.js

```
var http = require("http");
var url =require("url");

function start(route){
    function onRequest(request,response){
        var pathname = url.parse(request.url).pathname;
        console.log("Request for"+pathname+"received");

        route(pathname)
        response.writeHead(200,{"Content-Type":"text/plain"});
        response.write("hello world");
        response.end();
    }

    http.createServer(onRequest).listen(8888);
    console.log('server has start')
}

exports.start = start;
```