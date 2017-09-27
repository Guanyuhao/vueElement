var express = require('express');
var router = express.Router();
var officegen = require('officegen');
var docx = officegen ( 'docx' );
var path = require('path')
var fs = require('fs')
var async = require('async')
//word 到前端乱码 与GBK码没关系
//var iconv = require("iconv-lite");

//const AdmZip = require('adm-zip')
//
//const shelljs = require('shelljs')

let downName;
router.all('/word',function(req,res){
    
    var type = req.body.type
    var fileName = req.body.fileName
    
    docx.on('finalize', function (written) {
        console.log("创建文件");
        
    });
    docx.on('error', function (err) {
        res.send(err);
        console.log(err);
    });
    

    
    try{
       
        var pObj = docx.createP ();
        pObj.addText(type)
        // pObj.addText ( '姓名' );
        // pObj.addText ( ' with color', { color: '000088' } );// 设置字体颜色
        // pObj.addText ('爱拉夫斯基')
     
        var out = fs.createWriteStream(path.resolve(__dirname, '../public/outWord/' + decodeURI(fileName) + ".docx"));
       
        out.on ( 'error', function ( err ) {
            console.log ( err );
        });
       
        out.on('finish', function() {
            
            res.send({
                msg:'success',
                state:200,
                url:'http://localhost:9091/office/download?fileName='+fileName+'.docx'
            })    
        });
        docx.generate(out);
       
    }catch(err){
        res.send(err.toString())
    }
  
})
router.get('/download',function(req, res, next){
    var fileName = req.query.fileName
    var currFile = path.resolve(__dirname, '../public/outWord/'+fileName)

    //将word 变成zip 出读取
    // const zip = new AdmZip(path.resolve(__dirname, '../public/outWord/123.zip')); 
    // let contentXml = zip.readAsText("word/document.xml");//将document.xml读取为text内容；
    // let str = "";
    // contentXml.match(/<w:t>[\s\S]*?<\/w:t>/ig).forEach((item)=>{
    //     str += item.slice(5,-6)
    // });
   
    var fReadStream ;
    fs.exists(currFile,function(exist) {
        if(exist){
            res.set({
                "Content-type":"application/octet-stream",
                "Content-Disposition":"attachment;filename="+fileName
            });
            fReadStream = fs.createReadStream(currFile);
            fReadStream.on("data",(chunk) =>{
                
                 res.write(chunk,'UTF-8')
            });
            fReadStream.on("end",function () {
                res.end();
            });
        }else{
            res.set("Content-type","text/html");
            res.send("file not exist!");
            res.end();
        }
    });
});




module.exports = router