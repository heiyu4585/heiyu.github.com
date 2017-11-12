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

var page = require('webpage').create();
// console.log('The default user agent is ' + page.settings.userAgent);
// page.settings.userAgent = 'SpecialAgent';
// page.open('http://www.httpuseragent.org', function(status) {
//     if (status !== 'success') {
//         console.log('Unable to access network');
//     } else {
//         var ua = page.evaluate(function() {
//             return document.getElementById('myagent').textContent;
//         });
//         console.log(ua);
//     }
//     phantom.exit();
// });

// var webPage = require('webpage');
// var page = webPage.create();
//


// http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js
var page = require('webpage').create();
page.settings.userAgent = "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36";

page.onConsoleMessage = function(msg) {
    console.log(msg);
}
var url = "https://www.baidu.com/s?wd=撒的发生地方";
page.open(url, function(status) {
    console.log("Status: " + status);
    if(status === "success") {
        console.log("______success______")
        page.includeJs(
            // Include the https version, you can change this to http if you like.
            'http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js',
            function() {
                console.log("_______includeJS______")
               page.evaluate(function() {
                    $("#keyword").val("ff");
                    $("#su").click();
                     console.log("++++++++++++++++++++++++");
                    // console.log($(".al-tableBoxInnerWrap")[0].innerText) ;

                        console.log($("body")[0].innerText) ;
                        // console.log(document.querySelector("body").innerText) ;

                   console.log("++++++++++++++++++++++++-----");
                });
                phantom.exit();
            }
        );
    }
});




