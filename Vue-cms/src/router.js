import VueRouter from 'vue-router'

//  导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue';
import MemberContainer from './components/tabbar/MemberContainer.vue';
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue';
import SearchContainer from './components/tabbar/SearchContainer.vue';
import NewsList from './components/news/NewsList.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [ // 配置路由规则
    { path: '/', redirect: '/home' },         //  如果是根路径的话, 将路由重定向到 home 组件
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemberContainer },
    { path: '/shopcar', component: ShopcarContainer },
    { path: '/search', component: SearchContainer },

    { path: '/home/newsList', component: NewsList },
  ],
  linkActiveClass: 'mui-active' //  当路由选中时, 覆盖默认的路由高亮的类, 默认是 router-link-active
})

// 把路由对象暴露出去
export default router