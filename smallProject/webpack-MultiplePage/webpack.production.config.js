/**
 * Created by Administrator on 2016/11/18.
 */
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let entryFile = require(__dirname+"/build/entryFile.js"); // 入口文件
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * 入口
 * */
let entry={};
for(var x in entryFile){
    entry[x]=entryFile[x][0]
}

/*
 * */
let templateList=[];
for(var x in entryFile){
    templateList.push(
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
            filename:entryFile[x][2], //生成的html存放路径，相对于path
            template:entryFile[x][1], //html模板路径
            inject: 'body', //js插入的位置，true/'head'/'body'/false
            hash: true, //为静态资源生成hash值
            chunks: ['vendors', x],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        })
    )
}
module.exports = {
    devtool:false,//配置生成Source Maps，选择合适的选项
    //入口文件
    entry:entry ,
    output: {
        path: __dirname,//打包后的文件存放的地方
        filename: "[name].js",//打包后输出文件的文件名
        // filename: '[name].[hash].js'//打包后输出文件的文件名
    },
    resolve: {
        extensions: ['', '.js', '.json','.css','.scss'],
        alias:{
            js: path.join(__dirname, "/build/js"),
            scss: path.join(__dirname, "/build/scss"),
        }
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {
                test: /.js$/,
                // include: path.resolve(__dirname, 'app'), //可以修改为调用common文件
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),// 查找相等或近似的模块，避免在最终生成的文件中出现重复的模块
        //提取公共部分为vendors
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendors",
            minChunks: 3
        }),
        new webpack.ProvidePlugin({      //当模块使用这些变量的时候,wepback会自动加载。（区别于window挂载）
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new ExtractTextPlugin("[name].css"),
        ...templateList
    ],
    externals:{
        //'jquery':'jQuery',
        'bigPicShow':'window.bigPicShow',
        'swiper':'window.Swiper'
    },
};