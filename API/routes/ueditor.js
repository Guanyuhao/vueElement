var bodyParser = require('body-parser')
var ueditor = require("ueditor")
var express = require('express');
var router = express.Router();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs')

router.use("/ue", ueditor(path.join('../', 'public'), function(req, res, next) {
  var form = new formidable.IncomingForm();
      // ueditor 客户发起上传图片请求
  var imgDir = '/img/ueditor/';
  
  var ActionType = req.query.action;
  if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo'){
        var file_url = imgDir;//默认图片上传地址
        if (ActionType === 'uploadfile') {
          file_url = '/file/ueditor/'; //附件
        }
        if (ActionType === 'uploadvideo') {
          file_url = '/video/ueditor/'; //视频
        }
        // 这里你可以获得上传图片的信息
        var foo = req.ueditor;
        console.log(foo.filename); // exp.png
        console.log(foo.encoding); // 7bit
        console.log(foo.mimetype); // image/png
       
        //uploadimage(req,res,foo)
       
      }
      //  客户端发起图片列表请求
      else if (req.query.action === 'listimage'){
        var dir_url = imgDir; // 要展示给客户端的文件夹路径
        res.ue_list(dir_url) // 客户端会列出 dir_url 目录下的所有图片
      }
      // 客户端发起其它请求
      else {
    
        res.setHeader('Content-Type', 'application/json');
        // 这里填写 ueditor.config.json 这个文件的路径
        res.redirect('/ueditor/config.json')
    }
  }
));
    module.exports = router;



function uploadimage (req, res,foo) {
      var form = new formidable.IncomingForm();
      var picPath = '/img/ueditor/' ;
      //设定上传文件路径
      form.parse(req, function (error, fields, files) {
        var image = files['upfile'];
        console.log(image)
        var fileName = foo.filename,
          fileType = fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase(),
          newFilename = new Date().valueOf() + fileType;
        var readStream = fs.createReadStream(image.path),
          writeStream = fs.createWriteStream('.' + picPath + newFilename);
        readStream.pipe(writeStream);
        readStream.on('end', function () {
          fs.unlinkSync(image.path);
        });
        var json = {
          "originalName": fileName,
          "name": newFilename,
          "url": picPath + newFilename,
          "type": fileType,
          "size": image.length,
          "state": "SUCCESS"
        };
        res.writeHead(200, { "Content-Type": "text/json" });
        res.write(JSON.stringify(json));
        res.end();
      });
}