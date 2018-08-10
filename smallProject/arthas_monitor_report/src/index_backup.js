/**
 * 功能描述：arthas-monitor-report 插件入口
 * 使用方法：
 * 注意事项：
 * 引入来源：
 * 作用：处理监控相关数据的主逻辑
 * Create by wangning on 2018/7/30
 */

import {initWindowErrorHandle} from './initWindowErrorHandle'
import {initVueErrorHandle} from './initVueErrorHandle'
import {checkImgSize} from './checkImgSize'
import {config} from './config'
import {store} from './store'
import {baseData} from "./getData";
import {deepExtend} from "./util";

/**
 * options:设置新的config内容,覆盖原有参数
 */

;(function (global) {
    var arthas_monitor = {
        init: function (options) {
            //所有数据绑定在store中
            if(!options.token) {console.log("请传递token值")}
            store.config= config;
            store.baseData=deepExtend(
                baseData,
                {
                    reportVersion: config.reportVersion
                },
                options
            );
            //添加window.onerror事件
            initWindowErrorHandle(global,store);
            //检查是否有图片过大
            checkImgSize(store);
        },
        initVueErrorHandle: initVueErrorHandle
    };

    if (typeof exports === 'object') {
        module.exports = arthas_monitor;
    } else if (typeof define === 'function' && define.amd) {
        define([], function () {
            return arthas_monitor;
        });
    } else {
        global['arthas_monitor'] = arthas_monitor;
    }
})(typeof window !== "undefined" ? window : this);