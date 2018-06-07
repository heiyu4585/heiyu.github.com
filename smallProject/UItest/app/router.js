// app/router.js
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.get('/news', controller.news.list);
    app.router.get('/result/setBase', app.controller.result.setBase);
    app.router.get('/result/catchJueJin', app.controller.result.catchJueJin);
    app.router.get('/result/:id', app.controller.result.info);
};