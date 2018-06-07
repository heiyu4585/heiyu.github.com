const Service = require('egg').Service;
var nodemailer = require('nodemailer');
//配置邮件
var transporter = nodemailer.createTransport({
    service:"QQ"
    ,auth: {
        user: '',//发送邮件的邮箱
        pass: '',//第三方授权密码，不是qq邮箱密码，在发送邮箱里面设置，后面有方法
    }
})

class MailService extends Service {
    // 默认不需要提供构造函数。
    constructor(ctx) {
        super(ctx); //如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
        // 就可以直接通过 this.ctx 获取 ctx 了
        // 还可以直接通过 this.app 获取 app 了
    }

//https://blog.csdn.net/sh15285118586/article/details/53845905

//发送邮件
    sendmail(html){
        console.log("zhlizhxingle ==== senmail");
        var option = {
            from:"11@qq.com",//发送邮件的邮箱
            to:"22@qq.com" //目标邮箱
        }
        option.subject = 'Game'
        option.html= html;
        transporter.sendMail(option, function(error, response){
            if(error){
                console.log("fail: " + error);
            }else{
                // { accepted: [ '@qq.com' ],
                //     rejected: [],
                //     envelopeTime: 212,
                //     messageTime: 588,
                //     messageSize: 256,
                //     response: '250 Ok: queued as ',
                //     envelope: { from: '@qq.com', to: [ '@qq.com' ] },
                //     messageId: '<15386842-395b-eb96-d47f-178edfef0e2b@qq.com>' }

                console.log(response);
            }
        });
    }
}
module.exports = MailService;