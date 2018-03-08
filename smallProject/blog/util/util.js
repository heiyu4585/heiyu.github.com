var mysql = require('mysql');
var $conf = require('../server/config');
var pool  = mysql.createPool($conf.mysql);

function searchSql($sql,params) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                  reject(err)
            }else{
                connection.query($sql, params,function (err, result) {
                    connection.release();
                    if (err) {
                         reject(err)
                    }
                    if(result.insertId) result.id = result.insertId;
                     resolve(result);
                });
            }

        });
    })
}

module.exports = {
    searchSql:searchSql
}
