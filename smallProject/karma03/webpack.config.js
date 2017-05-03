var path = require('path');

var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    entry: "./karma-bundle.js",
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
};