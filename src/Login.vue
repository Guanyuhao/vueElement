<template>
    <div class="login">
        
        <div class="cen-cen">
            <el-tabs v-model="activeName2" type="" @tab-click="handleClick">
            <el-tab-pane label="登录" name="first">
                    <el-form label-position="top" label-width="40px" :model="formLabelAlign">
                        <el-form-item label="用户命">
                            <el-input v-model="formLabelAlign.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="formLabelAlign.password" type='password'></el-input>
                        </el-form-item>
                        <el-button @click="login" type="primary">登录</el-button> 
                    </el-form>
            </el-tab-pane>
            <el-tab-pane label="注册" name="second">
                    <el-form label-position="top" label-width="40px" :model="formLabelAlign">
                        <el-form-item label="用户命">
                            <el-input v-model="formLabelAlign.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="formLabelAlign.password" type='password' ></el-input>
                        </el-form-item> 
                        <el-button @click="register" type="primary">注册</el-button>                         
                    </el-form>
            </el-tab-pane>
        </el-tabs>
        </div>
       
    </div>
</template>

<script>
import api from '@/api/index'

//axios 复用
export default {
    name: 'Login',
    data: function() {	
        return {
            activeName2: 'first',
            formLabelAlign: {
                username: '',
                password: ''
            }
        }
    },
    created(){
       
    },
    methods: {
        handleClick(tab, event) {
           // console.log(tab, event);
        },
        checkcode(){
            var _this = this,
                username = this.formLabelAlign.username,
                password = this.formLabelAlign.password;       
            if(!username){
                this.$message({
                    message: '请填写用户名',
                    type: 'warning'
                });
                return false
            }
            if(!password){
                this.$message({
                message: '请填写密码',
                type: 'warning'
                });
                return false
            }
            return true
        },
        register(){
            var _this = this;
        if(!this.checkcode){
            return false
        }

           api.postRegister({
                username: _this.formLabelAlign.username,
                password: _this.formLabelAlign.password
            })
            .then(res=>{
                if(res.status === 200){
                    _this.$message({
                        message: '注册成功',
                        type: 'success'
                    });
                    _this.activeName2 = 'first'
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        login(){
            var _this = this;
            if(!this.checkcode){
                return false
            }
            api.postLogin({
                username: _this.formLabelAlign.username,
                password: _this.formLabelAlign.password
            })
            .then(res=>{
                    
                
                if(res.data.status === 200){
                    _this.$message({
                        message: `${res.data.msg}`,
                        type: 'success',
                        duration:500,
                        onClose:function(){
                            window.location.href = '/'
                        }
                    })
                }else{
                    _this.$message({
                        message: `${res.data.msg}`,
                        type: 'warning',
                        duration:2000
                    })
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>

<style scoped lang="scss">

    .login{
        width: 100%;
        height: 100%;
        // background-color: #99a9bf;
        background-image:url('/static/images/bg-love.jpg');
        background-size:cover;
        background-repeat:no-repeat;
        position: relative;
        .cen-cen{
            position: absolute;
            left: 50%;
            top: 50%;
            width: 500px;
            height: 300px;
            margin-left: -250px;
            margin-top: -150px;
            .el-form{
                position: relative;
                .el-button{
                    position: relative;
                    left: 50%;
                    bottom: 0;
                    margin-left: -30px;
                }
            }
        }
    }

</style>