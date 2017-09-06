/*
*   使用方法：
*   1、new ueditorLatexToImg(ue);
*   2、this.ue： 富文本实例
* */

// latex 上传到 upyun, 返回url.
function UeditorLatexToImg(ue){
    this.ue = ue;
    this.html = ue.getContent();
    this.imgIndex = 0;
    this.contentChange();
}
// 添加事件
UeditorLatexToImg.prototype.contentChange = function(){
    var self = this;
    this.ue.addListener( 'contentChange', function() {
        self.filterHtml(self.ue.getContent());
    });
};
// 给img标签添加数字，方便正则匹配
UeditorLatexToImg.prototype.filterHtml = function(html){
    this.html = html;
    if(/data:image\/png;base64,/g.test(this.html)){
        var self = this;
        this.imgIndex = 0;
        this.html = this.html.replace(/<img/g, function(img){
            self.imgIndex++;
            return '<' + self.imgIndex + 'img';
        });
        this.imgIndex = 0;
        this.html = this.html.replace(/"\/>/g, function(){
            self.imgIndex++;
            return '"' + self.imgIndex + '/>';
        });
        this.getBase64Img();
    }
};
// latex公式替换成图片
UeditorLatexToImg.prototype.getBase64Img = function(){
    var self = this;
    for(var i = 1; i <= this.imgIndex; i++){
        this.html = this.html.replace(eval('/<'+ i +'img.+"'+ i +'\\/>/'), function(img){
            if(/data:image\/png;base64,/.test(img)){
                var src = img.match(/data:image\/png;base64,.+"/);
                if(src){
                    var base64 = src[0].replace(/^data:image\/png;base64,/, "").replace(/"$/, "");
                    return self.getImgPath(base64);
                }
            } else {
                return img.replace(/^<\d+img/, '<img').replace(/"\d+\/>$/, '"/>');
            }
        });
    }
    this.ue.setContent(this.html);
    this.uploadImgErr();
};
// base64上传到upyun, 获取图片地址
UeditorLatexToImg.prototype.getImgPath = function(base64){
    var imgHtml = "";
    $.ajax({
        url: '/ueditor/uploadFile',
        type: 'post',
        data: {base64: base64},
        async: false,
        success: function(data){
            if(data.url){
                imgHtml = '<img src="'+ data.url +'" />';
            } else {
                imgHtml = '图片上传失败';
            }
        }
    });
    return imgHtml;
};
// 图片上传失败时，删除latex
UeditorLatexToImg.prototype.uploadImgErr = function(){
    if(/图片上传失败/.test(this.html)){
        var self = this;
        setTimeout(function(){
            self.html = self.html.replace(/图片上传失败/g, "");
            self.ue.setContent(self.html);
        }, 2000);
    }
};