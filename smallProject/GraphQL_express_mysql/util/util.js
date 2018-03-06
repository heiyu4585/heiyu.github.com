/**
 * Created by LiuYuTao on 2017/1/16.
 */


// util.queryNew(pool,$sql.getByTime,[
//     params.siteId,
//     params.startTime,
//     params.endTime
// ],function(err,result){
//     next(err,result);
// })
//
// function searchSql($sql, params, next) {
//     if (typeof params == "function") {
//         next = params;
//         params = [];
//     }
//     pool.getConnection(function (err, connection) {
//         if (err) throw err;
//
//         try {
//             connection.query($sql, params, function (err, result) {
//                 if (err) {
//
//                     throw (err);
//                     next(err);
//                 }
//                 if (!result) {
//                     result = null;
//                 }
//                 // 释放连接
//                 connection.release();
//                 if (result.insertId) {
//                     next(null, result.insertId);
//                 } else {
//                     //格式化数据
//                     result = formatData(result);
//                     next(null, result);
//                 }
//             });
//
//         } catch (ex) {
//             next(ex);
//         }
//     })
//
//
//
//
// }
var mysql = require('mysql');
var $conf = require('../conf/db');
var pool  = mysql.createPool($conf.mysql);

async function searchSql($sql,params) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            connection.query($sql, params,function (err, result) {
                connection.release();
                if (err) {
                    return reject(err)
                }
                if(result.insertId) result.id = result.insertId;
                return resolve(result);
            });
        });
    })
}

module.exports = {
    searchSql:searchSql
}
