import Vue from "vue";
import router from './router/index';//引入路由配置
import App from "./app";
import VueRouter from "vue-router";

Vue.config.debug = true;//开启错误提示

Vue.use(VueRouter);

const app = new Vue({
    el:'#app',
    router:router,//添加路由配置
    render: h => h(App)
});
