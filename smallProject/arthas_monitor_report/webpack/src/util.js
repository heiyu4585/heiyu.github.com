// /**
//  * 功能描述：获取相关数据
//  * 使用方法：
//  * 注意事项：
//  * 引入来源：
//  * 作用：
//  * Create by 王宁 on 2018/7/30
//  */
//
//
// /*ajax中post方法*/
// function postData(data,url, fn) {
//     if(!url) debugLog("error------url未设置");
//     debugLog("当前发送的数据------")
//     debugLog(data)
//     debugLog("当前发送的数据------")
//
//     var postData = JSON.stringify(data);
//
//     var xhr = new XMLHttpRequest();
//     xhr.open("POST", url, true);
//     xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");  // 添加http头，发送信息至服务器时内容编码类型
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {  // 304未修改
//             typeof fn === "function" && fn.call(this, xhr.responseText && JSON.parse(xhr.responseText));
//         }
//     };
//     xhr.send(postData);
// }
//
// /*对象合并*/
// function deepExtend(out) {
//     out = out || {};
//     for (var i = 1; i < arguments.length; i++) {
//         var obj = arguments[i];
//
//         if (!obj)
//             continue;
//
//         for (var key in obj) {
//             if (obj.hasOwnProperty(key)) {
//                 if (typeof obj[key] === 'object')
//                     out[key] = deepExtend(out[key], obj[key]);
//                 else
//                     out[key] = obj[key];
//             }
//         }
//     }
//     return out;
// }
//
//
// /**
//  * 在调试状态下的话，在控制台输出调试信息 在需要日志的地方，更改  localStorage.setItem("g_debugMode",1)
//  * */
// var debugLog = window.debugLog || function debugLog() {
//     var  debugMode= localStorage && localStorage.getItem && localStorage.getItem("g_debugMode");
//     if (typeof debugMode != "undefined" && debugMode && typeof debugMode != null &&  console.group != undefined) {
//         if (arguments.length > 1) {
//             console.group("group");
//         }
//         for (var i = 0; i < arguments.length; i++) {
//             if (typeof arguments[i] == "object") {
//                 console.dir(arguments[i]);
//             } else {
//                 console.log(arguments[i]);
//             }
//         }
//         if (arguments.length > 1) {
//             console.groupEnd();
//         }
//     }
// }
//
//
// /**
//  * 校验浏览器是否支持 localStorage
//  * @returns {boolean} true 为支持 localStrage
//  *                     false 为不支持
//  */
// function canSupportLocalStorage() {
//     try {
//         localStorage.setItem('aa', 'bb')
//         return localStorage.getItem('aa') !== null;
//     } catch (e) {
//         return false;
//     }
// }
//
// /**
//  * 根据cookie名称获取对应的cookie值
//  * @param NameOfCookie 需要获取的cookie名称
//  * @returns {*} String 如果存在返回的cookie 值
//  *               null 否则返回 null
//  */
// function getCookie(NameOfCookie) {
//     if (document.cookie.length > 0) {
//         var begin = document.cookie.indexOf(NameOfCookie + '=');
//         if (begin != -1) {
//             begin += NameOfCookie.length + 1;
//             var end = document.cookie.indexOf(';', begin);
//             if (end == -1) end = document.cookie.length;
//             return document.cookie.substring(begin, end);
//         }
//     }
//     return null;
// }
// //
// // export {deepExtend, postData,debugLog,getCookie,canSupportLocalStorage};
//
// let util ={
//     deepExtend:deepExtend,
//     postData: postData,
//     debugLog:debugLog,
//     getCookie:getCookie,
//     canSupportLocalStorage:canSupportLocalStorage
// }
// module.exports = util;