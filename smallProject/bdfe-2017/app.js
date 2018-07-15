const puppeteer = require('puppeteer');
const fs = require('fs');
var {writeFile} = require('./lib');
// writeFile('./pages/1.txt',"22222")
// dirExists('./page/1.txt')

/*
* 抓取数据
* 获取资源页面
*
* */
async function getCourse() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    for (var i = 14; i < 122; i++) {
        try{
            await page.goto("http://ife.baidu.com/2017/course/detail/id/" + i);
// 等待指定元素
            await page.waitForSelector('.course-detail-wrap.card');
            // 延迟
            await page.waitFor(200);
            const targetData = await page.evaluate(() => {
                return document.querySelector("body").innerHTML;
            });

            let target =
                `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Title</title>
                    <link rel="stylesheet" href="../css/index.css">
                </head>
                <body>` +
                targetData +
                `</body></html>`;


            await writeFile('./static/2017Course/' + i+".html", target)

        }catch (err){
            console.log(err)
        }

    }
    browser.close();

}



/*
* 抓取数据
* 获取资源页面
*
* */
async function getCollege() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    for (var i = 5; i < 15; i++) {
        try{
            await page.goto("http://ife.baidu.com/2017/college/detail/id/" + i);
// 等待指定元素
            await page.waitForSelector('.cal-list');
            // 延迟
            await page.waitFor(200);
            const targetData = await page.evaluate(() => {
                return document.querySelector("body").innerHTML;
            });

            let target =
                `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Title</title>
                    <link rel="stylesheet" href="../css/college.css">
                </head>
                <body>` +
                targetData.replace('/2017/course/detail/id/','./pages/') +
                `</body></html>`;


            await writeFile('./static/college/' + i + '.html', target)

        }catch (err){
            console.log(err)
        }

    }
    browser.close();

}







/*
* 抓取数据
* 获取资源页面
*
* */
async function get2016Crouse() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    for (var i = 1; i < 54; i++) {
        try{
            await page.goto("http://ife.baidu.com/2016/task/detail?taskId=" + i);
// 等待指定元素
            await page.waitForSelector('.task-detail-wrap');
            // 延迟
            await page.waitFor(500);
            const targetData = await page.evaluate(() => {
                return document.querySelector("body").innerHTML;
            });

            let target =
                `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Title</title>
                    <link rel="stylesheet" href="../css/2016Course.css">
                </head>
                <body>` +
                targetData+
                `</body></html>`;


            await writeFile('./static/2016Course/' + i + '.html', target)

        }catch (err){
            console.log(err)
        }

    }
    browser.close();

}


// getCourse();
// getCollege();
get2016Crouse();
