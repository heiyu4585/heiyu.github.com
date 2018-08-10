// //@description 错误信息发送
//
// // import {postData} from "./util";
// let  {postData} =require('./util') ;
// //数据发送
// function sendData(data,url) {
//     //采用异步的方式
//     //我遇到过在window.onunload进行ajax的堵塞上报
//     //由于客户端强制关闭webview导致这次堵塞上报有Network Error
//     //我猜测这里window.onerror的执行流在关闭前是必然执行的
//     //而离开文章之后的上报对于业务来说是可丢失的
//     //所以我把这里的执行流放到异步事件去执行
//     //脚本的异常数降低了10倍
//     setTimeout(function () {
//         //TODO 把data上报到后台！
//         postData(data,url)
//     }, 0)
// }
// module.exports =   sendData;
//
// // export {sendData}