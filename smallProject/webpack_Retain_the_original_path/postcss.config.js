module.exports = {
plugins: [
    require('autoprefixer')({browsers: ['Android >= 3.5', 'last 4 versions', 'ie >= 8', 'ie_mob >= 10', 'ff >= 30', 'chrome >= 34', 'safari >= 6', 'opera >= 12.1', 'ios >= 6', 'bb >= 10']})
    ]
}