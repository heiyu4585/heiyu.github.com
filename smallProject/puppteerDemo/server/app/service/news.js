// app/service/news.js
const Service = require('egg').Service;

class NewsService extends Service {
    async list(page = 1) {
        // read config
        const { serverUrl, pageSize } = this.config.news;

        console.log(serverUrl)
        console.log(pageSize)

        return  {
            list: [
                { id: 1, title: 'this is news 1', url: '/news/1' },
                { id: 2, title: 'this is news 2', url: '/news/2' }
            ]
        };
    }
}

module.exports = NewsService;