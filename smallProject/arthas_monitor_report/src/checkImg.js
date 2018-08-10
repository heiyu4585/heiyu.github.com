// /**
//  * 功能描述：
//  * 使用方法：
//  * 注意事项：
//  * 引入来源：
//  * 作用：设置配置信息
//  * Create by YaoQiao on 2018/7/30
//  */
//
// // import {checkBeforeSend} from "./checkBeforeSend";
// // import {debugLog, deepExtend} from "./util";
// let  checkBeforeSend =require('./checkBeforeSend') ;
// let  {debugLog, deepExtend} =require('./util') ;
//
// //检查图片
//
// function checkImg(store) {
//     setInterval(function () {
//         debugLog("再次执行检查图片")
//         let imgList = checkImgSize(store);
//         if (imgList && imgList.length > 0) {
//             debugLog("将要发送的异常图片---")
//             debugLog(imgList)
//             debugLog("将要发送的异常图片---")
//             checkBeforeSend(
//                 deepExtend(
//                     store.baseData,
//                     {
//                         ext: {
//                             bigIMgList: imgList
//                         }
//                     }
//                 ),
//                 store
//             )
//         }
//     }, 5000)
// }
//
// function checkImgSize(store) {
//
//     debugLog("当前store---checkImgSize")
//     debugLog(store)
//     debugLog("当前store---checkImgSize")
//     //检查是否支持navigation timing api
//     let performance = (function () {
//         var performance = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;
//         if (performance === undefined || performance.timing == undefined || performance.now == undefined) {
//             return false;
//         }
//         return performance;
//     })();
//
//     if (!performance) return false;
//
//     //检查是否有新增图片资源
//     if (performance.getEntriesByType("resource").length > 0 && store.resourceListLength === performance.getEntriesByType("resource").length) return false;
//
//     let result = [];
//     store.resourceListLength = performance.getEntriesByType("resource").length;
//     performance.getEntriesByType("resource").map(function (ele, index) {
//         //transferSize   转换后的文件大小
//         //图片大于1兆
//         if (ele.initiatorType === "img" && ele.transferSize > 1024 * 1024) {
//             result.push({
//                 name: ele.name,
//                 transferSize: ele.transferSize
//             });
//         }
//     });
//     debugLog("异常图片列表===")
//     debugLog(result)
//     debugLog("异常图片列表===")
//     debugLog("当前store---checkImgSize")
//     debugLog(store)
//     debugLog("当前store---checkImgSize")
//     return result;
// }
// module.exports =   checkImg;