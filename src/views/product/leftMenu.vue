<template>
    <div class="product-left">

    <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handleSelect">
        <div v-for="item , index in leftArr">
             <el-submenu :index="''+(index+1)" v-if="item.level2">
                <template slot="title">{{item.name}}</template>
                <el-menu-item v-for="item2 in item.level2" :index="''+item2.key" :key="item2.key">{{item2.name}}</el-menu-item>
             </el-submenu>
             <el-menu-item  v-else  :key="item.key" :index="''+item.key" >{{item.name}}</el-menu-item>
        </div>

    </el-menu>

    </div>
</template>

<script>
  export default {
    name:'leftMenu',
    data(){
        return{
            leftArr:[]
        }
    },
    created(){
        this.getData()
    },
    methods: {
      handleOpen(key, keyPath) {
       
      },
      handleClose(key, keyPath) {
        
      },
      handleSelect(key, keyPath){
        //此处传值给父组件
        this.$emit('listenToChildEvent', key)
        
      },
      getData(){
          var _this = this;
          fetch('./static/data.json')
          .then(response=>response.json())
          .then(data=>{
                let hash = window.location.hash,
                    name = hash.substring(2)
                data.forEach(function(element) {
                    if(element.functionclass.name == name){
                     
                        this.leftArr = element.functionclass.leftMenu
                    }
                }, _this);
          })
          .catch(e=>console.log('Oops, error',e))
      }
    }
  }
</script>

