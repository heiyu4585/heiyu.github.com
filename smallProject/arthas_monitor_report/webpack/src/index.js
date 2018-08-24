/**
 * 功能描述：arthas-monitor-report 插件入口
 * 使用方法：
 * 注意事项：
 * 引入来源：
 * 作用：处理监控相关数据的主逻辑
 * Create by wangning on 2018/7/30
 */


;(function (global) {
    /**
     * 在调试状态下的话，在控制台输出调试信息 在需要日志的地方，更改  localStorage.setItem("g_debugMode",1)
     * */
    var debugLog = global.debugLog || function debugLog() {
        var debugMode = localStorage && localStorage.getItem && localStorage.getItem("g_debugMode");
        if (typeof debugMode != "undefined" && debugMode && typeof debugMode != null && console.group != undefined) {
            if (arguments.length > 1) {
                console.group("group");
            }
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] == "object") {
                    console.dir(arguments[i]);
                } else {
                    console.log(arguments[i]);
                }
            }
            if (arguments.length > 1) {
                console.groupEnd();
            }
        }
    }

    var ArthasMonitor = function () {
    }

    ArthasMonitor.prototype = {
        init: function (options) {
            //获取基础数据
            var baseData = this.getData();
            if (!options.token) {
                console.log("请传递token值")
            }
            this.store.baseData = this.util.deepExtend(
                baseData,
                {
                    reportVersion: this.config.reportVersion
                },
                options
            );
            //添加window.onerror事件
            this.initWindowErrorHandle(global, this.store);
            //检查是否有图片过大
            this.checkImg(this.store);
        },
        util: (function () {
            /*ajax中post方法*/
            function postData(data, url, fn) {
                if (!url) debugLog("error------url未设置");
                debugLog("当前发送的数据------")
                debugLog(data)

                var postData = JSON.stringify(data);
                var xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");  // 添加http头，发送信息至服务器时内容编码类型
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {  // 304未修改
                        typeof fn === "function" && fn.call(this, xhr.responseText && JSON.parse(xhr.responseText));
                    }
                };
                xhr.send(postData);
            }

            /*对象合并*/
            function deepExtend(out) {
                out = out || {};
                for (var i = 1; i < arguments.length; i++) {
                    var obj = arguments[i];

                    if (!obj)
                        continue;

                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            if (typeof obj[key] === 'object')
                                out[key] = deepExtend(out[key], obj[key]);
                            else
                                out[key] = obj[key];
                        }
                    }
                }
                return out;
            }


            /**
             * 校验浏览器是否支持 localStorage
             * @returns {boolean} true 为支持 localStrage
             *                     false 为不支持
             */
            function canSupportLocalStorage() {
                try {
                    localStorage.setItem('aa', 'bb')
                    return localStorage.getItem('aa') !== null;
                } catch (e) {
                    return false;
                }
            }

            /**
             * 根据cookie名称获取对应的cookie值
             * @param NameOfCookie 需要获取的cookie名称
             * @returns {*} String 如果存在返回的cookie 值
             *               null 否则返回 null
             */
            function getCookie(NameOfCookie) {
                if (document.cookie.length > 0) {
                    var begin = document.cookie.indexOf(NameOfCookie + '=');
                    if (begin != -1) {
                        begin += NameOfCookie.length + 1;
                        var end = document.cookie.indexOf(';', begin);
                        if (end == -1) end = document.cookie.length;
                        return document.cookie.substring(begin, end);
                    }
                }
                return null;
            }

            return {
                deepExtend: deepExtend,
                postData: postData,
                getCookie: getCookie,
                canSupportLocalStorage: canSupportLocalStorage
            }
        })(),
        /**
         *
         * @description 存取一些临时数据的仓库
         *
         */
        store: {
            logList: [],
            //资源数量
            resourceListLength: 0,
            //需要排除的资源
            sourceIgnore: [
                "/ams/catch"
            ],
            //检查新增图片的间隔时间
            checkImgSetIntervalTime: 2000,
            //多大的图片算是大图标准 当前为1兆
            transferSizeNum: 1024 * 1024
        },
        /**
         *
         * @description 配置项
         *
         */
        config: {
            reportVersion: '1.0.0',//采集插件的版本号
            reportPath: 'http://10.0.1.128:7001/ams/catch',//上报服务器地址
            limitTime: 3000, //相同异常日志发送最小间隔，即相同异常数据最快每3s发送一次
        },

        getData: function () {
            var _this = this;
            var baseData = {
                userAgent: navigator.userAgent,     	//String	浏览器信息	必选
                currentUrl: window.location.href,     //String	错误发生页面URL	必选
                host: window.location.host,      //String	错误发生页面host	必选
                timestamp: new Date().getTime(),      //	Date	发生错误时间戳	必选
                projectType: /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? "Mobile" : "PC",    	//String	客户端类型PC/Mobile	必选
                flashVer: getFlashPlayerVersion(),       //	Number	flash版本	可选
                title: document.title,       //	String	错误页面标题	必选
                screenSize: {
                    vw: (document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth),
                    vh: (document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight)
                },      //String	分辨率	必选
                referer: document.referrer,        //	String	页面来源	可选
                colNum: "",       //Number	错误列	必选
                rowNum: "",      //Number	错误行	必选
                msg: "",     //String	错误信息，堆栈信息	必选
                level: 1,      //level	错误级别	可选
                targetUrl: "",      //String	错误js文件	必选
                ext: {
                    userData: getUserData()
                },      //Object	扩展信息可自定义，手工上报时可用	必选
                appVersion: getAppVersion(),      //Object	业务线使用框架/库版本号	可选
                reportVersion: "", 	//Number	采集插件的版本号	可选
                token: ""
            }

            /**
             * 获取业务线使用框架/库版本号
             * @return Object {} 如果有对应的框架/库版本号，则会返回object对象
             *                 null 否则返回null
             */
            function getAppVersion() {
                var appVersion = null;
                //如果有Jquery
                if (typeof jQuery !== "undefined" && !!jQuery && jQuery.fn.jquery) {
                    if (!appVersion) appVersion = {};
                    appVersion.jQuery = jQuery.fn.jquery;
                }
                //如果有Vue
                if (typeof Vue !== "undefined" && !!Vue && Vue.version) {
                    if (!appVersion) appVersion = {};
                    appVersion.vue = Vue.version;
                }
                //如果有React
                if (typeof React !== "undefined" && !!React && React.version) {
                    if (!appVersion) appVersion = {};
                    appVersion.react = React.version;
                }
                if (!!appVersion) return appVersion;
                else return null;
            }

            /**
             * 获取业务线用户的数据
             * @return {*}
             */
            function getUserData() {
                var userData = {};
                //从缓存中获取用户id
                if (_this.util.canSupportLocalStorage()) {
                    if (localStorage.getItem('userId') !== null) {
                        userData.userId = localStorage.getItem('userId');
                    }
                } else {
                    if (_this.util.getCookie('userId') !== null) {
                        userData.userId = getCookie('userId');
                    }
                }
                return userData;
            }

            /**
             * 获取浏览器中 flash 播放器的版本号
             */
            function getFlashPlayerVersion() {
                var hasFlash = 0; //是否安装了flash
                var flashVersion = 0; //flash版本
                var isIE = !-[1,]; //是否支持IE浏览器
                if (isIE) {
                    var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                    if (swf) {
                        hasFlash = 1;
                        flashVersion = swf.GetVariable("$version");
                    }
                } else {
                    if (navigator.plugins && navigator.plugins.length > 0) {
                        var swf = navigator.plugins["Shockwave Flash"];
                        if (swf) {
                            hasFlash = 1;
                            flashVersion = swf.description.split(" ");
                        }
                    }
                }
                if (hasFlash == 1) return flashVersion;
                else return null;
            }

            return baseData;
        },
        //检查图片

        checkImg: function checkImg() {
            var _this = this;
            debugLog("再次执行检查图片");

            //检测是否支持  performance api;
            var performance = (function () {
                var performance = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;
                if (performance === undefined || performance.timing == undefined || performance.now == undefined) {
                    return false;
                }
                return performance;
            })();
            if (!performance) return false;
            // if(!performance.getEntriesByType) return false;

            //需要排除的资源名字
            var sourceIgnore = _this.store.sourceIgnore;
            //发送数据后,开始30s间隔查询
            setInterval(function () {
                debugLog("开始执行检查图片----");
                if (_this.store.resourceListLength < performance.getEntriesByType("resource").length) {
                    /*新增的资源数据*/
                    //需要排除接口,因为新发送一个接口也算新增资源,会造成循环不断的发送接口
                    var newData = window.performance.getEntriesByType("resource").slice(_this.store.resourceListLength);
                    newData.forEach(function (newDataEle, newDataIndex) {
                        for (var x = 0; x < sourceIgnore.length; x++) {
                            //如果包含需要排除的资源
                            if (newDataEle.name.indexOf(sourceIgnore[x]) !== -1) {
                                newData.splice(newDataIndex);
                                debugLog("有新增的资源被排除,sourceIgnore: name为:");
                                debugLog(newDataEle.name);
                                debugLog("sourceIgnore了通过performance.getEntriesByType(resource)的ID为:" + (_this.store.resourceListLength + newDataIndex));
                            }
                        }
                    });

                    //如果有新增的资源
                    if (newData.length > 0) {
                        //要发送的图片列表,图片名字集合用于发送msg
                        var imgList = [], imgNameList = "";
                        newData.map(function (ele, index) {
                            //transferSize   转换后的文件大小
                            //如果新增资源为图片,图片大于1兆
                            if (ele.initiatorType === "img" && ele.transferSize > _this.store.transferSizeNum) {
                                debugLog("有图片的大小大于指定大小" + ele.name + "--" + ele.transferSize)
                                imgList.push({
                                    name: ele.name,
                                    transferSize: ele.transferSize
                                });
                                imgNameList += ele.name + "|";
                            }
                        });
                        if (imgList && imgList.length > 0) {
                            debugLog("需要发送的imgList:", imgList);
                            debugLog("需要发送的imgNameList:", imgNameList);
                            _this.checkBeforeSend(
                                _this.util.deepExtend(
                                    _this.store.baseData,
                                    {
                                        ext: {
                                            bigIMgList: imgList
                                        },
                                        msg: imgNameList + ' is too big!'
                                    }
                                ),
                                _this.store
                            )
                        }
                    }
                    //更新数据
                    _this.store.resourceListLength = window.performance.getEntriesByType("resource").length;
                    debugLog("totalResourceLength:" + _this.store.resourceListLength);
                }
            }, _this.store.checkImgSetIntervalTime)
        },

        checkBeforeSend: function (data) {
            var canSendData = false,isRepeat = false;
            var store = this.store;
            var config = this.config;
            if (!!data) {
                //如果异常日志列表无数据，则直接
                if (store.logList && store.logList.length) {
                    for (var i = 0; i < store.logList.length; i++) {
                        //判断是否有相同的异常数据
                        if (data.msg && store.logList[i].msg && data.msg === store.logList[i].msg) {
                            isRepeat = true;
                            if (Math.abs(data.timestamp - store.logList[i].timestamp) >=config.limitTime) {
                                store.logList[i].timestamp = data.timestamp;
                                canSendData = true;
                                isRepeat = false;
                                break;
                            }
                        }
                    }
                    if(!canSendData && !isRepeat){
                        //存储数据至store.logList中
                        store.logList && store.logList.push(data);
                        //发送数据
                        canSendData = true;
                    }
                }
                else {
                    store.logList = [];
                    //存储数据至store.logList中
                    store.logList && store.logList.push(data);
                    //发送数据
                    canSendData = true;
                }
            }
            if (canSendData) {
                this.sendData(data, config.reportPath);
            }
            debugLog("checkBeforeSend_logList", store.logList)
        },

        sendData: function (data, url) {
            var _this = this;
            //采用异步的方式
            //我遇到过在window.onunload进行ajax的堵塞上报
            //由于客户端强制关闭webview导致这次堵塞上报有Network Error
            //我猜测这里window.onerror的执行流在关闭前是必然执行的
            //而离开文章之后的上报对于业务来说是可丢失的
            //所以我把这里的执行流放到异步事件去执行
            //脚本的异常数降低了10倍
            setTimeout(function () {
                //TODO 把data上报到后台！
                _this.util.postData(data, url)
            }, 0)
        },
        initWindowErrorHandle: function (global, store) {
            if (!global) return;
            var _this = this;
            global.onerror = function (msg, url, line, col, error) {
                debugLog("当前有window.onerror触发---")
                debugLog(msg)
                //没有URL不上报！上报也不知道错误
                if (msg != "Script error." && !url) {
                    return true;
                }

                var data = {};
                //不一定所有浏览器都支持col参数
                col = col || (global.event && global.event.errorCharacter) || 0;

                data.targetUrl = url;
                data.rowNum = line;
                data.colNum = col;
                data.msg = msg;
                if (!!error && !!error.stack) {
                    //如果浏览器有堆栈信息
                    //直接使用
                    data.msg = error.stack.toString();
                }

                //校验是否可以发送
                _this.checkBeforeSend(_this.util.deepExtend({}, store.baseData, data), store);
                return true;
            };
        },
        initVueErrorHandle: function (err, metaData) {
            this.checkBeforeSend(
                this.util.deepExtend(this.store.baseData,
                    metaData,
                    {
                        msg: subStack(err.stack, 10) //  maxStackDepth: 10 // 错误堆栈最大深度
                    }
                ))

            /**
             * 根据堆栈的长度，截断多余的堆栈信息
             * @param  {String} stack  原始堆栈
             * @param  {Integer} maxDepth 最大堆栈长度
             * @return {String}        截断后的堆栈
             */
            function subStack(stack, maxDepth) {
                if (!stack) {
                    return null
                }

                var arr = stack.toString().split('\n')
                var stackDepth = arr.length
                if (stackDepth > maxDepth) {
                    return arr.slice(0, maxDepth).join('\n')
                }
                return stack
            }
        }

    }
    //兼容CommonJs规范
    if (typeof module !== 'undefined' && module.exports) module.exports = new ArthasMonitor();
    //兼容AMD/CMD规范
    if (typeof define === 'function') define(function () {
        return new ArthasMonitor();
    });
    //注册全局变量，兼容直接使用script标签引入该插件
    global.arthas_monitor = new ArthasMonitor();
})(typeof window !== "undefined" ? window : this);