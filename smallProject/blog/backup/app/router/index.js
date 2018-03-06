const Router = require('koa-router')

let router = new Router();

// 子路由1
router.get('/', async ( ctx )=>{
    let html = `
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `
    ctx.body = html
})
//
// router.get('/:id', async ( ctx )=>{
//     console.log(this.params);
//     console.log(this.request.params);
//     ctx.body = 'this a users response!';
// });


// 路由
// router.get('/:pagename?', function (req, res, next) {
//     console.log("==========pagename");
//     console.log(pagename);
//     console.log(this.params);
//     console.log(this.request.params);
//     console.log(this.request.params.pagename);
//     var pagename = req.params.pagename
//         ? req.params.pagename + '.html'
//         : 'index.html';
//     console.log("00000000000000000000");
//     console.log(compiler.outputPath)
//     var filepath = path.join(compiler.outputPath, pagename)
//     // 使用webpack提供的outputFileSystem
//     compiler.outputFileSystem.readFile(filepath, function (err, result) {
//         if (err) {
//             // something error
//             return next('输入路径无效，请输入目录名作为路径，有效路径有：\n/' + Object.keys(entries).join('\n/'))
//         }
//         // 发送获取到的页面
//         res.set('content-type', 'text/html')
//         res.send(result)
//         res.end()
//     })
// })

module.exports=router;