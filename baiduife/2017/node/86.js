var phoneConfig ={
    iphone5:{
        ua:"Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
        width:320,
        height:568
    },
    iphone6:{
        ua:"Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
        width:414,
        height:736
    },
    ipad:{
        ua:"Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
        width:768,
        height:1024
    }
};

var system = require('system');
var iphone =system.args[1];
console.log("____________________");
//    page.zoomFactor=0.1
var page = require('webpage').create();
phantom.outputEncoding="gb2312";
var page = require('webpage').create();
page.settings.userAgent =phoneConfig[iphone].ua ;
page.viewportsize={
    width:phoneConfig[iphone].width,
    height:phoneConfig[iphone].height
};
page.clipRect={
    top:0,
    left:0,
    width:phoneConfig[iphone].width,
    height:phoneConfig[iphone].height
};
page.onConsoleMessage = function(msg) {
    console.log(msg);
}
var url = "http://www.baidu.com";
page.open(url, function(status) {
    console.log("Status: " + status);
    if(status === "success") {
        console.log("______success______");
        page.includeJs(
            'http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js',
            function() {
                console.log("+++++++++++++++++++")
                // var data=new Array();
                // var doc=document.getElementByTagName('html')[0];
                // data[0]=doc.getBoundingClientRect().top;
                // data[1]=doc.getBoundingClientRect().left;
                // data[2]=doc.getBoundingClientRect().width;     //  与page.viewportSize设定的width相关
                // data[3]=doc.getBoundingClientRect().bottom;
                // data[4]=document.documentElement.scrollWidth;    //页面真实宽度
                // data[5]=docuemnt.documentElement.scrollHeidth;  // 页面真实高度
                //
                page.render(iphone+".png");
                // page.render('google_home.jpeg', {format: 'jpeg', quality: '100'});
                phantom.exit();
            }
        );
    }
});



