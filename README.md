# vue-cli ElementUI

>A Vue.js,ElementUI,vueX => demo

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9090
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
# vue 跨组件通信
>1.使用props （父传子）
```子组件通过props来接受父组件的通信。
  scr/views/product/
  
  <right-con :rightKey='rightKey'></right-con>
  props:['rightKey']
  
单向数据流，不可逆转。	
```
>2.使用v-on/$emit（子传父）
``` 在父组件中使用$on监听子组件自定义事件逻辑回调，子组件中使用$emit去触发事件提供交互数据。
  src/views/product/

  this.$emit('listenToChildEvent', key) =》发射listenToChildEvent
  <left-menu v-on:listenToChildEvent='showMsgFromChild'></left-menu>
  在Method中定义showMsgFromChild接受回调
如果跨多层父子或者兄弟的话，这个方法会非常的复杂。
下面再介绍一个官方的语法糖！！！ .sync
# 从 2.3.0 起我们重新引入了 .sync 修饰符，但是这次它只是作为一个编译时的语法糖存在。它会被扩展为一个自动更新父组件属性的 v-on 侦听器。
<comp :foo.sync="bar"></comp> =》<comp :foo="bar" @update:foo="val => bar = val"></comp>
子组件中通过 this.$emit('update:foo', newValue）显示触发
```
>3.建立一个Vue事件中心（跨组件）
```说白了就是将所有的通信事件抽离出来，通过一个vue实例来对他们进行管理。
  main.js
将Vue实例挂在Vue的原型上，这样每个组件就都可以使用了
  Vue.prototype.$eventBus = new Vue()

A组件通过$eventBus.$on监听B组件的$eventBus.$emit可以进行直接交互完成兄弟组件之间的通信。
  src/view/shoppingCar

goodlist交互Car
 this.$eventBus.$emit('mappingCar',index)   
 this.$eventBus.$on('mappingCar',function(){}）
 
貌似到了这里我们找到了最好的方式，但是缺点就在‘一方触发，八方回调’比方说当你请了妹子A，B一起吃了饭，但是现在妹子A妹子B都想单独请你吃饭，你怎么办？
貌似我们现在有遇到一个问题，就是组件的emit会多次分发，导致on回调函数重多次触发，解决方案就是使用$off 在组件生命周期重去关闭他。
对于这种问题我强行答一波疑=》$eventBus是个全局的Vue实例而组件不是在销毁的时候不会去销毁他，导致出现emit(发射)多次事件。
   深入思考EventBus  他与 VueX 区别再哪里又为什么出现X
```
>4.vueX请看教程=>https://vuex.vuejs.org/zh-cn/
```
```
>Vue 怕坑路=>只写官网没有的
```
在数据不变的情况下强制刷新dom的问题
控制数据的 :key = `id`
id:+new Date()
this.id = +new Date();
Vue模拟jquery trigger vue 2.0 / vue 1.0 使用v-el;
<button ref="myBtn" @click=a($event) ></button>
this.$ref.myBtn.click()
// 父组件
<llpCode @onCmBlur='getCodeValue(codeItem,arguments)'></llpCode>
getCodeValue(item,arg){
  console.log(item,arg[0])
},
// 子组件
onCmBlur(codemirror) {
  console.log('onCmBlur', codemirror.getValue())
  this.$emit('onCmBlur',codemirror.getValue())
},
```

>Element UI recode
```
ElAutocomplete ref = 'searchInput' 回车搜索关闭远程提示下拉框
this.$refs.searchInput.$refs.suggestions.showPopper = false;
```

>5.Router
#路由说明
```
1>好看的url，启用路由的 history 模式 /#/login => /login ***需要后端小配合
2>路由的导航钩子的3部曲=>Enter Update Leaver 这里需要注意路由守卫的分三种 全局路由守卫，局部路由守卫，组件路由守卫
3>路由元信息=>meta自段用来在前端路由管理权限
4>路由过度效果=>使用标签<transition>
5>导航完全前后的数据获取行为适用于依赖路由params.id一些页面
6>完成页面跳转的对滚动条行为的控制=>scrollBehavior
7>路由懒加载=>组件按组分块
```
# 后台node
>数据库noSQL=>mongoDB,语言nodeJS ***前后端不能乱！！！
### 登陆注册
```
  前端请求node，使用webpack代理解决跨域
  node操作数据库处理相关逻辑后，返回数据给前端
  前端通过返回数据再做呈现处理
```  

### word导出功能
>一个炫酷吊炸天功能=>通过js下载服务端的文件到本地
```
  主要依赖node的模块officegen来生成.docx => 支持office2007↑
  前端传递.docx文件的名字！！(必选)与内容(可带样式but要求写法不一)
  node端通过依赖模块去解析生成.docx生成文件的url
  前端去get请求url来下载node处理的的docx
```
