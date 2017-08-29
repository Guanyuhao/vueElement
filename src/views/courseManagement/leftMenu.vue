<template>
    <div class="product-left">

    <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handleSelect" >
        <!-- <div v-for="item , index in leftArr">
             <el-submenu :index="''+(index+1)" v-if="item.level2">
                <template slot="title">{{item.name}}</template>
                <el-menu-item v-for="item2 in item.level2" :index="''+item2.key" :key="item2.key">{{item2.name}}</el-menu-item>
             </el-submenu>
             <el-menu-item  v-else  :key="item.key" :index="''+item.key" >{{item.name}}</el-menu-item>
        </div> -->
        <el-submenu index="bigCourse">
            <template slot="title">大课程</template>
            <el-menu-item index="createCourse">
                创建课程
            </el-menu-item>
            <el-menu-item index="searchCourse">
                检索课程
            </el-menu-item>
        </el-submenu>
        <el-submenu index="smallCourse">
            <template slot="title">小课程</template>
            <el-menu-item index="createCourse">
                创建小课程
            </el-menu-item>
            <el-menu-item index="searchCourse">
                检索小课程
            </el-menu-item>
        </el-submenu>
        <el-submenu index="smallCourse">
            <template slot="title">独立课程</template>
            <el-menu-item index="createCourse">
                创建独立课程
            </el-menu-item>
            <el-menu-item index="searchCourse">
                独立课程检索
            </el-menu-item>
        </el-submenu>
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
       
    },
    methods: {
      handleOpen(key, keyPath) {
       
      },
      handleClose(key, keyPath) {
        
      },
      handleSelect(key, keyPath){
      
        this.$emit('listenToChildEvent', key)
        
      }
    }
  }
</script>
