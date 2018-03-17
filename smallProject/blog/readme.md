技术栈:

vue+vueRouter+express+express+mysql+graphQL


主要功能

1. vue 热更新
2. vue开发环境配置
3. vue生产环境构建
4. graphQL应用
5. mysql数据库连接
6. markdown前后台支持
7. express+webpack 一套环境搭建前后端应用
3.开发环境 dev添加


## todoList

TODOlist待完成:
  1.文章页搭建对于mackdown
  
  1. 登录系统
  
  3.开发环境 dev添加
  
  2.~~分页graphql~~  完成
  
  3. 后台系统 
  
  4. ssr
  
  5. vue-router article文章修改和栏目是否使用同一个layout
  
  6.更新修改文章



1.markdown组件

使用的是https://github.com/PanJiaChen/vue-element-admin/ 中的markdown组件

后台markdown使用的是 [simplemde-markdown-editor](https://github.com/sparksuite/simplemde-markdown-editor)
 
参考 [markdown](https://segmentfault.com/a/1190000009762198#articleHeader14)



### 后台vue模块比对

    因为我这博客比较简单,所以只是简单的抽取了用得到的模块

下面是查询过程中,了解到的项目比对

1. 集成的后台项目
[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

文章:https://juejin.im/post/59097cd7a22b9d0065fb61d2

2. 后台可以可开发项目

[admin-vue](https://admin.vuebulma.com/#/)

[Vue 2.0 Admin后台管理模板对比](http://lanyuanxiaoyao.com/2017/07/05/vue-admin/#vue-adminstar-4876)





### 
>koa + vue + vueRouter + vueX + ssr

koa+vue+mysql搭建博客基础

[多页架构的前后端分离方案（webpack+express）](https://segmentfault.com/a/1190000008644787)
[基于webpack的前后端分离开发环境实战](https://segmentfault.com/a/1190000009266900)
[webpack多页面配置6--热加载刷新](https://godbasin.github.io/2017/08/19/webpack-multi-project-6-hot-reload/)

2.
参考:
[Node+Koa2+Mysql 搭建简易博客](http://www.wclimb.site/2017/07/12/Node-Koa2-Mysql-%E6%90%AD%E5%BB%BA%E7%AE%80%E6%98%93%E5%8D%9A%E5%AE%A2/)


ssr

[简单的 Vue SSR Demo](https://juejin.im/entry/5a56c944518825734d1485bc)

[Vue-Koa同构开发环境](http://miaooo.me/article/Vue-Koa%E5%90%8C%E6%9E%84%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83)


#### 小问题:

webpack如何提取vue组件的css到独立文件中:`ExtractTextPlugin.extract`
[ExtractTextPlugin.extract](https://segmentfault.com/q/1010000005363929)



#### 待完成:
1. [为 Koa 框架封装 webpack-dev-middleware 中间件](https://segmentfault.com/a/1190000004883199)
是否可以用koa调用webpack,启用一套服务.(应该可以), 先用koa,后期考虑一套,当前考虑使用使用express

2. [手摸手，带你用vue撸后台 系列三(实战篇)](https://segmentfault.com/a/1190000009762198)

3. [element](http://element-cn.eleme.io/#/zh-CN/component/cascader)

4. [服务端渲染](https://segmentfault.com/a/1190000012294822)
    [简单的 Vue SSR Demo](https://juejin.im/entry/5a56c944518825734d1485bc)
[Vue项目SSR改造实战](https://segmentfault.com/a/1190000009373793)

[从零开始搭建vue-ssr系列之二：Client端渲染以及webpack2+vue2踩坑之旅](https://segmentfault.com/a/1190000009372772)

[Vue SSR 从入门到 Case Study](https://juejin.im/post/58f2ceffa0bb9f006a990e30)

#####优化:

[给非程序员的爬虫教程（十六）：接下来需要学习什么](http://blog.sevenplus.me/)

[基于 Webpack 3 的 Vue.js 工程项目脚手架](https://zhuanlan.zhihu.com/p/27960679)


[初识NodeJS服务端开发（Express+MySQL）](http://www.alloyteam.com/2015/03/sexpressmysql/)

2.
[Node: Puppeteer + 图像识别 实现百度指数爬虫 #4](https://github.com/Coffcer/Blog/issues/4)



~~博客样式参考  http://zaaack.github.io/2015/12/29/projects/#chrome-timer~~


https://segmentfault.com/a/1190000009565131