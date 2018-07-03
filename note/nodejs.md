# nodejs

## nodejs读写json文件

```

var fs=reauire('fs');
var file="d:\\0.json";
var result=JSON.parse(fs.readFileSync( file));
//操作对象
```

## nodejs 写json文件
```
var coors = {};
    coors.left_top = {};
    coors.right_top = {};
    coors.left_bottom = {};
    coors.right_bottom = {};
//填充coors中内容
var filename = "d:\\coors\\0.json";
 fs.writeFileSync(filename, JSON.stringify(coors));
 //对象嵌套
 var fs = require('fs');
var fileDirectory = "D:\\column";
var newfileDirectory = "d:\\new";
if (fs.existsSync(fileDirectory)) {
    var files = fs.readdirSync(fileDirectory);

    for (var i = 0; i < files.length; i++) {

        var filePath = fileDirectory + "/" + files[i];
        var newfilepath = newfileDirectory + "/" + files[i]
        var filestr = JSON.parse(fs.readFileSync(filePath));
        for (var item in filestr) {
            var  inter=filestr[item];
             for(var m in inter)
             {
                inter[m]=parseFloat(inter[m]);

             }
            fs.writeFileSync(newfilepath, JSON.stringify(filestr));
        }

    }
} else {
    console.log(fileDirectory + "  Not Found!");
}
```
## NodeJS获取命令行后面的参数
假设有如下的命令行 node  test.js arg1 arg2 arg3，现在想在test.js中获取后面的参数arg1、arg2、arg3…

var arguments = process.argv.splice(2);

process是一个全局对象，argv返回的是一组包含命令行参数的数组。第一项为”node”，第二项为执行的js的完整路径，后面是附加在命令行后的参数

## Node.js脚本杀掉占用端口的进程

express默认端口为3000，由于实际需要改为3392，修改监听3392之后，没有成功，发现该端口被系统正占用，为了避免每次都手工停掉该系统调用，释放端口，故写了如下脚本。

```
var cmd=process.platform=='win32'?'netstat -ano':'ps aux';
var exec = require('child_process').exec;
var qqname='qq';
var port='3392';

exec(cmd, function(err, stdout, stderr) {
    if(err){ return console.log(err); }
    
    stdout.split('\n').filter(function(line){        
        var p=line.trim().split(/\s+/); 
        var address=p[1];        

        if(address!=undefined){        
            if(address.split(':')[1]==port)
            {                
                exec('taskkill /F /pid '+p[4],function(err, stdout, stderr){
                    if(err){
                        return console.log('释放指定端口失败！！');    
                    }
                    
                    console.log('占用指定端口的程序被成功杀掉！');
                });
            }
        }                          
    });
});
```



## 入门资料
[Node.js 入门](https://cnodejs.org/getstart)

### 需要看的笔记

[如何通过饿了么 Node.js 面试](https://github.com/ElemeFE/node-interview/tree/master/sections/zh-cn
)

[在 Chrome 开发者工具中调试 node.js](https://github.com/sqrthree/sqrthree.github.io/issues/8)
[node.js调试](https://www.cnblogs.com/dolphinX/p/3485345.html)

nodejs  调试(待整理)

https://github.com/node-inspector/node-inspector
http://www.barretlee.com/blog/2015/10/07/debug-nodejs-in-command-line/
http://www.cnblogs.com/moonz-wu/archive/2012/01/15/2322120.html


Nodejs学习笔记（四）--- 与MySQL交互（felixge/node-mysql）
nodejs中mysql用法

node.js中mysql连接池的使用


express  api中文    https://www.zybuluo.com/XiangZhou/note/208532




安装

`curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
https://www.uis.cc/2016/09/19/Installation-and-unloading-of-nodejs-on-Linux/`

npm和node.js升级

https://www.jianshu.com/p/e6b42bfcf633

https://segmentfault.com/a/1190000009025883

nodejs 卸载
`# whereis node`
`find / -name  node`
https://www.jianshu.com/p/05740cc4db30
## 坑:

### nodejs 不支持 import

`npm install --save-dev babel-cli`
`npm install --save-dev babel-preset-es2015 babel-preset-stage-2`

启动方式

```
 "scripts": {
+   "start": "babel-node index.js --presets es2015,stage-2"
  }
```
with nodemon
 
```
  "scripts": {
-   "start": "babel-node index.js"
+   "start": "nodemon index.js --exec babel-node --presets es2015,stage-2"
  }
```
### unhandled promise rejection

当 Promise 的状态变为 rejection 时，我们没有正确处理，让其一直冒泡（propagation），直至被进程捕获。这个 Promise 就被称为 unhandled promise rejection。


```
Promise 的异常，有两种触发方式：

主动调用 reject 方法
抛出异常（exception）
// reject
new Promise((resolve, reject) => {
  reject('timeout');
});

// exception
new Promise((resolve, reject) => {
  undefinedVariable();
});
我们有两种方式去处理 rejection，方式二 是 方式一 的语法糖。

// 方式一 .then(undefined, () => {})
new Promise((resolve, reject) => {
  // ...
  reject('timeout');
}).then(undefined, (error) => {
  console.error(error);
});

// 方式二 .catch(() => {})
new Promise((resolve, reject) => {
  // ...
  reject('timeout')
}).catch((error) => {
  console.error(error);
})

```


[unhandled promise rejection](http://www.liyaoli.com/2017-06-26/unhandled-promise-rejection.html)

### nodejs 按行读取
```
const readline = require('readline');
const path = require('path');
const fs = require('fs');
let filepath = path.join(__dirname, "app.js")
let input = fs.createReadStream(filepath)
const rl = readline.createInterface({
  input: input
});
rl.on('line', (line) => {
  console.log(`Line from file: ${line}`);
});
rl.on('close', (line) => {
  console.log("读取完毕！");
});
```


