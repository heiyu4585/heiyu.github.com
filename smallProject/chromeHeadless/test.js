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

let chrome, launcher;
/*模块来调用 Chrome*/ /*是否启用 lighthouse */
chromeLauncher.launch({
    port: 9222,
    chromeFlags: [
        '--window-size=412,732',
        '--headless',
    ]
}).then(Launcher => {  //启用 Chrome DevTools chrome 远程控制
    chromeRemoteInterface(Chrome => {
        const {Page, Emulation, Network, DOM, CSS,Runtime} = Chrome;
        Promise.all([
            Page.enable(),
            Network.enable(),
            DOM.enable(),
        ]).then(() => {
            Network.setUserAgentOverride({userAgent});
            Emulation.setDeviceMetricsOverride(deviceMetrics); // 配置浏览器尺寸
            Emulation.setVisibleSize(screenshotMetrics) // 配置截图尺寸
        })
            /*执行js*/
            .then(() => {
                const code = [
                    // 'var input = document.querySelector(\'.s_ipt\')',
                    // 'var btn = document.querySelector(\'#su\')',
                    // 'input.value=\'123\''
                    'document.querySelector(\'.nav\').style.background ="red"'
                ].join(';');
                return Runtime.evaluate({ expression: code })
            })
            /*操作DOM*/
            .then(() => {
                Page.navigate({url: 'https://m.medplus.net'});
                return new Promise((resolve, _) => {
                    Page.loadEventFired(() => {
                        resolve(DOM.getDocument())
                    })
                })
            })
            .then(res => res.root.nodeId)
            .then(nodeId => DOM.querySelector({selector: '.header', nodeId}))
            .then(({nodeId}) => CSS.getComputedStyleForNode({nodeId}))
            .then(style => {
                // console.log(style)
            })

            /*网络操作*/
            .then(
                Network.requestWillBeSent((params) => {
                    // console.log(params.request.url);
                })
            )
             /*照相功能*/ /*两个then如何合写在一起*/
            .then(() => {
                Page.navigate({url: 'https://m.medplus.net'});
                return new Promise((resolve, reject) => {
                    Page.loadEventFired(() => {
                        setTimeout(function () {
                            resolve(
                                Page.captureScreenshot({format: 'png', fromSurface: true})
                            )
                        }, 1)
                    })
                })
            })
            .then((image) => {
                console.log(image)
                // let image = images.image;
                const buffer = new Buffer(image.data, 'base64');
                return new Promise((resolve, reject) => {
                    fs.writeFile(Date.parse(new Date()) + '.png', buffer, 'base64', err => {
                        if (err) return reject(err);
                        console.log('拍照成功');
                        resolve()
                    })
                })
            })


            .then(() => {
                Chrome.close();
                Launcher.kill();
            });
    }).on('error', err => {
        reject(err)
    })
}).catch(
    console.error
);