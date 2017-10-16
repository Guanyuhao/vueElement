var express = require('express');
var router = express.Router();
//hash
function hash(string) {
    var crypto = require('crypto');
    var md5sum = crypto.createHash('md5');
    md5sum.update(string, 'utf8');
    return md5sum.digest('hex');
}
//mysql  本地sql


router.all('/',function(req,res){
    res.render('login');
})
router.all('/login',function(req,res){
    var username = req.body['username']
    var password = req.body['password']

})

module.exports = router