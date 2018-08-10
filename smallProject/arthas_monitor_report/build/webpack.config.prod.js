/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by WangNing on 2018/6/20.
 */
'use strict'
const path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const baseWebpackConfig = require('./webpack.config.base');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var config = merge(baseWebpackConfig, {
    // devtool: 'source-map',//配置生成Source Maps，选择合适的选项
    devtool: false,//配置生成Source Maps，选择合适的选项
    plugins: [
        // new UglifyJSPlugin({}),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../arthas_monitor_report'),
                to: path.resolve(__dirname, '../../../modules/arthas_monitor_report'),
                ignore: ['.*', '*.scss', '*.png', '*.mp3', '*.gif', '*.ico', '*.jpg', '*.jpeg','*.svg','*.mp4']
            }
        ]),
    ]
})

module.exports = config;