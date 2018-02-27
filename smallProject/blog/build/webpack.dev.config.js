'use strict'
let path = require('path');
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// const portfinder = require('portfinder')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
// console.log("++++++++"+PORT)
// console.log(PORT)
var glob = require('glob')
// add hot-reload related code to entry chunks
// Object.keys(baseWebpackConfig.entry).forEach(function (name) {
//   baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
// })


// function getEntry(globPath) {
//     var entries = {},
//         basename, tmp, pathname;
//     if (typeof (globPath) != "object") {
//         globPath = [globPath]
//     }
//     globPath.forEach((itemPath) => {
//         glob.sync(itemPath).forEach(function (entry) {
//             basename = path.basename(entry, path.extname(entry));
//             if (entry.split('/').length > 5 || (entry.split('/').length==5 && basename !="index") ) {
//                 // tmp = entry.split('/').splice(-3);
//                 // pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
//                 // entries[pathname] = entry;
//
//                 var pathname = path.normalize(entry.substring(entry.indexOf("modules/")+8,entry.lastIndexOf("/")));
//                 pathname=pathname.replace("\\","/");
//
//                 entries[pathname] = entry;
//             } else {
//                 entries[basename] = entry;
//             }
//         });
//     });
//     return entries;
// }
var projectRoot = path.resolve(__dirname, '../')

var pages = utils.getEntry([projectRoot+'/src/modules/*.html',projectRoot+'/src/modules/**/*.html']);




const devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
    },
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,

    // these devServer options should be customized in /config/index.js
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: true,
        hot: true,
        compress: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay
            ? { warnings: false, errors: true }
            : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        // quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll,
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        // new HtmlWebpackPlugin({
        //   filename: 'index.html',
        //   template: 'index.html',
        //   inject: true
        // }),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: "./static",
                ignore: ['.*']
            }
        ]),
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, '../../images'),
        //         to: "images",
        //         ignore: ['.*']
        //     }
        // ]),
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, '../../assets'),
        //         to: "assets",
        //         ignore: ['.*']
        //     }
        // ]),
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, '../../javascripts'),
        //         to: "javascripts",
        //         ignore: ['.*']
        //     }
        // ]),
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, '../../stylesheets'),
        //         to: "stylesheets",
        //         ignore: ['.*']
        //     }
        // ]),
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, '../../font-awesome'),
        //         to: "font-awesome",
        //         ignore: ['.*']
        //     }
        // ])
    ]
});

for (var pathname in pages) {
    // 配置生成的html文件，定义路径等
    var conf = {
        filename: pathname + '.html',
        template: pages[pathname],   // 模板路径
        inject: true,              // js插入位置
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency'
        // todo 需要补全
    };

    // console.log('============');
    // console.log(devWebpackConfig.entry )
    if (devWebpackConfig.entry && pathname in devWebpackConfig.entry) {
        conf.chunks = ['manifest', 'vendor', pathname];
        conf.hash = true;
    }
    // console.log(conf)

    devWebpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}


// module.exports = new Promise((resolve, reject) => {
//     portfinder.basePort = process.env.PORT || config.dev.port
//     portfinder.getPort((err, port) => {
//         if (err) {
//             reject(err)
//         } else {
//             // publish the new Port, necessary for e2e tests
//             process.env.PORT = port
//             // add port to devServer config
//             devWebpackConfig.devServer.port = port
//
//             // // Add FriendlyErrorsPlugin
//             // devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
//             //     compilationSuccessInfo: {
//             //         messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
//             //     },
//             //     onErrors: config.dev.notifyOnErrors
//             //         ? utils.createNotifierCallback()
//             //         : undefined
//             // }))
//
//             resolve(devWebpackConfig)
//         }
//     })
// })



module.exports =devWebpackConfig;

