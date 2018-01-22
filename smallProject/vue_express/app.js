// var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
//
// var index = require('../del/routes/index');
// var users = require('../del/routes/users');
//
// var app = express();
//
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
//
// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', index);
// app.use('/users', users);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;

var express = require('express');
var path = require('path');
// 创建一个express实例
var app = express();
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
var proxy = require('http-proxy-middleware');
app.use('/api', proxy({target: 'http://www.example.org', changeOrigin: true}));

module.exports = app;
