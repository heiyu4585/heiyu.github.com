import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);
Vue.use(VueRouter);
import routes from "./router";

// 3. 创建 router 实例，然后传 routes 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// // 从而让整个应用都有路由功能
// const app = new Vue({
//     router
// }).$mount('#app');

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});

