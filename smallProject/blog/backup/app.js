const Koa = require('koa');
const fs = require('fs');
const app = new Koa();
const path = require('path');
const static = require('koa-static');
// 静态资源目录对于相对入口文件index.js的路径

app.use(static(
    path.join( __dirname,  './app/public')
));

// 加载路由中间件
require('./app/router/router')(app);


var webpack = require('webpack')
var webpackConfig = require('./webpack.dev.config')
var WebpackDevMiddleware = require('webpack-dev-middleware')
var WebpackHotMiddleware = require('webpack-hot-middleware')
var glob = require('glob');
var entries = getEntry(['./src/modules/**/*.js', './src/modules/**/*.js']); // 获得入口js文件
console.log(11111111111111)
console.log(entries);
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



//end
app.listen(3000, () => {
    console.log('[demo] route-use-middleware is starting at port 3000')
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