var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
    res.json({
        a:1,
        b:2
    })
});
/* GET users listing. */
router.post('/', function(req, res, next) {
    // res.send('respond with a resource');
    res.json({
        a:"post",
        b:2
    })
});
module.exports = router;
