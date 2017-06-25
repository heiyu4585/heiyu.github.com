/**
 * Created by 王 on 2017/6/11.
 */


var page = require('webpage').create();
phantom.outputEncoding="gb2312";
// page.onConsoleMessage = function(msg) {
//     console.log('Page title is ' + msg);
// };

// page.onResourceRequested = function(request) {
//     console.log('Request ' + JSON.stringify(request, undefined, 4));
// };
// page.onResourceReceived = function(response) {
//     // console.log('Receive ' + JSON.stringify(response, undefined, 4));
//    var Receive = JSON.stringify(response, undefined, 4);
//    var ReceiveUrl = JSON.stringify(response.url, undefined, 4);
//    if(ReceiveUrl.indexOf("call")){
//        console.log(Receive);
//    }
// };
console.log(12312323123);
page.open("https://www.baidu.com/s?wd=撒打发", function(status) {
    if(status == "success"){

        page.evaluate(function() {
            console.log(document.title);
        });
        phantom.exit();
    }
    phantom.exit();
});

