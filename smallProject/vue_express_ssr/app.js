var express = require('express');
var path = require('path');
// 创建一个express实例
var app = express();

//路由必须写在热加载 之前
let users = require('./api/users');
app.use('/users',users);

let ssr = require('./api/ssr');
app.use('/ssr',ssr);


var history = require('connect-history-api-fallback');
app.use(history());//放在app.use(devMiddleware);之前才有效(放在 if(app.get('env') == 'development'){ 之前)
if(app.get('env') == 'development'){
    var webpack = require('webpack');
    var webpackConfig = require('./build/webpack.dev.conf');
    // 调用webpack并把配置传递过去
    var compiler = webpack(webpackConfig);
    // 使用 webpack-dev-middleware 中间件
    var devMiddleware = require('webpack-dev-middleware')(compiler, {
        publicPath: '/',
        stats: {
            colors: true,
            chunks: false
            }
    });
    app.use(devMiddleware);
    app.use(require("webpack-hot-middleware")(compiler));

}else{
    app.use(express.static('output'));
}



//node端转发异步请求
// var proxy = require('http-proxy-middleware');
// app.use('/api', proxy({target: 'https://www.zhihu.com/api/', changeOrigin: true}));
//



module.exports = app;
