<template>
    <div class="create-course">
        <header>
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        <h1>{{currentTitle}}</h1>
                    </div>
                    </el-col>
            </el-row>
        </header>
        <section>
            <!-- 8/17今天来一个动态切换组件,抵制一下嵌套路由 -->
            <el-row> 
                 <el-col :span="4">
                    <left-menu v-on:listenToChildEvent='showMsgFromChild'></left-menu>
                 </el-col>
                 <el-col :span="20" class="right-padding">
                    <!-- 动态切换组件不可后退，嵌套路由ok -->
                    <component :is="currentView"></component>
               
                 </el-col>
             </el-row>
        </section>
    </div>
</template>

<script>
import leftMenu from './leftMenu'
import createBigCourse from './createBigCourse'
import searchBigCourse from './searchBigCourse'
export default {
    components:{
        leftMenu,createBigCourse,searchBigCourse
    },
    name: 'createManagement',
    data: function() {	
        return {
            currentView:'createBigCourse',
            currentTitle:'创建大课程'
        }
    },
    methods: {
        showMsgFromChild(name){
           
            this.currentView = name
            if(name == 'createBigCourse'){
                this.currentTitle = '创建大课程'
            }else if(name == 'searchBigCourse'){
                this.currentTitle = '大课程检索'
                
            }else if(name == 'createSmallCourse'){
                this.currentTitle = '创建小课程'

            }else if(name == 'searchSmallCourse'){
                this.currentTitle = '小课程检索'

            }else if(name == 'createIndependentCourse'){
                this.currentTitle = '创建独立课程'

            }else if(name == 'searchIndependentCourse'){
                this.currentTitle = '独立课程检索'

            }else if(name == 'courseCategory'){
                this.currentTitle = '课程类别'
            }
        }
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
  .right-padding{
      padding:2% 5%;
  }
</style>
