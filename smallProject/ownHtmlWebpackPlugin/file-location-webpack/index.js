/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by WangNing on 2017/6/1.
 */
function MyPlugin(options) {
    this.options = options;
    // console.log(options)
}

MyPlugin.prototype.apply = function(compiler) {
    // console.log( this.options)
    var paths = this.options.paths;
    compiler.plugin('compilation', function(compilation, options) {
        compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
             // console.log(htmlPluginData);
            // console.log(callback);
            for (var i = paths.length - 1; i >= 0; i--) {
                htmlPluginData.assets.js.unshift(paths[i]);
            }
            callback(null, htmlPluginData);
        });
    });
};

module.exports = MyPlugin;