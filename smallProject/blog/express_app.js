// build/dev-server.js
// dev-server.js
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var webpackConfig = require('./build/webpack.dev.config')
var WebpackDevMiddleware = require('webpack-dev-middleware')
var WebpackHotMiddleware = require('webpack-hot-middleware')
// Express实例

var glob = require('glob');
var entries = getEntry(['./src/modules/**/*.js', './src/modules/**/*.js']); // 获得入口js文件

var app = express();

// entry中添加HotUpdate地址
let hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
// 重置入口entry
webpackConfig.entry = entries;
// webpack编译器
var compiler = webpack(webpackConfig)
// webpack-dev-server中间件
app.use(WebpackDevMiddleware(compiler, {
    publicPath: '/',
    stats: {
        colors: true,
        chunks: false
    },
    progress: true,
    inline: true,
    hot: true
}))

app.use(WebpackHotMiddleware(compiler));

// webpack路由
app.get('/:pagename?', function (req, res, next) {
    var pagename = req.params.pagename
        ? req.params.pagename + '.html'
        : 'index.html';
    var filepath = path.join(compiler.outputPath, pagename)
    // 使用webpack提供的outputFileSystem
    compiler.outputFileSystem.readFile(filepath, function (err, result) {
        if (err) {
            // something error
            // return next('输入路径无效，请输入目录名作为路径，有效路径有：\n/' + Object.keys(entries).join('\n/'))
            // res.render(filepath)
            return next();
        }
        // 发送获取到的页面
        res.set('content-type', 'text/html')
        res.send(result)
        res.end()
    })
})

/******路由******/

var router = express.Router();
// 捕获 /events 路径的 GET 请求
router.get('/events', function(req, res, next) {
    console.log("enevts=========")
  res.json({a:"qweqwe"})
});
app.use(router);

app.use(express.static('dist'));


//
module.exports = app.listen(8081, function (err) {
    if (err) {
        // do something
        return
    }
    console.log('Listening at http://localhost:8081\n')
});

function getEntry(globPath) {
    let hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
    var entries = {},
        basename, tmp, pathname;
    if (typeof (globPath) != "object") {
        globPath = [globPath]
    }
    globPath.forEach((itemPath) => {
        glob.sync(itemPath).forEach(function (entry) {
            if ((entry.indexOf("api") == -1) && (entry.indexOf("components") == -1) && (entry.indexOf("asset") == -1) && (entry.indexOf("router") == -1) && (entry.indexOf("store") == -1)) {
                basename = path.basename(entry, path.extname(entry));
                if (entry.split('/').length > 5 || basename != "index") {
                    // tmp = entry.split('/').splice(-3);
                    // pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
                    pathname = path.normalize(entry.substring(entry.indexOf("modules/") + 8, entry.lastIndexOf("/")));
                    pathname = pathname.replace("\\", "/");
                    entries[pathname] = [entry,hotMiddlewareScript];
                } else {
                    entries[basename] = [entry,hotMiddlewareScript];
                }
            }

        });
    });
    return entries;
}