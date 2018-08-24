// /**
//  * 功能描述：获取相关数据
//  * 使用方法：
//  * 注意事项：
//  * 引入来源：
//  * 作用：
//  * Create by 王宁 on 2018/7/30
//  */
//
// let  {canSupportLocalStorage, getCookie} =require('./util') ;
//
// let baseData = {
//     userAgent: navigator.userAgent,     	//String	浏览器信息	必选
//     currentUrl: window.location.href,     //String	错误发生页面URL	必选
//     host: window.location.host,      //String	错误发生页面host	必选
//     timestamp: new Date().getTime(),      //	Date	发生错误时间戳	必选
//     projectType: /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? "Mobile" : "PC",    	//String	客户端类型PC/Mobile	必选
//     flashVer: getFlashPlayerVersion(),       //	Number	flash版本	可选
//     title: document.title,       //	String	错误页面标题	必选
//     screenSize:{
//         vw: (document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth),
//         vh: (document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight)
//     },      //String	分辨率	必选
//     referer: document.referrer,        //	String	页面来源	可选
//     colNum: "",       //Number	错误列	必选
//     rowNum: "",      //Number	错误行	必选
//     msg: "",     //String	错误信息，堆栈信息	必选
//     level: 1,      //level	错误级别	可选
//     targetUrl: "",      //String	错误js文件	必选
//     ext: {
//         userData:getUserData()
//     },      //Object	扩展信息可自定义，手工上报时可用	必选
//     appVersion: getAppVersion(),      //Object	业务线使用框架/库版本号	可选
//     reportVersion: "", 	//Number	采集插件的版本号	可选
//     token:""
// }
//
// /**
//  * 获取业务线使用框架/库版本号
//  * @return Object {} 如果有对应的框架/库版本号，则会返回object对象
//  *                 null 否则返回null
//  */
// function getAppVersion() {
//     let appVersion = null;
//     //如果有Jquery
//     if (typeof jQuery !== "undefined" && !!jQuery && jQuery.fn.jquery) {
//         if (!appVersion) appVersion = {};
//         appVersion.jQuery = jQuery.fn.jquery;
//     }
//     //如果有Vue
//     if (typeof Vue !== "undefined" && !!Vue && Vue.version) {
//         if (!appVersion) appVersion = {};
//         appVersion.vue = Vue.version;
//     }
//     //如果有React
//     if (typeof React !== "undefined" && !!React && React.version) {
//         if (!appVersion) appVersion = {};
//         appVersion.react = React.version;
//     }
//     if (!!appVersion) return appVersion;
//     else return null;
// }
//
// /**
//  * 获取业务线用户的数据
//  * @return {*}
//  */
// function getUserData() {
//     let userData = {};
//     //从缓存中获取用户id
//     if (canSupportLocalStorage()) {
//         if (localStorage.getItem('userId') !== null) {
//             userData.userId = localStorage.getItem('userId');
//         }
//     } else {
//         if (getCookie('userId') !== null) {
//             userData.userId = getCookie('userId');
//         }
//     }
//     return userData;
// }
//
// /**
//  * 获取浏览器中 flash 播放器的版本号
//  */
// function getFlashPlayerVersion() {
//     let hasFlash = 0; //是否安装了flash
//     let flashVersion = 0; //flash版本
//     let isIE = !-[1,]; //是否支持IE浏览器
//     if (isIE) {
//         let swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
//         if (swf) {
//             hasFlash = 1;
//             flashVersion = swf.GetVariable("$version");
//         }
//     } else {
//         if (navigator.plugins && navigator.plugins.length > 0) {
//             let swf = navigator.plugins["Shockwave Flash"];
//             if (swf) {
//                 hasFlash = 1;
//                 flashVersion = swf.description.split(" ");
//             }
//         }
//     }
//     if (hasFlash == 1) return flashVersion;
//     else return null;
// }
// // export {baseData}
// module.exports =   baseData;