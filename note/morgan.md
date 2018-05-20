#morgan
##将日志打印到本地文件

```
morgan支持stream配置项，可以通过它来实现将日志落地的效果，代码如下：

var express = require('express');
var app = express();
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

app.use(morgan('short', {stream: accessLogStream}));
app.use(function(req, res, next){
    res.send('ok');
});

app.listen(3000);
```

## 日志切割
一个线上应用，如果所有的日志都落地到同一个本地文件，时间久了，文件会变得非常大，既影响性能，又不便于查看。这时候，就需要用到日志分割了。

借助file-stream-rotator插件，可以轻松完成日志分割的工作。除了file-stream-rotator相关的配置代码，其余跟之前的例子差不多，这里不赘述。

```
var FileStreamRotator = require('file-stream-rotator')
var express = require('express')
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')

var app = express()
var logDirectory = path.join(__dirname, 'log')

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))

app.get('/', function (req, res) {
  res.send('hello, world!')
})
```
## 日志写入数据库
有的时候，我们会有这样的需求，将访问日志写入数据库。这种需求常见于需要实时查询统计的日志系统。

在morgan里该如何实现呢？从文档上，并没有看到适合的扩展接口。于是查阅了下morgan的源码，发现实现起来非常简单。

回顾下之前日志写入本地文件的例子，最关键的两行代码如下。通过stream指定日志的输出流。
```
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(morgan('short', {stream: accessLogStream}));
在morgan内部，大致实现是这样的（简化后）。

// opt为配置文件
var stream = opts.stream || process.stdout;
var logString = createLogString();  // 伪代码，根据format、token的定义，生成日志
stream.write(logString);
于是，可以用比较取巧的方式来实现目的：声明一个带write方法的对象，并作为stream配置传入。

var express = require('express');
var app = express();
var morgan = require('morgan');

// 带write方法的对象
var dbStream = {
  write: function(line){
    saveToDatabase(line);  // 伪代码，保存到数据库
  }
};

// 将 dbStream 作为 stream 配置项的值
app.use(morgan('short', {stream: dbStream}));
app.use(function(req, res, next){
  res.send('ok');
});

app.listen(3000);
```
[Node 进阶：express 默认日志组件 morgan 从入门使用到源码剖析](https://www.cnblogs.com/chyingp/p/node-learning-guide-express-morgan.html)
