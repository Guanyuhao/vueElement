<template lang="html">
    <div>
        <div :id="dataId" :style="dataStyle"></div>
    </div>

</template>

<script>
    import uploadImage from './uploadImage';
    export default{
        props: {
            dataId: {
                type: String,
                twoWay: false
            },
            dataStyle: {
                type: Object,
                twoWay: true
            },
            dataBothway: {
                type: Boolean,
                twoWay: true
            },
            dataAdd: {
                type: String,
                twoWay: true
            },
            dataDelete: {
                type: String,
                twoWay: true
            },
            AddMethods: {
                type: String,
                twoWay: false
            },
            DeleteMethods: {
                type: String,
                twoWay: false
            }
        },
        data () {
            return {}
        },
        mounted () {
            // 创建编辑器
            
            let self = this;
            let div = $("#" + this.dataId);
            let editor = new wangEditor(this.dataId);
            editor.config.customUpload = true;                               // 配置自定义上传
            editor.config.customUploadInit = uploadImage.uploadInit;                      // 配置上传事件
            editor.config.menus = $.map(wangEditor.config.menus, function (item, key) {
                if (item === 'location') {
                    return null;
                }
                return item;
            });
            editor.create();
            if (self.dataBothway) {
                editor.onchange = function () {
                    // 编辑区域内容变化时，实时打印出当前内容
                    self.$emit("increment", editor.$txt.html())
                }
            }
            let menu = $(".wangEditor-menu-container");
            if(self.dataAdd){
                menu.append('<div class="menu-group clearfix"><div class="menu-item clearfix" style="width: 100px;"><a href="#" tabindex="-1"><button class="add">'+self.dataAdd+'</button></a></div></div>');
                menu.find('.add').on("click", () => {
                    self.add3();
                })
            }
            if(self.dataDelete){
                menu.append('<div class="menu-group clearfix"><div class="menu-item clearfix" style="width: 100px;"><a href="#" tabindex="-1"><button class="delete">'+self.dataDelete+'</button></div></div>');
                menu.find('.delete').on("click", () => {
                    self.delete3();
                })
            }
        },
        methods: {
            add3 () {
                // console.log(Data)
                // console.log(add)
                console.log(this.AddMethods)
                this.$emit("Data","add", this.AddMethods);
            },
            delete3 () {
                this.$emit("Data","delete", this.DeleteMethods);
            }
        }
    }
</script>