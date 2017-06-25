/**
 * Created by Administrator on 2016/11/18.
 * 命令行为:
 * npm run build -- --env.cps showBigImg,base
 */

let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let autoprefixer = require('autoprefixer');
// 加载File System读写模块
let fs = require('fs');
// 加载编码转换模块
let iconv = require('iconv-lite');

module.exports = function(env) {
    /*
    * js入口文件,html入口文件
    * */
    let entries=null,htmlEentries=null;
    if(env && env.cps){ //如果存在参数
        writeFile(env.cps);
        entries = readFileList('./build/components','js').pathStyle;
        // htmlEentries = readFileList('./build/components','html').pathStyle;
    }else{
         entries = readFileList('./build','js').pathStyle;
          htmlEentries = readFileList('./build','html').pathStyle;
          console.log(htmlEentries)
    }
    let config = {
        devtool:false,//配置生成Source Maps，选择合适的选项
        //入口文件
        entry:entries ,
        output: {
            path: __dirname+"/modules",//打包后的文件存放的地方
            publicPath: '/',		//模板、样式、脚本、图片等资源对应的server上的路径
            filename: "[name].js" ,//打包后输出文件的文件名
            chunkFilename: '[name].[chunkhash].js'   //chunk生成的配置
        },
        resolve: {
            extensions: ['.js', '.json','.css','.scss'],
            // 配置默认require路径
            alias:{
                buildPath: path.join(__dirname, "build"),
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
                    // test: /.(png|jpe?g|gif|svg)(\?\S*)?$/,
                    test: /\.(png|jpg|gif)$/,
                    loader: 'url-loader?limit=8192&name=image/[hash].[ext]'
                },
            ],
        },
        plugins: [
            // new CleanWebpackPlugin(['medplus_h5/js', 'medplus_h5/css'], {
            //     root: __dirname,
            //     verbose: true,
            //     dry: false,
            //     exclude: ["", "", "ignore"]//排除不删除的目录，主要用于避免删除公用的文件
            // }),
            // new CopyWebpackPlugin([
            //     {from: 'build/src', to: './'},
            // ]),
            // new webpack.optimize.UglifyJsPlugin({
            //     // 最紧凑的输出
            //     beautify: false,
            //     // 删除所有的注释
            //     comments: false,
            //     compress: {
            //         // 在UglifyJs删除没有用到的代码时不输出警告
            //         warnings: false,
            //         // 删除所有的 `console` 语句
            //         // 还可以兼容ie浏览器
            //         drop_console: true,
            //         // 内嵌定义了但是只用到一次的变量
            //         collapse_vars: true,
            //         // 提取出出现多次但是没有定义成变量去引用的静态值
            //         reduce_vars: true,
            //     }
            // }),
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify("production")
                }
            }),
            //提取公共部分为vendors
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: "vendors",
            //     minChunks: 3
            // }),
            // new webpack.ProvidePlugin({      //当模块使用这些变量的时候,wepback会自动加载。（区别于window挂载）
            //     $: "jquery",
            //     jQuery: "jquery",
            //     "window.jQuery": "jquery"
            // }),
            new ExtractTextPlugin({
                // filename:"[name].[chunkhash].css",
                filename:"[name].css",
                // disable:false,
            }),
        ],
        externals:{
            //'jquery':'jQuery',
            'bigPicShow':'window.bigPicShow',
            'swiper':'window.Swiper'
        },
    };

    for(let x in htmlEentries){
        console.log(x);
        // let filename;
        // filename='pages/' + htmlEentries[x] + '.html';

        // console.log(htmlEentries[x]);
        /**
         * 判断是否包含对应js入口,如果不存在则不引用js*/
            // let chunks=jsChunks.indexOf(x)!= -1 ? ['vendors', x]:['', x];
        var conf = {
                // favicon:'medplus_h5/favicon.ico',
                filename: htmlEentries[x].replace("./build/",""), //生成的html存放路径，相对于path
                template:  htmlEentries[x], //html模板路径
                inject: 'head', //js插入的位置，true/'head'/'body'/false
                hash: true, //为静态资源生成hash值
                chunks:[x],//需要引入的chunk，不配置就会引入所有页面的资源
                minify: { //压缩HTML文件
                    removeComments: false, //移除HTML中的注释
                    collapseWhitespace: false //删除空白符与换行符
                }
            };
        config.plugins.push(new HtmlWebpackPlugin(conf));
    }
    return config;
};
/*
*
* */
function  readFileList(path,fileExt){
    let fileList ={
        nameStyle:{}, //{ base:"./build/base.js"}
        pathStyle:{} //{ "./build/base.js":"./build/base.js"}
    };
    function walk(path){
        let dirList = fs.readdirSync(path);
        dirList.forEach(function(item){
            if(fs.statSync(path + '\/' + item).isFile()){
                let index = item.lastIndexOf(".");
                let ext = item.substr(index+1);
                let nameindex = item.lastIndexOf("\/");
                let name="";
                if(nameindex!= -1){
                    //存在'/'的话
                     name = item.substr(nameindex,index+1);
                }else{
                     name = item.substr(0,index);
                }
                if(ext==fileExt){
                    fileList.nameStyle[name] = (path + '\/' + item);
                    /*
                    * 如果在根目录时,path值为'./build'
                    * */
                    path.indexOf("./build/")!= -1 ?  fileList.pathStyle[path.replace("./build/","") + '\/' + name] = (path + '\/' + item) : fileList.pathStyle[path.replace("./build","") + '\/' + name] = (path + '\/' + item)
                }
            }
        });

        dirList.forEach(function(item){
            if(fs.statSync(path + '\/' + item).isDirectory()){
                walk(path + '\/' + item);
            }
        });
    }
    walk(path);
    return fileList;
}

function writeFile(env){
    let fileList=readFileList('./build','js');
    let envBySort =  env.split(",").sort(function(a,b){return a.toString().localeCompare(b)});
    let str =envBySort.map(function(ele,index){
        return  `require('${"."+fileList.nameStyle[ele].replace("/build","")}'); `
    }).join("");
    let file = './build/components/'+envBySort+'.js';
    /**
     * 如果文件夹不存在时,会失败!
     * */
    fs.writeFile(file, str, function(err){
        if(err)
            console.log("fail " + err);
        else
            console.log("写入文件ok");
    });
}

