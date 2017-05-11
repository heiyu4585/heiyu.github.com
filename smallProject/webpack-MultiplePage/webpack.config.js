/**
 * Created by Administrator on 2016/11/18.
 */
let webpack = require('webpack');
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let proxy = require('http-proxy-middleware');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

var glob = require('glob');
var entries = getEntryJs('build/**/*.js', 'build/');
var chunks = Object.keys(entries);
/****************  ** */
var config= {
    devtool: 'source-map',//配置生成Source Maps，选择合适的选项
    //devtool: false,
    //入口文件
    entry:entries,
    output: {
        path:__dirname, //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        publicPath: '/',				//模板、样式、脚本、图片等资源对应的server上的路径
        filename: 'js/bundle/[name].[hash].js',			//每个页面对应的主js的生成配置
        chunkFilename: 'js/[id].chunk.js'   //chunk生成的配置
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    resolve: {
        extensions: ['', '.js', '.json','.css','.scss'],
        // 配置默认require路径
        alias:{
            js: path.join(__dirname, "/build/js"),
            scss: path.join(__dirname, "/build/scss"),
            template: path.join(__dirname, "/build/template"),
        }
    },
    devServer: {
        contentBase: "./",//本地服务器所加载的页面所在的目录
        colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新,
        // port: '80', //设置端口号
        // host : '10.1.8.41',
        proxy: {
            '/mcall': {
                target: 'https://m.baidu.com',
                changeOrigin: true,
            }
        }
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css-loader', 'css-loader')
            },
            {
                test: /.js$/,
                // include: path.resolve(__dirname, 'app'), //可以修改为调用common文件
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.scss$/,
                // loader: "style-loader!css-loader!sass-loader",
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            },
            {
                //图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
                //如下配置，将小于81922byte的图片转成base64码
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=image/[hash].[ext]'
            },
            // {
            //     //html模板加载器，可以处理引用的静态资源，默认配置参数attrs=img:src，处理图片的src引用的资源
            //     //比如你配置，attrs=img:src img:data-src就可以一并处理data-src引用的资源了，就像下面这样
            //     test: /\.html$/,
            //     loader: "html?attrs=img:src img:data-src"
            // }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.HotModuleReplacementPlugin(),//热加载插件
        // 提取公共代码
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendors",
            minChunks: 3
        }),
        new webpack.optimize.DedupePlugin(),// 查找相等或近似的模块，避免在最终生成的文件中出现重复的模块
        new webpack.ProvidePlugin({      //当模块使用这些变量的时候,wepback会自动加载。（区别于window挂载）
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "window.$": "jquery"
        }),
        new ExtractTextPlugin("css/bundle/[name].css"),
    ],
    externals:{
        'bigPicShow':'window.bigPicShow',
        'swiper':'window.Swiper',
    },
};
function getEntryJs(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;
    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
        entries[basename] = ['./' + entry];
    }
    return entries;
}

function getEntryHtml(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;
    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(pathDir, '') : pathname;
        entries[basename] = [pathname.replace(/\\/g, "/")];
    }
    return entries;
}

let htmlEentries = getEntryHtml('build/template/**/*.html', 'build\\template\\');

for(var x  in htmlEentries){
    var conf = {
        filename: 'pages/' + htmlEentries[x] + '.html', //生成的html存放路径，相对于path
        template:  'build/template/'+htmlEentries[x] + '.html', //html模板路径
        inject: 'body', //js插入的位置，true/'head'/'body'/false
        hash: true, //为静态资源生成hash值
        chunks: ['vendors', x],//需要引入的chunk，不配置就会引入所有页面的资源
        minify: { //压缩HTML文件
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }
    };
    config.plugins.push(new HtmlWebpackPlugin(conf));
    console.log(conf);
}

module.exports = config;
