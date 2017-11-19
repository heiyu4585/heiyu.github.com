#安装
To install the web server, initialize an npm project and install the http-server package.

```
npm init
npm install http-server --save-dev
```
To run the server, let’s define a simple npm script. Just add the following scripts section to package.json
```
"scripts": {
  "start": "http-server"
},
```

Installing PhantomCSS

```text
npm install phantomcss casperjs phantomjs-prebuilt --save-dev
```


```text
"test": "casperjs test test.js"
```

#执行
```
npm test
```

### 官网
[Resemble](https://github.com/Huddle/Resemble.js)

[PhantomCSS](https://github.com/Huddle/PhantomCSS)

[casperjs](http://docs.casperjs.org/en/latest/modules/tester.html)

###参考资料
[CasperJs 入门介绍](http://www.jianshu.com/p/46b9d255cecb)

[基于PhantomFlow的自动化UI测试](https://juejin.im/post/59c131c9518825396f4f617d)

[浏览器自动化测试初探 - 使用phantomjs与casperjs](http://imweb.io/topic/55e46d8d771670e207a16bdc?utm_source=tuicool)

[前端自动化测试探索](http://fex.baidu.com/blog/2015/07/front-end-test/)