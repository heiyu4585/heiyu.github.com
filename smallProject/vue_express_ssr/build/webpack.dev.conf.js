var path = require('path');
var webpack = require('webpack');
var webPackBaseConf = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var hotClient = './build/hot-client';

var webpackDevConf = merge(webPackBaseConf,{

    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../index.html'),
            inject: true
        }),
        // Webpack 1.0  new webpack.optimize.OccurenceOrderPlugin(),
        // Webpack 2.0 fixed this mispelling
        // new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]});

Object.keys(webpackDevConf.entry).forEach(function (name) {
    var extras = [hotClient];
    webpackDevConf.entry[name] = extras.concat(webpackDevConf.entry[name]);
});

console.log(webpackDevConf);
module.exports = webpackDevConf;