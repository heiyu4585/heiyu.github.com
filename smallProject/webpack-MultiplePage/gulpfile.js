/**
 * Created by WangNing on 2017/1/3.
 */
var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    cleancss = require("gulp-clean-css");
var proxyMiddleware = require('http-proxy-middleware');
var WebpackDevServer = require("webpack-dev-server");
// 监视文件改动并重新载入
gulp.task('serve', function () {
    browserSync({
        server: {
            baseDir: 'medplus_h5'
        }
    });
    //// 代理配置, 实现环境切换
    //var middleware = proxyMiddleware(['/mcall'], {target: "192.168.1.95", changeOrigin: true});
    //browserSync({
    //    server: {
    //        baseDir: 'medplus_h5',
    //        middleware: middleware
    //    }
    //});
    //压缩后的目录
    gulp.watch(['*.html', 'design-html/**/*.html', 'css/**/*.css', 'js/**/*.js'], {cwd: 'medplus_h5'}, reload);
});
gulp.task("sass", function () {
    // 压缩前的位置
    return gulp.src("medplus_h5/build/scss/**/*.scss").pipe(sass({style: "expanded"})).pipe(cleancss({
        advanced: false,
        compatibility: 'ie8',
        keepBreaks: false,
        keepSpecialComments: '*'
    })).pipe(autoprefixer({
        browsers: ['Android >= 3.5', 'last 4 versions', 'ie >= 8', 'ie_mob >= 10', 'ff >= 30', 'chrome >= 34', 'safari >= 6', 'opera >= 12.1', 'ios >= 6', 'bb >= 10'],
        cascode: true
        //    压缩后的位置
    })).pipe(gulp.dest("medplus_h5/css/bundle"));
});

gulp.task("default", ['serve', 'scripts'], function () {
    gulp.watch(['build/scss/**/*.scss'], {cwd: 'medplus_h5'}, ['sass']);
});


var gutil = require("gulp-util");
var webpack = require("webpack");
// var webpackConfig = require("./webpack.config.js");
// var webpackProductionConfig = require("./webpack.production.config.js"); //生产环境的配置

// npm install --save-dev gulp gulp-if gulp-uglify minimist

/**
 * gulp watch --env dev  || gulp  watch   走默认默认配置,默认入口
 * gulp watch --env  indexV2   走indexV2入口
 * gukp  watch --env production   开发环境  production
 * */
var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');

var minimist = require('minimist');

var knownOptions = {
    string: 'env',
    default: {env: process.env.NODE_ENV || 'dev'} //默认开发环境
};

var options = minimist(process.argv.slice(2), knownOptions);
var entryFile = require(__dirname + "/medplus_h5/build/entryFile.js"); // 入口文件
if (options.env === 'p') { //生产环境
    console.log('production');
    var webpackConfig = require("./webpack.production.config.js"); //生产环境的配置
} else if (options.env === 'dev') { //开发环境
    //不设置具体入口文件,走默认配置
    var webpackConfig = require("./webpack.config.js");
} else {
    console.log('不为空,获取参数,');
    var webpackConfig = require("./webpack.config.js");
    //设置入口文件
    var entry = options.env;
    webpackConfig.entry = {};
    if(entry.length>1){
        entry=entry.split(",");
        for(var i=0;i<entry.length;i++){
            webpackConfig.entry[entry[i]] = entryFile[entry[i]];
        }
console.log(webpackConfig.entry);
    }else{
        webpackConfig.entry[entry] = entryFile[entry];
    }
}

gulp.task('scripts', function () {
    // return gulp.src('medplus_h5/**/*.js')
    //     .pipe(gulpif(options.env === 'production', ['webpack'])) // 仅在生产环境时候进行压缩
    //     .pipe(gulp.dest('medplus_h5/js/bundle'));

    var watcher = gulp.watch(['build/js/**/*.js'], {cwd: 'medplus_h5'}, ['webpack']);
    watcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    })
});

gulp.task("webpack", function (callback) {
    var myConfig = Object.create(webpackConfig);
    //console.log(webpackConfig);
    //console.log(options);
    // run webpack
    webpack(
        // configuration
        myConfig
        , function (err, stats) {
            // if(err) throw new gutil.PluginError("webpack", err);
            // gutil.log("[webpack]", stats.toString({
            //     // output options
            // }));
            callback();
        });
});
var webpackConfig = require("./webpack.config.js");
gulp.task("webpack-dev-server", function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "source-map";
    myConfig.debug = true;
    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        publicPath: "/" + myConfig.output.publicPath,
        stats: {
            colors: true
        },
        contentBase: "./medplus_h5",//本地服务器所加载的页面所在的目录
        colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新,
    }).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    });
});

gulp.task("read", function (callback) {
    var rf=require("fs");
    var data=rf.readFileSync("./medplus_h5/indexV2.html","utf-8");
    console.log(data);
    console.log(data.replace(/src.*?.js /, "$2 $1"))
    console.log("READ FILE SYNC END");
    gulp.src(['./src/**/*.css', './src/**/*.js', './src/**/*.png'])
        .pipe(gulp.dest("dist"));
});
var base64 = require('gulp-base64');

//basic example
gulp.task('build', function () {
    return gulp.src('medplus_h5/build/scss/subscribe/subscribe.scss')
        .pipe(base64())
        .pipe(gulp.dest('medplus_h5/build/css'));
});