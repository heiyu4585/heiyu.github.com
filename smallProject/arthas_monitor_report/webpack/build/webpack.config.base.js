/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by WangNing on 2018/6/20.
 */

let path = require('path');
var config = {
    devtool: 'source-map',//配置生成Source Maps，选择合适的选项
    //入口文件
    entry:'./src/index.js' ,
    output: {
        path: path.resolve(__dirname,"../arthas_monitor_report"),//打包后的文件存放的地方
        publicPath: '/arthas_monitor_report',				//模板、样式、脚本、图片等资源对应的server上的路径
        filename: "arthas_monitor_report.js" ,//打包后输出文件的文件名
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
                loader: 'babel-loader?cacheDirectory'
            }
        ],
    }
}

module.exports = config;