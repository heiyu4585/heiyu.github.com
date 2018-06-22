/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by WangNing on 2018/6/20.
 */
/**
 * Created by Administrator on 2016/11/18.
 */
let webpack = require('webpack');
let path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var config = {
    // devtool: 'source-map',//配置生成Source Maps，选择合适的选项
    devtool: 'null',//配置生成Source Maps，选择合适的选项
    //入口文件
    entry:'./allinPinYin.js' ,
    output: {
        path: path.join(__dirname+"/build"),//打包后的文件存放的地方
        publicPath: '/',				//模板、样式、脚本、图片等资源对应的server上的路径
        filename: "allinPinYin_es5.js" ,//打包后输出文件的文件名
        chunkFilename: '[name].[chunkhash].js'   //chunk生成的配置
    },
    resolve: {
        extensions: ['.js', '.json','.css','.scss'],
        // 配置默认require路径
        alias:{
            js: path.join(__dirname, "build/js"),
            scss: path.join(__dirname, "build/scss"),
            template: path.join(__dirname, "build/template"),
            css: path.join(__dirname, "build/css"),
        }
    },
    module: {
        rules:[
            {
                test: /.js$/,
                // include: path.resolve(__dirname, 'app'), //可以修改为调用common文件
                exclude: /node_modules/,
                loader: 'babel-loader?cacheDirectory',
                options: {
                    presets: ['es2015']
                },
            }
        ],
    },
    plugins: [
        new UglifyJSPlugin({
        })
    ]
}

module.exports = config;