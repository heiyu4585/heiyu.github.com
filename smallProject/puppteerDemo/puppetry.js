const puppeteer = require('puppeteer');
let fs = require('fs');
let resemble = require('node-resemble-js');

/*
* url: 监控的url
* photoName : 照片名称
* */
async function screenShot(url, photoName) {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    // await page.goto('https://y.qq.com');
    await page.goto(url);
    await page.screenshot({path: photoName});

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

}

// base    : 基准
// compare : 需要比对的
function compare(base, compare) {
    resemble(base).compareTo(compare).onComplete(function (data) {
        // logUtil.debug(data);
        // 小于0.1%的不生成diff
        console.log(data.misMatchPercentage)
        if (data.misMatchPercentage >= 0.1) {
            console.log("测试未通过")
            // logUtil.debug('data.misMatchPercentage:', data.misMatchPercentage)
            // logUtil.debug('misMath source:', source)
            let r = data.getDiffImage().pack().pipe(fs.createWriteStream("./diff.png"));
            r.on('close', function () {
                console.log(data)
            });
        } else {
            console.log("测试通过");
            console.log(data);
        }
    });

}

// base    : 基准
// compare : 需要比对的
function compare(base, compare) {
    resemble(base).compareTo(compare).onComplete(function (data) {
        // logUtil.debug(data);
        // 小于0.1%的不生成diff
        console.log(data.misMatchPercentage)
        if (data.misMatchPercentage >= 0.1) {
            console.log("测试未通过")
            // 此处可调用邮箱 等 通知
            // logUtil.debug('data.misMatchPercentage:', data.misMatchPercentage)
            // logUtil.debug('misMath source:', source)
            let r = data.getDiffImage().pack().pipe(fs.createWriteStream("./diff.png"));
            r.on('close', function () {
                console.log(data)
            });
        } else {
            console.log("测试通过");
            console.log(data);
        }
    });

}


/*
* 抓取数据
* url: 抓取的url
*
* */
async function getDataFromJueJin(url, photoName) {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url);
    // 输入
    // await page.type('#kw', 'puppeteer', {delay: 100});
    // 点击
    // page.click('#su')

    // 延迟
    await page.waitFor(1000);

    const targetData = await page.evaluate(() => {
        // return [...document.querySelectorAll('.result a')].filter(item => {
        //     return item.innerText && item.innerText.includes('Puppeteer的入门教程和实践')
        // }).toString()

        let metaList =document.querySelectorAll('.entry-list .entry-box');
        let artList =[];
        for(var i =0;i<metaList.length;i++){
            console.log(i)
            try{
                artList.push({
                    username:metaList[i].querySelector(".meta-row .username ").textContent,
                    tag:metaList[i].querySelector(".meta-row li.tag a").textContent,
                    time:metaList[i].querySelector(".meta-row .meta-list").querySelectorAll("li")[metaList[i].querySelector(".meta-row .meta-list").querySelectorAll("li").length-2].textContent,

                    url:metaList[i].querySelector(".title-row a").href,
                    title:metaList[i].querySelector(".title-row").textContent,
                    // //点赞数
                    likeCount:metaList[i].querySelector(".action-row .like .count").textContent,
                    // //回复数
                    commentCount:metaList[i].querySelector(".action-row .comment .count").textContent,
                })
            }catch(err){
               console.log(err) 
            }
            
        }
        return artList;
    });
    
    console.log(targetData)
    // await page.goto(targetLink);

    // await page.screenshot({path: 'puptteer.png'});
    browser.close();

}

module.exports = {
    screenShot: screenShot,
    compare: compare,
    getDataFromJueJin: getDataFromJueJin
}
