    <template>
        <div class="ueditor">
            <VueUeditor @ready='editorReady'></VueUeditor>
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
            return {}
        },
        methods: {
            editorReady(editorInstance){

            }
        }
    }
    </script>
    
    <style scoped>
    
    </style>