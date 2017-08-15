<template>
  <div class="rightCon">
      <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      label="时间"
      width="180">
      <template scope="scope">
        <el-icon name="time"></el-icon>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="名称"
      width="">
      <template scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="">
      <template scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  </div>
</template>

<script>

  export default {
      name:'rightCon',
      props:['rightKey'],
    data() {
      return {
        tableData: []
      }
    },
    created(){
        this.getData(this.rightKey)
    },
    methods:{
      handleEdit(index, row) {
        console.log(index, row);
         const h = this.$createElement;
        
        this.$msgbox({
          title: '消息',
          // message: h('p', null, [
          //   h('span', null, '内容可以是 '),
          //   h('i', { style: 'color: teal' }, 'VNode')
          // ]),
          message:h('span',null,'名称：'),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showInput:true,
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              //后端提交
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 1000);
            } else {
              done();
            }
          }
        }).then(action=> {
          
          if(action.action == 'confirm'){
            if(action.value !== null){
              //前端回显
              row.name = action.value
            }
              this.$message({
                type: 'success',
                message: '修改成功'
              });
          }else{
              this.$message({
                type: 'error',
                message: '删除失败'
              });
          }
          
        });


      },
      handleDelete(index, row) {  
        //console.log(index, row);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //前端回显数据操作
          this.tableData.splice(index,1)
          
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });


      },
        getData:function(rightKey){
            let _this = this
           fetch('./static/data.json').then(response =>response.json())
           .then(data => {
              // console.log(data)
               let hash = window.location.hash,
                    name = hash.substring(2)
                data.forEach(function(element) {
                   
                    if(element.functionclass.name == name){
                      
                        element.functionclass.right.forEach(function(item){
                             if(item.key == rightKey){
                                 this.tableData = item.rightTable
                             }
                        },this)
                    }
                }, _this);
           })
           .catch(e => console.log("Oops, error", e))
        }
    },
    watch:{
        
        rightKey:function(newVal,oldVal){
            
            this.getData(newVal)
        }
    }
  }
</script>
<style>
    .rightCon{
      padding:10px;
    }
</style>
