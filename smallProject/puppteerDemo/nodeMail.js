
//https://blog.csdn.net/sh15285118586/article/details/53845905

var nodemailer = require('nodemailer');
//配置邮件
var transporter = nodemailer.createTransport({
    service:"QQ"
    ,auth: {
        user: '1346164669@qq.com',//发送邮件的邮箱
        pass: 'aojjtjzxjhvhhbaf',//第三方授权密码，不是qq邮箱密码，在发送邮箱里面设置，后面有方法
    }
});
//发送邮件
var sendmail = function(html){
    var option = {
        from:"1346164669@qq.com",//发送邮件的邮箱
        to:"wangning1@allinmd.cn" //目标邮箱
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
//调用发送邮件
sendmail("success33333");