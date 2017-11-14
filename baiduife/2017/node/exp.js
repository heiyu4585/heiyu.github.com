var DEVICE = {
    ipad: {
        info: "Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
        width:"768",
        height:"1024"
    }
    ,
    iphone5: {
        info: "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
        ,width:"320",
        height:"568"
    }
    ,
    iphone6: {
        info: "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
        , width:"375",
        height:"667"

    }
}
var start = Date.now()
phantom.outputEncoding = "gb2312"
var webPage = require('webpage')
var page = webPage.create()
var system = require('system')
var url = 'https://www.baidu.com'
if (system.args.length === 1) {
    console.log('input keyword!');
    phantom.exit();
}
// url += encodeURIComponent(system.args[1])
page.settings.userAgent = system.args[2] ?  DEVICE[system.args[2]].info : DEVICE['ipad'].info;
// phantom.onError = function (msg, trace) {
//     var msgStack = ['PHANTOM ERROR: ' + msg];
//     if (trace && trace.length) {
//         msgStack.push('TRACE:');
//         trace.forEach(function (t) {
//             msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function+')' : ''));
//         });
//     }
//     console.error(msgStack.join('\n'));
//     phantom.exit(1);
// };
// page.onError = function (msg, trace) {
//     var msgStack = ['ERROR: ' + msg];
//     if (trace && trace.length) {
//         msgStack.push('TRACE:');
//         trace.forEach(function (t) {
//             msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function+'")' : ''));
//         });
//     }
//     console.log(msgStack.join('\n'));
// };
// page.open(url, function (status) {
//     var ret = {
//         code:0,
//         msg:'',
//         word: system.args[1],
//         time: '', //任务的时间
//         dataList:[],
//         device:page.settings.userAgent
//     }
//     if (status !== 'success') {
//         ret.code = 0
//
//     } else {
//         ret = page.evaluate(function () {
//             var t = [];
//             var dom = $('.result');
//             console.log(dom.length)
//
//             dom.each(function(i,v){
//                 var s ={}
//                 s.title = $(v).find('.t').text()
//                 s.link = $(v).find('.t').children().attr('href')
//                 s.info = $(v).find('.c-abstract').text()
//                 s.pic = $(v).find('img').attr('src')
//                 t.push(s)
//             })
//
//             var oo ={};
//             oo.code = 1;
//             oo.msg = 'OK';
//             oo.word = document.getElementById('kw').value;
//             oo.dataList = t;
//             oo.device= window.navigator.userAgent
//             return oo;
//         });
//         ret.time = new Date - start;
//         page.render("out1.png");
//     }
//     console.log(JSON.stringify(ret, null, 4));
//     phantom.exit()
// });


var url = "http://www.baidu.com";
page.open(url, function(status) {
    console.log("Status: " + status);
    if(status === "success") {
        console.log("______success______");
        page.includeJs(
            'http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js',
            function() {
                console.log("+++++++++++++++++++")
                setTimeout(function (args) {
                    page.render( system.args[1]+".png");
                    phantom.exit();
                },5000)
            }
        );
    }
});