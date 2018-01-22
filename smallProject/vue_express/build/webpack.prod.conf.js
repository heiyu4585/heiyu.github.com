var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入基本配置
var webpackConf = require('./webpack.base.conf');
var prodWebpackConf = merge(webpackConf,{
    entry: { index:  path.resolve(__dirname, '../src/main.js') },
    output:{  publicPath:'/',  filename: 'static/js/[name].[hash].js' },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            compress: {    warnings: false   }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../index.html'),
            inject: true
        }),
    ]});
module.exports = prodWebpackConf;