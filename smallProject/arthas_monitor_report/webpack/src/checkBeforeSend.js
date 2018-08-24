//
// //发送前数据校验
// // import {sendData} from "./sendData";
// // import {debugLog} from "./util";
// let  sendData =require('./sendData') ;
// let  {debugLog} =require('./util') ;
//
// function checkBeforeSend(data, store) {
//
//     if(!data || !store) {
//         debugLog("error-------------请保证传递的数据")
//     }
//     if (!!data) {
//         //如果异常日志列表无数据，则直接
//         if (store.logList && store.logList.length) {
//             for (var i = 0; i < store.logList.length; i++) {
//                 //判断是否有相同的异常数据
//                 if (data.msg && store.logList[i].msg && data.msg === store.logList[i].msg) {
//                     if (Math.abs(data.timestamp - store.logList[i].timestamp) >= store.config.limitTime) {
//                         store.logList[i].timestamp = data.timestamp;
//                         //发送数据
//                         sendData(data,store.config.reportPath);
//                         break;
//                     }
//                 }
//             }
//             debugLog("当前store---checkBeforeSend-if")
//             debugLog(store)
//             debugLog("当前store---checkBeforeSend-if")
//         }
//         else {
//             store.logList = [];
//             //存储数据至store.logList中
//             store.logList && store.logList.push(data);
//             //发送数据
//             sendData(data,store.config.reportPath);
//             debugLog("当前store---checkBeforeSend-else")
//             debugLog(store)
//             debugLog("当前store--checkBeforeSend-else")
//         }
//     }
//     return false;
// }
// // export {checkBeforeSend}
// module.exports =   checkBeforeSend;