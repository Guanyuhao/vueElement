<template>
        <div class="car">
            <el-table
                :data="tableData6"
                border
                show-summary
                :summary-method="getSummaries"
                style="width: 100%; margin-top: 20px">
                <el-table-column
                prop="id"
                label="ID"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="商品名称">
                </el-table-column>
                <el-table-column
                prop="price"
                label="价格（元）">
                </el-table-column>
                <el-table-column
                prop="num"
                label="数量（个）">                   
                </el-table-column>
                <el-table-column label="操作">
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
    name: 'car',
    data: function() {	
        return {
        tableData6: [{
          id: '0',
          name: '王小虎',
          price: '234',
          num: 10
        }]
      }   
    },
    created(){
    
        this.$eventBus.$on('mappingCar',function(index){

            if(this.tableData6.length >0){ //代表car有数据
            //防止重复添加相同商品
            let drag = true; //开关
          
                this.tableData6.forEach(function(item){ 
                        if(item.id == index){ 
                            item.num  = item.num+1
                            // 只要有一次 关闭开关
                            drag = false;
                        }
                },this)
                if(drag){
                    this.tableData6.push({
                        id:index,
                        name:'商品'+index,
                        price:10,
                        num:1
                    })
                }
            }else{
                //没有push 就行
                this.tableData6.push({
                    id:index,
                    name:'商品'+index,
                    price:10,
                    num:1
                })
            }
        }.bind(this))
    },
    methods: {
        getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        let sumPrice = 0;
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => Number(item[column.property]));//column.property 是data对象的属性
          if (!values.every(value => isNaN(value))) { //过滤不是数字的属性值 双否=肯

            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            //做判断是为了防止多次执行
            if(index == 2){
                sums[2] += ' 元';
            }
            if(index == 3){
                sums[3] += ' 个';
            }
           
          }
        });
        //单独求和
        data.forEach(function(el,num){
            sumPrice += el['price']*el['num']
        })
        sums[1] = sumPrice
        sums[4] ='N/A'
        return sums;
      },
      handleDelete(index,row){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            //前端回显数据操作
             this.tableData6.splice(index,1)
            
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
      handleEdit(index,row){
         const h = this.$createElement;
        this.$msgbox({
          title: '消息',
          message:h('div',{calss:'msg'},[
              h('p',{style:'padding:10px 0'},'商品名称'),
              h('input',{style:'line-height:16px;padding:5px 10px;border:1px solid #ccc;',class:'goodName',attrs:{type:'text',placeholder:row.name},ref:'goodName'}),
              h('Br'),
              h('p',{style:'padding:10px 0'},'商品数量'),
              h('input',{style:'line-height:16px;padding:5px 10px;border:1px solid #ccc;',class:'goodNum',attrs:{type:'text',placeholder:row.num}})                
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
             
             // console.log(instance.$el.querySelector('.goodName').value)
            let name =instance.$el.querySelector('.goodName').value,
                num = instance.$el.querySelector('.goodNum').value;
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              //后端提交
              setTimeout(() => {
                  //前端回调
                  if(name){
                   row.name = name                      
                  }
                  if(num){
                    row.num = num
                  }

                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false; //关闭转
                }, 300);
              }, 1000);
            } else {
              done();
            }
          }
        }).then(action=> {
         //这里制作成功回调

          if(action == 'confirm'){
          
              //前端回显
        //      row.name = this.$el.
            
              this.$message({
                type: 'success',
                message: '修改成功'
              });
          }else{
              this.$message({
                type: 'error',
                message: '修改失败'
              });
          }
          
        });
      }
    }
}
</script>

<style scoped>

</style>   