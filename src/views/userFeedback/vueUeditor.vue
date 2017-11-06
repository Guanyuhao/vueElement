    <template>
        <div class="ueditor">
            <VueUeditor @ready='editorReady' style="width: 800px;height:500px;"></VueUeditor>
            <el-button @click="getContent"> 获取内容</el-button>
            <p>{{ueContent}}</p>
        </div>
    </template>
    
    <script>
    import  VueUeditor from 'vue-ueditor'
    
    export default {
        components:{
            VueUeditor
        },
        name: 'uEditor',
        data: function() {	
            return {
                ueContent:''
            }
        },
        computed:{
            
        },
        methods: {
            editorReady(editorInstance){
                //init editor 之后的事情
            },
            getContent(){
                var id = this.$el.children[0].id
                var ue = UE.getEditor(id);
               this.ueContent = ue.getContent()
            }
        }
    }
    </script>
    
    <style scoped>
    
    </style>