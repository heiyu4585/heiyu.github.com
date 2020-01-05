# pdf文件下载总结(已发布)

方式 ` <a href="xxx.pdf">`


1. 安卓 微信内置浏览器 支持下载  
2. 安卓手机浏览器支持
3. 在ios 微信内置浏览器  不支持下载,不能转发(发送给朋友,发送朋友圈)除word外的文件 


安卓需要跳到外面浏览器才能下载到本地

方式二: 加 download

1. 当前pc端 支持 chrome ,firefox ,不支持 safari ,ie,opera
1. 安卓 微信内置浏览器 不支持下载

```
我以前做微信公众号做开发，遇到下载文件的问题，不知和你的是不是同一个问题。
用java写的下载，设置了contenttype为application/x-msdownload，电脑、安卓的下载都没问题。
用苹果的浏览器就不行了，后来百度了一下，是contenttype问题，改成application/octet-stream就可以了
后来把程序作了更改，针对不同的浏览器，设置不同的contenttype。

String contentType = "application/x-msdownload";
response.setContentType(contentType);


```



```
于是，基本上，目前的实现都是放弃HTML策略，而是使用，例如php这样的后端语言，通过告知浏览器header信息，来实现下载。

header('Content-type: image/jpeg'); 
header("Content-Disposition: attachment; filename='download.jpg'"); 

```

[了解HTML/HTML5中的download属性](https://www.zhangxinxu.com/wordpress/2016/04/know-about-html-download-attribute/)