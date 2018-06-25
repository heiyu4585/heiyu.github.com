/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by WangNing on 2018/6/20.
 */

let pinyin= require('./pinyin')
var finalResult = require("./data.json");

;(function (global) {

    //开启严格模式，规范代码，提高浏览器运行效率
    "use strict";

    //定义一个类，通常首字母大写
    var allinPinYin = function () {
        this.data = {};
        this.data.charIndex = {};
        this.data.firstLetter = {};
        this.data.fullPinyin = {};
        for (var i = 0; i < finalResult.length; i++) {
            this.data.fullPinyin[finalResult[i][0]] = finalResult[i][1];
            this.data.firstLetter[finalResult[i][0]] = finalResult[i][2].toUpperCase();
        }
    };

    //覆写原型链，给继承者提供方法
    allinPinYin.prototype = {
        init: function () {
        },
        // 获取首字母索引值  //3
        getCharIndex: function (str) {
            //相等 或者包含 白名单中的 地名
            if (this.data.firstLetter[str] || str.includes(this.data.firstLetter[str])) {
                return this.data.firstLetter[str].charCodeAt() - 65
            } else {
                return  Number(this.getFirstLetter(str).charCodeAt() - 65)
            }
        },
        //获取首字母
        getFirstLetter: function (str) {
            if (this.data.firstLetter[str] || str.includes(this.data.firstLetter[str])) {
                return this.data.firstLetter[str]
            } else {
                return pinyin.getCamelChars(str)[0].toUpperCase();
            }
        },
        /*
        * params: str 要排序的字符串
        *         joinWith 间隔符
        * */
        getFullPinyin: function (str) {
            if (this.data.firstLetter[str] || str.includes(this.data.firstLetter[str])) {
                //小写转为首字母大写
                var arr= this.data.fullPinyin[str].split("|");
                var result=[];
                for(var i=0;i<arr.length;i++){
                    result.push(firstUpperCase(arr[i]))
                }
                return result.join("|")
            } else {
                return pinyin.getFullChars(str);
            }
        },
        // 获取排序后的列表
        // 输入   ['北京','北安']
        // 返回   [['北按','bei|an',2,'b'],['北京','bei|jing','2','b']]
        getSortList: function (list) {
            if (!Array.isArray(list)) {
                // 如果不是数组
                console.log("参数为数组");
                return false;
            }
            let arr = [];
            for (var i = 0; i < list.length; i++) {
                let data = [];
                data.push(list[i]);
                data.push(this.getCharIndex(list[i]));
                data.push(this.getFirstLetter(list[i]));
                data.push(this.getFullPinyin(list[i]));
                arr.push(data)
            }
            arr.sort(function (x, y) {
                return x[1] - (y[1]);
            });
            return arr;
        }
    };

    function firstUpperCase(str) {
        return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
    }

    //兼容CommonJs规范
    if (typeof module !== 'undefined' && module.exports) module.exports = new allinPinYin();
    //兼容AMD/CMD规范
    if (typeof define === 'function') define(function() { return  new allinPinYin(); });
    //注册全局变量，兼容直接使用script标签引入该插件
    global.allinPinYin =  new allinPinYin();
})(typeof window !== "undefined" ? window : this);