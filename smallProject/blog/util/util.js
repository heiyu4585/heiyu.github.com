var mysql = require('mysql');
var $conf = require('../server/config');
var pool = mysql.createPool($conf.mysql);

function searchSql($sql, params) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query($sql, params, function (err, result) {
                    connection.release();
                    if (err) {
                        reject(err)
                    }
                    if (result && result.insertId) result.id = result.insertId;
                    resolve(result);
                });
            }

        });
    })
}

//获取url中参数
function getUrlKey(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

module.exports = {
    searchSql: searchSql,
    getUrlKey: getUrlKey
}
