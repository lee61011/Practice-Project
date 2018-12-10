//  导入 Vue 框架
import Vue from 'vue';
//  导入 app.vue 组件
import App from './app.vue';
import './style.css'

//  创建 Vue 实例
new Vue({
    el: '#app',
    render: h => h(App)
})