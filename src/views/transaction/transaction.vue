<template>
  <div class='v-transaction'>
    <el-row :gutter="10">
        <el-col :span="24">
            <div class="grid-content bg-purple" style="height:700px;">
                    <keep-alive>
                      <Graph></Graph>
                    </keep-alive>
            </div>
        </el-col>
        <!-- <el-col :span="4">
            <div class="grid-content bg-purple-light">

            </div>
        </el-col> -->
        <!-- <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple"></div></el-col> -->
        <!-- <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple-light"></div></el-col> -->
    </el-row>
  </div>
</template>

<script>
import Graph from '@/components/lineGraph/Graph.vue'
export default {
  name:'transaction',
  components:{
      Graph
  },
  data(){
      return{

      }
  },
  created () {
      
  }
}
</script>
<style lang="scss" scoped>
  .el-col {
    border-radius: 4px;
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
    border-radius: 4px;
    min-height: 36px;
  }
</style>