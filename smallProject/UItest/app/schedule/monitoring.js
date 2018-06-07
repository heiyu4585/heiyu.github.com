const Subscription = require('egg').Subscription;

class monitoring extends Subscription {
    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    static get schedule() {
        return {
            // cron: '0 0 */3 * * *',
            interval: '60m', // 1 分钟间隔
            type: 'all', // 指定所有的 worker 都需要执行
        };
    }

    // subscribe 是真正定时任务执行时被运行的函数
    async subscribe() {
        //比对
        await this.ctx.service.result.screenShot("https://triage.allinmed.cn/", 'monitoring/allinmed.png');
        this.ctx.service.result.compare("monitoring/allinmed.png", "monitoring/allinmed_base.png")
            .then(function (data) {
                console.log("成功了-------");
            }, function (data) {
                console.log("失败了-------")
                this.ctx.service.mail.sendmail("失败了-------,请排除")
            }.bind(this));
    }
}

module.exports = monitoring;