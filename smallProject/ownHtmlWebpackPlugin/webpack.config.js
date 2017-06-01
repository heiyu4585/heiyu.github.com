/**
 * Created by Administrator on 2016/11/18.
 */
let webpack = require('webpack');
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let proxy = require('http-proxy-middleware');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
var glob = require('glob');
var entries = getEntryJs('build/js/scene/**/*.js', 'build/js/');
var jsChunks = Object.keys(entries);
var autoprefixer = require('autoprefixer');
let MyPlugin = require('MyPlugin');
let headScriptPaths ={
    head:["./configuration/config.js","/third-party/js/flexible.js"]
};
var config = {
    devtool: 'source-map',//配置生成Source Maps，选择合适的选项
    //入口文件
    entry:entries ,
    output: {
   path: __dirname+"/medplus_h5",//打包后的文件存放的地方
        publicPath: '/',				//模板、样式、脚本、图片等资源对应的server上的路径
        filename: "js/[name].[hash].js" ,//打包后输出文件的文件名
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    resolve: {
        extensions: ['.js', '.json','.css','.scss'],
        // 配置默认require路径
        alias:{
            js: path.join(__dirname, "build/js"),
            scss: path.join(__dirname, "build/scss"),
            css: path.join(__dirname, "build/css"),
            template: path.join(__dirname, "build/template"),
        }
    },
    devServer: {
        contentBase: "./CCCCCC_h5/",//本地服务器所加载的页面所在的目录
        colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新,
         port: '80', //设置端口号
          host : '10.1.8.41',
        // hot: true,
        proxy: {
            '/mcall': {
                target: 'https://m.baidu.net',
                changeOrigin: true,
            }
        }
    },
    module: {
        // loaders: [
        rules:[
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /.js$/,
                // include: path.resolve(__dirname, 'app'), //可以修改为调用common文件
                exclude: /node_modules/,
                loader: 'babel-loader?cacheDirectory'
            },
            {
                test: /\.scss$/,
                // loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader?minimize', 'postcss-loader','sass-loader']
                })
            },
            {
                //图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
                //如下配置，将小于81922byte的图片转成base64码
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=image/[hash].[ext]'
            },
        ],
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
        new MyPlugin({
            paths: ["./configuration/config.js","/third-party/js/flexible.js","http://cdn2.jianshu.io/assets/babel-polyfill-fab041d7680df0d997e3.js"]
        }),
        // new webpack.ProvidePlugin({      //当模块使用这些变量的时候,wepback会自动加载。（区别于window挂载）
        //     $: "jquery",
        //     jQuery: "jquery",
        //     "window.jQuery": "jquery",
        //     "window.$": "jquery"
        // }),
        new ExtractTextPlugin({
            filename:"css/[name].[chunkhash].css",
            // disable:false,
        }),
        // new OpenBrowserPlugin({ url: 'http://localhost:8080' })
    ],
    externals:{
        //'jquery':'jQuery',
        'bigPicShow':'window.bigPicShow',
        'swiper':'window.Swiper',
        'paasBase':'window.paasBase',
    },
    watch:true,
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
        entries[basename] = ['./' +entry];
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
        pathname = pathDir ? pathname.replace(pathDir, '').replace('build/template/',"") : pathname;
        entries[basename] = [pathname.replace(/\\/g, "/")];
    }
    return entries;
}

let htmlEentries = getEntryHtml('build/template/**/*.html', 'build\\template\\');

for(var x  in htmlEentries){
    let filename;
    if(x == 'index' || x =='active'){
        filename=  htmlEentries[x] + '.html';
    }else{
        filename='pages/' + htmlEentries[x] + '.html';
    }
/**
 * 判断是否包含对应js入口,如果不存在则不引用js*/
    let chunks=jsChunks.indexOf(x)!= -1 ? ['vendors', x]:['', x];
    var conf = {
        favicon:'medplus_h5/favicon.ico',
        filename: filename, //生成的html存放路径，相对于path
        template:  'build/template/'+htmlEentries[x] + '.html', //html模板路径
        inject: {
            head:["./configuration/config.js","/third-party/js/flexible.js"],
            body:  ["http://cdn2.jianshu.io/assets/babel-polyfill-fab041d7680df0d997e3.js",'vendors', x]
        },
        hash: false, //为静态资源生成hash值
        chunks: chunks,//需要引入的chunk，不配置就会引入所有页面的资源
        minify: { //压缩HTML文件
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }
    };
    config.plugins.push(new HtmlWebpackPlugin(conf));
}

module.exports = config;