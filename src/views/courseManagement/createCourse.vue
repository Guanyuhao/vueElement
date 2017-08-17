<template>
    <div class="create-course">
        <header>
            <h2>创建课程</h2>
        </header>
        <section>
            <div class="courseName">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item label="课程名称">
                <el-input v-model="formLabelAlign.name" placeholder="课程名称"></el-input>
            </el-form-item>
            <el-form-item label="课程类型">
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="业务编号">
                <el-input v-model="formLabelAlign.type" placeholder='业务编号'></el-input>
            </el-form-item>
            <el-form-item label="开课时间">
                
            </el-form-item>
            </el-form>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'createCourse',
    data: function() {	
        return {
            labelPosition: 'top',
            formLabelAlign: {
                name: '',
                region: '',
                type: ''
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
            value:'1'
        }
    },
    methods: {}
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
    }
}

</style>