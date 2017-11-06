var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var DB_CONN_STR = "mongodb://localhost:27017/guan"

router.all('/',function(res,req){
  req.render('index', { 
    title: 'home',
    isShow:false
   });
})



//读取数据库
router.all('/register',function(res,req){
  var username = res.body.username
  var password = res.body.password
  var insertData = function(db,callback){
    //连接 collection
    var conn = db.collection('user')
    //获得前端提交数据并格式化
    var data = {
      username:username,
      password:password
    }
    //出入数据
    conn.insert(data,function(err,result){
      if(err){
        console.log(err)
      }else{
        callback(result)
      }
    })
  }
  MongoClient.connect(DB_CONN_STR,function(err,db){
    if(err){
     console.log(err)
    }else{
      // console.log("数据库连接成功")
       insertData(db,function(result){
        // console.log(result)        
         req.send('[{ "createBy": null, "updateDate": 1509334574000, "updateBy": null, "updateName": "刘昆仑", "createDate": 1449465526000, "createName": "管理员", "isdel": "0", "knowTypeCode": "shishi(F)", "id": "402881b4517acecf01517ae0baa10031", "typeName": "事实(F)", "version": null }, { "createBy": "admin", "updateDate": 1463117472000, "updateBy": "admin", "updateName": "管理员", "createDate": 1449465540000, "createName": "管理员", "isdel": "0", "knowTypeCode": "fangfa(P)", "id": "402881b4517acecf01517ae0f0910033", "typeName": "方法(P)", "version": "1.00" }, { "createBy": null, "updateDate": 1506067670000, "updateBy": null, "updateName": "关聪", "createDate": 1463117536000, "createName": " 管理员", "isdel": "0", "knowTypeCode": "guize", "id": "402881b4517acecf01517ae0f0910034", "typeName": "规则", "version": null }, { "createBy": "admin", "updateDate": null, "updateBy": null, "updateName": null, "createDate": 1449465553000, "createName": "管理员", "isdel": "0", "knowTypeCode": "gainian(C)", "id": "402881b4517acecf01517ae120fd0035", "typeName": "概念(C)", "version": "1.00" }, { "createBy": "admin", "updateDate": null, "updateBy": null, "updateName": null, "createDate": 1449465563000, "createName": "管理员", "isdel": "0", "knowTypeCode": "yuanli(L)", "id": "402881b4517acecf01517ae14a720037", "typeName": "原理(L)", "version": "1.00" }, { "createBy": "admin", "updateDate": null, "updateBy": null, "updateName": null, "createDate": 1449465573000, "createName": "管理员", "isdel": "0", "knowTypeCode": "celve(S)", "id": "402881b4517acecf01517ae170a70039", "typeName": "策略(S)", "version": "1.00" }, { "createBy": "admin", "updateDate": null, "updateBy": null, "updateName": null, "createDate": 1449465583000, "createName": "管理员", "isdel": "0", "knowTypeCode": "lianjiexing", "id": "402881b4517acecf01517ae19955003b", "typeName": "联接型", "version": "1.00" }, { "createBy": "admin", "updateDate": null, "updateBy": null, "updateName": null, "createDate": 1449465594000, "createName": "管理员", "isdel": "0", "knowTypeCode": "lijielianjiexing", "id": "402881b4517acecf01517ae19955003c", "typeName": "理解联接型", "version": "1.00" }, { "createBy": "admin", "updateDate": null, "updateBy": null, "updateName": null, "createDate": 1449465595000, "createName": "管理员", "isdel": "0", "knowTypeCode": "biaodaxing", "id": "402881b4517acecf01517ae1c738003d", "typeName": "表达型", "version": "1.00" }, { "createBy": null, "updateDate": 1506067675000, "updateBy": null, "updateName": "关聪", "createDate": 1449465605000, "createName": "管理员", "isdel": "0", "knowTypeCode": "caozuoxing", "id": "402881b4517acecf01517ae1ee7f003f", "typeName": "操作型", "version": null }, { "createBy": "admin", "updateDate": null, "updateBy": null, "updateName": null, "createDate": 1449465618000, "createName": "管理员", "isdel": "0", "knowTypeCode": "jutigainianlei", "id": "402881b4517acecf01517ae221260041", "typeName": "具体概念类", "version": "1.00" }, { "createBy": "admin", "updateDate": null, "updateBy": null, "updateName": null, "createDate": 1449465628000, "createName": "管理员", "isdel": "0", "knowTypeCode": "chouxianggainianlei", "id": "402881b4517acecf01517ae2460c0043", "typeName": "抽象概念类", "version": "1.00" }, { "createBy": null, "updateDate": 1506067681000, "updateBy": null, "updateName": "关聪", "createDate": 1449465638000, "createName": "管理员", "isdel": "0", "knowTypeCode": "jutiyuanlilei", "id": "402881b4517acecf01517ae26d070045", "typeName": "具体原理类", "version": null }, { "createBy": "admin", "updateDate": null, "updateBy": null, "updateName": null, "createDate": 1449465647000, "createName": "管理员", "isdel": "0", "knowTypeCode": "chouxiangyuanlilei", "id": "402881b4517acecf01517ae291720047", "typeName": "抽象原理类", "version": "1.00" }, { "createBy": "admin", "updateDate": null, "updateBy": null, "updateName": null, "createDate": 1449465657000, "createName": "管理员", "isdel": "0", "knowTypeCode": "fangfayunyonglei", "id": "402881b4517acecf01517ae2b6d70049", "typeName": "方法运用类", "version": "1.00" }, { "createBy": "admin", "updateDate": null, "updateBy": null, "updateName": null, "createDate": 1449465667000, "createName": "管理员", "isdel": "0", "knowTypeCode": "fangfafenxilei", "id": "402881b4517acecf01517ae2e071004b", "typeName": "方法分析类", "version": "1.00" }, { "createBy": "admin", "updateDate": null, "updateBy": null, "updateName": null, "createDate": 1449465676000, "createName": "管理员", "isdel": "0", "knowTypeCode": "fangfapingjialei", "id": "402881b4517acecf01517ae3034f004d", "typeName": "方法评价类", "version": "1.00" }, { "createBy": "admin", "updateDate": null, "updateBy": null, "updateName": null, "createDate": 1449465687000, "createName": "管理员", "isdel": "0", "knowTypeCode": "chuangzaocelvelei", "id": "402881b4517acecf01517ae32caf004f", "typeName": "创造策略类", "version": "1.00" }, { "createBy": "admin", "updateDate": null, "updateBy": null, "updateName": null, "createDate": 1449465697000, "createName": "管理员", "isdel": "0", "knowTypeCode": "jiazhilei", "id": "402881b4517acecf01517ae353fb0051", "typeName": "价值类", "version": "1.00" }]')
        //res.redirect('/login') 交给前端做
         db.close()
       })
    }
  })  
})
router.all('/login',function(req,res){

  var username = req.body['username']
  var password = req.body['password']
  
 var findData = function(db,callback){
   var conn = db.collection('user')
   var data ={username:username,password:password}
   conn.find(data).toArray(function(err,result){
     callback(result)
   })
 }
 MongoClient.connect(DB_CONN_STR,function(err,db){
   if(err){
     console.log(err)
   }else{
     findData(db,function(result){
       if(result.length>0){
        // console.log(result)
        // res.send('成功')
         
        req.session.username = result[0].username
         console.log(result[0].username)
         //res.redirect('/')
       res.send('{"msg":"登录成功","status":200}')
      
       }else{
         console.log(result)
         //res.send('失败')
         res.send('{"msg":"登录失败","status":400}')
       }
     })
   }
 })
 
 })




module.exports = router;
