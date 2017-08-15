import Vue from 'vue'
import Router from 'vue-router'

//自行配置录音查看
const home = r => require.ensure([], () => r(require('@/components/Home')), 'home')
const processingcenter = r => require.ensure([], () => r(require('@/components/navMenu/processingCen')), 'navMenu')
const upload = r => require.ensure([],()=>r(require('@/components/leftMenu/upload')),'leftMenu')
const iscroll = r => require.ensure([],()=>r(require('@/components/iScroll')),'iscroll')

// views 主看 product
// 做呈现 操作 static/下面的json
const Index = r => require.ensure([], () => r(require('@/views/index')), 'views')
const datadictionary = r => require.ensure([], () => r(require('@/views/product/product')), 'views')
const diagnostic = r => require.ensure([], () => r(require('@/views/product/product')), 'views')
const knowledgepoint = r => require.ensure([], () => r(require('@/views/product/product')), 'views')
const product = r => require.ensure([], () => r(require('@/views/product/product')), 'views')
const resources = r => require.ensure([], () => r(require('@/views/product/product')), 'views')
const toolcase = r => require.ensure([], () => r(require('@/views/product/product')), 'views')

//数据可视化
const dataVisualization = r => require.ensure([], () => r(require('@/views/datavisualization/dataVisualization')), 'views')


Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component:Index,
      children:[
        {
          path:'/processingcenter',
          name:'processingCen',
          component:processingcenter
        },
        {
          path:'/upload',
          component:upload
        }
      ]
     },{

      path:'/iscroll',
      component:iscroll

    },
    {

      path:'/datadictionary',
      component:datadictionary

    },{

      path:'/diagnostic',
      component:diagnostic

    },{

      path:'/product',
      component:product

    },
    {

      path:'/resources',
      component:resources

    },
    {

      path:'/toolcase',
      component:toolcase

    },
    {
      path:'/knowledgepoint',
      component:knowledgepoint
    },
    {
      path:'/dataVisualization',
      component:dataVisualization
    }
    
  ]
})
