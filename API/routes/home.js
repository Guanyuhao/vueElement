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
    var hash_password=hash(password+'这是个秘密')
    req.models.userinfo.count({username: username, password: hash_password}, function (err, date) {
        if (date > 0) {
            req.models.userinfo.find({username: username, password: hash_password}, function (err, user) {
                if (err) {
                    console.log(err);
                }
                if (user[0].username == username && !user[0].isdelete) {
                    var userTeacher = user[0];
                    var platform=JSON.parse(userTeacher.platform)

                    for(var i in platform){
                        if(platform[i].id==1){
                            delete userTeacher.password;
                            req.session.user = userTeacher;
                        }
                    }
                    if(req.session.user!=undefined){
                        if(req.session.user.username==username){
                            console.log(userTeacher.name+'登陆')
                            //成功
                            res.send(userTeacher.name);
                        }else{
                            req.session.user=null
                            res.send(false);
                        }
                    }
                    else{
                        req.session.user=null
                        res.send(false);
                    }

                } else {
                    console.log('已经被禁用');
                    res.send(false);
                }
            })
        } else {
            res.send(false);
        }
    })
})

module.exports = router