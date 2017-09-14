<template>
    <div class="bigCourseDetail">
        <div class="top">
           <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span style="line-height: 36px;">{{row.name}}</span>
                <el-button style="float: right;" type="primary"  :disabled="true">编辑</el-button>
            </div>
            <div v-for="(o,i) in smallCourseArr" :key="o.id" class="text item">
                {{'小课程 '+i+' '+ o.name }}
            </div>
            </el-card>
        </div>
    </div>
</template>
<script>
import API from '@/api/index.js'
export default {
  name:'bigCourseDetail',
  props:['row'],
  data(){
      return{
         params:'',
         smallCourseArr:[]
      }
  },
  activated(){
      this.params = this.row
      
      this.init()
  },
  created(){

      
  },
  mounted(){
      
  },
  methods:{
      init(){
         this.getDetailData()
      },
      getDetailData(){
          let _this = this
        
          API.getSmallCourseByBigId('/'+this.params.id)
          .then(res=>{
              let arr = res.data,
                arrs = [];
                arr.datas.forEach(function(e,i){
                    arrs.push({
                        name:e.name,
                        label:e.teachingGoal
                    })
                })
                _this.smallCourseArr = arr.datas
          })
          .catch(e=>console.log(e))
      }
  },
  watch:{
      row(cur,old){
          this.params = cur
      }
  }
}
</script>
