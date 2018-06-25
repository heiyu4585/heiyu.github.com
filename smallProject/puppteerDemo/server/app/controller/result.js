const Controller = require('egg').Controller;
class UserController extends Controller {
    constructor(ctx) {
        super(ctx); //如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
        // 就可以直接通过 this.ctx 获取 ctx 了
        // 还可以直接通过 this.app 获取 app 了
    }
    async info() {
        const ctx = this.ctx;
        const userId = ctx.params.id;
        const userInfo = await ctx.service.user.find(userId);
        ctx.body = userInfo;
    }
}
module.exports = UserController;