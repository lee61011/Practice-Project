// 入口文件
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

//  导入格式化时间的插件
import moment from 'moment'
//  定义一个全局的时间格式化过滤器
Vue.filter('dateFormat', function (dateStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dateStr).format(pattern)
})


// 注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//  每次首先进入网站, 先从 本地的 localstorage 中将购物车信息读取出来, 存放在 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
  state: {
    /* car: [
      //  将购物车的每条数据设计成这样  { id: 商品ID count: 购买数量 price: 单价 selected: 是否选中 }
    ] */
    car: car
  },
  mutations: {
    addToCar (state, goodsinfo) {
      //  点击加入购物车, 把商品信息保存在 state 的 car 中
      //  如果购物车中已经存在对应商品, 值更新数量就可以了
      //  如果购物车中没有对应的商品, 则将 信息 push 到 car 中
      let flag = false;
      state.car.some( item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count);
          flag = true;
          return true
        }
      })

      if (!flag) {
        state.car.push(goodsinfo)
      }

      //  当更新 car 之后, 将 car 数组存储到本地的 localStorage 中
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    getAllCount(state){
      var c = 0;
      state.car.forEach( item => {
        c += item.count;
      })
      return c
    },
    getGoodsCount(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    }
  }
})

// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'


// 按需导入 Mint-UI 中的组件   
/* import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload); */
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'


// 1.3 导入 router.js 路由模块
import router from './router.js'


// 导入 App 根组件
import app from './App.vue'

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router,
  store
})