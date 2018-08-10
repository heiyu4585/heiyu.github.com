// /**
//  * 功能描述：vue发送数据方法
//  * 使用方法：
//  * 注意事项：
//  * 引入来源：
//  * 作用：处理监控相关数据的主逻辑
//  * Create by wangning on 2018/7/30
//  */
//
// //vue发送数据方法
// //https://docs.fundebug.com/notifier/javascript/framework/vuejs.html
// let   {deepExtend} =require('./util') ;
//
// function initVueErrorHandle(err, metaData) {
//     return deepExtend(this.store.baseData,
//         {
//             metaData:
//                 {
//                     componentName: metaData.componentName,
//                     propsData: metaData.propsData,
//                     info: info
//                 }
//         },
//         {
//             //todo config 调整
//             msg: subStack(err.stack, this.store.config.maxStackDepth)
//         }
//     )
//     /**
//      * 根据堆栈的长度，截断多余的堆栈信息
//      * @param  {String} stack  原始堆栈
//      * @param  {Integer} maxDepth 最大堆栈长度
//      * @return {String}        截断后的堆栈
//      */
//     function subStack(stack, maxDepth) {
//         if (!stack) {
//             return null
//         }
//
//         var arr = stack.toString().split('\n')
//         var stackDepth = arr.length
//         if (stackDepth > maxDepth) {
//             return arr.slice(0, maxDepth).join('\n')
//         }
//         return stack
//     }
// }
//
//
//
// module.exports =   initVueErrorHandle;