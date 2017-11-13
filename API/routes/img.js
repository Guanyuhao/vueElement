var http = require("http");
var fs = require("fs");
var path = require("path");


var downImg = function (urls, callback) {
    try {
        var imgIndex = 0;
        urls.forEach(function (url) {
            //var imgName = url.substring(url.lastIndexOf('/') + 1);
            var imgName = url.match(/\/[^/]+\/[^/]+\.(png|jpg|jpeg|gif)/g)[0].replace(/\//g, "_"); //获得图片名称
            http.get(url, function (res) {
                var imgData = "";
                res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
                res.on("data", function (chunk) {
                    imgData += chunk;
                });
                res.on("end", function () {
                    fs.writeFile(path.resolve(__dirname, "../../public/outWord/" + imgName), imgData, "binary", function (err) {
                        if (err) {
                            console.log("down fail");
                        }
                        imgIndex++;
                        if (imgIndex >= urls.length) {
                            console.log("img down success");
                            callback();
                        }
                    });
                });
            });
        });
    } catch (err) {
        callback(err);
    }
};




var deleteImg = function (urls) {
    urls.sort(function (val1, val2) {
        if (val1 > val2) {
            return 1;
        } else if (val1 < val2) {
            return 0;
        }
    });
    var imgName;
    urls.forEach(function (url, index) {
        if (index + 1 != urls.length && urls[index] != urls[index + 1]) {
            if (urls[index] != urls[index + 1]) {
                imgName = url.match(/[a-zA-Z\d\-_]+\.(png|jpg|gif|jpeg)/)[0];
                fs.unlink(path.resolve(__dirname, "../../public/outWord/" + imgName));
            }
        } else {
            imgName = url.match(/[a-zA-Z\d\-_]+\.(png|jpg|gif|jpeg)/)[0];
            fs.unlink(path.resolve(__dirname, "../../public/outWord/" + imgName));
        }
    });
};

var deleteWord = function (word) {
    fs.unlink(path.resolve(__dirname, "../../public/outWord/" + word + ".docx"));
};

exports.downImg = downImg;
exports.deleteImg = deleteImg;
exports.deleteWord = deleteWord;
