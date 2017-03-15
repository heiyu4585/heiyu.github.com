var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// 监视文件改动并重新载入
gulp.task('default', function() {
    console.log(123);
    browserSync({
        server: {
            baseDir: 'vue'
        }
    });

    gulp.watch(['*.html', '*.css', '*.js'], {cwd: 'vue'}, reload);
});