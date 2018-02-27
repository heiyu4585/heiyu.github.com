const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.dev.config');
const options = {
    // contentBase: './dist',
    hot: true,
    // host: 'localhost',
    inline:true
};

var glob = require('glob');
var path = require('path');
var entries = getEntry(['./src/modules/**/*.js', './src/modules/**/*.js']); // 获得入口js文件

console.log("build-server")
console.log(entries);
config.entry=entries;
webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
    console.log('dev server listening on port 5000');
});


var glob = require('glob');
var path = require('path');
var entries = getEntry(['./src/modules/**/*.js', './src/modules/**/*.js']); // 获得入口js文件
console.log(entries)
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
