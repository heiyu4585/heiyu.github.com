### 360抓取结果
```text
// http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js
var page = require('webpage').create();
page.settings.userAgent = "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36";

page.onConsoleMessage = function(msg) {
    console.log(msg);
}
page.open('https://www.so.com', function(status) {
    console.log("Status: " + status);
    if(status === "success") {
        console.log("______success______")
        page.includeJs(
            // Include the https version, you can change this to http if you like.
            'http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js',
            function() {
                console.log("_______includeJS______")
               page.evaluate(function() {
                   $("#input").val("ff");
                   $("#search-button").click();
                     console.log("++++++++++++++++++++++++");
                        console.log($(".result li").length) ;
                });
                page.render("11.png");
                setTimeout(function()
                {
                   page.evaluate(function()
                    {
                        console.log($(".result li").length) ;
                    });
                    //	生成当前页面截图
                    page.render("22.png");
                    phantom.exit();
                }, 3000);
            }
        );
    }

});

```


### Screen Capture

```text


var page = require('webpage').create();
var url ="http://www.baidu.com"
/*读取url并截图*/

// page.open('http://example.com', function(status) {
//     console.log("Status: " + status);
//     if(status === "success") {
//         page.render('example.png');
//     }
//     phantom.exit();
// });

/*测试读取时间*/
// var page = require('webpage').create(),
//     system = require('system'),
//     t, address;
//
// if (system.args.length === 1) {
//     console.log('Usage: loadspeed.js <some URL>');
//     phantom.exit();
// }
//
// t = Date.now();
// address = system.args[1];
// page.open(address, function(status) {
//     if (status !== 'success') {
//         console.log('FAIL to load the address');
//     } else {
//         t = Date.now() - t;
//         console.log('Loading ' + system.args[1]);
//         console.log('Loading time ' + t + ' msec');
//     }
//     phantom.exit();
// });

// var page = require('webpage').create();
// phantom.outputEncoding="gb2312";
// page.open("http://www.baidu.com", function(status) {
//     var title = page.evaluate(function() {
//         return document.title;
//     });
//     console.log('Page title is ' + title);
//     phantom.exit();
// });
/*获取console中的标题和document的标题*/
// var page = require('webpage').create();
// phantom.outputEncoding="gb2312";
// page.onConsoleMessage = function(msg) {
//     console.log('Page title is ' + msg);
// };
// page.open("http://www.allinmd.cn", function(status) {
//     page.evaluate(function() {
//         console.log(document.title);
//     });
//     phantom.exit();
// });

var page = require('webpage').create();
page.onResourceRequested = function(request) {
    console.log('Request ' + JSON.stringify(request, undefined, 4));
};
page.onResourceReceived = function(response) {
    console.log('Receive ' + JSON.stringify(response, undefined, 4));
};
page.open("http://www.allinmd.cn");
```

## Beside PNG format, PhantomJS supports JPEG, GIF, and PDF.

>Beside PNG format, PhantomJS supports JPEG, GIF, and PDF.
>phantomjs rasterize.js http://ariya.github.io/svg/tiger.svg tiger.png
>phantomjs rasterize.js https://dmitrybaranovskiy.github.io/raphael/polar-clock.html clock.png
>phantomjs rasterize.js 'http://en.wikipedia.org/w/index.php?title=Jakarta&printable=yes' jakarta.pdf
#### 设置尺寸
```text
var page = require('webpage').create();
//viewportSize being the actual size of the headless browser
page.viewportSize = { width: 1024, height: 768 };
//the clipRect is the portion of the page you are taking a screenshot of
page.clipRect = { top: 0, left: 0, width: 1024, height: 768 };
//the rest of the code is the same as the previous example
page.open('http://example.com/', function() {
  page.render('github.png');
  phantom.exit();
});
```
#### 网络监控
```text
var page = require('webpage').create();
page.onResourceRequested = function(request) {
  console.log('Request ' + JSON.stringify(request, undefined, 4));
};
page.onResourceReceived = function(response) {
  console.log('Receive ' + JSON.stringify(response, undefined, 4));
};
page.open(url);
```

### harviewer
https://www.bstester.com/2015/12/harviewer-building