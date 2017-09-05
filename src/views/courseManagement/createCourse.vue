<template>
    <div class="create-course">
        <header>
            <h2 class="wqwqwq">创建课程</h2>
        </header>
        <section>
            <div class="courseName">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign"  :rules="rules" ref="formLabelAlign">
            <el-form-item label="课程名称" prop="name">
                <el-input v-model="formLabelAlign.name" placeholder="课程名称"></el-input>
            </el-form-item>
            <el-form-item label="课程类型">
                    <el-select v-model="value" >
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="业务编号" prop="type">
                <el-input v-model="formLabelAlign.type" placeholder='业务编号'></el-input>
            </el-form-item>
            <el-form-item required class="courseStart">
                <el-col :span="4"  >
                    <el-form-item prop="date1"  label="开课时间" >
                        <el-date-picker type="date" placeholder="选择日期" v-model="formLabelAlign.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
              
                <el-col :span="3">
                    <el-form-item  label="课程建议价格" >
                        <el-input-number  v-model="formLabelAlign.coursePrice" style="width: 100%;"   :controls="false"></el-input-number>
                    </el-form-item>
                </el-col>
               
                <el-col :span="3">
                    <el-form-item label="课程总数">
                        <el-input-number  v-model="formLabelAlign.courseSum" style="width: 100%;"   :controls="false"></el-input-number>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <!-- 学段 -->
            <el-form-item  class="stageAll">
                <el-col :span="3">
                    <el-form-item label="学段">
                        <el-select v-model="stageVal"  style="width:100%"> 
                            <el-option
                            v-for="item in stageArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item label="年级">
                        <el-select v-model="gradVal"  style="width:100%" @change="passGradCode"> 
                            <el-option
                            v-for="item in gradArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item label="学科">
                        <el-select v-model="stageVal" style="width:100%"> 
                            <el-option
                            v-for="item in stageArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item label="教材">
                        <el-select v-model="stageVal" style="width:100%"> 
                            <el-option
                            v-for="item in stageArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <!-- 结束 -->
            <!-- <VueUeditor @ready='editorReady' style="width: 500px"></VueUeditor> -->
                    <div class="editor-container">
                        <p v-on:click="getUEContent()">获取文本内容</p>
                      <UE  :ueditorConfig = config1 ref="ue1"></UE>
                       <p v-on:click="getUEContent2()">获取文本内容</p>
                      <UE  :ueditorConfig = config2 ref="ue2"></UE>
                    </div>
            </el-form>
           
            </div>
        </section>
    </div>
</template>

<script>
import api from '@/api/index'
// import  VueUeditor from 'vue-ueditor'
import UE from "../../components/editor/editor.vue"
export default {
    name: 'createCourse',
    
    data: function() {	
        return {
            labelPosition: 'top',
            formLabelAlign: {
                name: '',
                region: '',
                date1:'',
                type: '',
                coursePrice:'',
                courseSum:''
            },
            options: [
                {
                value: '1',
                label: 'VIP保分计划—保高考一本线上30分课程'
                }, 
                {
                value: '2',
                label: 'VIP保分计划—保高考一本线课程'
                }, 
                {
                value: '3',
                label: 'VIP保分计划—高考二本线课程'
                }
            ],
            value:'1',
            rules: {
                name: [
                    { required: true, message: '请输入课程名称', trigger: 'blur' },
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '请输入业务编号', trigger: 'change' }
                ]
                // courseSum:[
                //     {required: true, message: '必填',trigger:'blur'}
                // ],
                // coursePrice:[
                //     {required: true, message: '必填',trigger:'blur'}
                // ]
            },
            stageArr:[],
            stageVal:'1',
            gradVal:'11',
            gradArr:[],
            //editor
            config1: {
              initialFrameWidth: null,
              initialFrameHeight: 350
            },
            config2: {
              initialFrameWidth: null,
              initialFrameHeight: 350
            }
        }
    },
    created(){
        this.init()
    },
    mounted(){

    },
    methods: {
        init(){
            this.getAllStage()
            this.getAllGrade()
        },
       getAllStage(){
           let _this = this
            api.getAllStage()
            .then(res=>{
                let arr = res.data
                
                arr.forEach(function(e,i){

                    this.stageArr.push({
                        value: e.stageCode,
                        label:e.stageName
                    })
                },_this)
                
             
            })
            .catch(e=> console.log(e))   
        },
        getAllGrade(){
            let _this = this
            api.getAllGrad()
            .then(res=>{
                let arr = res.data
              
                arr.forEach(function(e,i){

                    this.gradArr.push({
                        value: e.gradeCode,
                        label:e.gradeName
                    })
                },_this)
                
             
            })
            .catch(e=> console.log(e)) 
        },
        passGradCode(code){
           let gradCode = code
           this.getSubject(gradCode)
        },
        getSubject(gradCode){
            //getGrade?code=12 接口坑 getGrade/12
            api.getAllSubjectByGradeCode('/'+gradCode)
            .then(res=>{
                let arr = res.data
                console.log(arr)
            })
        },
        getUEContent() {
            let content = this.$refs.ue1.getUEContent();
            console.log(content)
            // this.$notify({
            //   title: '获取成功，可在控制台查看！',
            //   message: content,
            //   type: 'success'
            // });
            // console.log(content)
        },
        getUEContent2(){
             let content = this.$refs.ue2.getUEContent2();
            console.log(content)
        }
      
    },
    components: {
        UE,
    }
}
</script>

<style scoped  lang="scss" >
.create-course{
    margin:0 auto;
    h2{
       padding-left: 32%; 
       margin-bottom:3%; 
    }
    section{
        .el-input{
            width: 60%;
        }
        .el-select{
            width: 40%;
        }
        .courseStart{
            .el-col{
                margin-right: 2%;
            }
        }
        .stageAll{
            .el-col{
                margin-right: 2%;
            }
        }
    }
    .info{
        border-radius: 10px;
        line-height: 20px;
        padding: 10px;
        margin: 10px;
        background-color: #ffffff;
      }
}

</style>