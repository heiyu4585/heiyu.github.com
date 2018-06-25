var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// 监视文件改动并重新载入
gulp.task('default', function() {
    console.log(123);
    browserSync({
        server: {
            // baseDir: 'smallProject/vue_express_ssr/output'
            baseDir: 'smallProject/rxjsDemo'
        },
        port: 8090
    });

    // gulp.watch(['**/*.html', '**/*.css', '*.js'], {cwd: 'baiduife/2017'}, reload);
    gulp.watch(['**/*.html', '**/*.css', '*.js'], {cwd: 'smallProject/rxjsDemo'}, reload);
});