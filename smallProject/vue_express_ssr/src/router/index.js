import VueRouter from "vue-router";
import Index from "../views/Index/index";
import User from "../views/User/user";
const routes = [
    {
        path:'/', component:Index
    },
    {
        path:'/user', component:User
    }];
const router = new VueRouter({ mode: 'history', routes});
module.exports = router;
