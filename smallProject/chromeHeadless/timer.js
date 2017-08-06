/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by WangNing on 2017/7/31.
 */

/**
 * Created by 王 on 2017/7/29.
 */

const chromeLauncher = require('chrome-launcher');
const chromeRemoteInterface = require('chrome-remote-interface');
const fs = require('fs');
/*配置浏览器尺寸*/
const deviceMetrics = {
    width: 414,
    height: 800,
    deviceScaleFactor: 0,
    mobile: true,
    fitWindow: false
};
/*配置截图尺寸*/
const screenshotMetrics = {
    width: deviceMetrics.width,
    height: deviceMetrics.height
};

/*从命令行中获取参数*/
const argv = require('minimist')(process.argv.slice(2));
const userAgent = argv.userAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1";


const performanceParser = (perforceTiming) => {
    let timingGather = {};
    perforceTiming = perforceTiming || {};
    timingGather.redirect = perforceTiming.redirectEnd - perforceTiming.redirectEnd-perforceTiming.redirectStart;
    timingGather.dns = perforceTiming.domainLookupEnd - perforceTiming.domainLookupStart;
    timingGather.tcp = perforceTiming.connectEnd - perforceTiming.connectStart;
    timingGather.request = perforceTiming.responseStart - perforceTiming.requestStart;
    timingGather.response = perforceTiming.responseEnd - perforceTiming.responseStart;
    timingGather.domReady = perforceTiming.domContentLoadedEventStart - perforceTiming.navigationStart;
    timingGather.load = perforceTiming.loadEventStart - perforceTiming.navigationStart;
    return timingGather;
};

const showPerformanceInfo = (performanceInfo) => {
    performanceInfo = performanceInfo || {};
    console.log(`页面重定向耗时:${performanceInfo.redirect}`);
    console.log(`DNS查找耗时:${performanceInfo.dns}`);
    console.log(`TCP连接耗时:${performanceInfo.tcp}`);
    console.log(`请求发送耗时:${performanceInfo.request}`);
    console.log(`响应接收耗时:${performanceInfo.response}`);
    console.log(`DOMReady耗时:${performanceInfo.domReady}`);
    console.log(`页面加载耗时:${performanceInfo.load}`);
};

let  chrome,launcher;
/*模块来调用 Chrome*/ /*是否启用 lighthouse */
chromeLauncher.launch({
    port: 9222,
    chromeFlags: [
        '--window-size=412,732',
        '--headless',
        '--window-size=412,732'
    ]
}) .then(Launcher => {  //启用 Chrome DevTools chrome 远程控制
    launcher = Launcher;
    return new Promise((resolve, reject) =>{
        chromeRemoteInterface(Chrome => {
            chrome = Chrome;
            resolve()
        }).on('error', err => { reject(err) })
    })
})
    .then(()=>{
        const { Page, Emulation,Network,DOM,CSS,Runtime } = chrome;

        Promise.all([
            Page.enable(),
            Network.enable(),
            DOM.enable(),
        ])            .then(() => {
            Page.navigate({ url: 'https://www.medplus.net/' })
            return new Promise((resolve, _) => {
                Page.loadEventFired(() => { resolve() })
            })
        })
            .then(() => {
                Runtime.evaluate({
                    expression:'window.performance.timing.toJSON()',
                    returnByValue:true  //不加这个参数，拿到的是一个对象的meta信息,还需要getProperties
                }).then((resultObj) => {
                    let {result,exceptionDetails} = resultObj;
                    if(!exceptionDetails){
                        showPerformanceInfo(performanceParser(result.value))
                    }else{
                        throw exceptionDetails;
                    }
                });
            })
        /*注意上面是否加载完成在关闭*/
            // .then(() => {
            //     chrome.close();
            //     launcher.kill();
            // });
    })
    .catch(console.error);