'use strict';

module.exports = appInfo => {
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1523770487111_3112';

  // add your config here
  config.middleware = [];

// 添加 view 配置
    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.tpl': 'nunjucks',
        },
    };
    //静态资源
    config.static = {
        prefix: '/'
        // maxAge: 31536000,
    };


    // config/config.default.js
// 添加 news 的配置项
    config.news = {
        pageSize: 5,
        serverUrl: 'https://hacker-news.firebaseio.com/v0',
    };

    return config;
};
