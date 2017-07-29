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

// function getScreenShot () {
//     const { Page, Emulation } = chrome;
//     return Page.enable()
//         .then(() => {
//             Emulation.setDeviceMetricsOverride(deviceMetrics) // 配置浏览器尺寸
//             Emulation.setVisibleSize(screenshotMetrics) // 配置截图尺寸
//             Page.navigate({ url: 'https://github.com/' })
//             return new Promise((resolve, reject) => {
//                 Page.loadEventFired(() => {
//                     resolve(Page.captureScreenshot({ format: 'jpeg', fromSurface: true }))
//                 })
//             })
//         })
//         .then(image => {
//             const buffer = new Buffer(image.data, 'base64')
//             return new Promise((resolve, reject) => {
//                 fs.writeFile('output.jpeg', buffer, 'base64', err => {
//                     if (err) return reject(err)
//                     resolve()
//                 })
//             })
//         })
// }

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
                Page.navigate({ url: 'https://www.baidu.com/' })
                return new Promise((resolve, _) => {
                    Page.loadEventFired(() => { resolve() })
                })
            })
            .then(() => {
                const code = [
                    'var input = document.querySelector(\'.s_ipt\')',
                    'var btn = document.querySelector(\'#su\')',
                    'input.value=\'123\''
                ].join(';')
                return Runtime.evaluate({ expression: code })
            })
            .then(() => {
                return new Promise((resolve, _) => {
                    setTimeout(() => {
                        resolve(Page.captureScreenshot({ format: 'jpeg', fromSurface: true }))
                    }, 3000)
                })
            })
            .then(image => {
                const buffer = new Buffer(image.data, 'base64')
                return new Promise((resolve, reject) => {
                    fs.writeFile('output.jpeg', buffer, 'base64', err => {
                        if (err) return reject(err)
                        resolve()
                    })
                })
            })

            .then(() => {
                chrome.close();
                launcher.kill();
            });


    })
    .catch(console.error);