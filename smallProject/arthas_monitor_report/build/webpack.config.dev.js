/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by WangNing on 2018/6/20.
 */

let webpack = require('webpack');
let path = require('path');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base')
var config =  merge(baseWebpackConfig, {
    // devtool: 'source-map',//配置生成Source Maps，选择合适的选项
    devtool: 'source-map',//配置生成Source Maps，选择合适的选项
    devServer: {
        contentBase: "./",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新,
        port: '8088', //设置端口号
        hot:true,
        // host : '10.1.8.41',
        proxy: {
            '/mcall': {
                target: 'https://m.baidu.com',
                changeOrigin: true,
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
})

module.exports = config;