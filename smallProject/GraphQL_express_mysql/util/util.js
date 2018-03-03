/**
 * Created by LiuYuTao on 2017/1/16.
 */

function queryNew(pool, $sql, params, next) {
    if (typeof params == "function") {
        next = params;
        params = [];
    }
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        // 建立连接，向表中插入值
        // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
        try {
            connection.query($sql, params, function (err, result) {
                if (err) {

                    throw (err);
                    next(err);
                }
                if (!result) {
                    result = null;
                }
                // 释放连接
                connection.release();
                if (result.insertId) {
                    next(null, result.insertId);
                } else {
                    //格式化数据
                    result = formatData(result);
                    next(null, result);
                }
            });

        } catch (ex) {
            next(ex);
        }
    })
}

/**
 * 格式化代码,数据库获取的代码为下划线格式的字段名，通过格式化之后，会变为驼峰式的字段名
 * 注意：需要在后续开发中注意数据库与代码中的差异
 * 建议规范：数据库-字段为下划线式，代码-驼峰式
 * @param targetData
 * @returns {*}
 */
function formatData(targetData) {
    //如果为空，则直接返回
    if (!targetData) return targetData;
    //如果是数组
    if (Object.prototype.toString.call(targetData) == '[object Array]') {
        if (targetData.length > 0) {
            var _tmpArr = [];
            for(var i=0;i< targetData.length;i++){
                var _tmpObj = {};
                var _targetObj = targetData[i];
                for (var key in _targetObj) {
                    _tmpObj[underlineReplaceToHump(key)] = _targetObj[key];
                }
                _tmpArr.push(_tmpObj);
            }
            return _tmpArr;
        }
        else {
            return targetData;
        }

    }//因为返回的除了insertId为字符串，其余都为数组，故不考虑对象的情况
    else {
        return targetData;
    }

    //将下划线式字符串，更改为驼峰式
    function underlineReplaceToHump(str) {
        var _arr = str.split('_');
        if (_arr.length > 1) {
            var _tmp = '', _big = '';
            for (var i = 1; i < _arr.length; i++) {
                _big = _arr[i].substring(0, 1).toUpperCase();
                _tmp += _big + _arr[i].substring(1);
            }
            return _arr[0] + _tmp;
        }
        return str;
    }
}


module.exports = {
    queryNew: queryNew
}