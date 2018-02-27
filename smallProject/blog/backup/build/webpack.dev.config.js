'use strict';
'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
// const vueLoaderConfig = require('./vue-loader.conf')

// console.dir(vueLoaderConfig.loaders);
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

var ExtractTextPlugin = require("extract-text-webpack-plugin")
// let vueLoader = {
//     loaders:
//         {
//             css: ['vue-style-loader', [Object]],
//             postcss: ['vue-style-loader', [Object]],
//             less: ['vue-style-loader', [Object], [Object]],
//             sass: ['vue-style-loader', [Object], [Object]],
//             scss: ['vue-style-loader', [Object], [Object]],
//             stylus: ['vue-style-loader', [Object], [Object]],
//             styl: ['vue-style-loader', [Object], [Object]]
//         },
//     cssSourceMap: false,
//     cacheBusting: true,
//     transformToRequire:
//         {
//             video: ['src', 'poster'],
//             source: 'src',
//             img: 'src',
//             image: 'xlink:href'
//         }
// };


// var projectRoot = path.resolve(__dirname, '../')
var glob = require('glob');
var entries = getEntry(['../src/modules/**/*.js', '../src/modules/**/*.js']); // 获得入口js文件
// console.log(entries)
// var env = process.env.NODE_ENV
// // check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// // various preprocessor loaders added to vue-loader at the end of this file
// var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
// var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
// var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

console.log('=========entries');
let baseWebpackConfig= {
    context: path.resolve(__dirname, '../'),
    // entry: {
    //   app: './src/main.js'
    // },
    entry: entries,
    output: {
        path: config.build.assetsRoot,//打包后的文件存放的地方
        filename: "js/[name].[hash].js",//打包后输出文件的文件名
        publicPath: process.env.NODE_ENV === 'production'//模板、样式、脚本、图片等资源对应的server上的路径
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        // fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue$': 'vue/dist/vue',
            'src': path.resolve(__dirname, '../src'),
            'common': path.resolve(__dirname, '../src/common'),
            'components': path.resolve(__dirname, '../src/components'),
            'assets': path.resolve(__dirname, '../assets'),

        }
    },
    // resolveLoader: {
    //   fallback: [path.join(__dirname, '../node_modules')]
    // },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                // options: vueLoaderConfig,
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
                        }),
                        sass: ExtractTextPlugin.extract({
                            use:'css-loader!sass-loader',
                            fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
                        })
                    }
                }
                //TODO 只能写成 lang="scss" 待兼容 style模式
                //   options: {
                //       loaders: {
                //           css: ExtractTextPlugin.extract('vue-style-loader', 'css-loader', 'sass-loader')
                //       }
                //    },
                // options:{
                //     loaders: {
                //         css: ExtractTextPlugin.extract({
                //             loader: 'css-loader',
                //             fallbackLoader: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
                //         })
                //     }
                // }

                //TODO 官方的写死,但是没有起作用
                // options: {
                //     loaders: {
                //         css: [
                //             [
                //                 'vue-style-loader',
                //                 {loader: 'css-loader', options: { sourceMap: false } }
                //                 ]
                //         ],
                //         postcss:
                //             ['vue-style-loader',
                //                 {loader: 'css-loader',  options: { sourceMap: false }}],
                //         scss:
                //             ['vue-style-loader',
                //                 {loader: 'css-loader',  options: { sourceMap: false }},
                //                 {loader: 'sass-loader',  options: { sourceMap: false }}],
                //     },
                //     cssSourceMap: false,
                //     cacheBusting: config.dev.cacheBusting,
                //     transformToRequire: {
                //         video: ['src', 'poster'],
                //         source: 'src',
                //         img: 'src',
                //         image: 'xlink:href'
                //     }
                // },

            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css")
    ],
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}

function getEntry(globPath) {
    var entries = {},
        basename, tmp, pathname;
    if (typeof (globPath) != "object") {
        globPath = [globPath]
    }
    globPath.forEach((itemPath) => {
        glob.sync(itemPath).forEach(function (entry) {
            if ((entry.indexOf("api") == -1) && (entry.indexOf("components") == -1) && (entry.indexOf("asset") == -1) && (entry.indexOf("router") == -1) && (entry.indexOf("store") == -1)) {
                basename = path.basename(entry, path.extname(entry));
                if (entry.split('/').length > 5 || basename != "index") {
                    // tmp = entry.split('/').splice(-3);
                    // pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
                    pathname = path.normalize(entry.substring(entry.indexOf("modules/") + 8, entry.lastIndexOf("/")));
                    pathname = pathname.replace("\\", "/");
                    entries[pathname] = entry;
                } else {
                    entries[basename] = entry;
                }
            }

        });
    });
    return entries;
}




let path = require('path');
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
// const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// const portfinder = require('portfinder')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
console.log("++++++++"+PORT)
console.log(PORT)
var glob = require('glob')
// add hot-reload related code to entry chunks
// Object.keys(baseWebpackConfig.entry).forEach(function (name) {
//   baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
// })


function getEntry(globPath) {
    var entries = {},
        basename, tmp, pathname;
    if (typeof (globPath) != "object") {
        globPath = [globPath]
    }
    globPath.forEach((itemPath) => {
        glob.sync(itemPath).forEach(function (entry) {
            basename = path.basename(entry, path.extname(entry));
            if (entry.split('/').length > 5 || (entry.split('/').length==5 && basename !="index") ) {
                // tmp = entry.split('/').splice(-3);
                // pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
                // entries[pathname] = entry;

                var pathname = path.normalize(entry.substring(entry.indexOf("modules/")+8,entry.lastIndexOf("/")));
                pathname=pathname.replace("\\","/");

                entries[pathname] = entry;
            } else {
                entries[basename] = entry;
            }
        });
    });
    return entries;
}

var pages = getEntry(['../src/modules/*.html','../src/modules/**/*.html']);


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
                from: path.resolve(__dirname, './static'),
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

