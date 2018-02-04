var express = require('express');
var router = express.Router();

const Vue = require('vue')
// const renderer = require('vue-server-renderer').createRenderer()

const renderer =  require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./api/index.template.html', 'utf-8')
})


const createApp = require('./app')
/* GET users listing. */
router.get('/', function(req, res, next) {


    // renderer.renderToString(app, (err, html) => {
    //     if (err) {
    //         res.status(500).end('Internal Server Error')
    //         return
    //     }
    //     res.end(`
    //   <!DOCTYPE html>
    //   <html lang="en">
    //     <head><title>Hello</title></head>
    //     <body>
    //     ${html}/ssr
    //     </body>
    //   </html>
    // `)
    // })
    const context = { url: req.url }
    const app = createApp(context)
    renderer.renderToString(app, (err, html) => {
        // 处理错误……
        res.end(html)
    })


  // res.json({
  //     "code": 1,
  //     "data": {
  //         "txt":"ze这是ssssr"
  //     }
  // });
});

module.exports = router;
