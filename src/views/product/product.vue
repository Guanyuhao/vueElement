<template>
  <div class="product">
        <header>
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        <h1>{{title}}</h1>
                    </div>
                    </el-col>
            </el-row>
        </header>
        <section>
             <el-row> 
                 <el-col :span="4">
                    <left-menu v-on:listenToChildEvent='showMsgFromChild'></left-menu>
                 </el-col>
                 <el-col :span="20">
                    
                    <right-con :rightKey='rightKey'></right-con>
                 </el-col>
             </el-row>
        </section>
  </div>
</template>

<script>
import LeftMenu from './leftMenu'
import rightCon from './rightCon'
    export default{
        name:'proDuct',
        components:{
            LeftMenu,rightCon
        },
        name:'product',
        data(){
            return{
                rightKey:1,
                title:'产品体系'
            }
        },
        methods:{
            showMsgFromChild:function(key){
                
                this.rightKey = key
              
               
            }
        },
        created(){
            let hash = window.location.hash.substring(2)
            this.title = hash;
        }
        
    }

</script>
 <style scoped>
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    text-align: center;
    min-height: 100px;
    line-height: 100px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>