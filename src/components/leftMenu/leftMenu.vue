<template>
    <div class="leftMenu">
        <el-row class="tac">
            <el-col >
                <h5>leftMenu</h5>
                <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>导航一</template>
                    <el-menu-item-group title="分组1">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                   
                </el-submenu>
                  
                <el-menu-item index="upload"><i class="el-icon-menu"></i>上传</el-menu-item>
                <el-menu-item index="3"><i class="el-icon-setting"></i>导航三</el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>
<script>
   export default {
    name:'leftMenu',
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>