const editor = {
    uploadInit: function () {
        let editor = this;
        let btnId = editor.customUploadBtnId;
        let containerId = editor.customUploadContainerId;
        //实例化一个上传对象
        let uploader = new plupload.Uploader({
            browse_button: btnId,
            url: '/uploadImg',
            flash_swf_url: '../Moxie.swf',
            sliverlight_xap_url: '../Moxie.xap',
            container: containerId,
            drop_element: 'div1',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
            dragdrop: true,                   //开启可拖曳上传
            max_file_size: '10mb',
            resize: {
                quality: 10
            },
            filters: {
                mime_types: [
                    //只允许上传图片文件 （注意，extensions中，逗号后面不要加空格）
                    {title: "图片文件", extensions: "jpg,gif,png,bmp"}
                ]
            }
        });
        //存储所有图片的url地址
        let urls = [];
        //初始化
        uploader.init();
        //绑定文件添加到队列的事件
        uploader.bind('FilesAdded', function (uploader, files) {
            //显示添加进来的文件名
            $.each(files, function (key, value) {
                console.log(value);
                printLog('添加文件' + value.name);
            });
            // 文件添加之后，开始执行上传
            uploader.start();
        });
        //单个文件上传之后
        uploader.bind('FileUploaded', function (uploader, file, responseObject) {
            //注意，要从服务器返回图片的url地址，否则上传的图片无法显示在编辑器中
            let url = responseObject.response;
            //先将url地址存储来，待所有图片都上传完了，再统一处理
            urls.push(url);
            printLog('一个图片上传完成，返回的url是' + url);
        });
        //全部文件上传时候
        uploader.bind('UploadComplete', function (uploader, files) {
            printLog('所有图片上传完成');
            // 用 try catch 兼容IE低版本的异常情况
            try {
                //打印出所有图片的url地址
                $.each(urls, function (key, value) {
                    printLog('即将插入图片' + value);

                    // 插入到编辑器中
                    editor.command(null, 'insertHtml', '<img src="' + value + '" style="max-width:100%;"/>');
                });
            } catch (ex) {
                // 此处可不写代码
            } finally {
                //清空url数组
                urls = [];
                // 隐藏进度条
                editor.hideUploadProgress();
            }
        });
        // 上传进度条
        uploader.bind('UploadProgress', function (uploader, file) {
            // 显示进度条
            editor.showUploadProgress(file.percent);
        });
    }
};
function printLog(title, info) {
    window.console && console.log(title, info);
}

module.exports = editor;
