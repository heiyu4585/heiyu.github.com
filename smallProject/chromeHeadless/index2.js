/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by WangNing on 2017/7/28.
 */
/*+==============获取对应页面的接口===============*/
// const CDP = require('chrome-remote-interface');
//
// CDP((client) => {
//     // extract domains
//     const {Network, Page} = client;
//     // setup handlers
//     Network.requestWillBeSent((params) => {
//         console.log(params.request.url);
//     });
//     Page.loadEventFired(() => {
//         client.close();
//     });
//     // enable events then start!
//     Promise.all([
//         Network.enable(),
//         Page.enable()
//     ]).then(() => {
//         return Page.navigate({url: 'https://github.com'});
//     }).catch((err) => {
//         console.error(err);
//         client.close();
//     });
// }).on('error', (err) => {
//     // cannot connect to the remote endpoint
//     console.error(err);
// });
/**=============github页面的所有图片==  http://www.jianshu.com/p/8b1a9d465ae4 =============*/
// const CDP = require("chrome-remote-interface");
// CDP(chrome => {
//     chrome.Page
//         .enable()
//         .then(() => {
//             return chrome.Page.navigate({ url: "https://github.com" });
//         })
//         .then(() => {
//             chrome.DOM.getDocument((error, params) => {
//                 if (error) {
//                     console.error(params);
//                     return;
//                 }
//                 const options = {
//                     nodeId: params.root.nodeId,
//                     selector: "img"
//                 };
//                 chrome.DOM.querySelectorAll(options, (error, params) => {
//                     if (error) {
//                         console.error(params);
//                         return;
//                     }
//                     params.nodeIds.forEach(nodeId => {
//                         const options = {
//                             nodeId: nodeId
//                         };
//                         chrome.DOM.getAttributes(options, (error, params) => {
//                             if (error) {
//                                 console.error(params);
//                                 return;
//                             }
//                             console.log(params.attributes);
//                         });
//                     });
//                 });
//             });
//         });
// }).on("error", err => {
//     console.error(err);
// });

/**=============github end================*/
//http://www.imweb.io/topic/595bbc2cd6ca6b4f0ac71f15
// const chromeLauncher = require('chrome-launcher');
// const chromeRemoteInterface = require('chrome-remote-interface')
// //启用无界面模式并开启远程调试,不同引用版本和方式，调用方式可能有些区别
// //chromeLauncher.run({
// chromeLauncher.launch({
//     port: 9222,
//     chromeFlags: [
//         '--headless'
//     ]
// }).then((launcher) => {
//     chromeRemoteInterface.Version({
//         host:'localhost',
//         port:9222
//     }).then(versionInfo => {
//         console.log(versionInfo)
//     });
//
//     chromeRemoteInterface({
//         host:'localhost',
//         port:9222
//     }).then((chrome) => {
//         //这里调用ChromeDevToolsProtocol定义的接口
//         const {Network,Page} = chrome;
//
//         Network.requestWillBeSent((params) => {
//             let {request}  = params;
//             let {url} = request;
//             console.log(url)
//         });
//         Promise.all([
//             Network.enable(),
//             Page.enable()
//         ]).then(() => {
//             Page.navigate({
//                 url:'https://www.baidu.com'
//             })
//         });
//
//         setTimeout(() => {
//             launcher.kill()
//         },5000);
//
//     })
// });

// const CDP = require('chrome-remote-interface');
// CDP.New(function (err, target) {
//     if (!err) {
//         console.log(target);
//     }
// });
// CDP.Activate({'id': '7551397a-0a08-451e-908e-8bb9afa3d750'}, function (err) {
//     if (!err) {
//         console.log('target is activated');
//     }
// });
// CDP.Close({'id': '7551397a-0a08-451e-908e-8bb9afa3d750'}, function (err) {
//     if (!err) {
//         console.log('target is closing');
//     }
// });
//
// CDP.Version(function (err, info) {
//     if (!err) {
//         console.log(info);
//     }
// });


/*============== 对改地址进行拍照================*/
// const CDP = require('chrome-remote-interface');
// const argv = require('minimist')(process.argv.slice(2));
// const file = require('fs');
//
// // CLI Args
// const url = argv.url || 'https://m.medplus.net';
// const format = argv.format === 'jpeg' ? 'jpeg' : 'png';
// const viewportWidth = argv.viewportWidth || 1440;
// const viewportHeight = argv.viewportHeight || 900;
// const delay = argv.delay || 0;
// const userAgent = argv.userAgent;
// const fullPage = argv.full;
//
// // Start the Chrome Debugging Protocol
// CDP(async function(client) {
//     // Extract used DevTools domains.
//     const {DOM, Emulation, Network, Page, Runtime} = client;
//
//     // Enable events on domains we are interested in.
//     await Page.enable();
//     await DOM.enable();
//     await Network.enable();
//
//     // If user agent override was specified, pass to Network domain
//     if (userAgent) {
//         await Network.setUserAgentOverride({userAgent});
//     }
//
//     // Set up viewport resolution, etc.
//     const deviceMetrics = {
//         width: viewportWidth,
//         height: viewportHeight,
//         deviceScaleFactor: 0,
//         mobile: false,
//         fitWindow: false,
//     };
//     await Emulation.setDeviceMetricsOverride(deviceMetrics);
//     await Emulation.setVisibleSize({width: viewportWidth, height: viewportHeight});
//
//     // Navigate to target page
//     await Page.navigate({url});
//
//     // Wait for page load event to take screenshot
//     Page.loadEventFired(async () => {
//         // If the `full` CLI option was passed, we need to measure the height of
//         // the rendered page and use Emulation.setVisibleSize
//         if (fullPage) {
//             const {root: {nodeId: documentNodeId}} = await DOM.getDocument();
//             const {nodeId: bodyNodeId} = await DOM.querySelector({
//                 selector: 'body',
//                 nodeId: documentNodeId,
//             });
//             const {model: {height}} = await DOM.getBoxModel({nodeId: bodyNodeId});
//
//             await Emulation.setVisibleSize({width: viewportWidth, height: height});
//             // This forceViewport call ensures that content outside the viewport is
//             // rendered, otherwise it shows up as grey. Possibly a bug?
//             await Emulation.forceViewport({x: 0, y: 0, scale: 1});
//         }
//
//         setTimeout(async function() {
//             const screenshot = await Page.captureScreenshot({format});
//             const buffer = new Buffer(screenshot.data, 'base64');
//             file.writeFile('output.png', buffer, 'base64', function(err) {
//                 if (err) {
//                     console.error(err);
//                 } else {
//                     console.log('Screenshot saved');
//                 }
//                 client.close();
//             });
//         }, delay);
//     });
// }).on('error', err => {
//     console.error('Cannot connect to browser:', err);
// });


/*===================饿了么=================*/
// https://juejin.im/entry/5930eeea2f301e00582f3974
// const { ChromeLauncher } = require('lighthouse/lighthouse-cli/chrome-launcher')
// const chrome = require('chrome-remote-interface')
// const fs = require('fs')
// const deviceMetrics = {
//     width: 1200,
//     height: 800,
//     deviceScaleFactor: 0,
//     mobile: false,
//     fitWindow: false
// }
// const screenshotMetrics = {
//     width: deviceMetrics.width,
//     height: deviceMetrics.height
// }
// let protocol
// let launcher
//
// function launchChrome () {
//     const launcher = new ChromeLauncher({
//         port: 9222,
//         autoSelectChrome: true,
//         additionalFlags: ['--window-size=412,732', '--disable-gpu', '--headless']
//     })
//     return launcher.run().then(() => launcher)
// }
// function getScreenShot () {
//     const { Page, Emulation } = protocol
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
// launchChrome()
//     .then(Launcher => {
//         launcher = Launcher
//         return new Promise((resolve, reject) =>{
//             chrome(Protocol => {
//                 protocol = Protocol
//                 resolve()
//             }).on('error', err => { reject(err) })
//         })
//     })
//     .then(getScreenShot)
//     .then(() => {
//         protocol.close()
//         launcher.kill()
//     })
//     .catch(console.error)



const chromeLauncher = require('chrome-launcher');
const chromeRemoteInterface = require('chrome-remote-interface');

const CDP = require('chrome-remote-interface');
const argv = require('minimist')(process.argv.slice(2));
const file = require('fs');

// CLI Args
const url = argv.url || 'https://m.medplus.net';
const format = argv.format === 'jpeg' ? 'jpeg' : 'png';
const viewportWidth = argv.viewportWidth || 1440;
const viewportHeight = argv.viewportHeight || 900;
const delay = argv.delay || 0;
const userAgent = argv.userAgent;
const fullPage = argv.full;

//启用无界面模式并开启远程调试,不同引用版本和方式，调用方式可能有些区别
//chromeLauncher.run({
chromeLauncher.launch({
    port: 9222,
    chromeFlags: [
        '--headless',
        '--window-size=412,732'
    ]
}).then((launcher) => {
    // Start the Chrome Debugging Protocol
    CDP(async function(client) {
        // Extract used DevTools domains.
        const {DOM, Emulation, Network, Page, Runtime} = client;

        // Enable events on domains we are interested in.
        await Page.enable();
        await DOM.enable();
        await Network.enable();

        // If user agent override was specified, pass to Network domain
        if (userAgent) {
            await Network.setUserAgentOverride({userAgent});
        }

        // Set up viewport resolution, etc.
        const deviceMetrics = {
            width: viewportWidth,
            height: viewportHeight,
            deviceScaleFactor: 0,
            mobile: false,
            fitWindow: false,
        };
        await Emulation.setDeviceMetricsOverride(deviceMetrics);
        await Emulation.setVisibleSize({width: viewportWidth, height: viewportHeight});

        // Navigate to target page
        await Page.navigate({url});

        // Wait for page load event to take screenshot
        Page.loadEventFired(async () => {
            // If the `full` CLI option was passed, we need to measure the height of
            // the rendered page and use Emulation.setVisibleSize
            if (fullPage) {
                const {root: {nodeId: documentNodeId}} = await DOM.getDocument();
                const {nodeId: bodyNodeId} = await DOM.querySelector({
                    selector: 'body',
                    nodeId: documentNodeId,
                });
                const {model: {height}} = await DOM.getBoxModel({nodeId: bodyNodeId});

                await Emulation.setVisibleSize({width: viewportWidth, height: height});
                // This forceViewport call ensures that content outside the viewport is
                // rendered, otherwise it shows up as grey. Possibly a bug?
                await Emulation.forceViewport({x: 0, y: 0, scale: 1});
            }

            setTimeout(async function() {
                const screenshot = await Page.captureScreenshot({format});
                const buffer = new Buffer(screenshot.data, 'base64');
                file.writeFile('output.png', buffer, 'base64', function(err) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('Screenshot saved');
                    }
                    client.close();
                });
            }, delay);
        });
    }).on('error', err => {
        console.error('Cannot connect to browser:', err);
    });
    setTimeout(() => {
        launcher.kill()
    },5000);
});






