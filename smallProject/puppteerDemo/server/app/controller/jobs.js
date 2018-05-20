// app/controller/news.js
const Controller = require('egg').Controller;

class JobsController extends Controller {
    // 默认不需要提供构造函数。
    constructor(ctx) {
        super(ctx); //如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
        // 就可以直接通过 this.ctx 获取 ctx 了
        // 还可以直接通过 this.app 获取 app 了
    }
    async list() {
        const ctx = this.ctx;
        const page = ctx.query.page || 1;
        const dataList = await ctx.service.news.list(page);
        return  await dataList;
    }
}

module.exports = JobsController;