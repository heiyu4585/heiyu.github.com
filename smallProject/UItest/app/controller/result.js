const Controller = require('egg').Controller;
let fs = require("fs");
class UserController extends Controller {
    constructor(ctx) {
        super(ctx); //如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
        // 就可以直接通过 this.ctx 获取 ctx 了
        // 还可以直接通过 this.app 获取 app 了
    }

    async info() {
        const ctx = this.ctx;
        const id = ctx.params.id;
        const resultInfo = await ctx.service.result.find(id);
        ctx.body = resultInfo;
    }
    //设置基准
    async setBase() {
        console.log("开始执行 setBase")
        const ctx = this.ctx;
        await this.ctx.service.result.screenShot("https://www.baidu.com/", 'monitoring/allinmed_base.png');
        let isExist = fs.existsSync("monitoring/allinmed_base.png");
        console.log("isExist",isExist);
       if(isExist){
           ctx.body = "设置基准成功!";
       }else{
           ctx.body = "设置基准失败!";
       }

    }
    //设置基准
    async catchJueJin() {
        console.log("开始执行 catchJueJin")
        const ctx = this.ctx;
       let catchJueJin =  await this.ctx.service.result.getDataFromJueJin("https://juejin.im/welcome/frontend");
        ctx.body = catchJueJin;
    }
}

module.exports = UserController;