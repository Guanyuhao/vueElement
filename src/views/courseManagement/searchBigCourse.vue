<template>
    <div class="search-big-course">
        
        <section>
            <div class="search">
                <el-input placeholder="code" >
                    <el-button slot="append" icon="search" @click="searchBigCourse"></el-button>
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
               
               <span class="span-title"> 学年：</span><el-tag v-for="(grade,index) in gradeArr" :key="grade.id" :type="gradeCurrIndex==index?'danger':''" @click.native="changeGradeIndex(index,grade.code)">
                    {{grade.name}}
                </el-tag>
                <br/>
               <span class="span-title"> 课程：</span><el-tag v-for="(course,index) in courseArr" :key="course.id" :type="courseCurrIndex==index?'danger':''" @click.native="changeCourseIndex(index,course.code)">
                    {{course.name}}
                </el-tag>
                 <br/>
                <span class="span-title"> 教材：</span><el-tag v-for="(bookType,index) in bookTypeArr" :key="bookType.id" :type="bookTypeCurrIndex+1==index?'danger':''" @click.native="changeBookTypeIndex(index)">
                    {{bookType.name}}
                </el-tag> 
            </div>
            <!-- <ul class="bigCourseList">
                <li v-for="bigCourse in bigCouserArr" :key="bigCourse.id">
                    {{bigCourse.name}}
                </li>
            </ul> -->
            <div class="bigCourseList">
                <el-table
                    :data="bigCouserArr"
                    border
                    style="width: 100%">
                    <el-table-column
                    label="课程Code"
                    width="">
                    <template scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.id }}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="课程内容"
                    width="300">
                    <template scope="scope">
                        <el-popover trigger="hover" placement="top">
                        <p>学年: {{ scope.row.grade }}</p>
                        <p>学科: {{ scope.row.subject }}</p>
                        <p>教材: {{ scope.row.book }}</p>                                  
                        <div slot="reference" class="name-wrapper">
                            <el-tag>{{ scope.row.name }}</el-tag>
                        </div>
                        </el-popover>
                    </template>
                    </el-table-column>
                    <el-table-column label="操作">
                    <template scope="scope">
                        <el-button
                        size="small"
                        @click="handleEditor(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currPageNum"
                    :page-sizes="[5, 10]"
                    :page-size="currPageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalNum">
                </el-pagination>
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
            bookTypeCurrIndex:-2,
            bigCouserArr:[],
            currPageSize:5, //一页几个
            totalNum:0, //总条数
            currPageNum:1
        }
    },
    created(){
        this.init()
    },
    methods: {
        init(){
            this.getAllGrade()
            this.getCourseCategory()
            //初始化默认请求
            this.getBigCourse()
        },
        searchBigCourse(){
            //配置中 gradeCode subjectCode bookType为动态获取
            let l = this.filterArr.length;
            if(l<2){
                this.$message({
                    message: '学科与课程是必选的',
                    type: 'warning'
                });
                return false
            }
            //更新list
            this.getBigCourse()
        },
        handleEditor(index,row){
           
            //跳转课程详情
            this.$eventBus.$emit('jumpBigCourseDetail',row)
        },
        handleDelete(index, row) {
            //console.log(index, row);
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.bigCouserArr.splice(index,1)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
           
        },
        handleCurrentChange(val){
           
            this.currPageNum = val
            this.getBigCourse()
        },
        handleSizeChange(val){
           this.currPageSize = val
           this.getBigCourse()
        },
        checkFilterArr(code){
            //筛选数组 校验
            
            let Drag = false
            this.filterArr.forEach(function(e,i){
                 if(e[code]){
                     //存在
                     Drag = i+''
                     //不接受数字0
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
            //不让教材默认选择
            //再次点去取消样式
            if( this.bookTypeCurrIndex == index-1 ){
                //删除一下筛选数组中的数据
                if(this.checkFilterArr('bookId')){
                    this.filterArr.splice(this.checkFilterArr('bookId'),1)
                    this.bookTypeCurrIndex = -2
                }                
                return false
            }else{
                this.bookTypeCurrIndex = index-1
            }  
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
        },
        getBigCourse(opt){
            //cp --分页 config 参数配置
            //单独做一个教材版本的配置
            let bookType = '',
                book = '';
            if( this.checkFilterArr('bookId') ){
                bookType = this.filterArr[this.checkFilterArr('bookId')].bookId
                book = this.filterArr[this.checkFilterArr('bookId')].name
            }
           
            let _this = this,
                arrs = [],
                subjectCode = this.filterArr[this.checkFilterArr('subjectCode')].subjectCode,
                subject = this.filterArr[this.checkFilterArr('subjectCode')].name,
                gradeCode = this.filterArr[this.checkFilterArr('gradeCode')].gradeCode,
                grade = this.filterArr[this.checkFilterArr('gradeCode')].name,
                cp = this.currPageNum,
                pageSize = this.currPageSize,
                config = {
                    gradeCode,
                    subjectCode,
                    bookType,
                    cp,
                    pageSize

                };
            if(opt){Object.assign(config,opt)}  //复制对象 返回目标对象且修改目标对象  
            API.getBigCourse(config)
            .then(res=>{
                let arr = res.data.beanData
                let data = res.data
                //
                this.totalNum =  data.item
                
                arr.forEach(function(e,i){
                    arrs.push({
                        name:e.fullName,
                        id:e.id,
                        subject,
                        grade,
                        book
                    })
                })
                _this.bigCouserArr = arrs
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
           .bigCourseList{
               max-width: 1000px;
                margin-top:20px;              
           }
       }
    }
</style>