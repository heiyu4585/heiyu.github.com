
const rename = require('gulp-rename');
const postcss = require('gulp-postcss')
const pxtorpx = require('postcss-px2rpx');
const base64 = require('postcss-font-base64');
const combiner = require('stream-combiner2');
const sourcemaps = require('gulp-sourcemaps')
const jdists = require('gulp-jdists')
const through = require('through2');
const bable= require('gulp-babel');
const uglify = require('gulp-uglify');
const argv = require('minimist')(process.argv.slice(2));
//判断 gulp --type prod 命名type 是否是生产打包
const isProd  = argv.type=='prod';
const src = './src';
const dist = './dist';


gulp.task('wxml', () => {
    return gulp
        .src(`${src}/**/*.wxml`)
        .pipe(gulp.dest(dist))
})


gulp.task('wxss', () => {
    const combined = combiner.obj([
        gulp.src(`${src}/**/*.{wxss,scss}`),
        sass.on('error', sass.logError),
        postcss([pxtorpx(), base64()]),
        rename((path) => (path.extname = '.wxss')),
        gulp.dest(dist)
    ])

    combined.on('error', handleError)
})


gulp.task('js',()=>{
    gulp
    .src(`${src}/**/*.js`)
    .pipe(sourcemaps.init())
    .pipe(
        babel({
            presets:[
                'env'
            ]
        })
    )
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dist))
})

gulp.task('json',()=>{
    return gulp.src(`${src}/**/*.json`).pipe(gulp.dest(dist))
})

gulp.task('images',()=>{
    return gulp.src(`${stc}/imags/**`).pipe(gulp.dest(`${dist}/images`))
})

gulp.task('wxs',()=>{
    return gulp.src(`${src}/**/*.wxs`).pipe(gulp.dest(dist))
})

