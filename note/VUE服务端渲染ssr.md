****# vue服务端渲染ssr

## ssr是什么

服务器端将Vue组件直接渲染未html字符串,发送至浏览器,最后在浏览器中混合为可交互的应用程序

服务器渲染的 Vue.js 应用程序也可以被认为是"同构"或"通用"，因为应用程序的大部分代码都可以在服务器和客户端上运行。

## 为什么要用

* 更好的 SEO
![未做ssr的dom结构](http://p7b4glo0g.bkt.clouddn.com/vuessr/no-ssr-seo.png)
![dom结构](http://p7b4glo0g.bkt.clouddn.com/vuessr/dom%E7%BB%93%E6%9E%84.png)

* 更快的内容到达时间首屏时间(time-to-content) (fast-3G)

![未做ssr](http://p7b4glo0g.bkt.clouddn.com/vuessr/%E6%9C%AAssr.png)
![ssr效果](http://p7b4glo0g.bkt.clouddn.com/vuessr/ssr%E6%95%88%E6%9E%9C.png)

## 怎么做

* vue-server-renderer 

* Nuxt.js 

是一个参考了 React.js 栈下的 Next.js 的一个更高封装接口的 SSR 框架。它封装了一层和 vue-router、vuex 及 webpack 设置这一层需求，可以快速开发 SSR.配置简单,开箱即用.

* Prerendering

如果你调研服务器端渲染(SSR)只是用来改善少数营销页面（例如 /, /about, /contact 等）的 SEO，那么你可能需要预渲染。无需使用 web 服务器实时动态编译 HTML，而是使用预渲染方式，在构建时(build time)简单地生成针对特定路由的静态 HTML 文件。优点是设置预渲染更简单，并可以将你的前端作为一个完全静态的站点。
如果你使用 webpack，你可以使用 prerender-spa-plugin 轻松地添加预渲染。
 
* 其他 
 

## 注意事项

* 如果你打算为你的vue项目在node使用 SSR，那么在通用代码中，我们有必要并且需要遵守下面的这些约定：
   
* 通用代码: 在客户端与服务器端都会运行的部分为通用代码。
   
* **注意服务端只调用beforeCreat与created两个钩子**，所以不可以做类似于在created初始化一个定时器，然后在mounted或者destroyed销毁这个定时器，不然服务器会慢慢的被这些定时器给榨干了因单线程的机制，在服务器端渲染时，过程中有类似于单例的操作，那么所有的请求都会共享这个单例的操作，所以应该使用工厂函数来确保每个请求之间的独立性。

* 如有在beforeCreat与created钩子中使用第三方的API，需要确保该类API在node端运行时不会出现错误，比如在created钩子中初始化一个数据请求的操作，这是正常并且及其合理的做法。**但如果只单纯的使用XHR去操作，那在node端渲染时就出现问题了，所以应该采取axios这种浏览器端与服务器端都支持的第三方库**。

* 最重要一点: **切勿在通用代码中使用document这种只在浏览器端可以运行的API，反过来也不可以使用只在node端可以运行的API**。

* 要注意一些自执行方法中调用一些node端不支持的API.

* **ssr适用于项目结构简单的spa页,如果想要做ssr最好在项目初期就考虑好适用ssr结构**.


# 结构预览

![结构预览](http://p7b4glo0g.bkt.clouddn.com/vuessr/hn-architecture.png)



## 项目流程

![](http://p5tp6po4m.bkt.clouddn.com/%E9%A1%B9%E7%9B%AE%E6%B5%81%E7%A8%8B%E5%9B%BE_v2.png)




##vueServerRender 目录结构

- common 公共方法
- conf  存放项目修改的配置文件
- copyFiles   一些需要复制新增到项目中的文件
	- fenzhen_allinmed  项目新增文件
- log  日志目录
- ssr  项目修改后存放的地址
- www  原来项目代码存放
- app.js  项目入口(进行修改,构建,启动)
- package.json  项目依赖
- readme.md   项目说明


##我对骨科医生端项目做了哪些修改

```
module.exports= {
    "projectId": 2,
    "projectName": "fenzhen_allinmed",
    "gitLab": "http://192.168.1.78/qiaoliang/fenzhen_allinmed.git",
    "port":8010,
    "changeList": {
        "router/index.js": {
            "import VueResource from 'vue-resource'": "",
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
            '}': '',

            'import router from "./router"': 'import { createRouter } from "./router/index"',
            'import store from "./store/store";': 'import  createStore  from "./store/store"\n' +
            'import ajax from "@/common/js/util/ajax";\n' +
            'import { sync } from "vuex-router-sync"\n' +
            'Vue.use(ajax);',

            'el: "#app",': '',
            'template: "\<App\/\>",': '',
            'store,': '',
            'router,': '',
            'components: {': '',
            'let App = () => import("./App");': '',
            'App': '',
            '// "App": () => import("./App")': '',


            'new Vue({': ' let App = () => import(\'./App\');export function createApp () {\n' +
            '    // 创建 router 实例\n' +
            '    const router = createRouter()\n' +
            '    const store = createStore()\n' +
            '\n' +
            '    // 同步路由状态(route state)到 store\n' +
            '    sync(store, router)\n' +
            '    const app = new Vue({\n' +
            '        // 注入 router 到根 Vue 实例\n' +
            '        router,\n' +
            '        store,\n' +
            '        render: h => h(App)\n' +
            '    })\n' +
            '    // 返回 app 和 router\n' +
            '    return { app, router, store }\n' +
            '}',
        },
        'store/actions.js': {
            'const actions = {': 'import ajax from "../api/index-server";\n' +
            '\n' +
            'const actions = {',
            'commit("setIsToExamine",data);': '    commit("setIsToExamine", data);\n' +
            '    },\n' +
            '    getUserInfo: ({commit, state}) => {\n' +
            '        console.log("getUserInfo")\n' +
            '        return new Promise((resolve, reject) => {\n' +
            '            ajax.post(\n' +
            '                "http://127.0.0.1:8010/call/tocure/web/user/getWebUser/",\n' +
            '            ).then((res) => {\n' +
            '                resolve(res)\n' +
            '            })\n' +
            '        })\n' +
            '        .then(res => {\n' +
            '            commit("setBaseMessage", res);\n' +
            '        })\n' +
            '    },\n' +
            '    getUserWaitList: ({commit, state}) => {\n' +
            '        console.log("-------getUserWaitList")\n' +
            '        return new Promise((resolve, reject) => {\n' +
            '            ajax.post(\n' +
            '                "http://127.0.0.1:8010/call/customer/case/consultation/v1/getMapListForCase/",\n' +
            '                {\n' +
            '                    paramJson:JSON.stringify({\n' +
            '                    conType: 0,\n' +
            '                    triageType:1,\n' +
            '                    sortType: -6\n' +
            '                })\n' +
            '                }\n' +
            '            ).then((res) => {\n' +
            '                resolve(res)\n' +
            '            })\n' +
            '        })\n' +
            '            .then(res => {\n' +
            '                console.log("这里是预加载的 data=====")\n' +
            '                commit("getUserWaitList", res.data);\n' +
            '            })\n'
        },
        'store/mutations.js': {
            'import ajax from "@/common/js/util/ajax";': 'import ajax from "@/common/js/util/normalAjax";',
            'state.deleteMsgTime =data;': 'state.deleteMsgTime =data;\n' +
            '    },\n' +
            'setBaseMessage(state,data){\n' +
            '        let res =data;\n' +
            '        function checkNullObj (obj) {\n' +
            '            if (Object.keys(obj).length === 0) {\n' +
            '                return false // 如果为空,返回false\n' +
            '            }\n' +
            '            return true // 如果不为空，则会执行到这一步，返回true\n' +
            '        }\n' +
            '\n' +
            '        if(res && res.data && res.data.responseObject && res.data.responseObject.responseMessage){\n' +
            '            let dataList = res.data.responseObject.responseMessage;\n' +
            '            console.log("dataList:",dataList)\n' +
            '            console.log("是否不会空:",checkNullObj(dataList))\n' +
            '            if(checkNullObj(dataList)){\n' +
            '                console.log("不是空对象");\n' +
            '                state.dataList = dataList;\n' +
            '                state.userName = dataList.nickName;\n' +
            '                state.mobile = dataList.mobile;\n' +
            '                state.userId = dataList.uniteUserId;\n' +
            '                state.mailBox = dataList.email;\n' +
            '                state.sex = dataList.sex;\n' +
            '                console.log("设置预取dataList数据成功===:",dataList)\n' +
            '                console.log("设置预取userName数据成功===:",dataList.nickName)\n' +
            '            }else{\n' +
            '                state.userName = "";\n' +
            '                state.mobile = "";\n' +
            '                state.userId = "";\n' +
            '                state.mailBox = "";\n' +
            '                state.sex = "";\n' +
            '            }\n' +
            '        }\n' +
            '    },\n' +
            '    getUserWaitList(state,data){\n' +
            '        if(data && data.responseObject && data.responseObject.responseData && data.responseObject.responseData.dataList){\n' +
            '            let result = [];\n' +
            '            let dataList = data.responseObject.responseData.dataList;\n' +
            '            if (dataList) {\n' +
            '                dataList.forEach((element, index) => {\n' +
            '                    result.push(\n' +
            '                        Object.assign(element, {\n' +
            '                            triageSelect: false\n' +
            '                        })\n' +
            '                    );\n' +
            '                });\n' +
            '            }\n' +
            '            dataList =result;\n' +
            '            let waitingAlertList = {},patientAlertList = {},resetAlertList = {};\n' +
            '\n' +
            '            if (waitingAlertList && waitingAlertList !== "{}") {\n' +
            '                for (let key in waitingAlertList) {\n' +
            '                    let flag = true;\n' +
            '                    dataList.forEach(function (item, index) {\n' +
            '                        if (typeof item.messageAlert == "undefined") {\n' +
            '                            item.messageAlert = "";\n' +
            '                        }\n' +
            '                        if (key == "0_" + item.caseId) {\n' +
            '                            item.messageAlert = waitingAlertList[key];\n' +
            '                            state.newWaiting = {\n' +
            '                                redFlag:true,\n' +
            '                                play:true\n' +
            '                            };\n' +
            '                            flag = false;\n' +
            '                        }\n' +
            '                    });\n' +
            '                    if (flag) {\n' +
            '                        delete waitingAlertList[key];\n' +
            '                    }\n' +
            '                }\n' +
            '            }\n' +
            '            console.log("设置预取数据成功===")\n' +
            '            state.waitingList=(dataList ? dataList : []);\n' +
            '        }else{\n' +
            '            console.log("getUserWaitList接口没有数据===")\n' +
            '        }'
        },
        'src/Main-Header.vue': {
            'import ajax from "@/common/js/util/ajax";': '//    import ajax from "@/common/js/util/ajax";',
            'ajax({': 'this.ajax({'
        },
        'src/communication.vue': {
            'import ajax from "@/common/js/util/ajax";': '//    import ajax from "@/common/js/util/ajax";',
            'ajax({': '_this.ajax({',
            'call/customer/case/consultation/v1/updateAudit/': '/call/customer/case/consultation/v1/updateAudit/'
        },
        'src/userlist_rebuild.vue': {
            'computed: {': ' asyncData ({ store, route,isServer }) {\n' +
            '            console.log("当前的stroid",store.state.userId)\n' +
            '            console.log(isServer)\n' +
            '           if(isServer) {\n' +
            '                console.log("fuwud服务端会执行============")\n' +
            '                return Promise.all([\n' +
            '                    store.dispatch(\'getUserInfo\'),\n' +
            '                    store.dispatch(\'getUserWaitList\')\n' +
            '                    ])\n' +
            '            }else{\n' +
            '               return new Promise((resolve, reject)=>{\n' +
            '                   resolve()\n' +
            '               })\n' +
            '           }\n' +
            '        },\n' +
            '        computed: {'
        },
        'src/common/js/util/util.js': {
            'import ajax from "./ajax";': '',
            'ajax(param);': '',
        },
        'js/util/ajax.js': {
            'import store from "@/store/store";': '',
            'export default function ajax(param) {': 'export default {\n' +
            '    install: function (Vue) {\n' +
            '\n' +
            '        Vue.prototype.ajax = function (param) {\n' +
            '\n' +
            '           let _this = this;',
            'store': '_this.$store',
            '});': '', //xian先去掉,然后找上文,添加
            'return config;': 'return config;});',
            'param.fail && param.fail(err);': 'param.fail && param.fail(err);});}}'
        },
        'src/base/nimEnv.js': {
            'import ajax from "@/common/js/util/ajax";': 'import ajax from "@/common/js/util/normalAjax";',
            // 'triage9.allinmed.cn': 'triage.allinmed.cn',
            '10.':'10.") ||  host.includes("192.'
        },
        'src/base/releasePatient.js': {
            'import ajax from "@/common/js/util/ajax";': 'import ajax from "@/common/js/util/normalAjax";'

        },
        'src/base/triagePatient.js': {
            'import ajax from "@/common/js/util/ajax";': 'import ajax from "@/common/js/util/normalAjax";'
        },
        'src/baseIm.vue': {
            'api.ajax': 'that.ajax'
        },
        'src/userlist_rebuild.vue': {
            'api.ajax': 'this.ajax',
            'computed: {': ' asyncData ({ store, route,isServer }) {\n' +
            '            console.log("当前的stroid",store.state.userId)\n' +
            '            console.log(isServer)\n' +
            '           if(isServer) {\n' +
            '                console.log("fuwud服务端会执行============")\n' +
            '                return Promise.all([\n' +
            '                    store.dispatch(\'getUserInfo\'),\n' +
            '                    store.dispatch(\'getUserWaitList\')\n' +
            '                    ])\n' +
            '            }else{\n' +
            '               return new Promise((resolve, reject)=>{\n' +
            '                   resolve()\n' +
            '               })\n' +
            '           }\n' +
            '        },\n' +
            '        computed: {'
        },
        'src/components/used_rely.vue': {
            'ajax({': 'that.ajax({',
            'import ajax from "@/common/js/util/ajax";': '//  import ajax from "@/common/js/util/ajax";',

        },
        'import ajax from "@/common/js/util/ajax";': {
            'import ajax from "@/common/js/util/ajax";': '//  import ajax from "@/common/js/util/ajax";'
        },
        'src/components/usedReplyConfig.vue': {
            'ajax({': 'that.ajax({',
            'import ajax from "@/common/js/util/ajax";': '//    import ajax from "@/common/js/util/ajax";',
        },
        'src/components/setting.vue': {
            'import ajax from "@/common/js/util/ajax";': '',
            'ajax': '_this.ajax'
        },
        'src/components/triageRecord.vue': {
            'ajax({': '  that.ajax({',
            'import ajax from "@/common/js/util/normalAjax";': '',
        },
        'src/components/imParts/medicalReport.vue': {
            'import ajax from "@/common/js/util/ajax";': '//  import ajax from "@/common/js/util/ajax";',
            'ajax({': '_this.ajax({',
            'const that = this;':'const _this = this;',
            'that.$store.state.currentItem.caseId':'_this.$store.state.currentItem.caseId',
            'that.medicalReportMsg':'_this.medicalReportMsg',
            'that.medicalReportMsg.doctorMap.doctorId':'_this.medicalReportMsg.doctorMap.doctorId',
            'that.recommendDoctor(that.medicalReportMsg.doctorMap.doctorId);':'_this.recommendDoctor(_this.medicalReportMsg.doctorMap.doctorId);',
            'that.recommendDoctor':'_this.recommendDoctor',

        },
         },
    package:{
        '"node build/build.js"': ' "rimraf dist && npm run build:client && npm run build:server",\n' +
            '    "build:client": "./node_modules/.bin/cross-env NODE_ENV=production webpack --config build/webpack.client.conf.js --progress --hide-modules",\n' +
        '    "build:server": "./node_modules/.bin/cross-env NODE_ENV=production  webpack --config build/webpack.server.conf.js --progress --hide-modules",\n' +
        '    "ssr": "./node_modules/.bin/cross-env NODE_ENV=production forever server.js"',
        'node build/dev-server.js':' ./node_modules/.bin/cross-env NODE_ENV=production node server',
        '"vue-router"':'    "route-cache": "^0.4.4",\n' +
            '    "cookie-parser": "^1.4.3",\n' +
        '    "js-cookie": "^2.2.0"  ,\n' +
        '    "jsdom": "^11.8.0" ,\n' +
        '    "morgan": "^1.9.0"  ,\n' +
        '    "serve-favicon": "^2.5.0" ,\n' +
        '    "sw-precache-webpack-plugin": "^0.11.5"  ,\n' +
        '    "vue-server-renderer": "^2.5.16"  ,\n' +
        '    "vuex-router-sync": "^5.0.0" ,\n' +
        '    "webpack-node-externals": "^1.7.2",\n' +
        '    "vue-router"'
    },
    "delList": [
        './ssr/fenzhen_allinmed/src/common/js/third-party/jqueryscrollpagination/css/scrollpagination_demo.css',
        './ssr/fenzhen_allinmed/static/js/third-party/jqueryscrollpagination/css/scrollpagination_demo.css'
    ]
};
```

## 构建流程
修改代码后,需要在arthas内重新构建代码,启动服务.

## 可能会造成的影响
- 上线部分/单上会增加多上的文件
- 修改bug后ssr出错,因为需要对代码按照配置文件进行替换
- 多增加一次构建

--------
--------

--------
--------

--------
--------










# ssr实现
![实现过程](http://p7b4glo0g.bkt.clouddn.com/vuessr/process.jpeg)





# 应用



### 如何优化
#### 尽量减少对Vue-SSR的依赖

SSR虽然有着优化SEO和加快首屏渲染等优点，但对服务端的压力也相当的大。虽然Vue能服务端渲染，但不一定要用它来进行服务端渲染。而且作为新技术，生产环境的使用还有待考验。作为一名优秀的搬砖工，应该在编码时就做好一键切换SSR的准备（误），以便于突发情况下的紧急回退。

主要要注意的有下面几点：

1. 数据预取方法的进一步抽离和复用

关掉SSR之后，数据的初始化可能就要放在mounted等生命周期钩子里了。为了不在开了SSR的时候重复获取数据，我的做法是把asyncData的内容抽出来，放在一个函数里，并检查是否已获取过数据(判断依据视数据不同而不同)。然后分别在asyncData和mounted中调用同一方法：
```
<script>
function fetchData(store) {
    // 如果未获取过数据，则dispatch action
    if (...) {
        return store.dispatch(xxx);
    }
    // 获取过则直接return
    return Promise.resolve();
}
export default {
    asyncData({ store }) {
        return fetchData(store);
    },
    // ...省略无关代码
    mounted() {
        return fetchData(this.$store);
    },
}
</script>
```

2. 手动完成state的初始化

为了保证store的一致性，Vue-SSR会将服务端渲染的state挂载在`window.__INITIAL_STATE__`上，在client-entry.js中调用`store.replaceState(window.__INITIAL_STATE__);`，保证客户端和服务端的state一致。
要减少对Vue-SSR的依赖的话，应该是把Vue-SSR渲染出的html插入到后端模板里，再进一步渲染出html：

```
<!-- 以nunjucks模板为例  -->
<body>
  {% if SSRHtml%}
    {{SSRHtml|safe}}
  {% else %}
  <!-- 用于在关闭SSR后挂载Vue实例 -->
    <div id="app"></div>
  {% endif %}
</body>
```

这里有个问题就是，需要renderer使用了template，state才会自动注入windows.__INITIAL_STATE__。然而我们又想保持用普通的后端模板渲染html，这样windows.__INITIAL_STATE__又会为空，该怎么办呢？

答案其实看一眼Vue-hackernews 的head就知道了。

其实所谓的自动注入，其实也是直接写在html里拼进去的...

```
+`<script>
    window.__INITIAL_STATE__=${serialize(context.initialState, { isJSON: true })
</script>`
```

这里的serialize()其实和JSON.stringify()差不多，不过能把正则表达式和函数也序列化，在某些时候（例如路由匹配的正则）会需要这些能力。一定程度上可以直接用JSON.stringify()代替。
知道了原理之后，我们就可以在renderer不用template的情况下手动将初始化的动态数据注入到html中啦～

[Vue SSR踩坑小记](https://zybuluo.com/FunC/note/817027)


#### [Vue.js 服务端渲染业务入门实践](https://segmentfault.com/a/1190000011039920)
####  静态资源走nginx


## 缺点

* 开发条件所限。浏览器特定的代码，只能在某些生命周期钩子函数(lifecycle hook)中使用；一些外部扩展库(external library)可能需要特殊处理，
才能在服务器渲染应用程序中运行。

* 涉及构建设置和部署的更多要求。与可以部署在任何静态文件服务器上的完全静态单页面应用程序(SPA)不同，服务器渲染应用程序，需要处于
 Node.js server 运行环境。

* 更多的服务器端负载。在 Node.js 中渲染完整的应用程序，显然会比仅仅提供静态文件的 server 更加大量占用
 CPU 资源(CPU-intensive - CPU 密集)，因此如果你预料在高流量环境(high traffic)下使用，请准备相应的`服务器负载`，并明智地采用`缓存策略`。                            

# vuecli2ssr

> vue-cli改为ssr配置

## Build Setup

``` bash
# install dependencies
npm install

# serve no reload at localhost:8080
npm run dev

# serve with hot reload at localhost:8080
npm run devHot

# build for production with minification
npm run build


# serve no reload at localhost:8003
# 不带优化项的 实现功能
npm run dev

# serve with hot reload at localhost:8003
#根据官方demo实现的
npm run devHot


# build for production and view the bundle analyzer report
npm run build --report

# 开启服务
npm start

#访问(分页功能)
http://localhost:8003/pageList/1
http://localhost:8003/pageList/2 
```


## 目录结构

```
│  package.json					# 项目配置文件
│  server.js					  # 最简单的服务端渲染
│  serverHot.js					# 热加载的服务端渲染
│  
├─public                                    	# 静态资源  
└─src
    │  app.js					# 整合 router,filters,vuex 的入口文件
    │  App.vue					# 根 vue 组件
    │  entry-client.js				# client 的入口文件
    │  entry-server.js				# server 的入口文件
    │  index.template.html			# html 模板
    │  
    ├─api
    │      create-api-client.js			# Client数据源配置
    │      create-api-server.js			# server数据源配置
    │      index.js				# 数据请求API
    │      
    ├─components
    │      Comment.vue				# 评论组件
    │      Item.vue				# 
    │      ProgressBar.vue			# 进度条组件
    │      Spinner.vue				# 加载提示组件
    │     
    ├─router
    │      index.js				# router配置
    │      
    ├─store					# Vue store模块
    │      actions.js				# 根级别的 action
    │      getters.js				# 属性接口
    │      index.js				# 我们组装模块并导出 store 的地方
    │      mutations.js				# 根级别的 mutation
    │      
    ├─util
    │      filters.js				# 过滤器
    │      title.js				# 工具类
    │      
    └─views
            CreateListView.js			# 动态生成列表界面的工厂方法
            ItemList.vue			# List界面组件
            ItemView.vue			# 单List项组件
            UserView.vue			# 用户界面组件

```
## 开发环境的服务端渲染流程

![render](http://p7b4glo0g.bkt.clouddn.com/vuessr/rundev.png)

# 修改过程

>功能:根据url传参分页的demo

使用 vue-cli再次初始化一个项目:

1).创建vue-cli项目
`vue init webpack vue-ssr-demo`

```
cd vue-ssr-demo
npm install
npm run dev
```

2).满足基本功能

1.新增/src/view目录,对应的vue组件

2.安装axios, 新增用于测试的 /api/fetchItem
``npm i axios  -D``
3.安装 vuex ,新增 /store/index 并在 App.js中引入 store
`npm i axios vuex -D`

3)修改为ssr
1. 在src目录下创建两个js:
```
  src
  ├── entry-client.js # 仅运行于浏览器
  └── entry-server.js # 仅运行于服务器
```

3.修改 /src/router/index.js 配置

 修改引入组件改为异步组件
 router改为history模式

```js
import Vue from 'vue'
import Router from 'vue-router'

let indexList= () => import('@/view/index_list') // 改为异步组件
let pageList= () => import('@/view/page_list') // 改为异步组件

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history', // 注意这里也是为history模式
    routes: [
      {
        path: '/',
        name: 'HelloWorld',
        component: indexList
      },
      {
        path: '/pageList/:id',
        name: 'pageList',
        component: pageList,
      },
    ]
  })
}

```
4. 改造app.js
app.js初始化的只适合在浏览器的运行，所以要改造两端都可以使用的文件，同样为了避免产生单例的影响，这里将导出一个createApp的工厂函数

```js
// app.js
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router/index.ssr'
import { createStore } from './store/index.ssr'
import { sync } from 'vuex-router-sync'
export function createApp () {
  // 创建 router 实例
  const router = createRouter()
  const store = createStore()
  // 同步路由状态(route state)到 store
  sync(store, router)
  const app = new Vue({
    // 注入 router 到根 Vue 实例
    router,
    store,
    render: h => h(App)
  })
  // 返回 app 和 router
  return { app, router, store }
}
```

5.entry-client.js

```
// entry-client.js
import { createApp } from './app'
import Vue from 'vue'

Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
router.onReady(() => {
  // 添加路由钩子函数，用于处理 asyncData.
  // 在初始路由 resolve 后执行，
  // 以便我们不会二次预取(double-fetch)已有的数据。
  // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    // 我们只关心之前没有渲染的组件
    // 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    if (!activated.length) {
      return next()
    }
    // 这里如果有加载指示器(loading indicator)，就触发
    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({ store, route: to })
      }
    })).then(() => {
      // 停止加载指示器(loading indicator)
      next()
    }).catch(next)
  })
  app.$mount('#app')
})

```

6.entry-server.js

```
// entry-server.js
import { createApp } from './app'
export default context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    router.push(context.url)
    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      // 对所有匹配的路由组件调用 `asyncData()`
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        // 在所有预取钩子(preFetch hook) resolve 后，
        // 我们的 store 现在已经填充入渲染应用程序所需的状态。
        // 当我们将状态附加到上下文，
        // 并且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}

```

7.server端

```
const express = require('express')
const app = new express()
const fs = require('fs')
const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer');

const resolve = file => path.resolve(__dirname, file)

// 生成服务端渲染函数
const renderer = createBundleRenderer(require('./dist/vue-ssr-server-bundle.json'), {
  // 推荐
  runInNewContext: false,
  // 模板html文件
  template: fs.readFileSync(resolve('./index.html'), 'utf-8'),
  // client manifest
  clientManifest: require('./dist/vue-ssr-client-manifest.json')
});

// 在服务器处理函数中……
app.get('*', async (req, res) => {
  console.log("被访问了~~")
  const context = {
    url: req.url ,
    title: '服务端渲染测试', // {{title}}
  }
  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦！
  renderer.renderToString(context, (err, html) => {
    res.end(html)
  })
})

const port = process.env.PORT || 8003;
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})

```

8.将组件数据获取改为 预取
```
  mounted: function () {
    //获取页数后 同步数据
    this.$store.dispatch('fetchItem',{
      id:this.$route.params.id
    })
  }
```

```
 asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('fetchItem', route.params.id)
  },
   mounted: function () {

    }
```


修正的地方

1.在路由文件中mode: 'history', // 注意这里也是为history模式 服务器端独有 客户端时要注释掉

追加
2.在vue文件里如果需要数据同步 mouted,追加async

3.在app.js中文件工厂方法

```
export function createApp () {
  // 同步路由状态(route state)到 store
  sync(store, router)
  const app = new Vue({
    //注入 router\store 到根 Vue 实例
    router,
    store,
    render: h => h(App)
  })
  // 返回 app 和 router\store
  return { app, router, store }
}
```

4.app.js修正客户端引用路由等方式




  [Vue warn]: You are using the runtime-only build of Vue where the template option is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }

  Module build failed: Error: "extract-text-webpack-plugin" loader is used without the corresponding plugin, refer to webpack-contrib/extract-text-webpack-plugin for the usage example
  plugins: [
    ...
    //这样会定义，所有js文件中通过require引入的css都会被打包成相应文件名字的css
    new ExtractTextPlugin("[name].css"),
  ]
  因此解决该报错的方法就是在plugins中添加相应配置！
  ["extract-text-webpack-plugin”使用的坑](https://zhuanlan.zhihu.com/p/29664914)


[Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
当前怀疑为webpackbug
https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/494


# ssr项目梳理

### 达到了什么效果	

- 更快的获取内容
 
 	- 测速方式 :首次清除缓存,后续不清除
 	- 测试工具: 谷歌浏览器开发者工具-performace面板
 	- 环境: 访问线下接口


ssr/时间 |-|-|-|-|-| -|平均数|
--- | ---|--- | ---|--- | ---|--- | ---|
首屏时间  | 860 | 840  | 840 | 860 | 840 |800|840

非ssr/时间 | - | -|-|-|-|平均数|
--- | ---|--- | ---|--- | ---|--- | ---|
首屏时间  | 1030  | 1260|1020| 1070|1130|1102

注: 首屏时间为用户看到指定数据的时间

- 更好的seo

 ```
 <article class="main-header-tips" data-v-2ff83d98>
    您好，
    <span data-v-2ff83d98>医生二号</span>
    医生
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
对于骨科pc端的修改主要分为:
    1).前后端不通用的代码功能
    2).在预取数据时,ajax.js未挂载到vue主实例下,需修改引用方式
    3).再vuex的actions和mutations中预取数据,再userlist组件中设置asyncData
    4).router/store引用方式的修改,及main.js中引用方式的修改
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

性能问题需要多加关注。

vue.mixin、axios拦截请求使用不当，会内存泄漏。[原因戳这里](https://link.zhihu.com/?target=https%3A//github.com/vuejs/vue/issues/5089)
lru-cache向内存中缓存数据，需要合理缓存改动不频繁的资源。





## 遇到的坑


### 客户端展示异常，服务端报错 window/alert/document is undefined

服务端没有window/alert/document这种东西，需要自行定义，建议方式引入第三方包jsdom辅助定义

```
//https://github.com/vuejs/vue-hackernews-2.0/issues/52#issuecomment-255594303
const { JSDOM } = require('jsdom')
const dom = new JSDOM('<!doctype html><html><body></body></html>',
{ url: 'http://localhost' })

global.window = dom.window
global.document = window.document
global.navigator = window.navigator
```

###  router中配置了scrollBehavior，客户端正常，服务端报错scroll undefined

跟上个问题相同，需要在服务端重声明

```
//fixed Not-implemented error
const isServer = process.env.VUE_ENV === 'server'

if(isServer) {
    window.scrollTo = function(x, y) {
        // do something or not
    }
}

export function createRouter() {
    return new Router({
        scrollBehavior: () => ({ y: 0 }),
        routes: [
            { path: '/', component: Homepage }
        ]
    })
}
```

### mismatch

使用ssr会有检查服务端渲染出的结构与直接客户端渲染的结构是否相同，不同会报mismatch。这种问题往往是因为比如table结构没有tbody之类的。

自己的一些业务操作也可能会产生两端的结构重复，比如我之前为了动态生成meta用了mixin，在服务端用`$ssrContext`配合操作，客户端则用的document直接更改对应值，因此会出现一个页面有两个重复的meta，造成mismatch，解决方式是在客户端加判断，如果已经有的meta就使用修改而不是增加

```
if (meta) {
    $.parseHTML(meta).forEach(function(el) {
    	$('meta[name=' + $(el).attr('name') + ']')
        	.attr('content', $(el).attr('content'))
    })
}
```

###  [Vue warn]: The client-side rendered virtual DOM tree is not matching server-rendered content. This is likely caused by incorrect HTML markup, for example nesting block-level elements inside <p>, or missing <tbody>. Bailing hydration and performing full client-side render. warn

检查是否entry-client.js是否替换store

检查客户端其他生命周期钩子是否影响到页面数据的显示，比如用到一些关于数据的v-if等等

在服务端渲染中，created和beforeCreate之外的生命周期钩子不可用，因此项目引用的第三方的库也不可用其它生命周期钩子，这对引用库的选

解决方案:

修改m-home中的 `// created() { ` 为  `beforeMount() {`

区别终端类型

比如在PC端使用a链接作为入口，移动端使用b链接作为入口
客户端：使用navigator.userAgent做判断，然后

```
Vue.mixin({
    beforeRouteEnter(to, from, next) {
        if(judgeUserAgent() && to.path === '/a/' ) {
            next('/b/')
        } else {
            next()
        }
    }
})
```

服务端： 在server.js的render中通过req.headers['user-agent']然后通过`$ssrContext`传递

```
if(context.agentID !== null && context.url === '/a/') {
    router.push('/b/')
} else {
    router.push(context.url)
}
```

项目不在服务器对应位置的根目录而在二级目录

一般打包都打包到根目录，获取静态文件资源也从／开始，如果不是，怎么办呢？

其实也不难，把各种相关配置更改一下就好了，就是这些位置自己摸索到时候有些麻烦，尤其还是ssr,漏掉就可能造成项目起不来或白屏、报错、刷新404。

我这里列了一下要修改的位置(按文件顺序,假设二级目录名为dev)：

`build/setup-dev-server.js`中的`webpack-hot-middleware`

```
clientConfig.entry.app = ['webpack-hot-middleware/client?path=/dec/__webpack_hmr', clientConfig.entry.app]

app.use(require('webpack-hot-middleware')(clientCompiler, {
    path: '/dev/__webpack_hmr'
}))
```

webpack.base.config.js 的output

```
output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dev/dist/',
    filename: '[name].[chunkhash].js'
},
```

entry-client.js 的service worker

```
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/dev/service-worker.js')
}
```
template.html 的href
```
<link rel="shortcut icon" href="/dev/assets/images/favicon.ico">
```

server.js 的serve

```
app.use(favicon('./src/assets/images/favicon.ico'))
app.use('/dev/dist', serve('./dist', true))
app.use('/dev/assets', serve('./src/assets', true))
app.use('/dev/service-worker.js', serve('./dist/service-worker.js'))
```

如果是非服务端渲染需要修改config/index.js中assetsPublicPath为/dev/

[vue服务端渲染（SSR）踩坑集锦](https://miyalee.github.io/2018/01/03/blog2018-01-03/)

###  SSR服务端请求不带cookie，需要手动拿到浏览器的cookie传给服务端的请求。

1.server.js

```
//处理cookie
var cookieParser = require('cookie-parser');

//不使用签名
app.use(cookieParser());


...
const context = {
        title: 'xxxx', // default title
        url: req.url,
        cookies: req.headers.cookie
    }
    renderer.renderToString(context, (err, html) => {
        if (err) {
            return handleError(err)
        }
        res.send(html)
        if (!isProd) {
            console.log(`whole request: ${Date.now() - s}ms`)
        }
    })
...
```

[express中cookie的使用和cookie-parser的解读](https://segmentfault.com/a/1190000004139342?_ea=504710)

2. entry-server

```
  ajax.setCookies(context.cookies) // 这一句
     
      // 对所有匹配的路由组件调用 `asyncData()`
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
              cookies: context.cookies,
            route: router.currentRoute
          })
        }

```

3. ajaxForServer

```
import axios from 'axios'
import qs from 'qs'
export default {
    api: null,
    cookies: {},
    setCookies(value) {
        // value = value || {}
        // this.cookies = value
        this.api = axios.create({
            // baseURL: config.api,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                // cookie: parseCookie(value)
                cookie: value
            },
            timeout: 30000,
        })
    },
    post(url, data) {
        if (!this.api) this.setCookies()
        return this.api({
            method: 'post',
            url,
            data: qs.stringify(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        }).then(res => {
            return res
        })
    },
    get(url, params) {
        if (!this.api) this.setCookies()
        return this.api({
            method: 'get',
            url,
            params,
        }).then(res => {
            return res
        })
    }
}
```


[最后说 Vue2 SSR 的 Cookies 问题](https://www.mmxiaowu.com/article/5b053d142fad053ed0369e99)

[再说 Vue SSR 的 Cookies 问题](https://www.mmxiaowu.com/article/596cbb2d436eb550a5423c30)

[Vue SSR, 在服务端请求数据时怎么带 cookies?](https://segmentfault.com/a/1190000008620362)

[Vue SSR, 在服务端请求数据时怎么带 cookies?](https://my.oschina.net/u/3004226/blog/1648131) //参考意义不大

[express中cookie的使用和cookie-parser的解读](https://segmentfault.com/a/1190000004139342?_ea=504710)

[How to set cookies when send a request in node ? ](https://github.com/axios/axios/issues/943)

```js
Axios.request({
     url: "http://example.com",
     method: "get",
     headers:{
         Cookie: "cookie1=value; cookie2=value; cookie3=value;"
     } 
}).then...
```

### vue.mixin、axios拦截请求使用不当，会内存泄漏。原因戳这里 

[Global mixins cause memory leak in SSR #5089](https://github.com/vuejs/vue/issues/5089)

### lru-cache向内存中缓存数据，需要合理缓存改动不频繁的资源。

[解密Vue SSR](https://juejin.im/entry/5ad855c56fb9a045fc665bd7?utm_source=gold_browser_extension)


### 在ssr中使用puppeteer中报错 Can't resolve 'child_process' ,Module not found: Error: Can't resolve 'fs' in

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

###  使用jsdom后如何区分服务器和浏览器环境

```
if(process && process.browser){
  var FastClick = require('fastclick');
  FastClick.attach(document.body);
}
```
### Unable to preventDefault inside passive event listener due to target being treated as passive. See

```
document.addEventListener('touchmove', this._preventDefault, { passive: false });
```

[Unable to preventDefault inside passive event listener due to target being treated as passive. See](https://github.com/cubiq/iscroll/issues/1130)



### fundebug;
将fundebug放在app.vue 中执行一次.后期查看是否有不一致的.

## 坑

1. UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 30): Error: connect ECONNREFUSED 127.0.0.1:80

控制台抛 uncaught ，这是多么贴心的功能。以前都是默默吃掉这个异常的，在一个项目里 debug 简直醉人。

https://www.zhihu.com/question/40876687/answer/88627772


2. http-proxy-middleware connect ECONNREFUSED 127.0.0.1:80

解决方法
１. 将node服务器端口改成　127.0.0.1:80 
2. 将接口服务器端口改成　127.0.0.1:80 
3. 将asyncData方法使用的请求url加上域名+端口，如下所示

``` 
export default {
  asyncData ({ params }) {
    return axios.get(`https://127.0.0.1:3000/api/${params.id}`)
    .then((res) => {
      return { title: res.data.title }
    })
  }
}
```
参考: [Nuxt ServerError connect ECONNREFUSED 127.0.0.1:80 错误解决](https://blog.csdn.net/qq_27068845/article/details/79382850)


3.axios 将post请求数据转为formdata

```js
axios({
            url: '/api/index/getIndexlbt',
            method: 'post',
            data: {
              relevanceId:this.$route.params.id,
              pictureType:4
            },
            transformRequest: [function (data) {
              let ret = ''
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
```
4.Computed property "currentPage" was assigned to but it has no setter

```
  
   // currentPage () {
              //     return store.state.currentPage
              // }
  
              currentPage: {
                  get: function () {
                      return store.state.currentPage
                  },
                  set: function () {
                  }
              }
```

[Computed property "route" was assigned to but it has no setter](https://segmentfault.com/q/1010000010358438/a-1020000010358925)

[[Vue warn]: Computed property "values" was assigned to but it has no setter. #1000](https://github.com/ElemeFE/mint-ui/issues/1000)

5.vuex 的dispatch和commit提交mutation的区别

```
很简单，一个异步操作与同步操作的区别。

当你的操作行为中含有异步操作，比如向后台发送请求获取数据，就需要使用action的dispatch去完成了。
其他使用commit即可。
```
[vue中更改state的值](https://segmentfault.com/q/1010000009619507/a-1020000009620104)
 
## 参考资料 

### 官方资料

[vue-ssr](https://ssr.vuejs.org/zh/)


#### ssr适合多页 还是 单页

https://github.com/vuejs/vue-hackernews-2.0/issues/187#issuecomment-303688734\

https://github.com/hilongjw/vue-ssr-hmr-template/issues/4

### 理解ssr

[简单的 Vue SSR Demo](https://juejin.im/entry/5a56c944518825734d1485bc)

[Vue项目SSR改造实战](https://segmentfault.com/a/1190000009373793)

[从零开始搭建vue-ssr系列之二：Client端渲染以及webpack2+vue2踩坑之旅](https://segmentfault.com/a/1190000009372772)

[从零开始搭建vue-ssr系列之三：服务器渲染的奥秘](https://segmentfault.com/a/1190000009373793)

### 好文推荐

[Vue项目SSR改造实战](https://segmentfault.com/a/1190000012440041)  可参考性比较强

[史上最详细易懂的vue服务端渲染（ssr）教程](https://github.com/zyl1314/vue-ssr)  可以简单理解,对于后期搭建好想没啥大用

[让vue-cli初始化后的项目集成支持SSR](http://blog.myweb.kim/vue/%E8%AE%A9vue-cli%E5%88%9D%E5%A7%8B%E5%8C%96%E5%90%8E%E7%9A%84%E9%A1%B9%E7%9B%AE%E9%9B%86%E6%88%90%E6%94%AF%E6%8C%81SSR/?utm-source=segmentfault) 

[vue-hackernews-2.0 源码解读](https://wangfuda.github.io/2017/05/14/vue-hackernews-2.0-code-explain/) 对项目整体结构说明,可以结合官方demo查看更佳

[Vue 全站服务器渲染 SSR 实践](http://gitbook.cn/books/591170568b2c1f0f85f3b8fb/index.html)

[详解 Vue & Vuex 实践](https://zhuanlan.zhihu.com/p/25042521)  掘金的项目实战

### vuex

官方文档：

[vuex action介绍](https://vuex.vuejs.org/zh-cn/actions.html)

[vuex2-demo](https://github.com/sailengsi/sls-vuex2-demo) demo不错



#### [vuex-demo](https://github.com/sailengsi/sls-vuex2-demo


### 可参考的demo

[官方demo](https://github.com/vuejs/vue-hackernews-2.0)  官方demo,大而全,存在接口墙的问题


[vnews](https://github.com/tiodot/vnews) 解决官方demo无法访问的问题, 功能类似vue-hackernews-2.0, 只不过内容源换成掘金网站，因而无法使用service worker的push功能。

[Beauty](https://github.com/beauty-enjoy/beauty)  听说挺好,但是没有尝试


#### 其他

[mmf-blog vuejs 2.0 服务端渲染 v2版](https://github.com/lincenying/mmf-blog-vue2-ssr)

[vue-cnode-mobile](https://github.com/soulcm/vue-cnode-mobile/)

#### 组件的异步加载模式,2.router,store为什么要改成 异步

应用程序的代码分割或惰性加载，有助于减少浏览器在初始渲染中下载的资源体积，可以极大地改善大体积 bundle 的可交互时间 (TTI - time-to-interactive)。这里的关键在于，对初始首屏而言，"只加载所需"。



