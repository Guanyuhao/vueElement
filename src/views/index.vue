<template>
    <div class="index">
        <header>
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark h1-warp">
                        <h1>资源库</h1>
                        
                    </div>
                    </el-col>
            </el-row>
        </header>
        <section>
                <ul class="Menu1 clear">
                    <li v-for="item in listArr" :key="item.txt">
                        <router-link :to="item.name" class="el-button el-button--info">
                            <span>{{item.txt}}</span> 
                        </router-link>
                    </li>
                    <li @click="wordDialogState = true"><a  class="el-button el-button--info">word</a></li>
                </ul>
                    <!-- 表单 -->
                    <el-dialog title="生存word文件" :visible.sync="wordDialogState" class="wordDialog">
                        <el-form :model="wordForm" ref="wordForm">
                            <el-form-item label="文件名字" label-width="80px">
                                <el-input v-model="wordForm.name" ></el-input>
                            </el-form-item>
                            <el-form-item label="内容" label-width="80px">
                                <el-input v-model="wordForm.dec" type="textarea"></el-input>                                
                            </el-form-item>    
                        </el-form>
                        <div slot="footer" class="dialog-footer" >
                            <el-button @click="wordDialogState = false">取 消</el-button>
                            <el-button type="primary" @click="postOfficeWord">确 定</el-button>
                        </div>
                    </el-dialog>
        </section>
    </div>
</template>
<style lang='scss' scoped>


.el-row {
    &:last-child {
      margin-bottom: 0;
    }
  }

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
   
    min-height: 80px;
  }
  
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  
  .Menu1>li{
    float: left;
  }
  .Menu1>li>a{
        display: block;
        width: 300px;
        height: 80px;
        margin: 20px;
        padding: 0 15px;
        line-height: 80px;
  }
 .h1-warp{
    padding-left: 2%;
    line-height: 80px;
    text-align: center;
 }
</style>
<script>
import API from '@/api/index'
    export default{
        data(){
            return{
                a:'a',
                listArr:[
                    {
                        name:'/login',
                        txt:'登录'
                    },
                    {
                        name:'/home',
                        txt:'主页',
                        id:0
                    },
                    {
                        name:'/product',
                        txt:'产品',
                        id:1
                    },
                    {
                        name:'/resources',
                        txt:'资源',
                        id:2
                    },
                    {
                        name:'/coursemanagement',
                        txt:'课程管理',
                        id:3
                    },
                    // {
                    //     name:'/knowledgepoint',
                    //     txt:'知识点',
                    //     id:3
                    // },
                    // {
                    //     name:'/datadictionary',
                    //     txt:'数据字典',
                    //     id:4
                    // },
                    // {
                    //     name:'/diagnostic',
                    //     txt:'诊断校验',
                    //     id:5
                    // },
                    // {
                    //     name:'/toolcase',
                    //     txt:'工具箱',
                    //     id:6
                    // },
                    // {
                    //     name:'/Datavisualization',
                    //     txt:'数据可视化',
                    //     id:7
                    // },
                    {
                        name:'/shoppingCar',
                        txt:'购物车',
                        id:'car'
                    },
                    {
                        name:'/userFeedback',
                        txt:'用户反馈'
                    },
                    {
                        name:'/transaction',
                        txt:'交易中心'
                    }
                ],
                wordForm:{
                    name:'',
                    dec:''
                },
                wordDialogState:false
            }
        },
        created(){

        },
        methods:{
            checkWordForm(){
                let drag = false
                if (this.wordForm.name == ''){
                    drag = false
                    this.$message({type:'warning',message:'文件名字必填'})
                }else{
                    drag = true
                }
                return drag
                
            },
            postOfficeWord(){

              if( !this.checkWordForm()){
                  return false
              }
                API.postOfficeWord({ 
                    type:this.wordForm.dec,
                    fileName:this.wordForm.name
                })
                .then(res=>{
                   let data = res.data
                   if( data.state == 200 ){                     
                     location.href = data.url 
                   }
                    
                })
                .catch(e=>console.log(e))
            }
        }
    }
</script>