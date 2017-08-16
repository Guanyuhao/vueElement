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
>1.使用v-on/$emit
``` 在父组件中使用$on监听子组件自定义事件逻辑回调，子组件中使用$emit去触发事件提供交互数据
``` this.$emit('listenToChildEvent', key) <left-menu v-on:listenToChildEvent='showMsgFromChild'></left-menu>
>2.建立一个Vue事件中心
