// 因此，我们不应该直接创建一个应用程序实例，而是应该暴露一个可以重复执行的工厂函数，为每个请求创建新的应用程序实例：
// app.js
const Vue = require('vue')
module.exports = function createApp (context) {
    return new Vue({
        data: {
            url: context.url
        },
        template: `<div>访问的 URL 是： {{ url }}</div>`
    })
}