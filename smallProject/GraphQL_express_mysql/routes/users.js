var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource users');
});
// 增加用户
router.get('/addUser', function(req, res, next) {
    userDao.add(req, res, next);
});

router.get('/queryAll', function(req, res, next) {

    // userDao.queryAll(req, res, next);
    userDao.queryAll({
    },function (err, result) {
        if(err){
            res.json({status: 500, message: err});
        }else{
            res.json({status: 200, message: "ok", responseList:result});
        }
    });

});


module.exports = router;
