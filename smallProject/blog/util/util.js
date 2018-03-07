var mysql = require('mysql');
var $conf = require('../server/config');
var pool  = mysql.createPool($conf.mysql.database);

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
