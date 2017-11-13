<template>
  <div class="goodlist">
    <el-button @click="changeParent">子父回调交互</el-button>
<el-row>
  <el-col :span="4" v-for="(o, index) in cardArr" :key="index" :offset="index > -1 ? 1 : 0">
    <el-card :body-style="{ padding: '0px' }">
      <img :src='o.url' class="image">
      <div style="padding: 14px;">
        <span>商品{{index}}</span>
        <div class="bottom clearfix">
          <time class="time">{{ o.currentDate | formdate}}</time>
          <el-button type="text" class="button" @click="addCar(index)">添加购物车</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>

<el-upload
  class="upload"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :on-success="handleSuccess"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>  
</el-upload>
<el-button type="primary" size="large" @click="creatGoods" style="margin-top:20px">创建上传的商品</el-button>

  </div>
</template>

<style lang="scss" scoped>
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
  .upload{
    padding: 20px;
    float: left;
    width: 30%;
  }
</style>

<script>
export default {
  props:{
    callback:{}
  },
  data() {
    return {
      fileList:[],
      imgArr:[],
      cardArr:[
        {
          url:'/static/images/2.jpg',
          currentDate: new Date()
        },
        {
          url:'/static/images/2.jpg',
          currentDate: new Date()
        },
        {
          url:'/static/images/2.jpg',
          currentDate: new Date()
        },
        {
          url:'/static/images/2.jpg',
          currentDate: new Date()
        }
      ]
    };
  },
  filters:{
      formdate:function(value){
          
        var 
            d = value,
            year = d.getFullYear(),
            month = d.getMonth()+1,
            day = d.getDate(),
            hour = d.getHours(),
            min = d.getMinutes(),
            second = d.getSeconds();
        return year+'-'+month+'-'+day+' '+hour+':'+min+':'+second
      }
  },
  methods:{
      addCar(index){
          //跨父组件访问
          this.$eventBus.$emit('mappingCar',index)
      },
      handleRemove(file, fileList) {
        this.fileList.splice(this.fileList.indexOf(file),1)
      },
      handlePreview(file) {
        console.log(file);
      },
      handleSuccess(file,fileList){
        this.fileList.push(fileList)
      },
      creatGoods(){
       
        this.fileList.forEach(function(item) {
            this.cardArr.push({url:item.url,currentDate:new Date(item.uid)})
        }, this);
       
      },
      changeParent(){
        this.callback(this.$parent)
      }
  }
}
</script>

