const Service = require('egg').Service;
const puppeteer = require('puppeteer');
let fs = require('fs');
let resemble = require('node-resemble-js');

class UserService extends Service {
    // 默认不需要提供构造函数。
    constructor(ctx) {
      super(ctx); //如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
      // 就可以直接通过 this.ctx 获取 ctx 了
      // 还可以直接通过 this.app 获取 app 了
    }
    async find(id) {
        // 假如 我们拿到用户 id 从数据库获取用户详细信息
        console.log("-------------")
        console.log(this.app.config.mysql)
        console.log(this.app.mysql)
        // const result = await this.app.mysql.get('select * from result where id = ?', id);
        // const result = await this.app.mysql.get('result', { id: 1});
        // const result = await this.app.mysql.get('result', { id: 2 });
        // const result = await this.app.mysql('select * from result where id = ?', [1]);
        const result = await this.app.mysql.get('result', { id: 1 });

        // 假定这里还有一些复杂的计算，然后返回需要的信息。
        // const picture = await this.getPicture(uid);
        console.log("result",result)
        return {
            name: result.name,
            isPass: result.isPass,
            time:result.time
        }
    }

    async getPicture(uid) {
        const result = await this.ctx.curl(`http://photoserver/uid=${uid}`, { dataType: 'json' });
        return result.data;
    }

    async screenShot(url, photoName) {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        // 设置浏览器视窗
        page.setViewport({
            width: 1376,
            height: 768,
        });
        // await page.goto('https://y.qq.com');
        await page.goto(url);
        await page.type('#ev-loginBox .login-input-box[name=userName]', '18900000001', {delay: 100});
        await page.type('#ev-loginBox .login-input-box[name=passWord]', '111111', {delay: 100});
        page.tap('#user-login-btn');
        await page.waitForSelector('#ev-user-inner');
        // Get the "viewport" of the page, as reported by the page.
        const dimensions = await page.evaluate(() => {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
                deviceScaleFactor: window.devicePixelRatio
            };
        });

        console.log('Dimensions:', dimensions);
        await page.waitFor(2000);
        await page.screenshot({path: photoName});

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
    compare(base, compare) {
        return new Promise((resolve,reject)=>{
            resemble(base).compareTo(compare).onComplete(function (data) {
                // logUtil.debug(data);
                // 小于0.1%的不生成diff
                console.log(data.misMatchPercentage)
                if (data.misMatchPercentage >= 0.3) {
                    console.log("测试未通过")
                    // logUtil.debug('data.misMatchPercentage:', data.misMatchPercentage)
                    // logUtil.debug('misMath source:', source)
                    let r = data.getDiffImage().pack().pipe(fs.createWriteStream("monitoring/diff.png"));
                    r.on('close', function () {
                        // console.log(data);
                        reject (
                            data
                        )

                    });
                } else {
                    // console.log("测试通过");
                    // console.log(data);
                    resolve(
                        data
                    )
                }
            });
        });


    }

    /*
    * 抓取数据
    * url: 抓取的url
    *
    * */

    async getDataFromJueJin(url) {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto(url);
        // 输入
        // await page.type('#kw', 'puppeteer', {delay: 100});
        // 点击
        // page.click('#su')

        // 延迟
        await page.waitFor(1000);
// 等待指定元素
//    await page.waitForSelector('h3 a');

        const targetData = await page.evaluate(() => {
            // return [...document.querySelectorAll('.result a')].filter(item => {
            //     return item.innerText && item.innerText.includes('Puppeteer的入门教程和实践')
            // }).toString()

            let metaList = document.querySelectorAll('.entry-list .entry-box');
            let artList = [];
            for (var i = 0; i < metaList.length; i++) {
                console.log(i)
                try {
                    artList.push({
                        username: metaList[i].querySelector(".meta-row .username ").textContent,
                        tag: metaList[i].querySelector(".meta-row li.tag a").textContent,
                        time: metaList[i].querySelector(".meta-row .meta-list").querySelectorAll("li")[metaList[i].querySelector(".meta-row .meta-list").querySelectorAll("li").length - 2].textContent,

                        url: metaList[i].querySelector(".title-row a").href,
                        title: metaList[i].querySelector(".title-row").textContent,
                        // //点赞数
                        likeCount: metaList[i].querySelector(".action-row .like .count").textContent,
                        // //回复数
                        commentCount: metaList[i].querySelector(".action-row .comment .count").textContent,
                    })
                } catch (err) {
                    console.log(err)
                }

            }
            return artList;
        });

        console.log(targetData)
        // await page.goto(targetLink);

        // await page.screenshot({path: 'puptteer.png'});
        browser.close();
        return targetData;
    }
}
module.exports = UserService;
