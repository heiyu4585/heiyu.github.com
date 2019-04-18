var gulp = require('gulp');
var connect = require('gulp-connect');
var cleancss = require("gulp-clean-css");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
const interfaces = require('os').networkInterfaces(); // 在开发环境中获取局域网中的本机iP地址
let IPAdress = '';
for (let devName in interfaces) {
    let iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
        let alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
            IPAdress = alias.address;
        }
    }
}

//npm i

let htmlPath = './*.html';
let scssPath = './scss/*.*';
let scssOutPath = './css/';
let rootPath = './';

gulp.task('connect', function () {
    connect.server({
        root: rootPath,
        host:IPAdress,
        livereload: true,
        port: 8988
    })
})

// 获取 gulp

gulp.task("sass", function () {
    return gulp.src(scssPath).pipe(sass({style: "expanded"})).pipe(cleancss({
        advanced: false,
        compatibility: 'ie8',
        keepBreaks: false,
        keepSpecialComments: '*'
    })).pipe(autoprefixer({
            browsers: ['Android >= 3.5', 'last 4 versions', 'ie >= 8', 'ie_mob >= 10', 'ff >= 30', 'chrome >= 34', 'safari >= 6', 'opera >= 12.1', 'ios >= 6', 'bb >= 10'],
            cascode: true
        }
    )).pipe(gulp.dest(scssOutPath));
});
// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行 images 任务
    gulp.watch(scssPath, ['sass']);
    gulp.watch(htmlPath, ['html']);
});

gulp.task('html', function () {
    gulp.src(htmlPath)
        .pipe(connect.reload());
});

gulp.task('default', ['connect', 'sass', 'auto'])
