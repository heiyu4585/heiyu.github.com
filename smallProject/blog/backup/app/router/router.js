// // app/router.js
// let path =require("path");
// module.exports = app => {
//     const { router, controller,middlewares } = app;
//
//     console.log("app.js 执行了")
//
//
//
//     router.get('/', controller.home.index);
//     // router.get('/test', controller.aaa.index);
//     // router.get('/yadan',controller.yadan.index);
//
//     require('./router/news')(app);
//     router.get('/user/:id', controller.user.info);
//     require('./router/search')(app);
//
//     const directory = path.join(app.config.baseDir, 'app/pm');
//     // console.log("app.controller---------------");
//     // console.log(app);
//     // console.log(app.controller);
//     // console.log('app.controller++++++++++++');
//
//     // console.log(app.loader.loadController.toString());
//     // app.loader.loadController({
//     //     directory:directory
//     // });
//
//
//
//     console.log(app.loader.loadToApp.toString());
//     app.loader.loadToApp(directory, 'controller');
//     console.log("改变后的controller");
//     console.log("------改变钱的controller");
//     console.log("改变后的controller");
//     console.log( app.controller);
//     console.log("------改变后的controller");
//     console.log( app.controller);
//     router.get('/pm', app.controller.pm);
// };

const Router = require('koa-router')

let router = new Router();
// let home = new Router();
//
// // 子路由1
// home.get('/', async ( ctx )=>{
//     let html = `
//     <ul>
//       <li><a href="/page/helloworld">/page/helloworld</a></li>
//       <li><a href="/page/404">/page/404</a></li>
//     </ul>
//   `
//     ctx.body = html
// })
//
// // 子路由2
// let page = new Router()
// page.get('/404', async ( ctx )=>{
//     ctx.body = '404 page!'
// }).get('/helloworld', async ( ctx )=>{
//     ctx.body = 'helloworld page!'
// })

// 装载所有子路由
let index=require('./index');
router.use('/', index.routes(), index.allowedMethods());


let page=require('./page');
router.use('/page', page.routes(), page.allowedMethods());


module.exports = function (app) {
    app.use(router.routes()).use(router.allowedMethods())
};