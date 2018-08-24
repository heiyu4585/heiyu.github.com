
//window.onerror 事件处理函数

// import {checkBeforeSend} from "./checkBeforeSend";
// import {debugLog, deepExtend} from "./util";
let  checkBeforeSend =require('./checkBeforeSend') ;
let  {deepExtend,debugLog} =require('./util') ;

function initWindowErrorHandle(global,store) {
    if (!global) return;
    global.onerror = function (msg, url, line, col, error) {
        debugLog("有onerror触发---")
        debugLog(msg)
        debugLog("有onerror触发---")
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
        if (!!error && !!error.stack) {
            //如果浏览器有堆栈信息
            //直接使用
            data.msg = error.stack.toString();
        } else if (!!arguments.callee) {
            //尝试通过callee拿堆栈信息
            var ext = [];
            var f = arguments.callee.caller, c = 3;
            //这里只拿三层堆栈信息
            while (f && (--c > 0)) {
                ext.push(f.toString());
                if (f === f.caller) {
                    break;//如果有环
                }
                f = f.caller;
            }
            ext = ext.join(",");
            data.msg = ext.stack.toString();
        }

        //校验是否可以发送
        checkBeforeSend(deepExtend({}, store.baseData, data),store);
        return true;
    };
}
module.exports =   initWindowErrorHandle;
// export {initWindowErrorHandle}