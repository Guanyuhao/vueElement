<template>
    <div class="create-course">
        <div class="create-big-course">
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
                                v-for="stage in stageArr"
                                :key="stage.id"
                                :label="stage.label"
                                :value="stage.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label="年级">
                            <el-select v-model="gradVal"  style="width:100%" @change="passGradCode"> 
                                <el-option
                                v-for="grad in gradArr"
                                :key="grad.id"
                                :label="grad.label"
                                :value="grad.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label="学科">
                            <el-select v-model="subjectVal" style="width:100%" @change="passSubjectCode"> 
                                <el-option
                                v-for="subject in subjectArr"
                                :key="subject.id"
                                :label="subject.label"
                                :value="subject.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label="教材">
                            <el-select v-model="bookTypeVal" style="width:100%"> 
                                <el-option
                                v-for="bookType in bookTypeArr"
                                :key="bookType.id"
                                :label="bookType.label"
                                :value="bookType.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <!-- 结束 -->
               
                <el-form-item label="课程场景" class="courseScene">
                    <el-tag v-for="(scene,index) in sceneArr" :key="scene.id" :type="sceneCurrIndex==index?'danger':''" @click.native="changeSceneIndex(index)">
                        {{scene.name}}
                    </el-tag>
                </el-form-item>
                
                <el-form-item label="课程来源" class='courseOrigin'>
                    <el-tag v-for="(origin,index) in originArr" :key="origin.id" :type="originCurrIndex==index?'danger':''" @click.native="changeOriginIndex(index)">
                        {{origin.name}}
                    </el-tag>

                </el-form-item>
                 <!-- <VueUeditor @ready='editorReady' style="width: 500px"></VueUeditor> -->
                <el-form-item label="编辑器">

                    <div class="editor-container">
                        <p v-on:click="getUEContent()">获取文本内容</p>
                        <UE  :ueditorConfig = config1 ref="ue1" style="width:500px"></UE>
                        <!-- <p v-on:click="getUEContent2()">获取文本内容</p> -->
                        <!-- <UE  :ueditorConfig = config2 ref="ue2"></UE> -->
                    </div>

                </el-form-item>
                <!-- 结束  -->

                </el-form>
               
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import API from '@/api/index'
// import  VueUeditor from 'vue-ueditor'
import UE from "../../components/editor/editor.vue"
export default {

    name: 'searchBigCourse',
    components: {
        // VueUeditor
    },
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
            },
            subjectArr:[],
            subjectVal:'1',
            bookTypeArr:[],
            bookTypeVal: 0,
            sceneArr:[],
            sceneCurrIndex:0,
            //originCurrIndex:{i:0},
            originCurrIndex:0,
            originArr:[]
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
           
            this.getCourseScene()
            this.getCourseOrigin()
        },
        //获取学段
       getAllStage(){
           let _this = this
            API.getAllStage()
            .then(res=>{
                let arr = res.data
                arr.forEach(function(e,i){
                    this.stageArr.push({
                        value: e.stageCode,
                        label:e.stageName,
                        id:e.id
                    })
                },_this)
            })
            .catch(e=> console.log(e))   
        },
        //年级
        getAllGrade(){
            let _this = this
            API.getAllGrad()
            .then(res=>{
                let arr = res.data
                arr.forEach(function(e,i){
                    this.gradArr.push({
                        value: e.gradeCode,
                        label:e.gradeName,
                        id:e.id
                    })
                },_this)
                //学科第一次根据年级去请求
                _this.getSubject('11')
                //初始化一次教材
                _this.getBookType(1,11)
         
            })
            .catch(e=> console.log(e)) 
        },
        passGradCode(code){
           let gradCode = code
           if(gradCode > 11){
               this.getSubject(gradCode)
               this.getBookType(this.subjectVal,gradCode)
           }

        },
        passSubjectCode(code){
            let subjectCode = code
            this.getBookType(subjectCode,this.gradVal)
        },
        //学科
        getSubject(gradCode){
            let _this = this
            //getGrade?code=12 接口坑 getGrade/12
            API.getAllSubjectByGradeCode('/'+gradCode)
            .then(res=>{
                let arr = res.data
                let arrs = [];
                arr.forEach(function(e,i){
                    arrs.push({
                        value:e.code,
                        label:e.name,
                        id:i
                    })
                })
                _this.subjectArr = arrs;
               
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
        },
        //教材
        getBookType(subjectCode,gradCode){
            let _this = this
            //先传学科code再传年级code
            API.getBookType('/'+subjectCode+'/'+gradCode)
            .then(res=>{
                let arr = res.data
                let arrs = []
                arr.forEach(function(e,i){
                    arrs.push({
                        value:i,
                        label:e.name,
                        id:e.code
                    })
                })
                _this.bookTypeArr = arrs;
            })
            .catch(e=>console.log(e))          
        },
        //课程场景
        getCourseScene(){
            let _this = this
            API.getCourseScene()
            .then(res=>{
                let arr = res.data
             
                arr.forEach(function(e,i){
                    _this.sceneArr.push({
                        name:e.scene_name,
                        id:e.id
                    })
                })
            
            })
            .catch(e=>console.log(e))
        },
        //课程来源
        getCourseOrigin(){
           let _this = this
            API.getCourseOrigin()
            .then(res=>{
                let arr = res.data
                
                arr.forEach(function(e,i){
                    _this.originArr.push({
                        name:e.offrom,
                        id:e.id
                    })
                })
            
            })
            .catch(e=>console.log(e)) 
        },
        changeSceneIndex(curIndex){
            this.sceneCurrIndex = curIndex
        },
        changeOriginIndex(curIndex){

            this.originCurrIndex=curIndex
            //坑 $set
           // this.$set(this.originCurrIndex,'i',curIndex)
        }
      
    },
    components: {
        UE,
    }
}
</script>

<style scoped  lang="scss" >
.create-big-course{
    margin:0 auto;
    // padding: 3% 5%;
    // border: 1px solid #bfcbd9;
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
        .courseScene{
            .el-tag{
                margin-right: 2%;
                cursor: pointer;                
            }
        }
        .courseOrigin{
            .el-tag{
                margin-right: 2%;
                cursor: pointer;                
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