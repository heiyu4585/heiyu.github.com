var express = require('express'),
    router = express.Router();
var  sitePfm = require("./sitePfm"),
    pagePfm = require("./pagePfm"),
    ajaxPfm=require("./ajaxPfm"),
    pageAllPfm = require("./pageAllPfm");

// router.get('/',function(req,res){
//     res.render("performance/view//sitePfm");
// });
router.use('/sitePfm',sitePfm);
router.use('/pagePfm',pagePfm);
router.use('/ajaxPfm',ajaxPfm);
module.exports = function (app) {
    router.use('/pageAllPfm',pageAllPfm(app.io));
    return router;
};
module.exports = HomeController;