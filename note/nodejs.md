#nodejs

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