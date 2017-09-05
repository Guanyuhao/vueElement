<template>
    <div class="search-big-course">
        
        <section>
            <div class="search">
                <el-input placeholder="code" >
                    <el-button slot="append" icon="search"></el-button>
                </el-input>
            </div>
            <div class="filterChoice">
                <el-tag 
                :closable="true" 
                v-for="(filter,index) in filterArr" 
                :key='filter.name'
                @close="handleCloseTag(index)">
                    {{filter.name}}
                </el-tag>
                <br/>
                <br/>
                <el-button @click="restFilter">重新筛选</el-button>
            </div>
            <div class="filterFul">
               
               <span class="span-title"> 学科：</span><el-tag v-for="(grade,index) in gradeArr" :key="grade.id" :type="gradeCurrIndex==index?'danger':''" @click.native="changeGradeIndex(index,grade.code)">
                    {{grade.name}}
                </el-tag>
                <br/>
               <span class="span-title"> 课程：</span><el-tag v-for="(course,index) in courseArr" :key="course.id" :type="courseCurrIndex==index?'danger':''" @click.native="changeCourseIndex(index,course.code)">
                    {{course.name}}
                </el-tag>
                 <br/>
                <span class="span-title"> 教材：</span><el-tag v-for="(bookType,index) in bookTypeArr" :key="bookType.id" :type="bookTypeCurrIndex==index?'danger':''" @click.native="changeBookTypeIndex(index)">
                    {{bookType.name}}
                </el-tag> 
            </div>
            <ul class="bigCourseList">

            </ul>
        </section>
    </div>
</template>

<script>
import API from '@/api/index'
export default {
    name: 'searchBigCourse',
    data: function() {
        return {
            gradeArr:[],
            gradeCurrIndex: 0,
            courseArr:[],
            courseCurrIndex:0,
            filterArr:[
                {
                    name:'一年级',
                    gradeCode:11
                },
                {
                    name:'语文',
                    subjectCode:1
                }
            ],
            bookTypeArr:[],
            bookTypeCurrIndex:0
        }
    },
    created(){
        this.init()
    },
    methods: {
        init(){
            this.getAllGrade()
            this.getCourseCategory()
        },
        getAllGrade(){
            let _this = this
            API.getAllGrad()
            .then(res=>{
                let arr = res.data
                arr.forEach(function(e,i){
                    this.gradeArr.push({
                        code: e.gradeCode,
                        name:e.gradeName,
                        id:e.id
                    })
                },_this)
            })
            .catch(e=> console.log(e)) 
        },
        checkFilterArr(code){
            //名字唯一 封装服用 判断重载
            let Drag = false
            this.filterArr.forEach(function(e,i){
                 if(e[code]){
                     //存在
                     Drag = i+''
                     //0 反出去没用
                    return false
                 }
            },this)    
            return Drag 
        },
        changeGradeIndex(index,code){            
           this.gradeCurrIndex = index
         
               if(this.checkFilterArr('gradeCode')){
                   this.filterArr[this.checkFilterArr('gradeCode')].name = this.gradeArr[index].name 
                    this.filterArr[this.checkFilterArr('gradeCode')].gradeCode = this.gradeArr[index].code
               }else{
                   this.filterArr.push({
                        name:this.gradeArr[index].name,
                        gradeCode: this.gradeArr[index].code 
                    })
               }
               
           
           //booke 参数
           this.getBookType(this.gradeArr[this.gradeCurrIndex].code,this.courseArr[this.courseCurrIndex].code)               
        },
        changeCourseIndex(index,code){
            this.courseCurrIndex = index
           
               if(this.checkFilterArr('subjectCode')){
                   this.filterArr[this.checkFilterArr('subjectCode')].name = this.courseArr[index].name 
                    this.filterArr[this.checkFilterArr('subjectCode')].subjectCode = this.courseArr[index].code
               }else{
                this.filterArr.push({
                    name:this.courseArr[index].name,
                    subjectCode: this.courseArr[index].code 
                })
               }
           
           this.getBookType(this.gradeArr[this.gradeCurrIndex].code,this.courseArr[this.courseCurrIndex].code)            
        },
        changeBookTypeIndex(index){
            this.bookTypeCurrIndex = index
           
               if(this.checkFilterArr('bookId')){
                   this.filterArr[this.checkFilterArr('bookId')].name = this.bookTypeArr[index].name 
                    this.filterArr[this.checkFilterArr('bookId')].bookId = this.bookTypeArr[index].code
               }else{
                    this.filterArr.push({
                        name:this.bookTypeArr[index].name,
                        bookId: this.bookTypeArr[index].code 
                    })
               }
           
        },
        handleCloseTag(index){
            this.filterArr.splice(index,1)
        },
        restFilter(){
            this.filterArr = [];
        },
        getCourseCategory(){
            let _this = this
            API.getCourseCategory()
            .then(res=>{
                let arr = res.data
                arr.forEach(function(e,i){
                    this.courseArr.push({
                        name:e.subjectName,
                        id:e.id,
                        code:e.subjectCode
                    })
                },_this)
             //初始化教材
                _this.getBookType(11,1)   
            })
            .catch(e=>console.log(e))
        },
         getBookType(gradCode,subjectCode){
            let _this = this
            //先传学科code再传年级code
            API.getBookType('/'+subjectCode+'/'+gradCode)
            .then(res=>{
                let arr = res.data
                let arrs = []
                arr.forEach(function(e,i){
                    arrs.push({
                        name:e.name,
                        id:e.code,
                        code:e.code
                    })
                })
                _this.bookTypeArr = arrs;
            })
            .catch(e=>console.log(e))          
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
               padding: 1%;
               margin-top: 20px;
               border: 1px solid #ccc;
               max-width: 1000px;
               min-height: 80px;
               .el-tag{
                   margin-right: 2%;
               }                             
           }
           .filterFul{
               padding: 1%;               
               margin-top: 20px;
               border: 1px solid #ccc;
               max-width: 1000px;
               min-height: 100px;
                .el-tag{
                   margin: 1% 1%;
               }
               .span-title{
                   padding: 1%;
                   font-size: 14px;
               }
           }
       }
    }
</style>