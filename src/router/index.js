import Vue from 'vue'
import Router from 'vue-router'

//home demo
const home = r => require.ensure([], () => r(require('@/components/Home')), 'home')
const processingcenter = r => require.ensure([], () => r(require('@/components/navMenu/processingCen')), 'navMenu')
const upload = r => require.ensure([],()=>r(require('@/components/leftMenu/upload')),'leftMenu')
const iscroll = r => require.ensure([],()=>r(require('@/components/iScroll')),'iscroll')

// views 主看 product
// 做呈现 操作 static/下面的json
const index = r => require.ensure([], () => r(require('@/views/index')), 'views')

// const datadictionary = r => require.ensure([], () => r(require('@/views/product/product')), 'views')
// const diagnostic = r => require.ensure([], () => r(require('@/views/product/product')), 'views')
// const knowledgepoint = r => require.ensure([], () => r(require('@/views/product/product')), 'views')
//const toolcase = r => require.ensure([], () => r(require('@/views/product/product')), 'views')

const product = r => require.ensure([], () => r(require('@/views/product/product')), 'views')
const resources = r => require.ensure([], () => r(require('@/views/product/product')), 'views')


//数据可视化
const dataVisualization = r => require.ensure([], () => r(require('@/views/datavisualization/dataVisualization')), 'views')

const shoppingCar = r => require.ensure([],()=>r(require('@/views/shoppingCar/shoppingCar')),'views')
const courseManagement = r => require.ensure([],()=>r(require('@/views/courseManagement/courseManagement')),'views')
//登录注册
const login  = r =>require.ensure([],()=>r(require('@/Login')),'user')
//用户反馈
const userFeedback = r => require.ensure([],()=>r(require('@/views/userFeedback/userFeedback')),'views')
//K线
const transaction = r =>require.ensure([],()=>r(require('@/views/transaction/transaction')),'views')
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/',
      name:'index',
      component:index
    },
    {
      path:'/transaction',
      name:'transaction',
      component:transaction
    },
    {
      path: '/home',
      name: 'home',
      component:home,
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
    // {

    //   path:'/datadictionary',
    //   component:datadictionary

    // },{

    //   path:'/diagnostic',
    //   component:diagnostic

    // },
    {

      path:'/product',
      component:product

    },
    {

      path:'/resources',
      component:resources

    },
    // {

    //   path:'/toolcase',
    //   component:toolcase

    // },
    // {
    //   path:'/knowledgepoint',
    //   component:knowledgepoint
    // },
    {
      path:'/dataVisualization',
      component:dataVisualization
    },
    {
      path:'/shoppingCar',
      component:shoppingCar
    },
    {
      path:'/courseManagement',
      component:courseManagement
    },
    {
      path:'/userFeedback',
      component:userFeedback      
    }
    
  ]
})
