let puppetry = require('./puppetry');

try {
    //paizhao 监控
    // puppetry.screenShot("https://juejin.im/welcome/frontend",'baidu1.png');
    // //baidu1 不存在时会报错
    // puppetry.compare("baidu.png","baidu1.png");


    puppetry.getDataFromJueJin("https://juejin.im/welcome/frontend","baidu1.png");

}catch (err){
    console.log(err)
}
