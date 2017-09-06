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

  this.$emit('listenToChildEvent', key) 
  <left-menu v-on:listenToChildEvent='showMsgFromChild'></left-menu>

如果跨多层父子或者兄弟的话，这个方法会非常的复杂。
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
```
>4.vueX请看教程=>https://vuex.vuejs.org/zh-cn/
# 配置台实现登录注册 
>数据库noSQL=>mongoDB,语言nodeJS ***前后端不能乱！！！
## 实现逻辑
```
  前端请求node，使用webpack代理解决跨域
  node操作数据库处理相关逻辑后，返回数据给前端
  前端通过返回数据再做呈现处理
```  
>5.Router
#路由说明
```
	1>好看的url，启用路由的 history 模式 /#/login => /login ***需要后端小配合
	2>路由的导航钩子的3部曲=>Enter Update Leaver
	3>路由元信息=>meta自段用来在前端路由管理权限
	4>路由过度效果=>使用标签<transition>
	5>导航完全前后的数据获取行为适用于依赖路由params.id一些页面
	6>完成页面跳转的对滚动条行为的控制=>scrollBehavior
	7>路由懒加载=>组件按组分块
```