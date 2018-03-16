import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);

new Vue({
    el: '#app',
    data: {
        message : "xuxiao is boy"
    },
//     beforeCreate: function () {
//         console.group('beforeCreate 创建前状态===============》');
//         console.log("%c%s", "color:red" , "el     : " + this.$el); //undefined
//         console.log("%c%s", "color:red","data   : " + this.$data); //undefined
//         console.log("%c%s", "color:red","message: " + this.message)
//     },
//     created: function () {
//         console.group('created 创建完毕状态===============》');
//         console.log("%c%s", "color:red","el     : " + this.$el); //undefined
//         console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化
//         console.log("%c%s", "color:red","message: " + this.message); //已被初始化
//     },
//     beforeMount: function () {
//         console.group('beforeMount 挂载前状态===============》');
//         console.log("%c%s", "color:red","el     : " + (this.$el)); //已被初始化
//         console.log(this.$el);
//         console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化
//         console.log("%c%s", "color:red","message: " + this.message); //已被初始化
//     },
//     mounted: function () {
//         // GET request for remote image
//
// //         $.ajax({
// //             url: "/api",
// //             method: "post",
// //             contentType:"application/json",
// //             dataType:"json",
// //             Accept:"application/json",
// //             data:JSON.stringify({
// //                 query:
// //                     `
// //                     {
// //                     categories{
// //                       id
// //                       category_name
// //                       category_des
// //                     }
// //                     }
// //                     `
// //             }) ,
// //             success: function (data) {
// //                 console.log(data)
// //             }
// //         })
//
//         // axios({
//         //     method:'post',
//         //     url:'/api',
//         //     data: {
//         //         query:
//         //             `
//         //             {
//         //             categories{
//         //               id
//         //               category_name
//         //               category_des
//         //             }
//         //             }
//         //             `
//         //     }
//         //     ,
//         // })
//         //     .then(function(response) {
//         //         console.log(response)
//         //     });
//     },
//     beforeUpdate: function () {
//         console.group('beforeUpdate 更新前状态===============》');
//         console.log("%c%s", "color:red","el     : " + this.$el);
//         console.log(this.$el);
//         console.log("%c%s", "color:red","data   : " + this.$data);
//         console.log("%c%s", "color:red","message: " + this.message);
//     },
//     updated: function () {
//         console.group('updated 更新完成状态===============》');
//         console.log("%c%s", "color:red","el     : " + this.$el);
//         console.log(this.$el);
//         console.log("%c%s", "color:red","data   : " + this.$data);
//         console.log("%c%s", "color:red","message: " + this.message);
//     },
//     beforeDestroy: function () {
//         console.group('beforeDestroy 销毁前状态===============》');
//         console.log("%c%s", "color:red","el     : " + this.$el);
//         console.log(this.$el);
//         console.log("%c%s", "color:red","data   : " + this.$data);
//         console.log("%c%s", "color:red","message: " + this.message);
//     },
//     destroyed: function () {
//         console.group('destroyed 销毁完成状态===============》');
//         console.log("%c%s", "color:red","el     : " + this.$el);
//         console.log(this.$el);
//         console.log("%c%s", "color:red","data   : " + this.$data);
//         console.log("%c%s", "color:red","message: " + this.message)
//     },
    render: h => h(App)
});

