<template>
  <div class="hello">
    <div class="hello_top">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <nav-menu></nav-menu>
            </div>
          </el-col>
        </el-row>
    </div>
    <div class="hello_bottom">
        <el-row>
          <el-col :span="4">
            <div class="grid-content">
              {{count}}
                 <left-menu> </left-menu>
            </div>
            </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple-light">
              <tree-grid :columns="columns" :tree-structure="true" :data-source="dataSource"></tree-grid>
              <router-view></router-view>
            </div>
            </el-col>
        </el-row>
    </div>
    <div class="hello_right">
        我们在这里展示一个共有的store：{{count}} <el-button v-on:click="add">Store异步增加</el-button>
        <el-button v-for="item in doneTodos" :key="item.id">
          {{item.text}}
        </el-button>
    </div>
  </div>
</template>

<script>
import TreeGrid from './treeTable/vue/TreeGrid'
import NavMenu from './navMenu/navMenu'
import leftMenu from './leftMenu/leftMenu'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
export default {
  components: {
    TreeGrid,NavMenu,leftMenu
  },
  name: 'hello',
  computed: {
    count(){
      return this.$store.state.count
    },
    ...mapGetters(['doneTodos']),
    ...mapMutations(['increment'])
  },
  methods :{
    add(e){
      //count 只能改变一次
      this.$store.dispatch('incrementAsync')
     
      
    }
  },
  data () {
    return {
      columns: [
          {
            text: '姓名',
            dataIndex: 'name'
          },
          {
            text: '年龄',
            dataIndex: 'age'
          },
          {
            text: '性别',
            dataIndex: 'sex'
          }
        ],
      dataSource: [
        {
          id: 1,
          parentId: 0,
          name: '测试1',
          age: 18,
          sex: '男',
          children: [
            {
              id: 2,
              parentId: 1,
              name: '测试2',
              age: 22,
              sex: '男'
            }
          ]
        },
        {
          id: 3,
          parentId: 0,
          name: '测试3',
          age: 23,
          sex: '女',
          children: [
            {
              id: 4,
              parentId: 3,
              name: '测试4',
              age: 22,
              sex: '男'
            },
            {
              id: 5,
              parentId: 3,
              name: '测试5',
              age: 25,
              sex: '男'
            },
            {
              id: 6,
              parentId: 3,
              name: '测试6',
              age: 26,
              sex: '女',
              children: [
                {
                  id: 7,
                  parentId: 6,
                  name: '测试7',
                  age: 27,
                  sex: '男'
                }
              ]
            }
          ]
        },
        {
          id: 18,
          parentId: 0,
          name: '测试8',
          age: 18,
          sex: '男'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.el-row {
      /* margin-bottom: 20px; */
    &:last-child {
      margin-bottom: 0;
    }
  }
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
    /* border-radius: 4px; */
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>
