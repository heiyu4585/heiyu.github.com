const puppeteer = require('puppeteer');
let fs = require('fs');
let resemble = require('node-resemble-js');
(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    // await page.goto('https://y.qq.com');
    await page.goto('https://segmentfault.com/frontend');
    await page.screenshot({path: 'yqq.png'});


    // await page.screenshot({path: 'segmentfault.png'});
// Get the "viewport" of the page, as reported by the page.
    const dimensions = await page.evaluate(() => {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio
        };
    });

    console.log('Dimensions:', dimensions);


    // await page.goto('https://baidu.com');
    // await page.type('#kw', 'puppeteer', {delay: 100});
    // page.click('#su')
    // await page.waitFor(1000);
    // const targetLink = await page.evaluate(() => {
    //     return [...document.querySelectorAll('.result a')].filter(item => {
    //         return item.innerText && item.innerText.includes('Puppeteer的入门教程和实践')
    //     }).toString()
    // });
    // await page.goto(targetLink);
    // await page.screenshot({path: 'puptteer.png'});
    browser.close();

})();


resemble("./yqq.png").compareTo("puptteer.png").onComplete(function (data) {
    // logUtil.debug(data);
    // 小于0.1%的不生成diff
    if (data.misMatchPercentage >= 0.1) {
        // logUtil.debug('data.misMatchPercentage:', data.misMatchPercentage)
        // logUtil.debug('misMath source:', source)
        let r = data.getDiffImage().pack().pipe(fs.createWriteStream("./yqq111.png"));
        r.on('close', function () {
            console.log(data)
        });
    } else {
        console.log(data);
    }
});