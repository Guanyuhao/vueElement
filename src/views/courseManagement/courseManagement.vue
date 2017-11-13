<template>
    <div class="create-course">
        <header>
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        <h1>{{currCom.currentTitle}}</h1>
                    </div>
                    </el-col>
            </el-row>
        </header>
        <section>
            <!-- 8/17今天来一个动态切换组件,抵制一下嵌套路由 -->
            <el-row> 
                 <el-col :span="4">
                    <left-menu v-on:listenToChildEvent='showMsgFromChild' ></left-menu>
                 </el-col>
                 <el-col :span="20" class="right-padding">
                    <!-- 动态切换组件不可后退，嵌套路由ok -->
                    <transition 
                    name="fold" 
                    mode = "out-in">
                        <keep-alive>
                            <component :is="currCom.currentView" :row="params"></component>                        
                        </keep-alive>
                    </transition>
                 </el-col>
             </el-row>
        </section>
    </div>
</template>

<script>
import leftMenu from './leftMenu'
import createBigCourse from './createBigCourse'
import searchBigCourse from './searchBigCourse'
import bigCoursedetail from './bigCourseDetail'
export default {
    components:{
        leftMenu,createBigCourse,searchBigCourse,bigCoursedetail
    },
    name: 'createManagement',
    data: function() {	
        return {
            currCom:{
                currentView:'createBigCourse',
                currentTitle:'创建大课程'
            },
            params:''
        }
    },
    
    created(){
      
        this.$eventBus.$on('jumpBigCourseDetail',function(row){
            //组件切换 
            this.currCom.currentView = 'bigCoursedetail' 
            this.currCom.currentTitle = '大课程详情'
            
           this.params = row
          
        }.bind(this))
    },
    methods: {
        showMsgFromChild(name){
           
            this.currCom.currentView = name
            if(name == 'createBigCourse'){
                this.currCom.currentTitle = '创建大课程'
            }else if(name == 'searchBigCourse'){
                this.currCom.currentTitle = '大课程检索'
                
            }else if(name == 'createSmallCourse'){
                this.currCom.currentTitle = '创建小课程'

            }else if(name == 'searchSmallCourse'){
                this.currCom.currentTitle = '小课程检索'

            }else if(name == 'createIndependentCourse'){
                this.currCom.currentTitle = '创建独立课程'

            }else if(name == 'searchIndependentCourse'){
                this.currCom.currentTitle = '独立课程检索'

            }else if(name == 'courseCategory'){
                this.currCom.currentTitle = '课程类别'
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

.fold-enter-active {
  animation-name: fold-in;
  animation-duration: .5s;
}
.fold-leave-active {
  animation-name: fold-out;
  animation-duration: .5s;
}
.fade-in-active, .fade-out-active{
    transition: all 0.5s ease     
}
.fade-in-enter, .fade-out-active{
    opacity: 0
}

@keyframes fold-in {
  0% {
    transform: translate3d(120%,0, 0);
    opacity: 0;
  }
  25% {
    transform: translate3d(90%,0, 0);
    opacity: .25;    
  }
  50% {
    transform: translate3d(60%,0, 0);
    opacity: .5;    
  }
  75% {
    transform: translate3d(30%,0, 0);
    opacity: .75;
    
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@keyframes fold-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  25% {
    transform: translate3d(30%,0, 0);
    opacity: .75;
  }
  50% {
    transform: translate3d(60%,0, 0);
    opacity: .5;
  }
  75% {
    transform: translate3d(90%,0, 0);
    opacity: .25; 
  }
  100% {
    transform: translate3d(120%,0, 0);
    opacity: 0; 
  }
}

</style>
