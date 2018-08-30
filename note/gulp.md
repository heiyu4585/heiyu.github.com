# gulp



## 知识点

gulp-htmlmin本身就有对页面上js、css的压缩支持，配置参数即可，无需再使用其他插件

常用配置：

```
var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin');
 
gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,  //清除HTML注释
        collapseWhitespace: true,  //压缩HTML
        collapseBooleanAttributes: true,  //省略布尔属性的值 <input checked="true"/> ==> <input checked />
        removeEmptyAttributes: true,  //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,  //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
        minifyJS: true,  //压缩页面JS
        minifyCSS: true  //压缩页面CSS
    };
    gulp.src('src/html/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/html'));
});
```
[更多gulp-htmlmin配置参数>>](https://github.com/kangax/html-minifier#options-quick-reference)

## 操作

1. 删除 ckplayer66 ,展示互动直播,swiper多余部分
2. 

## bug

 The code generator has deoptimised the styling of as it exceeds the max of "500KB".

[.pipe(babel({compact: false}))](https://stackoverflow.com/questions/30879773/how-to-handle-code-generator-has-deoptimised-styling-message-from-gulp-babel)


---

gulp错误打印:

Following this helped:

Install Gulp-util
Import the Gulp-util by using the following statement: var gutil = require('gulp-util');
Finally, when you are uglifying the code, attach the error handler like this: .pipe(uglify().on('error', gutil.log))
I was able to debug it. It was a syntax error in one of the minified files I was including.


---

问题:

events.js:141
      throw er; // Unhandled 'error' event
      ^
Error
    at new JS_Parse_Error (eval at <anonymous> (


解决方法:

var babel  = require('gulp-babel');
var es2015 = require('babel-preset-es2015');
var babelminify = require('gulp-babel-minify');
...
gulp.task('scripts-dev', () => {
  return gulp.src(paths.vendorJavascript.concat(paths.appJavascript, paths.appTemplates))
    .pipe(plugins.if(/html$/, buildTemplates()))
    .pipe(babel({
        presets: [es2015]
    }))
    .pipe(babelminify())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('app.js'))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest(paths.tmpJavascript))
    .pipe(plugins.connect.reload());
});


https://github.com/terinjokes/gulp-uglify/issues/146

## 需要解决的问题
以文件夹为文件名时,如果一个文件夹内有多


---
[gulp生成发布包脚本](http://www.cnblogs.com/yuanxiaoping_21cn_com/p/5796375.html)


---
1. 单模块直接引用
2. 传递 css／js路径
3. gulp图片压缩
4. 
```
开发   ：   modules
单模块 ：   compress／modules
组合   ：   图片调用单模块
     
        / AB
            /A,b.js
            /a,b.css
            /config.js
            
```
5.命令行拆分
```
gulp --env "in:a.js,b.js;ou:ta,b.2017.js"

```

http://nodejs.cn/api/child_process.html#child_process_child_process_exec_command_options_callback


---

GulpUglifyError: unable to minify JavaScript
The code generator has deoptimised the styling of "as it exceeds the max of "500KB"


     .pipe(babel({compact: false}))


