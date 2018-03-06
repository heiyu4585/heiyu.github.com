// 子路由2
const Router = require('koa-router')


// 子路由2
let router = new Router();
router.get('/404', async ( ctx )=>{
    ctx.body = '404 page!'
}).get('/helloworld', async ( ctx )=>{
    ctx.body = 'helloworld page!'
})



module.exports = router;