[TOC]
# VUE服务端渲染ssr

## 遇到的问题
#### 在ssr中使用puppeteer中报错 Can't resolve 'child_process' ,Module not found: Error: Can't resolve 'fs' in

解决方案:

  
`In your webpack.config.*.js file, add the following to plugins after new webpack.DllPlugin({}):`

[Module not found: Error: Can't resolve 'fs'](https://github.com/react-boilerplate/react-boilerplate/issues/1278)

其他:

`new webpack.IgnorePlugin(/your_package_name_here/)`. For me, it was yarn that was blowing stuff up.

```
node: {
    fs: 'empty',
    child_process: 'empty',
  },
```  

```
just put in package.json
"browser":{
"child_process": false
}
```
[Module not found: Can't resolve 'child_process'](https://github.com/mikaelbr/node-notifier/issues/192)

## ssr项目梳理

### 达到了什么效果	
1. 更快的获取内容
 
 	- 测速方式 :首次清除缓存,后续不清除
 	- 测试工具: 谷歌浏览器开发者工具-performace面板
 	- 环境: 访问线下接口

ssr/时间|-|-|-|-|-| -|平均数|
------------ | ------------- | ------------
首屏时间  | 860 | 840  | 840 | 860 | 840 |800|840

非ssr/时间 | - | -|-|-|-|平均数|
------------ | ------------- | ------------
首屏时间  | 1030  | 1260|1020| 1070|1130|1102

注: 首屏时间为用户看到指定数据的时间

2.更好的seo

 ```
 <article class="main-header-tips" data-v-2ff83d98>
                    您好，<span data-v-2ff83d98>医生二号</span>医生
                </article>
 ```
 
## 我做了那些工作
### 项目流程图
![项目流程图](http://p5tp6po4m.bkt.clouddn.com/%E9%A1%B9%E7%9B%AE%E6%B5%81%E7%A8%8B%E5%9B%BE_v2.png)

###用户流程图

![](http://p5tp6po4m.bkt.clouddn.com/axure/ssr/%E7%94%A8%E6%88%B7%E8%AE%BF%E9%97%AE%E6%B5%81%E7%A8%8B.png)

## 如何使用

1.源码部分无需改动
2.ssr配置文件修改,当前为在ssr项目中修改,后期改为在arthas中可视化配置.

## 原理
对于骨科pc端的修改主要分为:    1).前后端不通用的代码功能    2).在预取数据时,ajax.js未挂载到vue主实例下,需修改引用方式    3).再vuex的actions和mutations中预取数据,再userlist组件中设置asyncData    4).router/store引用方式的修改,及main.js中引用方式的修改
配置项修改如下: 

```
//fenzhen_allinmed.confg
  module.exports= {
    "projectId": 2,
    "projectName": "fenzhen_allinmed",   //项目名称,请与gitlab保持一致
    "gitLab": "http://192.168.1.78/qiaoliang/fenzhen_allinmed.git",  //gitlab路径
    "port":8010, //暂未使用
    "changeList": { ///src中需要修改的list
        "router/index.js": {    //文件名   
            "import VueResource from 'vue-resource'": "",//替换的具体内容
            "Vue.use(VueResource);": "",
            'export default new Router({': 'export function createRouter() {\n' +
            '    return new Router({\n' +
            '        mode: \'history\',  // 去掉路由地址的#',
            '})': '})\n' +
            '};'
        },
        
        "store/store.js": {
            'export default new Vuex.Store({': "export default function createStore() {\n" +
            "    return new Vuex.Store({",
            '})': '})\n' +
            '}'
        },
        "src/main.js": {
            '\'': '\"',
            '});': '',
    -------
    
            '}',
        },
   /*
   * 数据预取部分  重要  actions.js中需要修改
   */    
        'store/actions.js': {
            'const actions = {': 'import ajax from "../api/index-server";\n' +
            '\n' +
            'const actions = {',
            'commit("setIsToExamine",data);': '    commit("setIsToExamine", data);.
            .....
                },
           /*
  			 * 数据预取部分 mutations.js 重要  
      		*/   
        'store/mutations.js': {
            'import ajax from "@/common/js/util/ajax";': 'import ajax from "@/
            
            ......
            '        }'
        },
 	  /*
  	 * vue组件 新增数据预取部分 
  	  */  
        
        
              'src/userlist_rebuild.vue': {
            'computed: {': ' asyncData ({ store, route,isServer }) {\n' +
...........
            '        },\n' +
            '        computed: {'
        },
        },
     },
     //需要删除的文件
    "delList": [
        './src/common/js/third-party/jqueryscrollpagination/css/scrollpagination_demo.css',
        './static/js/third-party/jqueryscrollpagination/css/scrollpagination_demo.css',
    ]
};

```


