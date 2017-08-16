<template>
  <div class="goodlist">

<el-row>
  <el-col :span="4" v-for="(o, index) in 4" :key="o" :offset="index > 0 ? 1 : 0">
    <el-card :body-style="{ padding: '0px' }">
      <img src="/static/images/2.jpg" class="image">
      <div style="padding: 14px;">
        <span>商品{{index}}</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate | formdate}}</time>
          <el-button type="text" class="button" @click="addCar(index)">添加购物车</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>

  </div>
</template>


<style>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }
  .button>span{
    color:lightseagreen;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>

<script>
export default {
  data() {
    return {
      currentDate: new Date()
    };
  },
  filters:{
      formdate:function(value){
          
        var 
            d = value,
            year = d.getFullYear(),
            month = d.getMonth(),
            day = d.getDate(),
            hour = d.getHours(),
            min = d.getMinutes(),
            second = d.getSeconds();
        return year+'-'+month+'-'+day+' '+hour+':'+min+':'+second
      }
  },
  methods:{
      addCar(index){
          console.log(index+'goodlist')
          //跨父组件访问
          this.$eventBus.$emit('mappingCar',index)
      }
  }
}
</script>