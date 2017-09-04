<template>
    <div class="search-big-course">
        
        <section>

            <div class="search">
                <el-input placeholder="code" >
                    <el-button slot="append" icon="search"></el-button>
                </el-input>
            </div>
            <div class="filterChoice">
                
            </div>
            <div class="filterFul">
              
                <el-tag v-for="(grad,index) in gradArr" :key="grad.id" :type="gradCurrIndex==index?'danger':''" @click.native="changeGradIndex(index)">
                    {{grad.name}}
                </el-tag>
               
            </div>
        </section>
    </div>
</template>

<script>
import API from '@/api/index'
export default {
    name: 'searchBigCourse',
    data: function() {	
        return {
            gradArr:[],
            gradCurrIndex: 0
        }
    },
    created(){
        this.init()
    },
    methods: {
        init(){
            this.getAllGrade()
        },
        getAllGrade(){
            let _this = this
            API.getAllGrad()
            .then(res=>{
                let arr = res.data
                arr.forEach(function(e,i){
                    this.gradArr.push({
                        code: e.gradeCode,
                        name:e.gradeName,
                        id:e.id
                    })
                },_this)
            })
            .catch(e=> console.log(e)) 
        },
        changeGradIndex(index){
            this.gradCurrIndex = index
        }
    }
}
</script>

<style  lang='scss' scoped>
    .search-big-course{
       section{
           .search{
               
               width:30%;
           }
           .filterChoice{
               margin-top: 20px;
               border: 1px solid #ccc;
               max-width: 1000px;
               min-height: 80px;
               .el-tag{
                   margin-right: 2%;
               }                             
           }
           .filterFul{
               margin-top: 20px;
               border: 1px solid #ccc;
               max-width: 1000px;
               min-height: 100px;
                .el-tag{
                   margin: 1% 1%;
               }   
           }
       }
    }
</style>