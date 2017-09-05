var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require("webpack")


function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
//配置编译入口和输出路径
//模块resolve的规则
//配置不同类型模块的处理规则
module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  //模块resolve的规则
  resolve: {
     //resolve的后缀名
    extensions: ['.js', '.vue', '.json'],
    //配置路径别名，比如import Vue from 'vue/dist/vue.common.js'--> import Vue from 'vue'
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src') //当以@为src目录 resolve是配置的跟目录
    }
  },
  //配置不同类型的模块处理规则
  module: {
    rules: [
      //所有.vue使用vue-loader加载
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      //src和test文件夹下的.js和.vue文件使用eslint-load
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
 plugins: [
   new webpack.optimize.CommonsChunkPlugin('common.js'),
   new webpack.ProvidePlugin({
       jQuery: "jquery",
       $: "jquery"
   })
  ]
 
}
