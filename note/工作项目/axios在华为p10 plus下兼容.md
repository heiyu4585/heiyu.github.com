#华为metaP10 plus
http://10.0.1.128:8081/DrList.html#/drList


动端报symbol is not defined

index.html文件引入

 <script src="http://cdn.bootcss.com/babel-polyfill/7.0.0-alpha.9/polyfill.min.js"></script>
避免Symbol报错


###Module build failed: ReferenceError: Promise is not defined
```
// first line of webpack.config.js
global.Promise = require('bluebird')

@fhurta Same for me. npm install es6-promise --save and then added require('es6-promise').polyfill() at the top of webpack.config.js.
```
https://github.com/webpack-contrib/css-loader/issues/145

### Couldn't find preset "es2015" relative to directory


```
Have you installed these presets via npm?

babel-preset-es2015
babel-preset-stage-2
```
## 如何测试移动端

[如何在 PC 机上测试移动端的网页？](https://www.zhihu.com/question/20322475)

[聊一聊移动端调试那些事](https://juejin.im/entry/5851e77d61ff4b006c8414dd)

[awesome-npm](https://github.com/x-cold/awesome-npm#72-web%E8%B0%83%E8%AF%95)

[移动端浏览器调试方法汇总](http://elevenbeans.github.io/2017/06/06/%E7%A7%BB%E5%8A%A8%E7%AB%AF%E6%B5%8F%E8%A7%88%E5%99%A8%E8%B0%83%E8%AF%95%E6%96%B9%E6%B3%95%E6%B1%87%E6%80%BB/)


### babel
[babel-polyfill用法](https://babeljs.io/docs/en/babel-polyfill.html)

#### todolist
- babel技术总结 
[Babel 入门教程](http://www.ruanyifeng.com/blog/2016/01/babel.html
)
[babel到底该如何配置？](https://segmentfault.com/a/1190000011665642)

[Babel的使用](https://segmentfault.com/a/1190000008159877)

-  测试demo

http://10.0.1.128:8080/myTest/index.html
http://10.0.1.128:8080/axiosD/index.html
http://10.0.1.128:8080/allinmd/discover/discover_index.html(h5页面需要模拟手机)