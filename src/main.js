// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import $ from "jquery"
//引入 element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './common/style/reset.scss'
//引入eidtor
import "../static/ueditor/ueditor.config.js"
import "../static/ueditor/ueditor.all.min.js"
import "../static/ueditor/lang/zh-cn/zh-cn.js"
import "../static/ueditor/ueditor.parse.min.js"

import "../static/ueditor/kityformula-plugin/addKityFormulaDialog.js"
import "../static/ueditor/kityformula-plugin/getKfContent.js"
import "../static/ueditor/kityformula-plugin/defaultFilterFix.js"
//上啦下滑 插件
import VueSuperScroller from 'vue-super-scroller'
Vue.use(VueSuperScroller)
//
Vue.use(Vuex);
Vue.use(ElementUI)

const store = new Vuex.Store({
  state:{
    count:0,
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: true }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  },
  mutations : {
    increment(state){
        state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    },
    incrementAsync ({ commit }) {
        setTimeout(() => {
          commit('increment')
      }, 1000)
    }
  }
})
// store.commit('increment')
// store.commit('increment')
// store.commit('increment')

// console.log(store.state.count) //3

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
//Vue事件中心
Vue.prototype.$eventBus = new Vue()