import VueRouter from 'vue-router'

//  导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue';
import MemberContainer from './components/tabbar/MemberContainer.vue';
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue';
import SearchContainer from './components/tabbar/SearchContainer.vue';
import NewsList from './components/news/NewsList.vue';
import NewsInfo from './components/news/NewsInfo.vue';
import PhotoList from './components/photo/PhotoList.vue';
import Goodslist from './components/goods/Goodslist.vue';
import GoodsInfo from './components/goods/GoodsInfo.vue';
import GoodsDesc from './components/goods/GoodsDesc.vue';
import GoodsCommon from './components/goods/GoodsCommon.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [ // 配置路由规则
    { path: '/', redirect: '/home' },         //  如果是根路径的话, 将路由重定向到 home 组件
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemberContainer },
    { path: '/shopcar', component: ShopcarContainer },
    { path: '/search', component: SearchContainer },

    { path: '/home/newsList', component: NewsList },
    { path: '/home/newsinfo/:id', component: NewsInfo },
    { path: '/home/photolist/', component: PhotoList },
    { path: '/home/goodslist', component: Goodslist },
    { path: '/home/goodsinfo/:id', component: GoodsInfo, name: 'goodsinfo' },
    { path: '/home/goodsdesc/:id', component: GoodsDesc, name: 'goodsdesc' },
    { path: '/home/goodscommon/:id', component: GoodsCommon, name: 'goodscommon' },
  ],
  linkActiveClass: 'mui-active' //  当路由选中时, 覆盖默认的路由高亮的类, 默认是 router-link-active
})

// 把路由对象暴露出去
export default router